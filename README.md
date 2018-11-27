# liri-node-app

LIRI is a Node.js application that takes in a command along with a search phrase and returns information based on the command entered. The commands it recognizes are: • concert-this • spotify-this-song •  movie-this • do-what-it-says

Command Format: 'command' 'search phrase'


## concert-this 'band name'

This takes the band name entered and runs it through the bands in town API and returns concert information for that particular band. The following is logged in the terminal:
- Name of Venue
- Venue Location 
- Date of the Concert

![alt text](images/concert-this.gif "Santana Concert Search")

## spotify-this-song 'song title'

This takes the song title entered and runs it through the spotify API. The following is logged to the terminal:
- Artist
- Song Title
- Spotify Preview Link
- Album


## movie-this 'movie title'

This takes the movie title entered and runs it through the OMDB API and returns:
- Movie Title
- Year Released
- IMDB Rating
- Rotten Tomatoes Rating
- Countries Where Movie was Produced
- Language
- Plot
- Actor