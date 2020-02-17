import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './SearchGrid.css';

class SearchGrid extends Component{
    render(){

        let pathString = "/search"
        if(this.props.search===("region"))
            pathString = "/Now_Playing"

        const holderString = pathString==="/search"? "Search for movie here.." : "Filter by region here..."
        return(
            <div className = "top-grid">
                <div className = "search-bar">
                <input type="text" onChange = {this.props.inputHandler} onKeyPress={this.props.keyHandler} 
                placeholder = {holderString}
                onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = {holderString}} />
                <Link to = {this.props.searchValue? {
                                pathname: pathString,
                                state: {
                                    value: this.props.searchValue,
                                }
                            }: ""
                        }><img src = {require("../../images/Search.png")} alt = "search"/></Link>
                </div>
            </div>
        )
    }
}

export default SearchGrid;