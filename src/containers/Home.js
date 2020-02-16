import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import NavigationBar from '../components/NavigationBar/Navigation';
import MovieGrid from '../components/Grids/MovieGrid';
import SearchGrid from '../components/Grids/SearchGrid';
import Spinner from '../components/UI/Spinner/Spinner'
import axios from '../axios'
const apiKey = "?api_key=0d727a18472e40764f879642668f20f9";

class Home extends Component {

    state = {
        popularMovies: null,
        nowPlaying: null,
        searchValue: null,
        search: false
    }

    searchInputHandler = (event) =>{
        this.setState({searchValue: event.target.value}, function(){
            console.log(this.state.searchValue)
        })
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
        axios.get("/movie/popular/"+apiKey)
            .then( response =>{
                const movieList = response.data.results.slice(0,4).map(movie =>{
                    return{
                        id: movie.id,
                        title: movie.title,
                        poster: movie.poster_path,
                        date: movie.release_date,
                        voteAverage: movie.vote_average
                    }
                })

                this.setState({
                    popularMovies: movieList,
                })
             })

        axios.get("/movie/now_playing"+apiKey)
        .then( response =>{
            const movieList = response.data.results.slice(0,4).map(movie =>{
                return{
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster_path,
                    date: movie.release_date,
                    voteAverage: movie.vote_average
                }
            })

            this.setState({
                nowPlaying: movieList,
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.searchValue !== prevState.searchValue) {
            
        }
      }

    render(){
       
        if(!this.state.nowPlaying || !this.state.popularMovies){
            return(
                <Spinner/>
            )
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
                <SearchGrid inputHandler={this.searchInputHandler} searchValue={this.state.searchValue} keyHandler={this.EnterKeyHandler}/>
                <MovieGrid movieType = "Popular" movies = {this.state.popularMovies}/>
                <MovieGrid movieType = "Now Playing" movies = {this.state.nowPlaying}/>
            </div>
        )
    }
}

export default Home