import React, {Component} from 'react'
import Spinner from '../../components/UI/Spinner/Spinner'
import './Carousel.css'
import Slide from './Slide/Slide'
import './Carousel.css';

class Carousel extends Component{

    render(){
        return(
            <div className = "carousel-display">
                <input type="radio" name="radio-btn" id="radio1" defaultChecked={true}/>
                <input type="radio" name="radio-btn" id="radio2"/>
                <input type="radio" name="radio-btn" id="radio3"/>
                <input type="radio" name="radio-btn" id="radio4"/>
                <input type="radio" name="radio-btn" id="radio5"/>
                <div className = "carousel-navigation-auto">
                    <div id="auto-btn1"></div>
                    <div id="auto-btn2"></div>
                    <div id="auto-btn3"></div>
                    <div id="auto-btn4"></div>
                    <div id="auto-btn5"></div>
                </div>
                <div className="carousel-navigation-manual">
                    <label htmlFor="radio1" data-index = "1" className="manual-btn" onClick = {this.props.counterHandler}></label>
                    <label htmlFor="radio2" data-index = "2" className="manual-btn" onClick = {this.props.counterHandler}></label>
                    <label htmlFor="radio3" data-index = "3" className="manual-btn" onClick = {this.props.counterHandler}></label>
                    <label htmlFor="radio4" data-index = "4" className="manual-btn" onClick = {this.props.counterHandler}></label>
                    <label htmlFor="radio5" data-index = "5" className="manual-btn" onClick = {this.props.counterHandler}></label>
                </div>
                <div className = "carousel-slider vertical" onMouseEnter={this.props.hoverHandler} onMouseLeave={this.props.hoverHandler}>
                    {this.props.movies.length>0? this.props.movies.map((movie, index) =>{
                        if(index===0){
                            return <Slide first={true} key={movie.id} id={movie.id} title={movie.title} poster={movie.poster} 
                            date={movie.date} voteAverage = {movie.voteAverage} overview = {movie.overview} radio={"radio"+(index+1)}/>
                        }else{
                            return  <Slide first={false} key={movie.id} id={movie.id} title={movie.title} poster={movie.poster} 
                            date={movie.date} voteAverage = {movie.voteAverage} overview = {movie.overview} radio={"radio"+(index+1)}/>
                        }
                    }):<p className = "no-movies" data-testid = "no-movies">Sorry, no movies available at the moment...</p>}
                </div>
            </div>
        )
    }
}

export default Carousel