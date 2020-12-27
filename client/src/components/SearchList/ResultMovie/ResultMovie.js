import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './ResultMovie.css'

class ResultMovie extends Component{
    render(){
        return(
            <Link to = {{
                pathname: "/Detail/"+this.props.movieID,
                state:{
                    id: this.props.movieID,
                    title: this.props.movieTitle,
                    poster: this.props.moviePoster,
                    date: this.props.date,
                    voteAverage: this.props.voteAverage
                }
            }}><div className = "result-movie">
               <img data-testid = "search-movie-cover" className = "search-movie-cover" src = {this.props.moviePoster? this.props.moviePoster : require("../../../images/noImage.png")}
                alt = {this.props.movieTitle}/>
                <div className = "search-info" data-testid = "search-info">
                    <div className = "search-title" data-testid = "search-title">{this.props.movieTitle} | Released: {this.props.date}</div>
                    <div className = "search-overview" data-testid = "search-overview"> ---"{this.props.overview ? this.props.overview : "No Overview Available..."}"</div>
                </div>
            </div></Link>
        )
    }
}

export default ResultMovie