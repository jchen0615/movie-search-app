import React, {Component} from 'react';
import Movie from './Movie/Movie';
import './MovieList.css'

class MovieList extends Component {
    
    render(){
        //const list = this.props.movies;
        return(
            <div className = "movie-list">
                {this.props.movies.length>0? this.props.movies.map(movie =>(
                    <Movie key={movie.id} movieID={movie.id} movieTitle={movie.title} moviePoster={movie.poster} 
                    date={movie.date} voteAverage = {movie.voteAverage}/>
                )):<p className = "no-movies">Sorry, no movies available at the moment...</p>}
            </div>
        )
    }
}

export default MovieList;