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

    const jsonContent = root.querySelector('.tiddlywiki-tiddler-store').innerHTML;
    const jsonContentMod = [];

    jsonContent.split('\n').forEach(line => {
      if (line.includes('"title":"$:/plugins/rmnvsl/krystal"')
        || line.includes('"title":"$:/plugins/rmnvsl/krystal/plugin.js"')
        || line.includes('"title":"$:/plugins/rmnvsl/krystal/headertools"')
        || line.includes('"title":"$:/plugins/rmnvsl/krystal/images/maximize-tiddler"')) {
        // removes unecessary tiddlers
        console.log('Removed');
      } else if (line.includes('"title":"$:/SiteTitle"')) {
        jsonContentMod.push('{"title":"$:/SiteTitle","created":"20210828175705185","modified":"20210828232243746","type":"text/vnd.tiddlywiki","text":"\\u003Cimg loading=\\"lazy\\" src=\\"https://next.joseli.to/pt/icon.webp\\" class=\\"eu\\" width=\\"128\\" height=\\"128\\" alt=\\"Avatar Joselito\\">\\u003Cspan style=\\"display:none\\">Joseli.to\\u003C/span>","revision":"0","bag":"default"},')
      } else {
        jsonContentMod.push(line);
      }
    });

    root.querySelector('.tiddlywiki-tiddler-store').set_content(jsonContentMod.join(''));
    root.querySelector('head').insertAdjacentHTML('beforeend', `<style>.tc-sidebar-header,.tc-sidebar-lists .tc-tab-buttons {text-align: center;}.tc-topbar{display: none;}.tc-sidebar-tabs{text-align: left;}.tc-tab-content {font-size:1rem;}.tc-tab-content ul {list-style:none;margin:0;padding: 0;}.tc-site-title .eu {margin: 0 0 10px}.tc-tiddler-frame{border-radius: 4px;box-shadow:0 0 8px 0 rgb(0 0 0 / 10%)}</style>`);

    fs.writeFile(path.join(__dirname, '..', 'output') + '/wiki.mobile.min.html', root.toString(), function (err) {
      if (err) return console.log(err);
      // console.log('Hello World > helloworld.txt');
    });
  })
})();