import React, {Component} from 'react';
import Movie from './Movie/Movie';
import './MovieList.css'

//Component that holds list of 'movie' components
class MovieList extends Component {
    
    render(){
        return(
            <div className = "movie-list" data-testid= "movie-list">
                {this.props.movies.length>0? this.props.movies.map(movie =>(
                    <Movie key={movie.id} movieID={movie.id} movieTitle={movie.title} moviePoster={movie.poster} 
                    date={movie.date} voteAverage = {movie.voteAverage}/>
                )):<p className = "no-movies" data-testid = "no-movies">Sorry, no movies available at the moment...</p>}
            </div>
        )
    }
}

export default MovieList;