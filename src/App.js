import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './containers/Home';
import SearchResult from './containers/SearchResult/SearchResult';
import Detail from './containers/DetailPage/Detail';
import Genre from './containers/GenrePage/Genre'
import About from './components/AboutPage/AboutPage'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path = "/" exact component={Home}/>
        <Route path = "/Detail/:id" exact render = {(props) =><Detail {...props}/>}/>
        <Route path = "/Search" exact render = {(props) => <SearchResult {...props}/>}/>
        <Route path = "/Genre/:genre" exact render = {(props) => <Genre key = {props.location.state.id} {...props}/>}/>
        <Route path = "/Now_Playing" exact render = {(props) => <Genre key="now_playing" {...props}/>}/>
        <Route path = "/About" exact component={About}/>
      </div>
    </BrowserRouter>
  );
}

export default App;