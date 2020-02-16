import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './SearchGrid.css';

class SearchGrid extends Component{
    render(){

        return(
            <div className = "top-grid">
                <div className = "search-bar">
                <input type="text" onChange = {this.props.inputHandler} onKeyPress={this.props.keyHandler} placeholder="Search for movie here.." 
                onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Search for movie here.."} />
                <Link to = {this.props.searchValue? {
                                pathname: "/search",
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