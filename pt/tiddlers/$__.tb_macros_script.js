(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
enables js via <<script>> and disables with <<script 0>>
*/

exports.name = "script";

exports.params = [
	{name: "run"},
];

/*
Run the macro
*/
exports.run = function(run) {
        var off = run ? run.toLowerCase() : false;
	if(off && ["0","no","off","false"].indexOf(off) > -1) {
		$tw.config.htmlUnsafeElements = ["script"];
	} else {
		$tw.config.htmlUnsafeElements = [];
	}
return "";
};
})();