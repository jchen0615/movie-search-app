import React, { Component } from 'react';
import NavigationBar from '../../components/UI/NavigationBar/Navigation';
import GeneralInfo from '../../components/GeneralInfo/GeneralInfo';
import Reviews from '../../components/Reviews/Reviews';
import Spinner from '../../components/UI/Spinner/Spinner'
import MovieGrid from '../../components/Grids/MovieGrid'
import BackBtn from '../../components/UI/BackBtn/BackBtn'
import Error from '../../components/ErrorPage/Error'
import './Detail.css';
const Client = require('../../TMDB_client')

//Component that contains detail information for selected movie
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
        reviews: null,
        errorMsg: null,
        Loaded:false
    }

    //Gets detail information for selected movie
    getDetail = (id) =>{
        Client.getDetailData(id).then((result)=>{
            console.log(result.reviews)
            this.setState({
                overview: result.detail.overview,
                genre: result.detail.genre,
                tagline: result.detail.tagline,
                hours: result.detail.hours,
                minutes: result.detail.minutes,
                video: result.detail.video,
                similarMovies: result.movieList,
                reviews: result.reviews,
                Loaded: true
            })
        }).catch((error)=>{
            this.setState({
                errorMsg: error,
                Loaded: true
            })
        })
        window.scrollTo(0, 0)
    }



    componentDidMount(){      
        this.getDetail(this.props.location.state.id)
    }

    componentDidUpdate(prevProps){
        if(this.props.location.state.id!==prevProps.location.state.id)
            this.getDetail(this.props.location.state.id)
    }

    render(){

        if(this.state.errorMsg){
            return <div><Error msg = {this.state.errorMsg}/></div>
        }
        else if(!this.state.Loaded){
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
                <MovieGrid id = {this.props.location.state.id} movieType = "Similar" movies = {this.state.similarMovies}/>
            </div>
        )
    }
}

export default Detail