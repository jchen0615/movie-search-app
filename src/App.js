import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './containers/Home';
import SearchResult from './containers/SearchResult/SearchResult';
import Detail from './components/DetailPage/Detail';
import Genre from './containers/GenrePage/Genre'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path = "/" exact component={Home}/>
        <Route path = "/Detail/:id" exact render = {(props) =><Detail {...props}/>}/>
        <Route path = "/Search" exact render = {(props) => <SearchResult {...props}/>}/>
        <Route path = "/Genre/:genre" exact render = {(props) => <Genre {...props}/>}/>
      </div>
    </BrowserRouter>
  );
}

export default App;

// <Route path = "/Search" exact render = {(props) => <Search {...props}/>}/>