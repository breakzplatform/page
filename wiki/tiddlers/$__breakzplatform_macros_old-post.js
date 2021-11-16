/*\
title: $:/breakzplatform/macros/old-post.js
type: application/javascript
module-type: macro

Macro to return a message if the content is old

\*/
(function () {

	/*jslint node: true, browser: true */
	/*global $tw: false */
	"use strict";

	/*
	Information about this macro
	*/

	exports.name = "old-post";

	exports.params = [
		{name: "date"},
		{name: "type"}
	];

	/*
	Run the macro
	*/
	exports.run = function (date, type) {
		const years = new Date(new Date() -  new Date(''+date.substring(0,4)+'-'+date.substring(4,6)+'-01T00:20:00')).getFullYear() - 1970;
    if(years >= 3) return "<div class=\"old-post\"><strong>Atenção:</strong> Este post é antigo! Foi escrito há cerca de "+years+" anos. As informações contidas nele podem estar desatualizadas; bem como certas opiniões e visão de mundo mudaram nesse meio tempo.</div>";
	};

})();