import React, { Component } from 'react';
import NavigationBar from '../UI/NavigationBar/Navigation';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import Reviews from './Reviews/Reviews';
import Spinner from '../UI/Spinner/Spinner'
import MovieGrid from '../Grids/MovieGrid'
import BackBtn from '../UI/BackBtn/BackBtn'
import Error from '../ErrorPage/Error'
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
        errorMsg: null
    }

    //Gets detail information for selected movie
    getDetail = (id) =>{
        Client.getDetailData(id).then((result)=>{
            this.setState({
                overview: result.detail.overview,
                genre: result.detail.genre,
                tagline: result.detail.tagline,
                hours: result.detail.hours,
                minutes: result.detail.minutes,
                video: result.detail.video,
                generalInfoLoaded: true,
                similarMovies: result.movieList
            })
        }).catch((error)=>{
            this.setState({
                errorMsg: error
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