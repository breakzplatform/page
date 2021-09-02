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

  _a1 = root.querySelector('div[name="Core"] pre').innerHTML.toString().indexOf("/*! modern-normalize v1.0.0");
  _a2 = root.querySelector('div[name="Core"] pre').innerHTML.toString().indexOf("list-item;\n}\n&quot");

  _txt1 = root.querySelector('div[name="Core"] pre').innerHTML.substring(0, _a1)
  _txt2 = root.querySelector('div[name="Core"] pre').innerHTML.substring(_a2, root.querySelector('div[name="Core"] pre').innerHTML.length);

  _a = _txt1 + "*,::after,::before{box-sizing:border-box}:root{-moz-tab-size:4;tab-size:4}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}hr{height:0;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}legend{padding:0}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:" + _txt2;

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