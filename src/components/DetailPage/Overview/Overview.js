import React, { PureComponent } from 'react';
import './Overview.css';

const posterString = "http://image.tmdb.org/t/p/w342";

class Overview extends PureComponent{

    render(){     
        return(
            <div className = 'overview-grid'>
                <img className = "detail-cover" src = {posterString + this.props.poster} alt = {this.props.title}/>
                <div className = 'detail-title'>{this.props.title}</div>
                <div className = 'detail-overview'>{this.props.overview}</div>
                <div className = 'tagline'>"{this.props.tagline}"</div>
            </div>
        )
    }
}

export default Overview;