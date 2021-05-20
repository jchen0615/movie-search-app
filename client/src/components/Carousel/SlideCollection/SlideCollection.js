import React, {Component} from 'react';
import './SlideCollection.css';
import CarouselHorizontalSlide from './CarouselHorizontalSlide';

class SlideColection extends Component{
    render(){
        let name = this.props.first?"carousel-slides-collection first display"+this.props.display:"carousel-slides-collection"
        return(
            <div className={name}>
                {this.props.movies.map((movie)=> {return <CarouselHorizontalSlide key={movie.id} id={movie.id} title={movie.title} poster={movie.poster}
                        date={movie.date} voteAverage = {movie.voteAverage}/>
            })}
            </div>
        )
    }
}

export default SlideColection;