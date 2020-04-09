import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import axios from 'axios';
import data from './AccessToken.json'

window.apiKey = data.API_Key
axios.defaults.baseURL = 'https://api.themoviedb.org/3'

ReactDOM.render(<App/>, document.getElementById('app'))