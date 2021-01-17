import React, { Component } from 'react';
import './CarouselHorizontal.css';
import SlideCollection from './SlideCollection/SlideCollection';

class CarouselHorizontal extends Component{
    
    state = {
        index: 1
    }
    
    leftArrowHandler=(event)=>{
        this.setState((prevState)=>({
            index: prevState.index-1>0? prevState.index-1:4
        }))
    }

    rightArrowHandler=(event)=>{
        this.setState((prevState)=>({
            index: prevState.index+1<=4? prevState.index+1:1
        }))
    }


    render(){
        return(
            <div className = "carousel-display-horizontal">
                <div className = "carousel-left-arrow-grid">
                    <div className = "carousel-left-arrow" onClick={this.leftArrowHandler}>&lsaquo;</div>
                </div>
                <div className = "carousel-slider-horizontal">
                    <div className = "carousel-slides-horizontal">
                        <SlideCollection movies={this.props.movies.slice(0,4)} first={true} display={this.state.index}/>
                        <SlideCollection movies={this.props.movies.slice(4,8)} first={false}/>
                        <SlideCollection movies={this.props.movies.slice(8,12)} first={false}/>
                        <SlideCollection movies={this.props.movies.slice(12,16)} first={false}/>
                    </div>
                </div>
                <div className = "carousel-right-arrow-grid">
                    <div className = "carousel-right-arrow" onClick={this.rightArrowHandler}>&rsaquo;</div>
                </div>
            </div>
        )
    }
}

export default CarouselHorizontal;