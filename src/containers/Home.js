import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar/Navigation';
import MovieGrid from '../components/Grids/MovieGrid';
import SearchGrid from '../components/Grids/SearchGrid';
import Spinner from '../components/UI/Spinner/Spinner'
import axios from '../axios'
const apiKey = "?api_key=0d727a18472e40764f879642668f20f9";

class Home extends Component {

    state = {
        movies: null,
        search: null
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
                    movies: movieList,
                })
             })
    }

    searchInputHandler = (event) =>{
        this.setState({
            search: event.target.value
        })
    }

    render(){
       
        if(!this.state.movies){
            return(
                <Spinner/>
            )
        }
        return(
            <div className="Home-page">
                <NavigationBar/>
                <SearchGrid inputHandler = {this.searchInputHandler} searchValue = {this.state.search}/>
                <MovieGrid movieType = "Popular" movies = {this.state.movies}/>
            </div>
        )
    }
}

export default Home