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
                }}><img className = "movie-cover" src = {this.props.moviePoster? posterString + this.props.moviePoster : require("../../../images/noImage.png")} 
                alt = {this.props.movieTitle}/></Link>
                <div className = "movie-info">
                    <div className = "title">{this.props.movieTitle}</div>
                    <div className = "released-date">Released date: {this.props.date}</div>
                </div>
             </div>
        )
    }
}

export default Movie;