import React, { Component } from 'react';
import Navigation from '../../components/UI/NavigationBar/Navigation';
import MovieGrid from '../../components/Grids/MovieGrid/MovieGrid';
import Spinner from '../../components/UI/Spinner/Spinner';
import PageNavigation from '../../components/UI/PageNavigation/PageNavigation';
import Error from '../../components/ErrorPage/Error';
import axios from 'axios';
import './Genre.css';

//Component that renders a 'genre' page
class Genre extends Component{
   
    state = {
        id: this.props.location.state.id,
        movies: null,
        pageNumber: 1,
        releaseYear: 2020,
        totalPages: null,
        lastPage: null,
        loading: true,
        errorMsg: null
    }
    
    //Gets movies based on genre ID
    getMoviesByGenre =()=>{
        axios.get("http://localhost:5000/api/genre", {params: {pageNumber:this.state.pageNumber, releaseYear:this.state.releaseYear, id:this.state.id}}).then(response =>{
            this.setState({
                movies:response.data.movieList,
                totalPages: response.data.totalPages,
                lastPage: this.state.pageNumber===response.data.totalPages? true: false,
                loading: false
            })
            window.scrollTo(0, 0);
        }).catch((error)=>{
            this.setState({
                errorMsg: error.response.data? error.response.data.errorMsg: error.response.statusText,
                loading: false
            })
        })
    }

    //Gets movies that are currently playing in theater
    getNowPlaying =()=>{
        axios.get("/api/now_playing", {params: {pageNumber: this.state.pageNumber}}).then(response =>{
            this.setState({
                movies:response.data.movieList,
                totalPages: response.data.totalPages,
                lastPage: this.state.pageNumber===response.data.totalPages? true: false,
                loading: false
            })
        }).catch((error)=>{
            this.setState({
                errorMsg: error.response.data? error.response.data.errorMsg: error.response.statusText,
                loading: false
            })
        })
        window.scrollTo(0, 0);
    }

    //Render page based on wheterh a 'genre' page or 'now playing' page is accessed
    componentDidMount(){
        if(!this.props.location.state.now)
            this.getMoviesByGenre()
        else
            this.getNowPlaying()
    }

    //Update if genre ID has changed
    shouldComponentUpdate(nextProps, nextState){
        return this.state.id!==nextState.id || this.state.loading!==nextState.loading ||(this.state.error !==nextState.error)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.pageNumber!==prevState.pageNumber)
            if(!this.props.location.state.now)
                this.getMoviesByGenre()
            else
                this.getNowPlaying()
    }

    render(){

        //Display error message if error occurs
        //Display spinner while loading for data
        if(this.state.errorMsg){
            return <Error msg = {this.state.errorMsg}/>
        }
        else if(this.state.loading){
            return <Spinner/>
        }
           
        return(
            <div className = "genre-page">
                <Navigation/>
                <MovieGrid movieType = {this.props.match.params.genre? this.props.match.params.genre : "Now Playing"} movies = {this.state.movies}/>
                <PageNavigation pageNumber = {this.state.pageNumber} lastPage = {this.state.lastPage} setState={(s,c)=>{this.setState(s, c)}}/>
            </div>
        )
    }
}

export default Genre;