/*\
title: $:/breakzplatform/macros/share-event-listener.js
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

	exports.name = "share-event-listener";

	exports.params = [];

	/*
	Run the macro
	*/
	exports.run = function () {
		const b = document.querySelectorAll('[data-share-link]');
		const fShare = (event) => {
			const shareAnchor = event.currentTarget;
			 navigator.share({
				url: shareAnchor.getAttribute('data-share-link'),
			})
			.then(() => console.log('Successful share'))
    	.catch((error) => console.log('Error sharing', error));
		}

		b.forEach(el => {
			el.removeEventListener('click', fShare);
			el.addEventListener('click', fShare);
		});
	};

})();