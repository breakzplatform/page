const HTMLParser = require('node-html-parser');
const CleanCSS = require('clean-css');
const fs = require('fs');
const path = require('path');

const Parser = require('rss-parser');
const parser = new Parser();

const fetch = require('cross-fetch');

const newsletterFeedItems = [];

(async () => {

  const newsletterFeed = await parser.parseURL('https://world.hey.com/joselito/feed.atom');
  newsletterFeed.items.forEach(item => {
    newsletterFeedItems.push('* [[' + item.title + '|' + item.link + ']]')
  });


  let track = "";
  const res = await fetch('https://lastfm-last-played.biancarosa.com.br/joselitojunior/latest-song');
  try {
    track = await res.json();
  } catch (e) {
    track = [{ track: { artist: { "#text": "Blues Traveler" }, name: "Hook" } }, { track: { artist: { "#text": "Daft Punk" }, name: "One More Time" } }][~~(Math.random() * 2)];
  }

  fs.readFile(path.join(__dirname, '..', 'output') + '/wiki.min.html', 'utf8', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const root = HTMLParser.parse(data);

    root.querySelector('div[title="$:/plugins/rmnvsl/krystal"]').remove();
    root.querySelector('div[title="$:/SiteTitle"] pre').set_content('[img width=128 height=128 class=&quot;eu&quot; alt=&quot;Avatar Joselito&quot; [https://next.joseli.to/pt/icon.webp]]<span style="display:none">Joseli.to</span>');
    root.querySelector('head').insertAdjacentHTML('beforeend', `<style>.tc-sidebar-header,.tc-sidebar-lists .tc-tab-buttons {text-align: center;}.tc-topbar{display: none;}.tc-sidebar-tabs{text-align: left;}.tc-tab-content {font-size:1rem;}.tc-tab-content ul {list-style:none;margin:0;padding: 0;}.tc-site-title .eu {margin: 0 0 10px}.tc-tiddler-frame{border-radius: 4px;box-shadow:0 0 8px 0 rgb(0 0 0 / 10%)}</style>`);

    fs.writeFile(path.join(__dirname, '..', 'output') + '/wiki.mobile.min.html', root.toString(), function (err) {
      if (err) return console.log(err);
      // console.log('Hello World > helloworld.txt');
    });
  })
})();