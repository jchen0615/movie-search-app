import React, { Component } from 'react';
import './MovieGrid.css';
import MovieList from '../MovieList/MovieList'

//Grid component that holds 'movieList'
class MovieGrid extends Component {

    render(){
        return(
            <div className = "grid">
                <div className = "header-grid">
                    <div className = "grid-header">{this.props.movieType}</div>
                </div>
                <div className = 'grid-list'>
                    <MovieList movies = {this.props.movies} key="movie-list" go/>
                </div>
            </div>
        )
    }

}

export default MovieGrid;