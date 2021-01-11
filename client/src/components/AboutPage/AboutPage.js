import React, {Component} from 'react'
import Navigation from '../../containers/NavigationBar/Navigation'
import './AboutPage.css'

class About extends Component{
    render(){
        return(
            <div className = 'about-page'>
                <Navigation/>
                <div className ='about-text' data-testid = 'about-text'>Hello there, <br/><br/><br/>
                    This web app allows you to browse movies that are currently playing in theather or by genre. It also provides a search feature based on keywords.<br/>
                    <br/><br/>It leverages TMDB API to fetch such information as well as more detailed information 
                    such as the overview, trailer, reviews, similar movies, etc. 
                    <br/><br/>This web application is a personal project for the sole puporse of practicing various tools/frameworks. 
                    It is in no way intended for any profit-making.
                    <br/><br/>Enjoy browsing :) -----Jing
                </div>
            </div>
        )
    }
}

export default About