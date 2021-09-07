/*\
title: $:/breakzplatform/macros/hidehomepagebuttonevent.js
type: application/javascript
module-type: macro

Macro to return the TiddlyWiki core version number

\*/
(function(){

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
exports.run = function() {
	document.getElementById("btn-hide-home").addEventListener("click", () => {
		document.getElementById("btn-hide-home").style.display = "none";
		localStorage.setItem('hideHomePage', '1');
	}, false);
};

})();