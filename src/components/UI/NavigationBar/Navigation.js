import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

class NavigationBar extends Component{
    render(){
        
        return(
            <div className = "navigation-bar">
                <ul>
                    <li><img className = "logo" src = {require('../../../images/icon.png')} alt = "icon"/></li>
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
        )
    }
}

export default NavigationBar;
//<img src = {require("../../images/search.png")} alt = "search"/>
/*
<input type="text" onChange = {this.props.inputHandler} placeholder="Search"/>
                <Link className = "search-btn" to = {{
                            pathname: "/search",
                            state: {
                                value: this.props.searchValue,
                                limit: 20
                            } }}><img className = "search-btn-image" src = {require("../../images/search.png")} alt = "search"/></Link>
*/