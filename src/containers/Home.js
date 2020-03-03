import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import NavigationBar from '../components/UI/NavigationBar/Navigation';
import MovieGrid from '../components/Grids/MovieGrid';
import SearchGrid from '../components/Grids/SearchGrid';
import Spinner from '../components/UI/Spinner/Spinner'
import axios from 'axios'
const key = require('../GlobalKey')

class Home extends Component {

    state = {
        popularMovies: null,
        nowPlaying: null,
        searchValue: null,
        search: false
    }

    searchClickHandler = (event) =>{
        if(this.state.searchValue)
        this.setState({
            search:true
        })
    }

    searchInputHandler = (event) =>{
        this.setState({searchValue: event.target.value}, function(){})
    }
    
    EnterKeyHandler = (event) =>{
        if(event.charCode === 13){
            if(this.state.searchValue)
                this.setState({
                    search:true
                })
        }
    }

    componentDidMount(){
        axios.all([
            axios.get("/movie/popular"+key.apiKey),
            axios.get("/movie/now_playing"+key.apiKey)
        ]).then(responseArr =>{
            const popularList = responseArr[0].data.results.slice(0,4).map(movie =>{
                return{
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster_path,
                    date: movie.release_date,
                    voteAverage: movie.vote_average
                }
            })

            const nowPlayingList = responseArr[1].data.results.slice(0,4).map(movie =>{
                return{
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster_path,
                    date: movie.release_date,
                    voteAverage: movie.vote_average
                }
            })

            this.setState({
                nowPlaying: nowPlayingList,
                popularMovies: popularList
            })
        })
    }

    render(){
         
        if(!this.state.nowPlaying || !this.state.popularMovies){
            return <Spinner/>
        }

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