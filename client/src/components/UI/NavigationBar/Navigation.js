import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import logo from '../../../images/TMDbLogo.png';
import search from '../../../images/Search.png';

class NavigationBar extends Component{

    render(){
        /*
        return(
            <div className = "navigation-bar">
                <ul>
                    <li><img className = "logo" src = {require('../../../images/TMDbLogo.png')} alt = "icon"/></li>
                    <li><Link to = "/" className = "menu">Home</Link></li>
                    <li className = "menu" id = "genre-menu">Genre</li>
                    <li><Link className = "menu" to = {{ pathname: "/Now_Playing", state:{id: null, now: true}}}>Now Playing</Link></li>
                    <li><Link to = "/About" className = "menu">About</Link></li>
                    <div className = "genre-list">
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
                </ul>
            </div>
        )*/
        return(
            <div className={"navigation-bar "+this.props.color}>
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
                    <input type="text" data-testid = "search-input"  placeholder = "Search for movie here.." onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Search for movie here.."}/>
                    <img src = {search} data-testid = "search-icon" alt = "search"/>
                </div>
            </div>
        )
    }
}

export default NavigationBar;