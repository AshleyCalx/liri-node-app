// Variables

var fs = require("fs");
var request = require("request");
var keys = require ("./keys.js");
var twitter = require ("twitter");
var spotify = require ("spotify");
var omdb = require ("omdb"); //?


// Argumnets
var action = process.argv[2]; 
var value = process.argv[3];


// Possible liri actions 

	switch (action) {
		case "my-tweets":
		myTweets();
		break;

		case "spotify-this-song":
		spotifyThisSong();
		break;

		case "movie-this":
		movieThis();
		break;

		case "do-what-it-says":
		doWhatItSays();
		break;

	//default? console.log???
		}

// Functions

		// Twitter Function

	function myTweets(){

			var client = new twitter ({
				consumer_key: keys.twitterKeys.consumer_key,
				consumer_secret: keys.twitterKeys.consumer_secret,
				access_token_key: keys.twitterKeys.access_token_key,
				access_token_secret: keys.twitterKeys.access_token_secret
			});

		// Unsername & Last 20 Tweets

		var params = {screen_name: 'DexCalyx', count: 20};

		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			if (!error) {
				for (var i = 0; i < tweets.length; i ++) {

				var twitterResults = "@"  + data[i].user.screen_name + ": " + 
				data[i].text + "\r\n" + 
				data[i].created_at + "\r\n" +
				"------------------------------- " + i + "-----------------------------" + "\r\n";
				
				console.log(twitterResults);
				log(twitterResults);

					}
			} else {
				console.log("Error: " + error);
				return;
			}

		});

	}

		// Spotify Function

	function spotifyThisSong (){

			var spotify = new spotify ({
				id: keys.spotifyKeys.id,
				secret: keys.spotifyKeys.secret
			});
			
		// User Input, value for song title
		
		var songName = action;

		if(!songName){

			songName = "The Sign";
		}

		var params = songName;
		spotify.search({ type:  "track", query: params }, function(error, data){
			
			if (!error){
				return console.log('Error: ' + error);
			} else {

				var spotifyResults = "\r\n" + "--------------- Songs Searched: ---------------" + "\r\n" +
										"Song Name: " + params.toUpperCase() + "\r\n" +
										"Artist(s): " + data.tracks.items[0].album.artist[0].name + "\r\n" +
										"Album: " + data.tracks.items[0].album.name + "\r\n" +
										"Spotify Link: " + data.tracks.items[0].album.externam_urls.spotify + "\r\n" +
										"--------------------" + "\r\n";
				
				
				console.log(spotifyResults);
				
				appendToFile(spotifyResults);

			}

		});

	} 

		// Movie Function

	function movieThis (){

		var movie = value;

		if(!movieName){

			movieName = "Mr. Nobody";
		}

		var params = movieName;

		var movieQueryURL = "http://www.omdbapi.com/?t=" + params + "&y=&plot=short&apikey=trilogy";

		request(movieQueryURL, function(error, response, body){
			if(!error && response.statusCode === 200){

				

				var movieResults = "\r\n" + "--------------------" + JSON.parse(body).Title + "--------------------" + "\r\n" +
									"Year: " JSON.parse(body).Year + "\r\n" +
									"IMDB Rating: " + JSON.parse(body).Rating[0].Value + "\r\n" +
									"Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\r\n" +
									"Country: " + JSON.parse(body).Country + "\r\n" +
									"Language: " + JSON.parse(body).Language + "\r\n" +
									"Plot: " + JSON.parse(body).Plot + "\r\n" +
									"Actors: " JSON.parse(body).Actors + "\r\n" + "\r\n" +
									"-------------------- END -------------------" + "\r\n";

					console.log(movieResults);
					log(movieResults);
		
				} else {

					console.log("Error: " + error);
					return;
				
				}

			});
		
		};


		// Do What it Says Function

	function doWhatItSays () {
		fs.readFile("random.txt", "utf8", function(error, data){
				
				if(!error){

					var splitArray = data.split(',');

					action = splitArray[1];

					spotifyThisSong();

				} else {
					console.log("Error: " + error);
			
			
				}
			
			});
		
		}





















