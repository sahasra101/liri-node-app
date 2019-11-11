require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");


var userCommand = process.argv[2];
// confirm that index 2 is the command
console.log(userCommand);
var userQuery = process.argv[3]; // splice after index 2
var userQuery = [];
for (i = 3; i < process.argv.length; i++) {
    userQuery.push(process.argv[i]);
}
userQuery = uQuery.join(" ");
// confirm that index 3 and after are userQuery
console.log(userQuery);

function runCommand() {

    // if (userCommand == "concert-this") {
    //     function askBandsInTown();
    // }

    if (userCommand == "spotify-this-song") {
        spotify.search({ type: 'track', query: 'All the Small Things'}, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(data);
        });
    // }

    // if (userCommand == "movie-this") {
    //     function omdb();
    // }

    // if (userCommand == "do-what-it-says") {

    // }
}
runCommand();

// otherwise display please try again with