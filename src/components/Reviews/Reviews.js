import React, { Component } from 'react'
import './Reviews.css'
import Review from './Review/Review'
import Spinner from '../UI/Spinner/Spinner'

//Component that renders a list of 'Review' components in 'Detail' page
class Reviews extends Component{

    render(){
    
        let reviewMsg = "Sorry, this movie currently has no reviews..."
        if(this.props.list && this.props.list.length>0){
            reviewMsg = this.props.list.map(review =>(
                <Review 
                    author = {review.author}
                    content = {review.content}
                    key = {review.author}/>
                ))
        }

        return(
            <div className = "reviews">
                <div className = "header">Reviews</div>
                <div className = "list_reviews">
                    {reviewMsg}
                </div>
            </div>
        )
    }
}

export default Reviews