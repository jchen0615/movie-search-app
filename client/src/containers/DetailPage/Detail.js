import React, { Component } from 'react';
import NavigationBar from '../../components/UI/NavigationBar/Navigation';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import Reviews from './Reviews/Reviews';
import Spinner from '../../components/UI/Spinner/Spinner';
import BackBtn from '../../components/UI/BackBtn/BackBtn';
import Error from '../../components/ErrorPage/Error';
import CarouselHorizontal from '../Carousel/CarouselHorizontal';
import './Detail.css';
import axios from 'axios';

//Component that contains detail information for selected movie
class Detail extends Component{
    state= {
        similarMovies: [],
        overview: null,
        genre: null,
        tagline: null,
        hours: null,
        minutes: null,
        video: null,
        reviews: null,
        errorMsg: null,
        loading:true
    }

    //Gets detail information for selected movie
    getDetail = () =>{
        axios.get("http://localhost:5000/api/detail", {params: {id:this.props.location.state.id}}).then(response =>{
            this.setState({
                overview: response.data.detail.overview,
                genre: response.data.detail.genre,
                tagline: response.data.detail.tagline,
                hours: response.data.detail.hours,
                minutes: response.data.detail.minutes,
                video: response.data.detail.video,
                similarMovies: response.data.movieList,
                reviews: response.data.reviews,
                loading: false
            })
        }).catch((error)=>{
            this.setState({
                errorMsg: error.response.data? error.response.data.errorMsg: error.response.statusText,
                loading: false
            })
        });
        window.scrollTo(0, 0);
    };


    componentDidMount(){      
        this.getDetail()
    }

    componentDidUpdate(prevProps){
        if(this.props.location.state.id!==prevProps.location.state.id)
            this.getDetail()
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

        return(
            <div className = "Detail">
                <NavigationBar/>
                <BackBtn goBack={this.props.history.goBack}/>
                <GeneralInfo id = {this.props.location.state.id} title = {this.props.location.state.title} date = {this.props.location.state.date} 
                    vote = {this.props.location.state.voteAverage} poster={this.props.location.state.poster} overview = {this.state.overview} genre = {this.state.genre}
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