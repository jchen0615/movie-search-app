import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import SearchResult from './pages/SearchResult/SearchResult';
import Detail from './pages/DetailPage/Detail';
import Genre from './pages/GenrePage/Genre'
import About from './pages/AboutPage/AboutPage'


function App() {
  return (
    <BrowserRouter>
      <div className="App" data-testid = "App">
        <Route path = "/" exact component={Home}/>
        <Route path = "/Detail/:id" exact component = {Detail}/>
        <Route path = "/Search" exact render = {(props) => <SearchResult {...props}/>}/>
        <Route path = "/Discover" exact render = {(props) => <SearchResult {...props}/>}/>
        <Route path = "/Genre/:genre" exact render = {(props) => <Genre key = {props.location.state.id} {...props}/>}/>
        <Route path = "/Now_Playing" exact render = {(props) => <Genre key="now_playing" {...props}/>}/>
        <Route path = "/About" exact component={About}/>
      </div>
    </BrowserRouter>
  );
}

export default App;