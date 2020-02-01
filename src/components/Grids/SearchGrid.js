import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './SearchGrid.css';

class SearchGrid extends Component{
    render(){

        return(
            <div className = "top-grid">
                <div className = "search-bar">
                <input type="text" onChange = {this.props.inputHandler} placeholder="Search for movie here.."/>
                <Link to = {{
                                pathname: "/search",
                                state: {
                                    value: this.props.searchValue,
                                } }}><img src = {require("../../images/search.png")} alt = "search"/></Link>
                </div>
                <p className = "slogan">Search movie from <br/>anywhere in the world..</p>
            </div>
        )
    }
}

export default SearchGrid;