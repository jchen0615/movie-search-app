import React, { Component } from 'react';
import NavigationBar from '../NavigationBar/Navigation';
import axios from '../../axios';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import Reviews from './Reviews/Reviews';
import Spinner from '../UI/Spinner/Spinner'
import MovieGrid from '../Grids/MovieGrid'
import BackBtn from '../UI/BackBtn/BackBtn'
import './Detail.css';

const apiKey = "?api_key=0d727a18472e40764f879642668f20f9";

class Detail extends Component{
    state= {
        initialRender: false,
        similarMovies: null
    }

    getSimilarMovies(){
        axios.get("/movie/"+this.props.location.state.id+"/similar"+apiKey)
        .then( response =>{
            const movieList = response.data.results.slice(0,4).map(movie =>{
                return{
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster_path,
                    date: movie.release_date,
                    voteAverage: movie.vote_count>0? movie.vote_average:"No rating available"
                }
            })
   
            this.setState({
                similarMovies: movieList
            })
            window.scrollTo(0, 0)
         })
    }

    componentDidMount(){      
        this.getSimilarMovies()
    }

    componentDidUpdate(prevProps){
        if(this.props.location.state.id!==prevProps.location.state.id)
            this.getSimilarMovies()
    }

    render(){
      
        if(!this.state.similarMovies){
            return(
                <Spinner/>
            )
        }
        console.log(this.props);
        return(
            <div className = "Detail">
                <NavigationBar/>
                <BackBtn goBack={this.props.history.goBack}/>
                <GeneralInfo id = {this.props.location.state.id} title = {this.props.location.state.title} date = {this.props.location.state.date} 
                    vote = {this.props.location.state.voteAverage} poster={this.props.location.state.poster}/>
                <Reviews id = {this.props.location.state.id} list = {this.state.review_list}/>
                <MovieGrid id = {this.props.location.state.id} movieType = "Similar" movies = {this.state.similarMovies}/>
            </div>
        )
    }
}

export default Detail