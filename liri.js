require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var userCommand = process.argv[2];
// confirm that index 2 is the command
console.log("Your command is " + userCommand );
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
                console.log(data);
                var dataArr = data.split(",");
                console.log(dataArr[0]);
                console.log(dataArr[1]);
                }
                if (dataArr[0] == "spotify-this-song"){
                    userQuery = dataArr[1];
                    checkSpotify(userQuery);
                } else if (dataArr[0] == "movie-this"){
                    userQuery = dataArr[1];
                    checkOmbd(userQuery);
                } else if (dataArr[0] == "concert-this"){
                    userQuery = dataArr[1];
                    checkBandsApi(userQuery);
                } 
            });
        break;
    default:
        console.log("Please select a valid command:\nconcert-this\nspotify-this-song\nmovie-this\ndo-what-it-says");
}

function checkBandsApi() {
    console.log("\nThe artist you picked was " + userQuery + "\n");
    axios.get("https://rest.bandsintown.com/artists/" + userQuery.toLowerCase().replace(" ", "+") + "/events?app_id=codingbootcamp")
        .then(
            function (response) {
                if (response.data.length === 0) {
                    console.log(`${userQuery} has no concerts found in the near future.`);
                } else {
                    for (let i = 0; i < response.data.length; i++) {
                        console.log(`Venue Name: ${response.data[i].venue.name}`);
                        console.log(`Venue Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}`);
                        console.log(`Date: ${moment(response.data[i].datetime).format("MM/DD/YYYY")}`);
                        console.log("\n");
                    }
                }
            })
        .catch(function (error) {
            console.log("Error! Please try again!");
        });
}

function checkSpotify() {
    console.log("\nThe song you picked was " + userQuery + "\n");
    spotify
        .search({ type: 'track', query: userQuery.toLowerCase().replace(" ", "+"), limit: 5})
        .then(function (response) {
            if (response.tracks.items.length === 0) {
                console.log(`No results found for your search of ${userQuery}`);
            } else {
                for (let j = 0; j < response.tracks.items.length; j++) {
                    console.log(`Artist: ${response.tracks.items[j].album.artists[0].name}`);
                    console.log(`Song's name: ${response.tracks.items[j].name}`);
                    console.log(`Album name: ${response.tracks.items[j].album.name}`);
                    console.log(`Preview Link: ${response.tracks.items[j].album.artists[0].external_urls.spotify}`);
                    console.log("\n");
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function checkOmbd() {
    console.log("\nThe movie you picked was " + userQuery + "\n");
    axios.get("http://www.omdbapi.com/?t=" + userQuery.toLowerCase().replace(" ", "+") + "&y=&plot=short&apikey=trilogy")
        .then(
            function (response) {
                if (!response.data.Title) {
                    console.log(`No results found for your search of ${userQuery}`);
                } else {
                    console.log(`\nTitle: ${response.data.Title}`);
                    console.log(`Year: ${response.data.Year}`);
                    console.log(`IMDB Rating: ${response.data.imdbRating}`);
                    console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
                    console.log(`Country of production: ${response.data.Country}`);
                    console.log(`Language: ${response.data.Language}`);
                    console.log(`Plot: ${response.data.Plot}`);
                    console.log(`Actors: ${response.data.Actors}`);
                }
            })
        .catch(function (error) {
            console.log("Error! Please try again!");
        });
}