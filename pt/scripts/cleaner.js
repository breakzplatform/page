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
  root.querySelector('meta[name="viewport"]').remove();
  root.querySelector('meta[content="IE=Edge"]').remove();
  root.querySelector('meta[content*="text/html"]').remove();
  root.querySelector('#faviconLink').remove();
  root.querySelector('title').remove();

  root.querySelector('head').insertAdjacentHTML('beforeend', `
    <meta charset="utf-8" />
    <meta content="width=device-width,initial-scale=1" name="viewport">
    <meta name="theme-color" content="#653585" />
	  <meta property="og:type" content="website" />
    <link rel="webmention" href="https://webmention.io/joseli.to/webmention" />
    <link rel="pingback" href="https://webmention.io/joseli.to/xmlrpc" />
    <link rel="me" href="https://twitter.com/breakzplatform" />
    <link rel="dns-prefetch" href="//static.joseli.to" />
    <meta property="og:title" content="Joseli.to — Uma página pessoal" />
    <meta property="og:image" content="https://joseli.to/pt/social.png" />
    <meta name="twitter:title" content="Joseli.to — Uma página pessoal" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://joseli.to/pt/social.png" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="assets/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon-precomposed" sizes="60x60" href="assets/apple-touch-icon-60x60.png" />
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="assets/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="assets/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="assets/apple-touch-icon-152x152.png" />
    <link rel="icon" type="image/png" href="assets/favicon-196x196.png" sizes="196x196" />
    <link rel="icon" type="image/png" href="assets/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="assets/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="assets/favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="assets/favicon-128.png" sizes="128x128" />
    <meta name="application-name" content="Joseli.to"/>
    <title>Joseli.to — Uma página pessoal</title>
  `);

  root.querySelector('noscript').remove();
  root.querySelector('#styleArea').remove();
  root.querySelector('div[author="Flibbles"]').remove();
  root.querySelector('div[author="Scott Kingery"]').remove();

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