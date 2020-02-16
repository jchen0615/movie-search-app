import React, { Component } from 'react'
import './BackBtn.css'

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