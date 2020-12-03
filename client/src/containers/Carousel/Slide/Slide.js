import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Slide extends Component{

    render(){

        let name = this.props.first? "carousel-slide first":"carousel-slide";
        return(
                <div className = {name}>
                     <Link to = {{
                        pathname: "/Detail/"+this.props.id,
                        state:{
                            id: this.props.id,
                            title: this.props.title,
                            poster: this.props.poster,
                            date: this.props.date,
                            voteAverage: this.props.voteAverage
                        }
                    }}><div className = {"read-more-text "+this.props.radio}>READ MORE</div></Link>
                    <div className = "carousel-slide-image">
                        <img src={this.props.poster? this.props.poster : require("../../../images/noImage.png")}/>
                    </div>
                    <div className = "carousel-slide-text">
                        <div className = "carousel-slide-title">{this.props.title}</div>
                        <div className = "carousel-slide-overview">
                            <div className = "start-quotation">"</div>
                                {this.props.overview.length>160? this.props.overview.slice(0, 160)+"...":this.props.overview}
                            <div className = "end-quotation">"</div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Slide