import React, { Component } from 'react';
import './MovieGrid.css';
import MovieList from '../MovieList/MovieList'

//Grid component that holds 'movieList'
class MovieGrid extends Component {

    render(){
        return(
            <div className = "grid">
             <div className = "grid-header">{this.props.movieType}</div>
                <MovieList movies = {this.props.movies} key="movie-list" go/>
            </div>
        )
    }

}

export default MovieGrid;