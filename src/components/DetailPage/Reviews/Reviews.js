import React, { Component } from 'react'
import axios from 'axios'
import './Reviews.css'
import Review from './Review/Review'
import Spinner from '../../UI/Spinner/Spinner'
const key = require('../../../GlobalKey')

class Reviews extends Component{
    
    state = {
        list: null,
        error: false
    }

    getReviews(){
        axios.get("/movie/"+this.props.id+"/reviews"+key.apiKey)
        .then(response=> {
            let results = response.data.results.length<=8? response.data.results : response.data.results.slice(0,8)
            results =  results.filter(function(element){
                return element.content.length<1000
            })
            results.map(review=>{
                return {
                    author: review.author,
                    content: review.content
                }
            })
            
            this.setState({
                list: results,
            })
        }).catch(error=>{
            this.setState({
                error:true
            })
        })
    }

    componentDidMount(){
        this.getReviews()
    }

    componentDidUpdate(prevProps){
        if(this.props.id!==prevProps.id)
           this.getReviews()
    }

    render(){
    
        let reviewMsg = "Sorry, this movie currently has no reviews..."
        if(this.state.error){
            reviewMsg = "Sorry, an error has occurred..."
        }
        if(!this.state.list){
            return(
                <Spinner/>
            )
        }

        return(
            <div className = "reviews">
                <div className = "header">Reviews</div>
                {this.state.list.length>0? this.state.list.map(review =>(
                        <Review author = {review.author} content = {review.content} key = {review.author}/>
                )): <p className = "no-reviews">{reviewMsg}</p>}
            </div>
        )
    }
}

export default Reviews