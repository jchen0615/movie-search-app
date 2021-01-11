import React, { Component } from 'react';;
import NavigationBar from '../NavigationBar/Navigation';
import SearchList from './SearchList/SearchList';
import Spinner from '../../components/UI/Spinner/Spinner';
import PageNavigation from '../../components/UI/PageNavigation/PageNavigation';
import Error from '../../components/ErrorPage/Error';
import './SearchResult.css';
import axios from 'axios';

//Renders Search Result page after a user search for keyword(s)
class SearchResult extends Component {

    state = {
        movieList: [],
        pageNumber: 1,
        totalPages: null,
        totalResults: null,
        lastPage: false,
        loading: true,
        errorMsg: null
    };

    //Gets a list of movies based on search input and page number
    getSearchResults =()=>{
        let URL = "/api/search",
            param = {params: {value: this.props.location.state.value, pageNumber: this.state.pageNumber}}
        
        if(this.props.location.pathname==="/Discover"){
            URL = "/api/discover";
            param = {
                        params: {
                            year: this.props.location.state.YEAR, 
                            keyword: this.props.location.state.KEYWORD,
                            cast: this.props.location.state.CAST,
                            genre: this.props.location.state.GENRE,
                            pageNumber: this.state.pageNumber
                        }
                    }
        }

        axios.get(URL, param).then(response =>{
            this.setState({
                movieList: response.data.movieList,
                totalResults: response.data.totalResults,
                totalPages: response.data.totalPages>0? response.data.totalPages: 1,
                lastPage: this.state.pageNumber===response.data.totalPages? true: false,
                loading: false
            })
        }).catch((error)=>{
            this.setState({
                errorMsg: error.response.data.errorMsg? error.response.data.errorMsg: error.response.statusText,
                loading: false
            })
        });

        window.scrollTo(0, 0);
    }

    componentDidMount(){
        this.getSearchResults();
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.loading!==nextState.loading;
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.pageNumber!==prevState.pageNumber)
            this.getSearchResults();
    }

    render(){
        
        //Display error message if error occurs
        //Display spinner while loading for data
        if(this.state.errorMsg){
            return <Error msg = {this.state.errorMsg}/>
        }
        else if(this.state.loading){
            return <Spinner/>
        }

        return(
            <div className="search-page">
                <NavigationBar/>
                <div className = "search-message-container" data-testid = "search-message-container">
                    <div className = "search-message" data-testid = "search-message">Showing page {this.state.pageNumber} of {this.state.totalPages}</div> 
                </div>
                {this.state.movieList.length>0 ? <SearchList list = {this.state.movieList}/> : <div className="search-no-result-txt">No movies found...</div> }
                <PageNavigation pageNumber = {this.state.pageNumber} lastPage = {this.state.lastPage} setState={(s,c)=>{this.setState(s, c)}}/>
            </div>
        )
    }
}

export default SearchResult