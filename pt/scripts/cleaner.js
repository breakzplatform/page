const HTMLParser = require('node-html-parser');
const CleanCSS = require('clean-css');
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '..', 'output') + '/wiki.html', 'utf8', async (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const root = HTMLParser.parse(data);

  root.querySelector('meta[name="copyright"]').remove();
  root.querySelector('noscript').remove();

  let _a1 = root.querySelector('div[name="Core"] pre').innerHTML.toString().indexOf("&quot;$:/palettes/Blanca&quot;");
  let _a2 = root.querySelector('div[name="Core"] pre').innerHTML.toString().indexOf("&quot;$:/palettes/Vanilla&quot;:{&quot;name&quot;:&quot;Vanilla");

  let _txt1 = root.querySelector('div[name="Core"] pre').innerHTML.substring(0, _a1)
  let _txt2 = root.querySelector('div[name="Core"] pre').innerHTML.substring(_a2, root.querySelector('div[name="Core"] pre').innerHTML.length);

  let _a = _txt1 + _txt2;

  root.querySelector('div[name="Core"] pre').set_content(_a);

  _a1 = root.querySelector('div[name="Vanilla"] pre').innerHTML.toString().indexOf("/*! modern-normalize v1.0.0");
  _a2 = root.querySelector('div[name="Vanilla"] pre').innerHTML.toString().indexOf("Add the correct display in Chrome and Safari.");

  _txt1 = root.querySelector('div[name="Vanilla"] pre').innerHTML.substring(0, _a1)
  _txt2 = root.querySelector('div[name="Vanilla"] pre').innerHTML.substring(_a2 + 90, root.querySelector('div[name="Vanilla"] pre').innerHTML.length);

  _a = _txt1 + _txt2;

  root.querySelector('div[name="Vanilla"] pre').set_content(_a);

  root.querySelector('div[title="$:/estilo/Global"] pre').replaceWith(`
    <pre>${new CleanCSS({})
      .minify(root.querySelector('div[title="$:/estilo/Global"] pre')
        .innerHTML
        .replaceAll('&quot;', '"')
        .replaceAll('&gt;', '>')
      ).styles
      .replaceAll('"', '&quot;')
      .replaceAll('>', '&gt;')}
    </pre>`)

  root.querySelector('div[title="$:/estilo/HomePage"] pre').replaceWith(`
    <pre>${new CleanCSS({})
      .minify(root.querySelector('div[title="$:/estilo/HomePage"] pre')
        .innerHTML
        .replaceAll('&quot;', '"')
        .replaceAll('&gt;', '>')
      ).styles
      .replaceAll('"', '&quot;')
      .replaceAll('>', '&gt;')}
    </pre>`)

  fs.writeFile(path.join(__dirname, '..', 'output') + '/index.min.html', root.toString(), function (err) {
    if (err) return console.log(err);
    // console.log('Hello World > helloworld.txt');
  });
})