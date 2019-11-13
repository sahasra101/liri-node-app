require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var userCommand = process.argv[2];
// confirm that index 2 is the command
console.log("\nYour command is " + userCommand );
var uQuery = [];
for (i = 3; i < process.argv.length; i++) {
    uQuery.push(process.argv[i]);
}
userQuery = uQuery.join(" ");
// confirm that index 3 and after are userQuery
//console.log(userQuery);

switch (userCommand) {
    case "concert-this":
        checkBandsApi(userQuery);
        break;

    case "spotify-this-song":
        if (userQuery == "") {
            userQuery = "The Sign Ace of Base";
            checkSpotify(userQuery);
        } else 
        checkSpotify(userQuery);
        break;

    case "movie-this":
            if (userQuery == "") {
                userQuery = "Mr.Nobody";
                checkOmbd(userQuery);
            } else
        checkOmbd(userQuery);
        break;

    case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function(error, data) {
                if (error) {
                  return console.log(error);
                } else {
                // console.log(data);
                var dataArr = data.split(",");
                console.log(`\nThe do-what-it-says command is ${dataArr[0]}`);
                // console.log(dataArr[1]);
                }
                if (dataArr[0] == "spotify-this-song"){
                    userQuery = dataArr[1];
                    userQuery = userQuery.substring(1, userQuery.length - 1);
                    checkSpotify(userQuery);
                } else if (dataArr[0] == "movie-this"){
                    userQuery = dataArr[1];
                    userQuery = userQuery.substring(1, userQuery.length - 1);
                    checkOmbd(userQuery);
                } else if (dataArr[0] == "concert-this"){
                    userQuery = dataArr[1];
                    userQuery = userQuery.substring(1, userQuery.length - 1);
                    checkBandsApi(userQuery);
                } 
            });
        break;
    default:
        console.log("\nPlease select a valid command:\nconcert-this\nspotify-this-song\nmovie-this\ndo-what-it-says");
}

function checkBandsApi() {
    console.log("The artist you entered was: " + userQuery + "\n");
    axios.get("https://rest.bandsintown.com/artists/" + userQuery.replace(" ", "+") + "/events?app_id=codingbootcamp")
        .then(
            function (response) {
                if (response.data.length === 0) {
                    console.log(userQuery+ " has no concerts in the near future according to bandintown.com.");
                } else {
                    for (let i = 0; i < response.data.length; i++) {
                        var concertData = "For band: "+userQuery+"\nVenue Name: "+response.data[i].venue.name+"\nVenue Location: "+response.data[i].venue.city+" "+response.data[i].venue.region+"\nDate: "+moment(response.data[i].datetime).format("MM/DD/YYYY")+"\n";
                        console.log(concertData);
                        fs.appendFile("log.txt", concertData, function(err) {
                            if (err) {
                              console.log(err);
                            } else {
                              console.log("\nlog.txt was updated!");
                            }
                          });
                    }
                }
            })
        .catch(function (error) {
            console.log("Error! Please try again!");
        });
}

function checkSpotify() {
    console.log("The song you picked was: " + userQuery + "\n");
    spotify
        .search({ type: 'track', query: userQuery.replace(" ", "+"), limit: 2})
        .then(function (response) {
            if (response.tracks.items.length === 0) {
                console.log(`No results found for your search of ${userQuery}`);
            } else {
                for (let j = 0; j < response.tracks.items.length; j++) {
                    var spotifyData = "Artist: "+response.tracks.items[j].album.artists[0].name+ "\nSong's name: "+response.tracks.items[j].name+"\nAlbum name: "+response.tracks.items[j].album.name+"\nPreview Link: "+response.tracks.items[j].album.artists[0].external_urls.spotify+"\n";
                    console.log(spotifyData);
                    fs.appendFile("log.txt", spotifyData, function(err) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log("\nlog.txt was updated!");
                        }
                      });
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function checkOmbd() {
    console.log("The movie you picked was: " + userQuery + "\n");
    axios.get("http://www.omdbapi.com/?t=" + userQuery.toLowerCase().replace(" ", "+") + "&y=&plot=short&apikey=trilogy")
        .then(
            function (response) {
                if (! response.data.Title) {
                    console.log("No results found for your search of " +userQuery);

                } else {
                    var movieData = "\nMovie title: "+response.data.Title + "\nYear: "+response.data.Year + "\nIMDB Rating: "+response.data.imdbRating+ "\nRotten Tomatoes Rating: "+response.data.Ratings[1].Value+ "\nCountry of production: "+response.data.Country+"\nLanguage: "+response.data.Language+"\nPlot: "+response.data.Plot+"\nActors: "+response.data.Actors;
                    console.log(movieData);
                    fs.appendFile("log.txt", movieData, function(err) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log("\nlog.txt was updated!");
                        }
                      });
                }
            })
        .catch(function (error) {
            console.log("Error! Please try again!");
        });
}