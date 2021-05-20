import React, { Component } from 'react';
import './GeneralInfo.css';

//Component that holds general information for 'Detail' page
class GeneralInfo extends Component{
   
    render(){

        let video = <div className = "no-video-box" data-testid = "no_video">
                        <div className = "no-video-text">No trailer available</div>
                    </div>
        if(this.props.video){
            video = <iframe className = "video" data-testid = "video" title = "trailer" key = {this.props.video} src={this.props.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        }        

        return(
            <div className = "detail-general-grid">
                <div className = "detail-left-grid">
                    <img className = "detail-cover-image" data-testid = "detail-cover" src = {this.props.poster} alt = {this.props.title}/>
                    <ul className = 'info' data-testid = "info">
                    <li data-testid = "duration">Duration:&nbsp;{this.props.hours?this.props.hours+" H "+this.props.minutes+" MIN":"No Information Available"}</li>
                    <li data-testid = "released-date">Released: &nbsp; {this.props.date}</li>
                    <li data-testid = "genre">Genre: &nbsp; {this.props.genre}</li>
                    <li data-testid = "rating">Vote Rating Average: &nbsp;{this.props.vote}</li>
                </ul>
                </div>
                <div className = "detail-right-grid">
                    <div className = 'detail-title' data-testid = "detail-title">{this.props.title}</div>
                    <div className = 'detail-overview' data-testid = "detail-overview">{this.props.overview}</div>
                        <div className = 'tagline' data-testid = "tagline">{this.props.tagline}</div>
                    {video}
                </div>
            </div>
        )
    }
}

export default GeneralInfo