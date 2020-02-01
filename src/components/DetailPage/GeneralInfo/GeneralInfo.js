import React, { Component } from 'react';
import './GeneralInfo.css';
import axios from '../../../axios'
import Spinner from '../../UI/Spinner/Spinner'
const posterString = "http://image.tmdb.org/t/p/w342";
const youtubeString = "https://www.youtube.com/embed/";
const apiKey = "?api_key=0d727a18472e40764f879642668f20f9";

class GeneralInfo extends Component{
   
    state = {
        hours: null,
        minutes: null,
        overview: null,
        genre: null,
        tagline: null,
        video: null,
        generalInfoLoaded: false,
    }

    getMovieDetail(){
        axios.get("/movie/"+this.props.id+apiKey+"&append_to_response=videos")
        .then( response =>{
            console.log(response);
            this.setState({
                overview: response.data.overview,
                genre: response.data.genres[0].name,
                tagline: response.data.tagline,
                hours: Math.floor(parseInt(response.data.runtime, 10)/60),
                minutes: Math.floor(parseInt(response.data.runtime, 10)%60),
                video: response.data.videos.results[0].key,
                generalInfoLoaded: true,
            })
        })
    }

    componentDidMount(){
        this.getMovieDetail()
    }
   
    componentDidUpdate(prevProps){
        if(this.props.id!==prevProps.id)
            this.getMovieDetail()
    }

    render(){

        if(!this.state.generalInfoLoaded){
            return(
                <Spinner/>
            )
        }

        return(
            <div>
                <div className = 'overview-grid'>
                    <img className = "detail-cover" src = {posterString + this.props.poster} alt = {this.props.title}/>
                    <div className = 'detail-title'>{this.props.title}</div>
                    <div className = 'detail-overview'>{this.state.overview}</div>
                    <div className = 'tagline'>"{this.state.tagline}"</div>
                </div>
                <div className = 'general-info'>
                    <ul className = 'info'>
                        <li>Duration: &nbsp; {this.state.hours} H {this.state.minutes} MIN</li>
                        <li>Released: &nbsp; {this.props.date}</li>
                        <li>Genre: &nbsp; {this.state.genre}</li>
                        <li>Vote Rating Average: &nbsp; {this.props.vote}</li>
                    </ul>
                    <iframe className = "video" title = "trailer" src={youtubeString+this.state.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
            </div>
        )
    }
}

export default GeneralInfo