import React, {Component} from 'react'
import Navigation from '../UI/NavigationBar/Navigation'
import './AboutPage.css'

class About extends Component{
    render(){
        return(
            <div className = 'about-page'>
                <Navigation/>
                <div className ='about-text' data-testid = 'about-text'>Hello there, <br/><br/><br/>
                this web app allows you to browse movies that are currently playing in theather or by genre. It also provides a search feature based on keywords.<br/>
                <br/><br/>It leverages TMDB API to fetch such information as well as more detailed information for movies including overview, trailer, reviews, similar movies, etc. for movies. 
                <br/><br/>Enjoy browsing :) -----Jing</div>
            </div>
        )
    }
}

export default About