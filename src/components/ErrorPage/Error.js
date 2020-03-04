import React, {Component} from 'react'
import Navigation from '../UI/NavigationBar/Navigation'
import './Error.css'

class Error extends Component{
    render(){
        return(
            <div className = 'error-message'>
                <Navigation />
                <div className = 'error-text'>Sorry, an error has occurred...Please try again.</div>
            </div>
        )
    }
}

export default Error
