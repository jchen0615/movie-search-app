import React, { Component } from 'react';
import './Movie.css';
import {Link} from 'react-router-dom';

//Component that renders movie's title, poster and released date.
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
                }}><img className = "movie-cover" data-testid = "movie-cover" src = {this.props.moviePoster? this.props.moviePoster : require("../../../images/noImage.png")} 
                alt = {this.props.movieTitle}/></Link>
                <div className = "movie-info">
                    <div className = "title" data-testid="title">{this.props.movieTitle.length < 40? this.props.movieTitle: this.props.movieTitle.slice(0,40)+"..."}</div>
                    <div className = "released-date" data-testid = "released-date">Released date: {this.props.date}</div>
                </div>
             </div>
        )
    }
}

export default Movie;