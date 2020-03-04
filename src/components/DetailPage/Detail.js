import React, { Component } from 'react';
import NavigationBar from '../UI/NavigationBar/Navigation';
import axios from 'axios';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import Reviews from './Reviews/Reviews';
import Spinner from '../UI/Spinner/Spinner'
import MovieGrid from '../Grids/MovieGrid'
import BackBtn from '../UI/BackBtn/BackBtn'
import Error from '../ErrorPage/Error'
import './Detail.css';
const key = require('../../GlobalKey');

class Detail extends Component{
    state= {
        initialRender: false,
        similarMovies: null,
        overview: null,
        genre: null,
        tagline: null,
        hours: null,
        minutes: null,
        video: null,
        error: false
    }

    getData = () =>{
        axios.all([
            axios.get("/movie/"+this.props.location.state.id+key.apiKey+"&append_to_response=videos"),
            axios.get("/movie/"+this.props.location.state.id+"/similar"+key.apiKey)
        ]).then(responseArr =>{
            const detail = responseArr[0].data
            const movieList = responseArr[1].data.results.slice(0,4).map(movie =>{
                return{
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster_path,
                    date: movie.release_date,
                    voteAverage: movie.vote_count>0? movie.vote_average:"No rating available"
                }
            })
            
            this.setState({
                overview: detail.overview? detail.overview : "No overview available",
                genre: detail.genres.length>0? detail.genres[0].name:"No information available",
                tagline: detail.tagline? detail.tagline:"",
                hours: detail.runtime>0? Math.floor(parseInt(detail.runtime, 10)/60): null,
                minutes: detail.runtime>0? Math.floor(parseInt(detail.runtime, 10)%60): null,
                video: detail.videos.results.find(element => element.type==="Trailer")? detail.videos.results.find(element => element.type==="Trailer").key:null,
                generalInfoLoaded: true,
                similarMovies: movieList
            })
   
            window.scrollTo(0, 0)
        }).catch(error=>{
            this.setState({
                error: true
            })
        })
    }

    componentDidMount(){      
        this.getData()
    }

    componentDidUpdate(prevProps){
        if(this.props.location.state.id!==prevProps.location.state.id){
           this.getData()
        }
    }

    render(){

        if(this.state.error){
            return <Error/>
        }

        if(!this.state.similarMovies || !this.state.generalInfoLoaded){
            return <Spinner/>
        }

        return(
            <div className = "Detail">
                <NavigationBar/>
                <BackBtn goBack={this.props.history.goBack}/>
                <GeneralInfo id = {this.props.location.state.id} title = {this.props.location.state.title} date = {this.props.location.state.date} 
                    vote = {this.props.location.state.voteAverage} poster={this.props.location.state.poster} overview = {this.state.overview} genre = {this.state.genre}
                    tagline = {this.state.tagline} hours = {this.state.hours} minutes = {this.state.minutes} video = {this.state.video}/>
                <Reviews id = {this.props.location.state.id} list = {this.state.review_list}/>
                <MovieGrid id = {this.props.location.state.id} movieType = "Similar" movies = {this.state.similarMovies}/>
            </div>
        )
    }
}

export default Detail