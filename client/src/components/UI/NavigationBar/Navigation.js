import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import logo from '../../../images/TMDbLogo.png';
import axios from 'axios';
import SearchInput from '../SearchInput/SearchInput';

class NavigationBar extends Component{

    state = {
        search:false,
        searchValue: null,
        autocompleteValue: null,
        color:"transparent",
        focused: false,
        results: null
    }

    //Send get request to backend
    getSearch =()=>{
        axios.get("http://localhost:5000/api/quick_search", {params: {searchValue:this.state.searchValue}}).then(response =>{
            this.setState({
                results: response.data.movieList,
            })
        }).catch((error)=>{
            this.setState({
                errorMsg: error.response.data.errorMsg? error.response.data.errorMsg: error.response.statusText,
            })
        })
    }

    //Handles click on search button
    searchClickHandler = (event) =>{
        if(this.state.searchValue)
        this.setState({
            search:true
        })
    }

    //Stores user input value for search field
    searchInputHandler = (event) =>{
        this.setState({searchValue: event.target.value}, function(){})
    }

    searchRowClickHandler = (event) =>{
        this.setState({searchValue: event.target.textContent, results:null }, function(){})
    }

    autocompleteHandler = (event)=>{
        event.target.placeholder = "Search for movie here.."
        this.setState({ focused: true,  color: "black"}, function(){
            const intervalID = setInterval(()=>{
                if(this.state.focused){
                    if(this.state.searchValue === ""){
                        this.setState({
                            results: null
                        })
                    }

                    if((this.state.autocompleteValue!==this.state.searchValue && this.state.searchValue.length>0)){
                        this.setState({
                            autocompleteValue: this.state.searchValue
                        }, this.getSearch())
                    }
                }
                else{
                    clearInterval(intervalID);
                }
           }, 1000);
        })
    }

    onBlurHandler = (event)=>{
        event.target.placeholder = "Search for movie here.."
        this.setState({ 
            focused: false,
            color: "transparent"
        })
    }

    //Handles 'Enter' key press for search field
    EnterKeyHandler = (event) =>{
        if(event.charCode === 13){
            if(this.state.searchValue)
                this.setState({
                    search:true
                },function(){})
        }
    }

    componentDidMount(){
        document.addEventListener("scroll", ()=>{
            this.setState({
                color: window.scrollY<100? "transparent" : "black"
            });
        });
    }

    render(){

        //Redirects to search page with value inputted by user
        if(this.state.search){
            return(
                <Redirect to = {{
                    pathname: "/search",
                    state: {
                        value: this.state.searchValue
                    }
                }}/>
            )
        }

        let results = ""
        if(this.state.results){
            results = this.state.results.map((movie)=>{
                return <div className="simple-search-row" key={movie.id} onClick={this.searchRowClickHandler}>{movie.title}</div>
            })
        }

        return(
            <div className={"navigation-bar "+this.state.color}>
                <div className = "navigation-menu">
                    <img src={logo} className="logo" alt="logo" />
                    <button className = "navigation-btn" id = "home-page-btn">
                        <Link to = "/" className = "menu">HOME</Link>
                    </button>
                    <button className = "navigation-btn" id = "genre-page-btn">
                        <span className = "menu" id = "genre-btn">GENRE <i className="arrow down"></i></span>
                        <div id = "genre-list">
                            <Link className = "genre" to = {{ pathname: "/Genre/Action", state:{id:28}}}>Action</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Adventure", state:{id:12}}}>Adventure</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Animation", state:{id:16}}}>Animation</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Comedy", state:{id:35}}}>Comedy</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Crime", state:{id:80}}}>Crime</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Documentary", state:{id:99}}}>Documentary</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Drama", state:{id:18}}}>Drama</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Family", state:{id:10751}}}>Family</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Fantasy", state:{id:14}}}>Fantasy</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/History", state:{id:36}}}>History</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Horror", state:{id:27}}}>Horror</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Music", state:{id:10402}}}>Music</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Mystery", state:{id:9648}}}>Mystery</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Romance", state:{id:10749}}}>Romance</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/SciFi", state:{id:878}}}>Sci-Fi</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/TV Movie", state:{id:10770}}}>TV Movie</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Thriller", state:{id:53}}}>Thriller</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/War", state:{id:10752}}}>War</Link>
                            <Link className = "genre" to = {{ pathname: "/Genre/Western", state:{id:37}}}>Western</Link>
                        </div>
                    </button>
                    <button className = "navigation-btn" id = "now-playing-btn">
                        <Link className = "menu" to = {{ pathname: "/Now_Playing", state:{id: null, now: true}}}>NOW PLAYING</Link>
                    </button>
                    <button className = "navigation-btn" id = "about-page-btn">
                        <Link to = "/About" className = "menu">ABOUT</Link>
                    </button>
                </div>
                <div className = "search-menu">
                    <SearchInput placeholder="Search for movie here.." onfocusHandler={this.autocompleteHandler} onBlurHandler={this.onBlurHandler} onChangeHandler={this.searchInputHandler}
                    keypressHandler={this.EnterKeyHandler} searchValue={this.state.searchValue} onclickHandler={this.props.searchClickHandler}/> 
                    <div className = {`search-input-results ${this.state.results?"active":""}`}>
                        {results}
                    </div>
                </div>
            </div>
        )
    }
}

export default NavigationBar;