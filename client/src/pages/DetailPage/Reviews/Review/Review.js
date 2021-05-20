import React, { Component } from 'react'
import './Review.css'

//Component for individual reviews for selected movie
class Review extends Component{
    render(){
        return(
            <div className = "review">
                <div className = "author" data-testid = "author">Author: {this.props.author}</div>
                <div className = 'content' data-testid = "content"> --- "{this.props.content}"</div>
            </div>
        )
    }
}

export default Review