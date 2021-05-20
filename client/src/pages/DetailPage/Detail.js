import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar/Navigation';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import Reviews from './Reviews/Reviews';
import Spinner from '../../components/UI/Spinner/Spinner';
import BackBtn from '../../components/UI/BackBtn/BackBtn';
import Error from '../ErrorPage/Error';
import CarouselHorizontal from '../../components/Carousel/CarouselHorizontal';
import './Detail.css';
import axios from 'axios';

//Component that contains detail information for selected movie
class Detail extends Component{
    state= {
        similarMovies: [],
        title: null,
        overview: null,
        genre: null,
        tagline: null,
        hours: null,
        minutes: null,
        video: null,
        reviews: null,
        errorMsg: null,
        voteAverage: null,
        releaseDate: null,
        poster: null,
        loading:true
    }

    //Gets detail information for selected movie
    getDetail = () =>{
        axios.get("/api/detail", {params: {id:this.props.match.params.id}}).then(response =>{
            let newState = {...response.data.detail, loading: false, similarMovies: response.data.movieList, reviews: response.data.reviews,}
            this.setState(newState)
        }).catch((error)=>{
            this.setState({
                errorMsg: error.response.data? error.response.data.errorMsg: error.response.statusText,
                loading: false
            })
        });
    };


    componentDidMount(){      
        this.getDetail();
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.id!==prevProps.match.params.id){
            this.getDetail();
            window.scrollTo(0, 0);
        }
    }

    render(){

        //Display error message if error occurs
        //Display spinner while loading for data
        if(this.state.errorMsg){
            return <div><Error msg = {this.state.errorMsg}/></div>
        }
        else if(this.state.loading){
            return <Spinner/>
        }

        let carousel = <div className = "detail-no-movies-text">No Similar Movies Found...</div>
        if(this.state.similarMovies.length>0){
            carousel =  <CarouselHorizontal movies = {this.state.similarMovies}/>
        }

        console.log(this.props.match.params);

        return(
            <div className = "Detail">
                <NavigationBar/>
                <BackBtn goBack={this.props.history.goBack}/>
                <GeneralInfo id = {this.props.match.params.id} title = {this.state.title} date = {this.state.releaseDate} 
                    vote = {this.state.voteAverage} poster={this.state.poster} overview = {this.state.overview} genre = {this.state.genre}
                    tagline = {this.state.tagline} hours = {this.state.hours} minutes = {this.state.minutes} video = {this.state.video}/>
                <Reviews list = {this.state.reviews}/>
                <div className = "detail-carousel-grid">
                    <div className = "detail-carousel-header">
                        <div className = "detail-carousel-header-text">Similar Movies</div>
                    </div>
                    <div className = "detail-carousel-display">
                        {carousel}
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail