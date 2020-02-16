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
                overview: response.data.overview? response.data.overview : "No overview available",
                genre: response.data.genres.length>0? response.data.genres[0].name:"No information available",
                tagline: response.data.tagline? response.data.tagline:"",
                hours: response.data.runtime>0? Math.floor(parseInt(response.data.runtime, 10)/60): null,
                minutes: response.data.runtime>0? Math.floor(parseInt(response.data.runtime, 10)%60): null,
                video: response.data.videos.results.find(element => element.type==="Trailer")? response.data.videos.results.find(element => element.type==="Trailer").key:null,
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

        console.log(this.state.video);
        let video = <div className = "no_video">No trailer available</div>
        if(this.state.video){
            video = <iframe className = "video" title = "trailer" src={youtubeString+this.state.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        }        

        return(
            <div>
                <div className = 'overview-grid'>
                    <img className = "detail-cover" src = {posterString + this.props.poster} alt = {this.props.title}/>
                    <div className = 'detail-title'>{this.props.title}</div>
                    <div className = 'detail-overview'>{this.state.overview}</div>
                    <div className = 'tagline'>{this.state.tagline}</div>
                </div>
                <div className = 'general-info'>
                    <ul className = 'info'>
                        <li>Duration:&nbsp;{this.state.hours?this.state.hours+" H "+this.state.minutes+" MIN":"No Information Available"}</li>
                        <li>Released: &nbsp; {this.props.date}</li>
                        <li>Genre: &nbsp; {this.state.genre}</li>
                        <li>Vote Rating Average: &nbsp;{this.props.vote}</li>
                    </ul>
                    {video}
                </div>
            </div>
        )
    }
}

export default GeneralInfo