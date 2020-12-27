import React, { Component } from 'react';
import './SearchInput.css';
import search from '../../../images/Search.png';

class SearchInput extends Component{
    render(){
        return(
            <div className = "search-input">
                <input type="text" data-testid="search-input"  data-index = {this.props.index} placeholder = {this.props.placeholder} onFocus={this.props.onfocusHandler} 
                    onBlur={this.props.onBlurHandler} onChange={this.props.onChangeHandler} onKeyPress={this.props.keypressHandler} value={this.props.searchValue}/>
                <img className = {this.props.hideImage? "search-img-btn hidden": "search-img-btn"} src = {search} data-testid = "search-icon" alt = "search" onClick={this.props.onclickHandler}/>
            </div>
        );
    };
};

export default SearchInput;