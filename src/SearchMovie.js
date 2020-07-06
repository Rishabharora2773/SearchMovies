import React, {useState} from "react";
import MovieCard from './MovieCard';

function SearchMovie() {
    // state for tracking user input, and one for saving the movie results
    
    const [movie, setMovie] = useState("");
    const [movieResults, setMovieResults] = useState([]);
    
    const handleChange = (event) => {
        setMovie(event.target.value);
    }
         
    const searchMovie = (event) => {
        event.preventDefault();
        const query = movie;
        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=0fdd91f69e14887c453d13733a90b937&language=en-US&query=${query}&page=1`;
        
        try {
            fetch(url)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setMovieResults(data.results);
            });
        } catch(err) {
            console.log(err);
        }
    }
    
    const movies = movieResults.filter(movie => movie.poster_path).map(movie => <MovieCard movie={movie} key={movie.id} />);
       
    return (
        <div>
            <form className="form" onSubmit={searchMovie}>
                <label className="label" htmlFor="query"> Movie Name </label>
                
                <input type="text"
                    className="input"
                    name="query"
                    value={movie}
                    onChange={handleChange}
                    placeholder="Search a Movie..."/>
                
                <button className="button" type="submit"> Search </button>
            </form>
            
            {movies.length ? <p> Found {movies.length} Results </p> : null}
            
            <div className="card-list">
                {movies}
            </div>
        </div>
    );    
}

export default SearchMovie;

//to create the SearchMovies component
//form with a class of form
//label with htmlFor="query" and a class of Label
//input of type text with a name of "query" and a placeholder
//button class of button and a type of submit
