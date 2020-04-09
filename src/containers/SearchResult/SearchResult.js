import React, { Component } from 'react';
import NavigationBar from '../../components/UI/NavigationBar/Navigation';
import SearchList from '../../components/SearchList/SearchList'
import Spinner from '../../components/UI/Spinner/Spinner'
import PageNavigation from '../../components/UI/PageNavigation//PageNavigation'
import Error from '../../components/ErrorPage/Error'
import './SearchResult.css'
const Client = require('../../TMDB_client')

//Renders Search Result page after a user search for keyword(s)
class SearchResult extends Component {

    state = {
        searchList: null,
        pageNumber: 1,
        totalPages: null,
        totalResults: null,
        lastPage: false,
        loading: true,
        errorMsg: null
    }

    //Gets a list of movies based on search input and page number
    getSearchResults =(value, page)=>{
        Client.getSearchResults(value, page).then((result)=>{
            this.setState({
                searchList: result.movieList,
                totalResults: result.totalResults,
                totalPages: result.totalPages,
                lastPage: this.state.pageNumber===result.totalPages? true: false,
                loading: false
            })
        }).catch((error)=>{
            this.setState({
                errorMsg: error,
                loading: false
            })
        })
        window.scrollTo(0, 0)
    }

    componentDidMount(){
        this.getSearchResults(this.props.location.state.value, this.state.pageNumber)
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.loading!==nextState.loading
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.pageNumber!==prevState.pageNumber)
        this.getSearchResults(this.props.location.state.value, this.state.pageNumber)
    }

    render(){
        
        if(this.state.errorMsg){
            return <Error msg = {this.state.errorMsg}/>
        }
        else if(this.state.loading){
            return <Spinner/>
        }

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