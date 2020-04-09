import React, { Component } from 'react';
import './GeneralInfo.css';

//Component that holds general information for 'Detail' page
class GeneralInfo extends Component{
   
    render(){

        let video = <div className = "no_video">No trailer available</div>
        if(this.props.video){
            video = <iframe className = "video" title = "trailer" key = {this.props.video} src={this.props.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        }        

        return(
            <div>
                <div className = 'overview-grid'>
                    <img className = "detail-cover" src = {this.props.poster} alt = {this.props.title}/>
                    <div className = 'detail-title'>{this.props.title}</div>
                    <div className = 'detail-overview'>{this.props.overview}</div>
                    <div className = 'tagline'>{this.props.tagline}</div>
                </div>
                <div className = 'general-info'>
                    <ul className = 'info'>
                        <li>Duration:&nbsp;{this.props.hours?this.props.hours+" H "+this.props.minutes+" MIN":"No Information Available"}</li>
                        <li>Released: &nbsp; {this.props.date}</li>
                        <li>Genre: &nbsp; {this.props.genre}</li>
                        <li>Vote Rating Average: &nbsp;{this.props.vote}</li>
                    </ul>
                    {video}
                </div>
            </div>
        )
    }
}

export default GeneralInfo