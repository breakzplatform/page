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

  const _a1 = root.querySelector('div[name="Core"] pre').innerHTML.toString().indexOf("&quot;$:/palettes/Blanca&quot;");
  const _a2 = root.querySelector('div[name="Core"] pre').innerHTML.toString().indexOf("&quot;$:/palettes/Vanilla&quot;:{&quot;name&quot;:&quot;Vanilla");

  const _txt1 = root.querySelector('div[name="Core"] pre').innerHTML.substring(0, _a1)
  const _txt2 = root.querySelector('div[name="Core"] pre').innerHTML.substring(_a2, root.querySelector('div[name="Core"] pre').innerHTML.length);

  const _a = _txt1 + _txt2;

  root.querySelector('div[name="Core"] pre').replaceWith('<pre>' + _a + '</pre>');

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