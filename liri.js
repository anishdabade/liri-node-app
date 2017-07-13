//var twitterkeys = require("keys.js");

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
   id: "fb0a91ed065e47a291777855f3fe9587",
   secret: "c540446380834119ae8d24cb9a624684"
 });

spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(error);
  });