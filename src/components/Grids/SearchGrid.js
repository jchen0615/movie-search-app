import React, { Component } from 'react';
import './SearchGrid.css';

//Grid component for search field on 'Home' page
class SearchGrid extends Component{
  
    render(){
        return(
            <div className = "top-grid">
                <div className = "search-bar">
                <input type="text" onChange = {this.props.inputHandler} onKeyPress={this.props.keyHandler} 
                    placeholder = "Search for movie here.." 
                    onFocus={(e) => e.target.placeholder = ""} 
                    onBlur={(e) => e.target.placeholder = "Search for movie here.."}/>
                <img src = {require("../../images/Search.png")} onClick = {this.props.clickHandler} alt = "search"/>
                </div>
            </div>
        )
    }
}

export default SearchGrid;