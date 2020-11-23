import React, { Component } from 'react';
import './MovieGrid.css';
import MovieList from '../../MovieList/MovieList'

//Grid component that holds 'movieList'
class MovieGrid extends Component {

    render(){
        return(
            <div className = "movie-grid" data-testid = "movie-grid">
                <div className = "header-grid" data-testid = "header-grid">
                    <div className = "grid-header" data-testid = "grid-header">{this.props.movieType}</div>
                </div>
                <div className = 'grid-list' data-testid = "grid-list">
                    <MovieList movies = {this.props.movies} key="movie-list" go/>
                </div>
            </div>
        )
    }

}

export default MovieGrid;