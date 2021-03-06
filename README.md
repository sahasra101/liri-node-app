# liri-node-app
Node JS app with command line functionality to retrieve data from Spotify, Band In Town and IMDB.

## What the liri-node-app does:
* allows the user to use Gitbash or Terminal to search the OMBD for movie information
* allows the user to use Gitbash or Terminal to search the Spotify directory of music for information about a song
* allows the user to use Gitbash or Terminal to search the Band In Town website for information about concerts

## Overview of the organization of the app and how to use it
* the coding is written in a way that the commands are written after the js file name followed by the user query.
* for example: if the user wants to search Spotify for a track, the user would use the command spotify-this-song.
* similarly if the user wants to search for movie rated info, the user would type movie-this followed by the movie name.
* if the user wanted to search for live music performances by a band, the user would type concert-this followed by the band name.

## link to the Github repository - this app is a nodeJS app which can be run on a command line interface like Gitbash
* https://github.com/sahasra101/liri-node-app

## screenshots, gifs or videos of the app functioning

Capturing user variables: command and query
![Capturing user variables: command and query](assets/images/codeCapturesCommandandQuery.png)

Switch function for different commands with defaults for spotify-this-song and movie-this
![Switch function for different commands](assets/images/switchFunction.png)

Spotify results for the song "With or Without You" by U2
![Spotify the song "With or Without You"](assets/images/spotifyWithorWithoutYouU2.png)

Movie-this results for the movie "Avengers: Endgame"
![Movie-this the movie "Avengers: Endgame"](assets/images/movie-thisAvengersEndgame.png)

Concert-this results for the band "U2"
![Concert-this the band U2"](assets/images/concert-thisU2.png)

## Technologies used in this app:
* javascript
* nodeJS
* npm packages
* api calls to OMDB, Spotify and BandInTown

## Javascript and nodeJS coding by Ajay Kiri with assistance from software teaching activities from the UPenn/Trilogy NodeJS Bootcamp lessons and various google searches. 