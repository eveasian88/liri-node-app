require("dotenv").config();
// fs is a core node package for reading and writing files
var fs = require("fs");
// authenticate from keys.js
var keys = require("./keys")
// request npm package
var request = require("request");
// node-spotify-api
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// global variables
var actions = {
    CONCERT_THIS: "concert-this",
    SPOTIFY_THIS_SONG: "spotify-this-song",
    MOVIE_THIS: "movie-this",
    DO_WHAT_IT_SAYS: "do-what-it-says",
}
// step 1 liri processes the command and calls the appropriate functions
var command = process.argv[2];
var parameter = process.argv[3];

// step 2 process function
switch (command) {
    // 2a concert-this takes artist name and request data from API and gives output
    case actions.CONCERT_THIS:
        // console.log("concert.function");
        concertThis(parameter);
        break;
    // 2b spotify-this-song takes song name and request data from API and gives output
    case actions.SPOTIFY_THIS_SONG:
        // console.log("spotify.function");
        spotifyThis(parameter);
        break;
    // 2c movie-this takes movie name and request data from API and gives output
    case actions.MOVIE_THIS:
        // console.log("music.function");
        movieThis(parameter);
        break;
    // 2d do-what-it-says reads information from text file and request data from somewhere and gives output
    case actions.DO_WHAT_IT_SAYS:
        // console.log("doWhatItSays.function");
        doWhatItSays();
        break;
    // default when user doesn't fill in all necessary information
    default:
        console.log("invalid input");
}

function concertThis(parameter) {
    console.log("concert.function");

    var artistName;

    if (parameter === undefined) {
        artistName = "Santana";
        // for (var i = 3; i < process.argv.length; i++) {
        //     artistName += process.argv[i];
        // }
    } else {
        artistName = parameter;
    }

    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=59ad9fc94dabf7477b668c0986587211";


    request(queryUrl, function (error, response, body) {

        if (error) {
            console.error(error)
        }

        var rawEvents = JSON.parse(body);

        var eventsData = rawEvents.map(function (event) {
            return {
                venue: event.venue.name,
                location: `${event.venue.city}, ${event.venue.region}`,
                date: event.datetime,
            }
        } );

        // var testEvent = {};
        // testEvent.venue = JS[0].venue.name;
        // testEvent.location = `${JS[0].venue.city}, ${JS[0].venue.region}`;
        // testEvent.date = JS[0].datetime;

        console.log(eventsData)


        if (!error && response.statusCode === 200) {

            for (i = 0; i < eventsData.length; i++) {

                logIt("===============================");
                logIt("Date: " + eventsData[i].date);
                logIt("Name: " + eventsData[i].venue);
                logIt("City: " + eventsData[i].location);
                logIt("===============================");
            }
        }
    })
}


function spotifyThis(parameter) {
    // console.log(spotify.function);
    var searchTrack;
    // if no song is provided then your program will default to "Hips Don't Lie".
    if (parameter === undefined) {
        searchTrack = "Hips Don't Lie";
    } else {
        searchTrack = parameter;
    }

    spotify.search({ type: 'track', query: searchTrack }, function (error, data) {
        if (error) {
            return console.error(error);
        }

        var result = data.tracks.items[0]

        var songData = {};
        songData.name = data.tracks.items[0].name;
        songData.artists = result.artists.map(function (artist) {
            return artist.name
        } );
        songData.album = result.album.name;
        songData.previewUrl = result.preview_url;

        logIt("===============================");
        logIt("Name: " + songData.name);
        logIt("Artists: " + songData.artists[0]);
        logIt("Album: " + songData.album);
        logIt("Preview: " + songData.previewUrl);
        logIt("===============================");
    });


    // spotify.search({
    //     type: "track",
    //     query: searchTrack
    // }, function (error, data) {
    //     if (error) {
    //         console.log("Error occurred: " + error);
    //         return;
    //     } else {
    //         logIt("===============================");
    //         logIt(data);
    //         logIt("Date: " + dateForm);
    //         logIt("Name: " + JS[i].venue.name);
    //         logIt("City: " + JS[i].venue.city);
    //         if (JS[i].venue.region !== "") {
    //             console.log("Country: " + JS[i].venue.region);
    //         }
    //         logIt("Country: " + JS[i].venue.country);
    //         logIt("===============================");
    //     }
    // });
};


function movieThis(parameter) {
    // console.log("movie.function");
   
    var findMovie;
    if (parameter === undefined) {
        findMovie = "Mr. & Mrs. Smith";
    } else {
        findMovie = parameter;
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        var bodyOf = JSON.parse(body);
        if (!error && response.statusCode === 200) {
            logIt("===============================");
            logIt("Title: " + bodyOf.Title);
            logIt("Release Year: " + bodyOf.Year);
            logIt("IMDB Rating: " + bodyOf.imdbRating);
            logIt("Rotten Tomatoes Rating: " + bodyOf.Ratings[1].Value);
            logIt("Country: " + bodyOf.Country);
            logIt("Language: " + bodyOf.Language);
            logIt("Plot: " + bodyOf.Plot);
            logIt("Actors: " + bodyOf.Actors);
            logIt("===============================");
        }
    });
}

function doWhatItSays() {
    // console.log("doWhatItSays.function");
    fs.readFile('random.txt', "utf8", function (error, data) {

        if (error) {
            return logIt(error);
        }

        var dataArr = data.split(",");

        if (dataArr[0] === "spotify-this-song") {
            var songcheck = dataArr[1].trim().slice(1, -1);
            spotifyThis(songcheck);
        }
        else if (dataArr[0] === "concert-this") {
            if (dataArr[1].charAt(1) === "'") {
                var dLength = dataArr[1].length - 1;
                var data = dataArr[1].substring(2, dLength);
                console.log(data);
                concertThis(data);
            }
            else {
                var bandName = dataArr[1].trim();
                console.log(bandName);
                concertThis(bandName);
            }
        }
        else if (dataArr[0] === "movie-this") {
            var movieName = dataArr[1].trim().slice(1, -1);
            movieThis(movieName);
        }
    });

};

function logIt(dataToLog) {

    console.log(dataToLog);

    fs.appendFile('log.txt', dataToLog + '\n', function (error) {

        if (error) return logIt('Error logging data to file: ' + error);
    });
}
    
