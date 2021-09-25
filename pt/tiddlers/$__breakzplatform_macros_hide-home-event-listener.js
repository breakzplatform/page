/*\
title: $:/breakzplatform/macros/hide-home-event-listener.js
type: application/javascript
module-type: macro

Macro to add click event to the home button

\*/
(function () {

	/*jslint node: true, browser: true */
	/*global $tw: false */
	"use strict";

	/*
	Information about this macro
	*/

	exports.name = "hide-home-event-listener";

	exports.params = [];

	/*
	Run the macro
	*/
	exports.run = function () {
		const b = document.querySelector(".btn-hide-home.win");
		
		b.addEventListener("click", () => {
			b.innerHTML = "OK, Feito!";
			localStorage.setItem('home_hidden', '1');
		}, false);
	};

})();