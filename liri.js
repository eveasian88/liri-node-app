require("dotenv").config();
var fs = require("fs");
var keys = require("./keys")
var request = require("request");

var actions = {
    CONCERT_THIS: "concert-this",
    SPOTIFY_THIS_SONG: "spotify-this-song",
    MOVIE_THIS: "movie-this",
    DO_WHAT_IT_SAYS: "do-what-it-says",
}
// step 1 liri needs to process the command and call the appropriate functions
var command = process.argv[2];
var parameter = process.argv[3];

// step 2 process function
switch (command) {
    // 2a concert-this needs to take artist name and request data from API and give output
    case actions.CONCERT_THIS:
        // console.log("concert.function");
        concertThis();
        break;
    // 2b spotify-this-song needs to take song name and request data from API and give output
    case actions.SPOTIFY_THIS_SONG:
        // console.log("spotify.function");
        spotifyThis();
        break;
    // 2c movie-this needs to take movie name and request data from API and give output
    case actions.MOVIE_THIS:
        // console.log("music.function");
        movieThis();
        break;
    // 2d do-what-it-says needs to read information from text file and request data from somewhere and give output - command in text file
    case actions.DO_WHAT_IT_SAYS:
        // console.log("doWhatItSays.function");
        doWhatItSays();
        break;
    // default when user doesn't fill in all necessary information
    default:
        console.log("invalid input");
}

function concertThis(parameter) {
    // console.log("concert.function");
    if (action === "concert-this") {
        var artistName = "";
        for (var i = 3; i < process.argv.length; i++) {
            artistName += process.argv[i];
        }
        console.log(artistName);
    } else {
        artistName = parameter;
    }
}

var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";


request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {

        var JS = JSON.parse(body);
        for (i = 0; i < JS.length; i++) {
            var dTime = JS[i].datetime;
            var month = dTime.substring(5, 7);
            var year = dTime.substring(0, 4);
            var day = dTime.substring(8, 10);
            var dateForm = month + "/" + day + "/" + year

            logIt("\n-------------------------\n");
            logIt("Date: " + dateForm);
            logIt("Name: " + JS[i].venue.name);
            logIt("City: " + JS[i].venue.city);
            if (JS[i].venue.region !== "") {
                logIt("Country: " + JS[i].venue.region);
            }
            logIt("Country: " + JS[i].venue.country);
            logIt("\n-------------------------\n");
        }
    }
});


function spotifyThis(parameter) {
    // console.log(spotify.function);
    var searchTrack;
    // if no song is provided then your program will default to "The Sign" by Ace of Base.
    if (parameter === undefined) {
        searchTrack = '"The Sign" by Ace of Base"';
    } else {
        searchTrack = parameter;
    }

    spotify.search({
        type: "track",
        query: searchTrack
    }, function (error, data) {
        if (error) {
            logIt("Error occurred: " + error);
            return;
        } else {
            logIt("\n-------------------------\n");
            logIt("Date: " + dateForm);
            logIt("Name: " + JS[i].venue.name);
            logIt("City: " + JS[i].venue.city);
            if (JS[i].venue.region !== "") {
            logIt("Country: " + JS[i].venue.region);
            }
            logIt("Country: " + JS[i].venue.country);
            logIt("\n-------------------------\n");
        }
    });
};


function movieThis() {
    console.log("movie.function");

}
function doWhatItSays() {
    console.log("doWhatItSays.function");
}



// * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

// * Name of the venue

// * Venue location

// * Date of the Event (use moment to format this as "MM/DD/YYYY")

// 2. `node liri.js spotify-this-song '<song name here>'`

// * This will show the following information about the song in your terminal/bash window

// * Artist(s)

// * The song's name

// * A preview link of the song from Spotify

// * The album that the song is from



