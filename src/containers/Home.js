import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import NavigationBar from '../components/UI/NavigationBar/Navigation';
import MovieGrid from '../components/Grids/MovieGrid';
import SearchGrid from '../components/Grids/SearchGrid';
import Spinner from '../components/UI/Spinner/Spinner'
import Error from '../components/ErrorPage/Error'
const Client = require('../TMDB_client')

class Home extends Component {

    state = {
        popularMovies: null,
        nowPlaying: null,
        searchValue: null,
        search: false,
        errorMsg: null
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
                })
        }
    }

    componentDidMount(){
        Client.getHomePage().then((result)=>{
            this.setState({
                nowPlaying: result.nowPlaying,
                popularMovies: result.popularMovies
            })
        })
        .catch((error)=>{
            this.setState({
                errorMsg: error
            })
        })
    }

    render(){
         
        if(this.state.errorMsg){
            return <Error msg ={this.state.errorMsg}/>
        }
        else if(!this.state.nowPlaying || !this.state.popularMovies){
            return <Spinner/>
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
            <div className="Home-page">
                <NavigationBar/>
                <SearchGrid inputHandler={this.searchInputHandler} searchValue={this.state.searchValue} keyHandler={this.EnterKeyHandler}
                    clickHandler={this.searchClickHandler} search = "movie"/>
                <MovieGrid movieType = "Popular" movies = {this.state.popularMovies}/>
                <MovieGrid movieType = "Now Playing" movies = {this.state.nowPlaying}/>
            </div>
        )
    }
}

export default Home