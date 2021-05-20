import React, { Component } from 'react';
import './DiscoverInput.css';
import search from '../../../images/Search.png';

class DiscoverInput extends Component{
    render(){
        let results = <div className="search-no-result">No Results Available</div>
        if(this.props.results && this.props.results.length>0){
            results = this.props.results.map((result)=>{
                return <div className="simple-search-row" key={result.id} data-id={result.id } onClick={this.props.searchRowClickHandler}>{result.name}</div>
            })
        }


        return(
            <div className = "discover-input">
                <input type="text" data-testid="discover-input"  data-index = {this.props.index} placeholder = {this.props.type ==="YEAR"? "Enter release year between 1874 and 2021...":"Enter your value here..." } onFocus={this.props.onfocusHandler} 
                    onBlur={this.props.onBlurHandler} onChange={this.props.onChangeHandler} onKeyPress={this.props.keypressHandler} value={this.props.searchValue}/>
                <img className = {this.props.hideImage? "search-img-btn hidden": "search-img-btn"} src = {search} data-testid = "search-icon" alt = "search" onClick={this.props.searchClickHandler}/>
                <div className = {`discover-input-results ${this.props.results?"active":""}`} data-index = {this.props.index}>
                    {results}
                </div>
            </div>
        );
    };
};

export default DiscoverInput;