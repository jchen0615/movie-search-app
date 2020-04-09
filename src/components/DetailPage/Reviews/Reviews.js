import React, { Component } from 'react'
import './Reviews.css'
import Review from './Review/Review'
import Spinner from '../../UI/Spinner/Spinner'
const Client = require('../../../TMDB_client')

//Component that handles list of 'Review' components in 'Detail' page
class Reviews extends Component{
    
    state = {
        list: null,
        errorMsg: null
    }

    //Gets few reviews for selected movie
    getReviews = (id) =>{
        Client.getReviews(id).then((result)=>{
            this.setState({
                list: result
            })
        })
        .catch((error)=>{
            this.setState({
                errorMsg: error
            })
        })
    }

    componentDidMount(){
        this.getReviews(this.props.id)
    }

    componentDidUpdate(prevProps){
        if(this.props.id!==prevProps.id)
           this.getReviews(this.props.id)
    }

    render(){
    
        let reviewMsg = "Sorry, this movie currently has no reviews..."
        let renderMsg = <p className = "no-reviews">{reviewMsg}</p>

        if(this.state.errorMsg){
        renderMsg = <p>{"Error: "+this.state.errorMsg}</p>
        }else if(this.state.list && this.state.list.length>0){
            renderMsg = this.state.list.map(review =>(
                <Review 
                    author = {review.author}
                    content = {review.content}
                    key = {review.author}/>
                ))
        }

        if(!this.state.list && !this.state.errorMsg){
            return <Spinner/>
        }

        return(
            <div className = "reviews">
                <div className = "header">Reviews</div>
                <div className = "list_reviews">
                    {renderMsg}
                </div>
            </div>
        )
    }
}

export default Reviews