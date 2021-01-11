import React, { Component } from 'react'
import './PageNavigation.css'

//Component that holds 'prev' and 'next' page when navigate through pages
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
                <button type = "button" id = "prev-page" data-testid = "prev-page" onClick ={this.prevPageHandler}>Previous page</button>
                <div id = "current-page" data-testid="current-page">{this.props.pageNumber}</div>
                <button type = "button" id = 'next-page' data-testid = "next-page" onClick ={this.nextPageHandler}>Next page</button>
            </div>
        )
    }
}

export default PageNavigation