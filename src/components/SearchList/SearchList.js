import React, {Component} from 'react'
import ResultMovie from './ResultMovie/ResultMovie'

class SearchList extends Component{
   
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