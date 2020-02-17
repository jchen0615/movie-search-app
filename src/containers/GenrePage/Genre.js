import React, { Component } from 'react'
import Navigation from '../../components/UI/NavigationBar/Navigation'
import axios from '../../axios'
import MovieGrid from '../../components/Grids/MovieGrid'
import Spinner from '../../components/UI/Spinner/Spinner'
import PageNavigation from '../../components/UI/PageNavigation/PageNavigation'
import SearchGrid from '../../components/Grids/SearchGrid'
import './Genre.css'

const apiKey = "?api_key=0d727a18472e40764f879642668f20f9";
class Genre extends Component{
   
    state = {
        id: this.props.location.state.id,
        movies: null,
        pageNumber: 1,
        releaseYear: 2020,
        totalPages: null,
        lastPage: null,
        loading: true
    }

    getMoviesByGenre =()=>{
        axios.get("/discover/movie"+apiKey+"&sort_by=popularity.desc&page="+this.state.pageNumber+"&primary_release_year="
        +this.state.releaseYear+"&with_genres="+this.props.location.state.id)
       .then(response =>{
        const movieList = response.data.results.map(movie =>{
            return{
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path,
                date: movie.release_date,
                voteAverage: movie.vote_count>0?movie.vote_average:"No rating available"
                }
            })
            this.setState({
                movies:movieList,
                totalPages: response.data.total_pages,
                lastPage: this.state.pageNumber===response.data.total_pages? true: false,
                loading: false
            })
            window.scrollTo(0, 0)
        })
    }

    getNowPlaying =()=>{
        axios.get("/movie/now_playing"+apiKey+"&page="+this.state.pageNumber)
       .then(response =>{
        const movieList = response.data.results.map(movie =>{
            return{
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path,
                date: movie.release_date,
                voteAverage: movie.vote_count>0?movie.vote_average:"No rating available"
                }
            })
            this.setState({
                movies:movieList,
                totalPages: response.data.total_pages,
                lastPage: this.state.pageNumber===response.data.total_pages? true: false,
                loading: false
            })
            window.scrollTo(0, 0)
        })
    }

    componentDidMount(){
        if(!this.props.location.state.now)
            this.getMoviesByGenre()
        else
            this.getNowPlaying()
    }

    shouldComponentUpdate(nextProps, nextState){
        //return this.props.match.params.genre!==nextProps.match.params.genre || this.state.loading!==nextState.loading
        return this.state.id!==nextState.id || this.state.loading!==nextState.loading
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.pageNumber!==prevState.pageNumber)
            if(!this.props.location.state.now)
                this.getMoviesByGenre()
            else
                this.getNowPlaying()
    }

    render(){

        let searchGrid = null
        if(!this.state.id) 
            searchGrid =  <SearchGrid inputHandler={this.searchInputHandler} searchValue={this.state.searchValue} keyHandler={this.EnterKeyHandler}
            search = "region"/>

        if(this.state.loading){
            return(
                <Spinner/>
            )
        }

        return(
            <div className = "genre-page">
                <Navigation/>
                {searchGrid}
                <MovieGrid movieType = {this.props.match.params.genre? this.props.match.params.genre : "Now Playing"} movies = {this.state.movies}/>
                <PageNavigation pageNumber = {this.state.pageNumber} lastPage = {this.state.lastPage} setState={(s,c)=>{this.setState(s, c)}}/>
            </div>
        )
    }
}

export default Genre;