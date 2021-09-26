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
			b.style.display = "none";
			document.getElementById('hide-home-message').innerHTML = "<strong>Feito!</strong> Esse post não vai abrir mais nas próximas visitas. Para ver essa página novamente acesse \"Página Inicial\" pelo Index, dentro de Meta.";
			localStorage.setItem('home_hidden', '1');
		}, false);
	};

})();