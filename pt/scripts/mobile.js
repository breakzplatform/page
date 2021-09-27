const HTMLParser = require('node-html-parser');
const fs = require('fs');
const path = require('path');

(async () => {
  fs.readFile(path.join(__dirname, '..', 'output') + '/wiki.min.html', 'utf8', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const root = HTMLParser.parse(data);

    root.querySelector('div[title="$:/plugins/rmnvsl/krystal"]').remove();
    root.querySelector('div[title="$:/plugins/rmnvsl/krystal/plugin.js"]').remove();
    root.querySelector('div[title="$:/plugins/rmnvsl/krystal/headertools"]').remove();
    root.querySelector('div[title="$:/plugins/rmnvsl/krystal/images/maximize-tiddler"]').remove();
    root.querySelector('div[title="$:/SiteTitle"] pre').set_content('[img width=128 height=128 class=&quot;eu&quot; alt=&quot;Avatar Joselito&quot; [https://next.joseli.to/pt/icon.webp]]<span style="display:none">Joseli.to</span>');
    root.querySelector('head').insertAdjacentHTML('beforeend', `<style>.tc-sidebar-header,.tc-sidebar-lists .tc-tab-buttons {text-align: center;}.tc-topbar{display: none;}.tc-sidebar-tabs{text-align: left;}.tc-tab-content {font-size:1rem;}.tc-tab-content ul {list-style:none;margin:0;padding: 0;}.tc-site-title .eu {margin: 0 0 10px}.tc-tiddler-frame{border-radius: 4px;box-shadow:0 0 8px 0 rgb(0 0 0 / 10%)}</style>`);

    fs.writeFile(path.join(__dirname, '..', 'output') + '/wiki.mobile.min.html', root.toString(), function (err) {
      if (err) return console.log(err);
      // console.log('Hello World > helloworld.txt');
    });
  })
})();