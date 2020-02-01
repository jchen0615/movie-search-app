import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar/Navigation';
import MovieGrid from '../components/Grids/MovieGrid';
import SearchList from '../components/SearchList/SearchList'
import axios from '../axios'
import Spinner from '../components/UI/Spinner/Spinner'
import './SearchResult.css'
const apiKey = "?api_key=0d727a18472e40764f879642668f20f9";

class SearchResult extends Component {

    state = {
        searchList: null,
        pageNumber: 1,
        totalPages: null,
        totalResults: null
    }

    componentDidMount(){
        axios.get("/search/movie/"+apiKey+"&query="+this.props.location.state.value)
        .then( response =>{
            console.log(response);
            const movieList = response.data.results.map(movie =>{
                return{
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster_path,
                    date: movie.release_date,
                    voteAverage: movie.vote_average,
                    overview: movie.overview
                }
            })
   
            this.setState({
                searchList: movieList,
                totalResults: response.data.total_results,
                totalPages: response.data.total_pages
            })
         })
    }

    render(){
        if(!this.state.searchList)
            return(<Spinner/>)

        return(
            <div className="search-result">
                <NavigationBar/>
                <div className = "search-message"> Showing {this.state.pageNumber} of {this.state.totalPages} pages for keyword: "{this.props.location.state.value}"</div>
                <SearchList list = {this.state.searchList}/>
            </div>
        )
    }
}

export default SearchResult