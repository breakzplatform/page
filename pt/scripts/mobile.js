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
    root.querySelector('meta[name*="application"]').remove();
    root.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').remove();
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
    <meta property="og:image" content="https://static.joseli.to/joseli.to/social.png" />
    <meta name="twitter:title" content="Joseli.to — Uma página pessoal" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://static.joseli.to/joseli.to/social.png" />
    <meta name="twitter:creator" content="@breakzplatform" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="apple-touch-icon" sizes="57x57" href="assets/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="assets/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="assets/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="assets/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="assets/apple-touch-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="assets/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="assets/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="assets/apple-touch-icon-152x152.png" />
    <link rel="icon" type="image/png" href="assets/favicon-196x196.png" sizes="196x196" />
    <link rel="icon" type="image/png" href="assets/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="assets/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="assets/favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="assets/favicon-128.png" sizes="128x128" />
    <meta name="application-name" content="Joseli.to"/>
    <title>Joseli.to — Uma página pessoal</title>
    <meta name="description" content="Este site é um site igual a todos os outros sites. É um site diferente dos outros sites. É o meu cantinho na internet. O meu site. Leia sobre desenvolvimento web, produtividade e artigos políticos com praticamente nenhum embasamento." />
    <meta property="og:description" content="Este site é um site igual a todos os outros sites. É um site diferente dos outros sites. É o meu cantinho na internet. O meu site. Leia sobre desenvolvimento web, produtividade e artigos políticos com praticamente nenhum embasamento." />
    <link rel="alternate" type="application/atom+xml" title="Joseli.to — Newsletter" href="https://world.hey.com/joselito/feed.atom" />
    <link rel="alternate" type="application/atom+xml" title="Joseli.to — Notinhas" href="feed/notinhas.atom" />
    <link rel="alternate" type="application/atom+xml" title="Joseli.to — Artigos" href="feed/artigos.atom" />
    <link href="https://pvinis.github.io/iosevka-webfont/3.4.1/iosevka.css" rel="preload" as="style" onload="this.rel='stylesheet'; this.onload=null;">
  `);

    root.querySelector('body').insertAdjacentHTML('beforeend', `<script>window.KONAMI_CURSOR=0;const KONAMI_CODE=[38,38,40,40,37,39,37,39,66,65];document.addEventListener('keydown',(e)=>{window.KONAMI_CURSOR=(e.keyCode==KONAMI_CODE[window.KONAMI_CURSOR])?window.KONAMI_CURSOR+1:0;if(window.KONAMI_CURSOR==KONAMI_CODE.length)window.location.href='https://amzn.to/3jXDIiG'})</script>`);

    root.querySelector('div[title="$:/config/ViewToolbarButtons/Visibility/$:/core/ui/Buttons/delete"] pre').replaceWith("<pre>hide</pre>");
    root.querySelector('div[title="$:/config/PageControlButtons/Visibility/$:/core/ui/Buttons/control-panel"] pre').replaceWith("<pre>hide</pre>");
    root.querySelector('div[title="$:/config/PageControlButtons/Visibility/$:/core/ui/Buttons/new-tiddler"] pre').replaceWith("<pre>hide</pre>");
    root.querySelector('div[title="$:/config/MissingLinks"] pre').replaceWith("<pre>no</pre>");

    root.querySelector('div[title="$:/tags/PageControls"]').replaceWith(`
      <div list="$:/core/ui/Buttons/home  $:/core/ui/Buttons/RandomSelection $:/core/ui/Buttons/permaview $:/core/ui/Buttons/fold-all $:/core/ui/Buttons/unfold-all $:/core/ui/Buttons/new-tiddler $:/core/ui/Buttons/new-journal $:/core/ui/Buttons/new-image $:/core/ui/Buttons/import $:/core/ui/Buttons/export-page $:/core/ui/Buttons/advanced-search $:/core/ui/Buttons/manager $:/core/ui/Buttons/tag-manager $:/core/ui/Buttons/language $:/core/ui/Buttons/palette $:/core/ui/Buttons/theme $:/core/ui/Buttons/storyview $:/core/ui/Buttons/encryption $:/core/ui/Buttons/timestamp $:/core/ui/Buttons/print $:/core/ui/Buttons/refresh $:/core/ui/Buttons/save-wiki $:/core/ui/Buttons/full-screen $:/core/ui/Buttons/close-all $:/core/ui/Buttons/more-page-actions" title="$:/tags/PageControls" type="text/vnd.tiddlywiki" revision="0" bag="default">
        <pre></pre>
      </div>
    `)

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

    root.querySelector('noscript').remove();
    root.querySelector('#styleArea').remove();

    root.querySelector('div[title="$:/Splash"]').remove();
    root.querySelector('div[title="$:/sitemap"]').remove();
    root.querySelector('div[title="$:/rss/Notinhas"]').remove();
    root.querySelector('div[title="$:/rss/Artigos"]').remove();
    !!root.querySelector('div[title="$:/Import"]') && root.querySelector('div[title="$:/Import"]').remove();

    root.querySelector('div[author="Flibbles"]').remove();
    root.querySelector('div[author="Scott Kingery"]').remove();
    root.querySelector('div[title="$:/plugins/tiddlywiki/codemirror"]').remove();
    root.querySelector('div[title="$:/config/codemirror/theme"]').remove();
    root.querySelector('div[title="$:/plugins/adithyab/cmplus"]').remove();

    root.querySelector('div[title="$:/config/codemirror/styleActiveLine"]').remove();
    root.querySelector('div[title="$:/config/codemirror/lineNumbers"]').remove();

    const homePage = root.querySelector('div[title="HomePage"] pre');
    homePage.replaceWith("<pre>" + homePage.innerHTML
      .replace(`Ao som de ''&lt;i&gt;&lt;/i&gt;''`, `Ao som de ''${track['track']['name']} - ${track['track']['artist']['#text']}''`)
      .replace(`2010-''&lt;i&gt;&lt;/i&gt;''`, `2010-${(new Date()).getFullYear()}`)
      .replace(`Última compilação: ''&lt;i&gt;&lt;/i&gt;''`, `Última compilação ás ''${new Date().toISOString()}''. Atualizado a cada 15 minutos.`) + "</pre>");

    const content = root.querySelector('div[title="Conteúdo"] pre');
    content.replaceWith("<pre>" + content.innerHTML.replace(`!! [[Newsletter|https://world.hey.com/joselito]] ''&lt;i&gt;&lt;/i&gt;''`, `!! [[Newsletter|https://world.hey.com/joselito]]\n${newsletterFeedItems.slice(0, 5).join('\n')}`) + "</pre>");

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

    root.querySelector('div[title="$:/plugins/rmnvsl/krystal"]').remove();
    root.querySelector('div[title="$:/SiteTitle"] pre').set_content('[img width=128 height=128 class=&quot;eu&quot; alt=&quot;Avatar Joselito&quot; [https://next.joseli.to/pt/icon.webp]]<span style="display:none">Joseli.to</span>');
    root.querySelector('head').insertAdjacentHTML('beforeend', `<style>.tc-sidebar-header,.tc-sidebar-lists .tc-tab-buttons {text-align: center;}.tc-topbar{display: none;}.tc-sidebar-tabs{text-align: left;}.tc-tab-content {font-size:1rem;}.tc-tab-content ul {list-style:none;margin:0;padding: 0;}.tc-site-title .eu {margin: 0 0 10px}.tc-tiddler-frame{border-radius: 4px;box-shadow:0 0 8px 0 rgb(0 0 0 / 10%)}</style>`);

    fs.writeFile(path.join(__dirname, '..', 'output') + '/wiki.mobile.min.html', root.toString(), function (err) {
      if (err) return console.log(err);
      // console.log('Hello World > helloworld.txt');
    });
  })
})();