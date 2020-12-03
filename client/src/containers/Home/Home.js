import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import NavigationBar from '../../components/UI/NavigationBar/Navigation';
import Spinner from '../../components/UI/Spinner/Spinner';
import Error from '../../components/ErrorPage/Error';
import Carousel from '../Carousel/Carousel';
//import axios from '../../axios_server';
import axios from 'axios'
import './Home.css';
//const Client = require('../../service/TMDB_client/TMDB_client');

class Home extends Component {


    state = {
        popularMovies: null,
        nowPlaying: null,
        searchValue: null,
        search: false,
        errorMsg: null,
        loading: true,
        navTransparent: true
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
    
    //Handles 'Enter' key press for search field
    EnterKeyHandler = (event) =>{
        if(event.charCode === 13){
            if(this.state.searchValue)
                this.setState({
                    search:true
                },function(){})
        }
    }

    //Send get request to backend
    getHome =()=>{
        axios.get("http://localhost:5000/api/home").then(response =>{
            this.setState({
                nowPlaying: response.data.nowPlaying,
                popularMovies: response.data.popularMovies,
                loading: false
            })
        }).catch((error)=>{
            this.setState({
                errorMsg: error.response.data.errorMsg? error.response.data.errorMsg: error.response.statusText,
                loading: false
            })
        })
    }

    componentDidMount(){
       this.getHome();

        document.addEventListener("scroll", ()=>{
            const transparent = window.scrollY<100? true:false;
            if(this.state.navTransparent!==transparent){
                    this.setState({
                        navTransparent: transparent
                    });
            };
       });

       let counter = 2;
       setInterval(function(){
            document.getElementById('radio' + counter).checked = true;
            counter++;
            if(counter>5){
                counter = 1;
            }
        }, 5000)
    };

    render(){
         
        //Display error message if error occurs
        //Display spinner while loading for data
        if(this.state.errorMsg){
            return <Error data-test= "error" msg ={this.state.errorMsg}/>
        }
        else if(this.state.loading){
            return <Spinner data-testid="spinner"/>
        }

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

        return(
            <div className="Home-page" data-testid="home-page">
                <NavigationBar data-testid="navigation" color={this.state.navTransparent?"transparent":"black"}/>
                <div className = "home-grid-1">
                    <div className = "feature-text-grid">
                        <div className = "feature-text">
                            <p className = "feature-text-line">BROWSE MOVIE OF YOUR INTEREST</p>
                            <p className = "feature-text-title">The Movie Search App</p>
                            <p className = "feature-text-line">Allows users to browse movies by trend or interest,</p>
                            <p className = "feature-text-line">Helps users to decide what to see on their next movie night,</p>
                            <p className = "feature-text-line">Enjoy browsing</p>
                        </div>
                    </div>
                    <div className = "carousel-display-grid">
                        <div className = "carousel-display-header"><span>Author's Favorites</span></div>
                        <div className = "carousel-display-box">
                            <Carousel movies={this.state.popularMovies}/>
                        </div>
                    </div>
                </div>
                <div className = "home-grid-2">
                    <div className = "home-grid-full-display">
                       
                    </div>
                </div>
            </div>
        )
    }
}

export default Home