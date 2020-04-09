import React, { Component } from 'react'
import Navigation from '../../components/UI/NavigationBar/Navigation'
import MovieGrid from '../../components/Grids/MovieGrid'
import Spinner from '../../components/UI/Spinner/Spinner'
import PageNavigation from '../../components/UI/PageNavigation/PageNavigation'
import Error from '../../components/ErrorPage/Error'
import Client from '../../TMDB_client'
import './Genre.css'

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
    getMoviesByGenre =(pageNumber, releaseYear, id)=>{
        Client.getMoviesByGenre(pageNumber, releaseYear, id).then((result)=>{
            this.setState({
                movies:result.movieList,
                totalPages: result.totalPages,
                lastPage: this.state.pageNumber===result.totalPages? true: false,
                loading: false
            })
            window.scrollTo(0, 0)
        }).catch((error)=>{
            this.setState({
                errorMsg:error,
                loading: false
            })
        })
    }

    //Gets movies that are currently playing in theater
    getNowPlaying =(pageNumber)=>{
        Client.getNowPlaying(pageNumber).then((result)=>{
            this.setState({
                movies:result.movieList,
                totalPages: result.totalPages,
                lastPage: this.state.pageNumber===result.totalPages? true: false,
                loading: false
            })
            window.scrollTo(0, 0)
        }).catch((error)=>{
            this.setState({
                errorMsg: error,
                loading: false
            })
        })
    }

    //Render page based on wheterh a 'genre' page or 'now playing' page is accessed
    componentDidMount(){
        if(!this.props.location.state.now)
            this.getMoviesByGenre(this.state.pageNumber, this.state.releaseYear, this.state.id)
        else
            this.getNowPlaying(this.state.pageNumber)
    }

    //Update if genre ID has changed
    shouldComponentUpdate(nextProps, nextState){
        return this.state.id!==nextState.id || this.state.loading!==nextState.loading ||(this.state.error !==nextState.error)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.pageNumber!==prevState.pageNumber)
            if(!this.props.location.state.now)
                this.getMoviesByGenre(this.state.pageNumber, this.state.releaseYear, this.state.id)
            else
                this.getNowPlaying(this.state.pageNumber)
    }

    render(){

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