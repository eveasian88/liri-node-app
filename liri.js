require("dotenv").config();
var keys = require("./keys")

var actions = {
    CONCERT_THIS: "concert-this",
    SPOTIFY_THIS_SONG: "spotify-this-song",
    MOVIE_THIS: "movie-this",
    DO_WHAT_IT_SAYS: "do-what-it-says",
}

var command = process.argv[2]

switch (command){
    case actions.CONCERT_THIS: 
        // console.log("concert.function");
        concertThis();
        break;
    case actions.SPOTIFY_THIS_SONG:
        // console.log("spotify.function");
        spotifyThis();
        break;
    case actions.MOVIE_THIS:
        // console.log("music.function");
        movieThis();
        break;
    case actions.DO_WHAT_IT_SAYS:
        // console.log("doWhatItSays.function");
        doWhatItSays();
        break;
    default:
        console.log("invalid input");
}

function concertThis(){
    console.log("concert.function");
}
function spotifyThis(){
    console.log(spotify.function);
}
function movieThis(){
    console.log(movie.function);
}
function doWhatItSays(){
    console.log(doWhatItSays.function);
}



// step 1 liri needs to process the command and call the appropriate functions

// step 2 process function

// 2a concert-this needs to take artist name and request data from API and give output
// 2b spotify-this-song needs to take song name and request data from API and give output
// 2c movie-this needs to take movie name and request data from API and give output
// 2d do-what-it-says needs to read information from text file and request data from somewhere and give output - command in text file



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

// * If no song is provided then your program will default to "The Sign" by Ace of Base.

// * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

// * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:
