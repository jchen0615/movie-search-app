import React, { Component } from 'react';
import NavigationBar from '../../components/UI/NavigationBar/Navigation';
import SearchList from '../../components/SearchList/SearchList'
import axios from '../../axios'
import Spinner from '../../components/UI/Spinner/Spinner'
import PageNavigation from '../../components/UI/PageNavigation//PageNavigation'
import './SearchResult.css'
const apiKey = "?api_key=0d727a18472e40764f879642668f20f9";

class SearchResult extends Component {

    state = {
        searchList: null,
        pageNumber: 1,
        totalPages: null,
        totalResults: null,
        lastPage: false,
        loading: true,
    }

    getSearchResults =()=>{
        axios.get("/search/movie/"+apiKey+"&query="+this.props.location.state.value+"&page="+this.state.pageNumber)
        .then( response =>{
            const movieList = response.data.results.map(movie =>{
                return{
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster_path,
                    date: movie.release_date,
                    voteAverage: movie.vote_count>0?movie.vote_average:"No rating available",
                    overview: movie.overview
                }
            })
   
            this.setState({
                searchList: movieList,
                totalResults: response.data.total_results,
                totalPages: response.data.total_pages,
                lastPage: this.state.pageNumber===response.data.total_pages? true: false,
                loading: false
            })
            window.scrollTo(0, 0)
         })
    }

    componentDidMount(){
        this.getSearchResults()
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.loading!==nextState.loading
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.pageNumber!==prevState.pageNumber)
            this.getSearchResults()
    }

    render(){
        if(this.state.loading)
            return(<Spinner/>)

        return(
            <div className="search-result">
                <NavigationBar/>
                <div className = "search-message-container">
                <div className = "search-message">Showing {this.state.pageNumber} of {this.state.totalPages} pages for keyword: "{this.props.location.state.value}"</div> 
                </div>
                <SearchList list = {this.state.searchList}/>
                <PageNavigation pageNumber = {this.state.pageNumber} lastPage = {this.state.lastPage} setState={(s,c)=>{this.setState(s, c)}}/>
            </div>
        )
    }
}

export default SearchResult