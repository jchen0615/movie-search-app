import React, { Component } from 'react'
import './PageNavigation.css'

class PageNavigation extends Component{

    nextPageHandler =()=>{
        if(!this.props.lastPage){
            this.props.setState((prevState)=>{
                return{
                    pageNumber: prevState.pageNumber+1,
                    loading: true,
                }
            })
        }
    }

    prevPageHandler =()=>{
        if(this.props.pageNumber!==1){
            this.props.setState((prevState)=>{
                return{
                    pageNumber: prevState.pageNumber-1,
                    loading: true,
                }
            })
        }
    }

    render(){
        return(
            <div className = "page-navigation">
                <button type = "button" className = "prev-page" onClick ={this.prevPageHandler}>Previous page</button>
                <div className = "current-page"> {this.props.pageNumber}</div>
                <button type = "button" className = 'next-page' onClick ={this.nextPageHandler}>Next page</button>
            </div>
        )
    }
}

export default PageNavigation