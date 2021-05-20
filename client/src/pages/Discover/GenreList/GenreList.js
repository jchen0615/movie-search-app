import React, { Component } from 'react';
import './GenreList.css'
import search from '../../../images/Search.png';

class GenreList extends Component{

    render(){
        let row = <div className = {"discover-genre-options"} data-index={this.props.index}>
                <div className = "discover-genre-option" data-id="28" onClick={this.props.genreSelectHandler}>ACTION</div>
                <div className = "discover-genre-option" data-id="12" onClick={this.props.genreSelectHandler}>ADVENTURE</div>
                <div className = "discover-genre-option" data-id="16" onClick={this.props.genreSelectHandler}>ANIMATION</div>
                <div className = "discover-genre-option" data-id="35" onClick={this.props.genreSelectHandler}>COMEDY</div>
                <div className = "discover-genre-option" data-id = "80" onClick={this.props.genreSelectHandler}>CRIME</div>
                <div className = "discover-genre-option" data-id = "99" onClick={this.props.genreSelectHandler}>DOCUMENTARY</div>
                <div className = "discover-genre-option" data-id = "18" onClick={this.props.genreSelectHandler}>DRAMA</div>
                <div className = "discover-genre-option" data-id = "10751" onClick={this.props.genreSelectHandler}>FAMILY</div>
                <div className = "discover-genre-option" data-id = "14" onClick={this.props.genreSelectHandler}>FANTASY</div>
                <div className = "discover-genre-option" data-id = "36" onClick={this.props.genreSelectHandler}>HISTORY</div>
                <div className = "discover-genre-option" data-id = "27" onClick={this.props.genreSelectHandler}>HORROR</div>
                <div className = "discover-genre-option" data-id = "10402" onClick={this.props.genreSelectHandler}>MUSIC</div>
                <div className = "discover-genre-option" data-id = "9648" onClick={this.props.genreSelectHandler}>MYSTERY</div>
                <div className = "discover-genre-option" data-id = "10749" onClick={this.props.genreSelectHandler}>ROMANCE</div>
                <div className = "discover-genre-option" data-id = "878" onClick={this.props.genreSelectHandler}>SCI-FI</div>
                <div className = "discover-genre-option" data-id = "10770" onClick={this.props.genreSelectHandler}>TV MOVIE</div>
                <div className = "discover-genre-option" data-id = "53" onClick={this.props.genreSelectHandler}>THRILLER</div>
                <div className = "discover-genre-option" data-id = "10752" onClick={this.props.genreSelectHandler}>WAR</div>
                <div className = "discover-genre-option" data-id = "37" onClick={this.props.genreSelectHandler}>WESTERN</div>
            </div>

        if(this.props.value){
            row= <div className = "discover-genre-select">
                    <p>{this.props.value}</p>
                    <img className = {this.props.hideImage? "search-img-btn hidden": "search-img-btn"} src = {search} data-testid = "search-icon" alt = "search" onClick={this.props.searchClickHandler}/>
                </div>
        }

        return(
                <div className = "discover-genre-list">
                   {row}
                </div>
        );
    };
};

export default GenreList;