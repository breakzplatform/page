/*\
title: $:/breakzplatform/macros/homepageishidden.js
type: application/javascript
module-type: macro

Macro to return if the HomePage was hidden by the user

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
*/

exports.name = "is-home-hidden";

exports.params = [];

/*
Run the macro
*/
exports.run = function() {
	return localStorage.getItem('home_hidden');
};

})();