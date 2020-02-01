import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

class NavigationBar extends Component{
    render(){
        
        return(
            <ul>
                <li><img className = "logo" src = {require('../../images/icon.png')} alt = "icon"/></li>
                <li className = "menu"><Link to = "/">Home</Link></li>
                <li className = "menu"><Link to = "/">Genre</Link></li>
                <li className = "menu"><Link to = "/">List</Link></li>
                <li className = "menu"><Link to = "/">About</Link></li>
               </ul>
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