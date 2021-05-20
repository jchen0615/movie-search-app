import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar/Navigation';
import Spinner from '../../components/UI/Spinner/Spinner';
import Error from '../ErrorPage/Error';
import Carousel from '../../components/Carousel/Carousel';
import CarouselHorizontal from '../../components/Carousel/CarouselHorizontal';
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
        navTransparent: true,
        carouselCounter: 1,
        carouselHover: false
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

    carouselCounterHandler =(event)=> {
        const counter = parseInt(event.target.getAttribute("data-index"));
        this.setState({
            carouselCounter: counter
        })
    }

    carouselHoverHandler =(event)=> {
        this.setState((prevState)=>({
            carouselHover: prevState.carouselHover? false: true
        }))
    }

    componentDidMount(){
        this.getHome();

        setInterval(()=>{
            if(!this.state.carouselHover){
                this.setState((prevState)=>({
                    carouselCounter: prevState.carouselCounter===5? 1 : prevState.carouselCounter+1
                }), ()=>{
                    document.getElementById('radio' + this.state.carouselCounter).checked = true;
                })
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
                            <Carousel movies = {this.state.popularMovies} counterHandler = {this.carouselCounterHandler} hoverHandler = {this.carouselHoverHandler}/>
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