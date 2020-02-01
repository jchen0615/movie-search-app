import React, { Component } from 'react';
import './Movie.css';
import {Link} from 'react-router-dom';

const posterString = "http://image.tmdb.org/t/p/w342";
class Movie extends Component{

    render(){
        return(
            <div className = "movie">
                <Link to = {{
                    pathname: "/Detail/"+this.props.movieID,
                    state:{
                        id: this.props.movieID,
                        title: this.props.movieTitle,
                        poster: this.props.moviePoster,
                        date: this.props.date,
                        voteAverage: this.props.voteAverage
                    }
                }}><img className = "movie-cover" src = {posterString + this.props.moviePoster} alt = {this.props.movieTitle}/></Link>
                <p className = "title">{this.props.movieTitle} | {this.props.date}</p>
             </div>
        )
    }
}

export default Movie;