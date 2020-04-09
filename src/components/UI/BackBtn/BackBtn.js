import React, { Component } from 'react'
import './BackBtn.css'

//Back button that takes user to previous page
class BackBtn extends Component{

    goBack =()=>{
        this.props.goBack();
    }

    render(){
        return(
            <button type='button' className = "back-btn" onClick = {this.goBack}>&#8249;&nbsp;Back</button>
        )
    }
}


export default BackBtn