import React, {Component} from 'react'
import ResultMovie from './ResultMovie/ResultMovie'

//Component that holds list of 'movies' for search page
class SearchList extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return this.props.list[0].id!==nextProps.list[0].id
    }

    render(){
        return(
            <div className = "search-list">
                {this.props.list.map(movie =>(
                    <ResultMovie movieID={movie.id} key = {movie.id} movieTitle={movie.title} moviePoster={movie.poster} 
                    date={movie.date} voteAverage={movie.voteAverage} overview={movie.overview}/>
                ))}
            </div>
        )
    }
}

export default SearchList