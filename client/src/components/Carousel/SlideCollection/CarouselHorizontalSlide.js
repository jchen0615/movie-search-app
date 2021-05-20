import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CarouselHorizontalSlide.css'

class CarouselHorizontalSlide extends Component{

    render(){

        return(
                <div className = "carousel-slide-horizontal">
                     <Link to = {{
                        pathname: "/Detail/"+this.props.id,
                        state:{
                            id: this.props.id,
                            title: this.props.title,
                            poster: this.props.poster,
                            date: this.props.date,
                            voteAverage: this.props.voteAverage
                        }
                    }}>
                    <div className = "carousel-slide-image-horizontal">
                        <img src={this.props.poster? this.props.poster : require("../../../images/noImage.png")}/>
                    </div>
                    <div className = "carousel-slide-text-horizontal">
                        <div className = "carousel-slide-title-horizontal">{this.props.title}</div>
                        {/*  <div className = "carousel-slide-released-date" data-testid = "released-date">
                            <p className = "carousel-slide-date-header">Released date: </p>
                            <p className = "carousel-slide-date-text">{this.props.date}</p>
                        </div>*/}
                    </div>
                    </Link>
                </div>
        )
    }
}

export default CarouselHorizontalSlide;