import React, { Component } from 'react'
import './Review.css'

class Review extends Component{
    render(){
        return(
            <div className = "review">
                <div className = "author">Author: {this.props.author}</div>
                <div className = 'content'> --- "{this.props.content}"</div>
            </div>
        )
    }
}

export default Review