/*\
title: $:/breakzplatform/native-share-detect.js
type: application/javascript
module-type: macro

Verify if Native Share is supported by the Browser

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
*/

exports.name = "navigator-share-detect";

exports.params = [];

/*
Run the macro
*/
exports.run = function() {
	return !!window.navigator.share;
};

})();