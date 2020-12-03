import React, { Component } from 'react'
import './Reviews.css'
import Review from './Review/Review'

//Component that renders a list of 'Review' components in 'Detail' page
class Reviews extends Component{

    render(){
    
        let reviewMsg = <p className = "no-reviews-text">Sorry, this movie currently has no reviews...</p>;
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
                <div className = "reviews_header" data-testid = "header">Reviews</div>
                <div className = "list_reviews" data-testid = "list-reviews">
                    {reviewMsg}
                </div>
            </div>
        )
    }
}

export default Reviews