/*\
title: $:/breakzplatform/macros/startup.js
type: application/javascript
module-type: startup

Startup

\*/
(function () {
	/*jslint node: true, browser: true */
	/*global $tw: false */
	"use strict";

	exports.name = "startup";
	exports.platforms = ["browser"];
	exports.after = ["render"];
	exports.synchronous = true;

	exports.startup = function () {		
		const s = document.querySelector('input[type="search"]');
		s.setAttribute("aria-label", "Buscar no site");
		s.setAttribute("placeholder", "Buscar no site");
	}
})();