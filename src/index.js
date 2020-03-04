import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import data from './AccessToken.json'

window.apiKey = data.API_Key
axios.defaults.baseURL = 'https://api.themoviedb.org/3'
//axios.defaults.headers.common['Authorization'] = 'Bearer '+data.Token;
/*
axios.interceptors.request.use(request =>{
    console.log(request);
    return request;
})
*/
/*
axios.interceptors.request.use(request =>{
    return request;
}, error=>{
    return Promise.reject(error);
})
*/
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
