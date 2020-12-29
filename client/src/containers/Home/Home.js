import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import NavigationBar from '../../components/UI/NavigationBar/Navigation';
import Spinner from '../../components/UI/Spinner/Spinner';
import Error from '../../components/ErrorPage/Error';
import Carousel from '../Carousel/Carousel';
import CarouselHorizontal from '../Carousel/CarouselHorizontal';
import axios from 'axios'
import './Home.css';
import Discover from '../Discover/Discover';


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

    //Send get request to backend
    getHome =()=>{
        axios.get("/api/home").then(response =>{
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

        return(
            <div className="Home-page" data-testid="home-page">
                <NavigationBar data-testid="navigation"/>
                <div className = "home-page-grid" id="home-grid-1">
                    <div className = "feature-text-grid">
                        <div className = "feature-text">
                            <div className = "feature-text-line">BROWSE TRENDING MOVIES</div>
                            <div className = "feature-text-title">Movie Search App</div>
                            <div className = "feature-text-line">Discover movies of your interests</div>
                            <div className = "feature-text-line">Let us help on deciding what's next on your movie list</div>
                        </div>
                    </div>
                    <div className = "carousel-display-grid">
                        <div className = "carousel-display-box">
                            <div className = "carousel-display-header">
                                <span>AUTHOR'S FAVORITE</span>
                            </div>
                            <Carousel movies={this.state.popularMovies}/>
                        </div>
                    </div>
                </div>
                <div className = "home-page-grid" id="home-grid-2">
                    <div className = "home-grid-2-header">
                        <div className = "home-grid-2-header-text">Now Playing</div>
                    </div>
                    <div className = "home-grid-full-display">
                        <CarouselHorizontal movies = {this.state.nowPlaying}/>
                    </div>
                </div>
                <div className = "home-page-grid" id="home-grid-3">
                    <div className = "home-grid-3-header">
                        <div className = "feature-text-title">Not Feeling Decisive?</div>
                        <div className = "feature-text-line">Let us help. Start by adding at least one field below.</div>
                    </div>
                    <div className = "home-grid-3-content">
                        <Discover/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home