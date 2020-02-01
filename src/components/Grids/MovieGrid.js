import React, { Component } from 'react';
import './MovieGrid.css';
import MovieList from '../MovieList/MovieList'


class MovieGrid extends Component {

    render(){
        return(
            <div className = "grid">
             <div className = "grid-header">{this.props.movieType+" Movies >"}</div>
                <MovieList movies = {this.props.movies} key="movie-list"/>
            </div>
        )
    }

}

export default MovieGrid;