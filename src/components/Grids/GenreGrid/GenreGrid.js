import React, { Component } from 'react';
import './GenreGrid.css';
import MovieList from '../../MovieList/MovieList'


class GenreGrid extends Component {

    render(){
        return(
            <div className = "genre-grid">
             <div className = "grid-header">{this.props.movieType+" Movies >"}</div>
                <MovieList movies = {this.props.movies} key="movie-list"/>
            </div>
        )
    }

}

export default GenreGrid;