import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import NavigationBar from '../../components/UI/NavigationBar/Navigation';
import SearchGrid from '../../components/Grids/SearchGrid/SearchGrid';
import Spinner from '../../components/UI/Spinner/Spinner';
import Error from '../../components/ErrorPage/Error';
import Carousel from '../Carousel/Carousel';
//import axios from '../../axios_server';
import axios from 'axios'
//const Client = require('../../service/TMDB_client/TMDB_client');

class Home extends Component {


    state = {
        popularMovies: null,
        nowPlaying: null,
        searchValue: null,
        search: false,
        errorMsg: null,
        loading: true
    }

    //Handles click on search button
    searchClickHandler = (event) =>{
        if(this.state.searchValue)
        this.setState({
            search:true
        })
    }

    //Stores user input value for search field
    searchInputHandler = (event) =>{
        this.setState({searchValue: event.target.value}, function(){})
    }
    
    //Handles 'Enter' key press for search field
    EnterKeyHandler = (event) =>{
        if(event.charCode === 13){
            if(this.state.searchValue)
                this.setState({
                    search:true
                },function(){})
        }
    }

    //Send get request to backend
    getHome =()=>{
        axios.get("/api/home").then(response =>{
            this.setState({
                nowPlaying: response.data.nowPlaying,
                popularMovies: response.data.popularMovies,
                loading: false
            })
        }).catch((error)=>{
            this.setState({
                errorMsg: error.response.data.errorMsg,
                loading: false
            })
        })
    }

    componentDidMount(){
       this.getHome()
    }

    render(){
         
        //Display error message if error occurs
        //Display spinner while loading for data
        if(this.state.errorMsg){
            return <Error data-test= "error" msg ={this.state.errorMsg}/>
        }
        else if(this.state.loading){
            return <Spinner data-testid="spinner"/>
        }

        //Redirects to search page with value inputted by user
        if(this.state.search){
            return(
                <Redirect to = {{
                    pathname: "/search",
                    state: {
                        value: this.state.searchValue
                    }
                }}/>
            )
        }

        return(
            <div className="Home-page" data-testid="home-page">
                <NavigationBar data-testid="navigation"/>
                <SearchGrid data-testid="search-grid" inputHandler={this.searchInputHandler} searchValue={this.state.searchValue} keyHandler={this.EnterKeyHandler}
                    clickHandler={this.searchClickHandler} search = "movie"/>
                <Carousel data-testid="nowplaying" movieType = {"Now Playing"} movies = {this.state.nowPlaying}/>
                <Carousel data-testid="popular" movieType = {"Popular"} movies = {this.state.popularMovies}/>
            </div>
        )
    }
}

export default Home