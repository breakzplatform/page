/*\
title: $:/breakzplatform/mobile-detect.js
type: application/javascript
module-type: macro

Detect if the user is using a mobile device

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
*/

exports.name = "mobile-detect";

exports.params = [];

/*
Run the macro
*/
exports.run = function() {
	return !!(window.matchMedia("(max-width: 767px)").matches);
};

})();