
var keys = require("./keys.js");

var movie = function() {
  	var request = require("request");

  	var name = process.argv[3];

  	request("http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

	  	// If the request is successful (i.e. if the response status code is 200)
	  	if (!error && response.statusCode === 200) {
			console.log("Movie title: " + (JSON.parse(body)).Title);
			console.log("------------------------------------------");
			console.log("Year the movie: " + (JSON.parse(body)).Year);
			console.log("------------------------------------------");
			console.log("IMDB rating: " + (JSON.parse(body)).imdbRating);
			console.log("------------------------------------------");
			console.log("Rotten Tomatoes Rating: " + (JSON.parse(body)).Ratings[1].Value);
			console.log("------------------------------------------");
			console.log("Country where the movie was produced: " + (JSON.parse(body)).Country);
			console.log("------------------------------------------");
			console.log("Language of the movie: " + (JSON.parse(body)).Language);
			console.log("------------------------------------------");
			console.log("Plot of the movie: " + (JSON.parse(body)).Plot);
			console.log("------------------------------------------");
			console.log("Actors in the movie: " + (JSON.parse(body)).Actors);	    
	 	}
	});
 }

  var twitter = function() {
 	var Twitter = require("twitter");
 	

 	var key = keys.twitterKeys.consumer_key;
 	var secret = keys.twitterKeys.consumer_secret;
 	var token = keys.twitterKeys.access_token_key;
 	var token_secret = keys.twitterKeys.access_token_secret;

 	var client = new Twitter({
      consumer_key: key,
      consumer_secret: secret,
      access_token_key: token,
      access_token_secret: token_secret
  });
 	

 	client.get('statuses/user_timeline', { screen_name: 'AnishDabade' }, function(err, data, response) {
  		console.log("----------------------------------------------------");
  		console.log(data[0].text);
  		console.log("----------------------------------------------------");
  		console.log(data[1].text);
	});
 }



	var spotify = function(song) {

    var Spotify = require("node-spotify-api");
    var spotify_id = keys.spotify.id;
    var spotify_secrete = keys.spotify.secret;
    var title="";

    if(song) {
    	title = formatQueryString(song);
    }

    else {
    	for( var i=3; process.argv.length > i; i++) {
        	title += process.argv[i]+ " ";
    	}
    }
    

   var spotifyObj = new Spotify({
          id: spotify_id,
          secret: spotify_secrete
    });

   spotifyObj.search({ type:'track', query:title }, function(err, data) {
      if (err) {
          return console.log('Error occurred: ' + err);
      }
    var songs = data.tracks.items;
    console.log(songs);
    console.log(songs[0].id);

  });
}



var readFile = function() {
	var fs = require("fs");
	fs.readFile("random.txt", "utf8", function(error, data) {
	  if (error) {
	    return console.log(error);
	  }
	  console.log(data);
	  var array = data.split(",");
	 	console.log(array);

	 	var song = array[1];

  	song = song.slice(0, -1); 
  	song = song.slice(1, song.length); 

  	spotify(song);

	});	
}

function formatQueryString(str) {
    var finalString;
    var splitString = str.split(" ");

    if (splitString.length > 1) {
      finalString = splitString.join("+");
    }
    else {
      finalString = str;    
    }
    return finalString;
 }


  var input = process.argv[2];

  switch(input) {
  	case "my-tweets":
  		twitter();
  		break;
  	case "spotify-this-song":
  		spotify(input);
  		break;
  	case "movie-this":
  		movie();
  		break;
  	case "do-what-it-says":
  		readFile();
  		break;
  }

  