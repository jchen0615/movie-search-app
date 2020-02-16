import React, { Component } from 'react'
import Navigation from '../../components/NavigationBar/Navigation'
import axios from '../../axios'
import GenreGrid from '../../components/Grids/GenreGrid/GenreGrid'
import Spinner from '../../components/UI/Spinner/Spinner'
import PageNavigation from '../../components/UI/PageNavigation/PageNavigation'
import './Genre.css'

const apiKey = "?api_key=0d727a18472e40764f879642668f20f9";
class Genre extends Component{
   
    state = {
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

    componentDidMount(){
        this.getMoviesByGenre()
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.pageNumber!==prevState.pageNumber)
            this.getMoviesByGenre()
    }

    render(){

        if(this.state.loading){
            return(
                <Spinner/>
            )
        }

        return(
            <div className = "genre-page">
                <Navigation/>
                <GenreGrid movieType = {this.props.match.params.genre} movies = {this.state.movies}/>
                <PageNavigation pageNumber = {this.state.pageNumber} lastPage = {this.state.lastPage} setState={(s,c)=>{this.setState(s, c)}}/>
            </div>
        )
    }
}

export default Genre;