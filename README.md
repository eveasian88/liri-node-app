# liri-node-app

LIRI is a Node.js application that takes in a command along with a search phrase and returns information based on the command entered. The commands it recognizes are: 
- concert-this
- spotify-this-song 
- movie-this 
- do-what-it-says

Command Format: 'command' 'search phrase'


## concert-this 'band name'

This takes the band name entered and runs it through the bands in town API and returns concert information for that particular band. The following is logged in the terminal:
- Date of the Concert
- Venue Name
- Venue Location 

![alt text](images/concert-this.gif "Santana Concert Search")

## spotify-this-song 'song title'

This takes the song title entered and runs it through the spotify API. The following is logged to the terminal:
- Artist
- Song Title
- Album
- Spotify Preview Link

![alt text](images/spotify-this-song.gif "Spotify Song Search")

## movie-this 'movie title'

This takes the movie title entered and runs it through the OMDB API and returns the following:
- Movie Title
- Year Released
- IMDB Rating
- Rotten Tomatoes Rating
- Countries Where Movie was Produced
- Language
- Plot
- Actors

![alt text](images/movie-this.gif "Movie Search")

## do-what-it-says 'random text'

This takes the information in the random.txt file and returns the following:
- Name: I Want It That Way
- Artists: Backstreet Boys
- Album: The Hits--Chapter One
- Preview: https://p.scdn.co/mp3-preview/e72a05dc3f69c891e3390c3ceaa77fad02f6b5f6?cid=448e50065993424181d21715b160242b

![alt text](images/do-what-it-says.gif "Random Text Search")