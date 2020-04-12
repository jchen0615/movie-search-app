import React, {Component} from 'react'
import Navigation from '../UI/NavigationBar/Navigation'
import './Error.css'

//Component that is rendered when an error occurs
class Error extends Component{
    render(){
        return(
            <div className = 'error-message' data-testid = 'error-message'>
                <Navigation/>
                <div className = 'error-text' data-testid='error-text'>Ooops, an error has occurred...Please try again. <br/>Error message: {this.props.msg?this.props.msg:"No message received"}</div>
            </div>
        )
    }
}

export default Error
