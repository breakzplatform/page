/*\
title: $:/startup.js
type: application/javascript
module-type: startup

Startup

\*/
(function () {
	/*jslint node: true, browser: true */
	/*global $tw: false */
	"use strict";

	exports.name = "breakzplatform-startup";
	exports.platforms = ["browser"];
	exports.after = ["render"];
	exports.synchronous = true;

	exports.startup = function () {
		document.querySelector('input[type="search"]').setAttribute("aria-label", "Buscar no site");
		document.querySelector('input[type="search"]').setAttribute("placeholder", "Buscar no site");
	}

	// window.location.hash = "#Conte%C3%BAdo:Conte%C3%BAdo%20Index";
	console.log($tw);

	// $tw.wiki.setText("$:/DefaultTiddlers", "text", undefined, "HomePage Conteúdo Index");

})();