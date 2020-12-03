import React, { Component } from 'react';;
import NavigationBar from '../../components/UI/NavigationBar/Navigation';
import SearchList from '../../components/SearchList/SearchList';
import Spinner from '../../components/UI/Spinner/Spinner';
import PageNavigation from '../../components/UI/PageNavigation/PageNavigation';
import Error from '../../components/ErrorPage/Error';
import './SearchResult.css';
import axios from 'axios';

//Renders Search Result page after a user search for keyword(s)
class SearchResult extends Component {

    state = {
        movieList: null,
        pageNumber: 1,
        totalPages: null,
        totalResults: null,
        lastPage: false,
        loading: true,
        errorMsg: null
    };

    //Gets a list of movies based on search input and page number
    getSearchResults =(value, page)=>{
        axios.get("http://localhost:5000/api/search", {params: {value: this.props.location.state.value, pageNumber: this.state.pageNumber}}).then(response =>{
            this.setState({
                movieList: response.data.movieList,
                totalResults: response.data.totalResults,
                totalPages: response.data.totalPages,
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
                    <div className = "search-message" data-testid = "search-message">Showing {this.state.pageNumber} of {this.state.totalPages} pages for keyword: "{this.props.location.state.value}"</div> 
                </div>
                <SearchList list = {this.state.movieList}/>
                <PageNavigation pageNumber = {this.state.pageNumber} lastPage = {this.state.lastPage} setState={(s,c)=>{this.setState(s, c)}}/>
            </div>
        )
    }
}

export default SearchResult