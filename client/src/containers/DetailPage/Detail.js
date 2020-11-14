import React, { Component } from 'react';
import NavigationBar from '../../components/UI/NavigationBar/Navigation';
import GeneralInfo from '../../components/GeneralInfo/GeneralInfo';
import Reviews from '../../components/Reviews/Reviews';
import Spinner from '../../components/UI/Spinner/Spinner';
import BackBtn from '../../components/UI/BackBtn/BackBtn';
import Error from '../../components/ErrorPage/Error';
import Carousel from '../Carousel/Carousel';
import './Detail.css';
import axios from 'axios';

//Component that contains detail information for selected movie
class Detail extends Component{
    state= {
        similarMovies: null,
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
                errorMsg: error.response.data.errorMsg,
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

        return(
            <div className = "Detail">
                <NavigationBar/>
                <BackBtn goBack={this.props.history.goBack}/>
                <GeneralInfo id = {this.props.location.state.id} title = {this.props.location.state.title} date = {this.props.location.state.date} 
                    vote = {this.props.location.state.voteAverage} poster={this.props.location.state.poster} overview = {this.state.overview} genre = {this.state.genre}
                    tagline = {this.state.tagline} hours = {this.state.hours} minutes = {this.state.minutes} video = {this.state.video}/>
                <Reviews list = {this.state.reviews}/>
                <Carousel movieType = {"Similar"} movies = {this.state.similarMovies}/>
            </div>
        )
    }
}

export default Detail