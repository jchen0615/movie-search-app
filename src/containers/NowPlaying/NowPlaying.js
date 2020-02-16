import React, { Component } from 'react'
import axios from '../../axios'
import NavigationBar from '../../components/UI/NavigationBar/Navigation'
import MovieGrid from '../../components/Grids/MovieGrid'
import Spinner from '../../components/UI/Spinner/Spinner'
import PageNavigation from '../../components/UI/PageNavigation/PageNavigation'
import './NowPlaying.css'
const apiKey = "?api_key=0d727a18472e40764f879642668f20f9";


class NowPlaying extends Component{

    state = {
        nowPlaying: null
    }

    componentDidUpdate(){
        axios.get("/movie/now_playing"+apiKey).then( response =>{
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
                nowPlaying: movieList
            })
        })
    }

    render(){
       
        if(!this.state.nowPlaying)
            return <Spinner/>

        return(
            <div className = "now_playing">
                <NavigationBar/>
                <MovieGrid movieType ="Now Playing" movies = {this.state.nowPlaying}/>
                <PageNavigation/>
            </div>
        )
    }
}

export default NowPlaying