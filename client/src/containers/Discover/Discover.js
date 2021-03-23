import React, { Component } from 'react';
import './Discover.css';
import DiscoverInput from './DiscoverInput/DiscoverInput';
import GenreList from './GenreList/GenreList';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Discover extends Component{

    state = {
        rows:[{key:"", value:"", results: null, added:false}],
        autocompleteValue: "",
        focused: false,
        errorMsg: null,
        index:0,
        search: false
    }

    //Send get request to backend
    getPeople =(value, index)=>{
        axios.get("/api/person_id", {params: {searchValue:value}}).then(response =>{
            let newRows=this.state.rows;
            newRows[index].results=response.data.list;
            this.setState({
                rows: newRows
            })
        }).catch((error)=>{
            this.setState({
                errorMsg: error.response.data.errorMsg? error.response.data.errorMsg: error.response.statusText,
            })
        })
    }

    //Handles click on search button
    searchClickHandler = (event) =>{
        this.setState({
            search:true
        })
    }

    //Stores user input value
    inputHandler = (event) =>{
        const index = parseInt(event.target.getAttribute("data-index"));
        let newRows = this.state.rows;
        newRows[index].value = event.target.value;
        this.setState({rows: newRows}, function(){})
    }

    searchRowClickHandler = (event) =>{
        let index=parseInt(event.target.parentElement.getAttribute("data-index"));
        let newRows = this.state.rows;
        newRows[index].value = event.target.textContent;
        newRows[index].id = event.target.getAttribute("data-id");
        newRows[index].results = null;
        this.setState({rows:newRows, autocompleteValue: ""}, function(){})
    }

    genreSelectHandler = (event) =>{
        const index = parseInt(event.target.parentElement.getAttribute("data-index"));
        let newRows = this.state.rows;
        newRows[index].value=event.target.textContent;
        newRows[index].id=event.target.getAttribute("data-id");

        this.setState({rows: newRows})
    }

    autocompleteHandler = (event)=>{
        const index = parseInt(event.target.getAttribute("data-index"));
        
        this.setState({ focused: true}, function(){
            const intervalID = setInterval(()=>{
                if(this.state.focused){
                    if(this.state.rows[index].value === ""){
                        this.setState({
                            results: null
                        })
                    }
                    else if((this.state.autocompleteValue!==this.state.rows[index].value)){
                        this.setState({
                            autocompleteValue: this.state.rows[index].value
                        }, this.getPeople(this.state.autocompleteValue, index))
                    }
                }
                else{
                    clearInterval(intervalID);
                }
            }, 200);
        })
    }

    onBlurHandler = (event)=>{
        const index = parseInt(event.target.getAttribute("data-index"));
        let newRows = this.state.rows;
        if(newRows[index].results.length>0){
            newRows[index].value = newRows[index].results[0].name;
            newRows[index].id = newRows[index].results[0].id;
            newRows[index].results = null;
        }

        this.setState({ 
            focused: false,
            rows: newRows,
            autocompleteValue: newRows[index].value
        })
    }

    addbtnHandler=(event)=>{
        const index = parseInt(event.target.getAttribute("data-index"));
        let newRows = this.state.rows;
        
        if(event.target.className.includes("active")){
            if(this.state.index===1){
                this.setState({rows: [{key:"", value:"", results: null, added:false}],  index:0})
            }else if(this.state.index===6){
                let newRows = this.state.rows;
                newRows[index]={key:"", value:"", results: null, added:false}
                this.setState({rows: newRows,  index:5})
            }else{
                newRows.splice(index, 1);
                this.setState((prevState)=>({
                    rows: newRows,  
                    index:prevState.index-1, 
                    autocompleteValue:"",
                }))
            }
        }else{
            newRows[index].added = true;
            this.setState((prevState)=>({
                index: prevState.index+1,
                rows: newRows,
                autocompleteValue:"",
            }))
        }
    }

    optionBtnClickHandler=(event)=>{
        if(!event.target.className.includes("active")){
            const index = parseInt(event.target.parentElement.getAttribute("data-index"));
            
            let newRows = this.state.rows;
            newRows[index].key = event.target.getAttribute("data-key");
            if(index<5){
                newRows = [...newRows,{key:"", value:"", results: null, added:false}]
            }

            this.setState({
                rows: newRows
            })
        }
    }    

    render(){

        if(this.state.search){ 
            let search = {
                KEYWORD:"",
                CAST:"",
                GENRE:"",
                YEAR:""
            }

            this.state.rows.map((row)=>{
                if(row.added){
                    if(search[row.key].length>0){
                        search[row.key] = `${search[row.key]}, ${row.key==="CAST"||row.key==="GENRE"? row.id : row.value}`;
                    }else{
                        search[row.key] = row.key==="CAST"||row.key==="GENRE"? row.id : row.value;
                    }
                }
            });

            return(
                <Redirect to = {{
                    pathname: "/Discover",
                    state: search
                }}/>
            )
        }
        
        let rows = this.state.rows.map((row, index)=>{
            return <div className = "discover-row" key={"discover-row-"+index}>
                <button className = {row.added?"discover-add-btn active":"discover-add-btn"} data-index = {index} type="button" onClick={this.addbtnHandler}>+</button>
                {/*<input className = {row.added?"discover-add-btn active":"discover-add-btn"} data-index = {index} type="button" onClick={this.addbtnHandler}/>*/}
                <ul className = {row.key?"discover-option-list hidden":"discover-option-list"} data-index = {index}>
                    <li className = "discover-option-btn" data-key="KEYWORD" onClick = {this.optionBtnClickHandler}>KEYWORD</li>
                    <li className = "discover-option-btn" data-key="GENRE" onClick = {this.optionBtnClickHandler}>GENRE</li>
                    <li className = "discover-option-btn" data-key="CAST" onClick = {this.optionBtnClickHandler}>CAST/CREW</li>
                    <li className = "discover-option-btn" data-key="YEAR" onClick = {this.optionBtnClickHandler}>RELEASE YEAR</li>
                </ul>
                <div className = {row.key?"selected-discover-option active":"selected-discover-option"}>{row.key?row.key+": ":""}</div>
                {row.key==="GENRE"?  <GenreList index={index} value={row.value}  hideImage={index<this.state.index-1? true:false} genreSelectHandler={this.genreSelectHandler}
                searchClickHandler={this.searchClickHandler}/>: 
                <div className = "discover-search-input">
                    <DiscoverInput index = {index} type={row.key}
                        onfocusHandler={row.key==="CAST"? this.autocompleteHandler:null} onBlurHandler={this.onBlurHandler} onChangeHandler={this.inputHandler}
                        keypressHandler={null} searchValue={row.value} searchClickHandler={this.searchClickHandler}
                        hideImage={index<this.state.index-1? true:false} results = {row.results} searchRowClickHandler={this.searchRowClickHandler}/> 
                </div>}
               
            </div>
        })

        return(
            <div className = "movie-discover-form">
                {rows}
            </div>
        );
    };
};

export default Discover;