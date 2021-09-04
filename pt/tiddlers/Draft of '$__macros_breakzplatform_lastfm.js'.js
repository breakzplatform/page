/*\
title: $:/macros/breakzplatform/lastfm.js
type: application/javascript
module-type: macro

<<gh-link url>>

Example:
<<gh-link>>
<<gh-link "Donald Duck">>

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
This is the mysamplemacro of Tiddly Wiki 5 written in JavaScript 
*/

exports.name = "lastfm";

exports.params = [
	{ url: "user" }
];

/*
Run the macro
*/
exports.run = function(user) {
  const url = 'https://lastfm-last-played.biancarosa.com.br/' + user + '/latest-song';
	const song = document.querySelector('#song');
	
        fetch(url)
            .then(function (response) {
                return response.json()
            }).then(function (json) {
                song.innerHTML = json['track']['name'] + ' - ' + json['track']['artist']['#text'];
            }).catch(function (e) {
								song.innerHTML = ['Hook - Blues Traveler', 'One More Time - Daft Punk'][~~(Math.random() * 2)];;
						});
};

})();