/*\
title: $:/breakzplatform/macros/hidehomepagebuttonevent.js
type: application/javascript
module-type: macro

Macro to return the TiddlyWiki core version number

\*/
(function () {

	/*jslint node: true, browser: true */
	/*global $tw: false */
	"use strict";

	/*
	Information about this macro
	*/

	exports.name = "hidehomepagebuttonevent";

	exports.params = [];

	/*
	Run the macro
	*/
	exports.run = function () {
		document.querySelector(".btn-hide-home.win").addEventListener("click", () => {
			document.querySelector(".btn-hide-home.win").style.display = "none";
			localStorage.setItem('hideHomePage', '1');
		}, false);
	};

})();