import React, {Component} from 'react'
import MovieGrid from '../../components/Grids/MovieGrid'
import Spinner from '../../components/UI/Spinner/Spinner'
import CarouselSerivce from '../../service/CarouselService'
import './Carousel.css'
class Carousel extends Component{

    _carouselService = new CarouselSerivce(4, this.props.movies.length)

    state={
        showList: null,
    }

    NextListHandler =()=>{   
        this.setState((prevState, props)=>({
            showList: this._carouselService.getNext(props.movies)
        }))
    }

    PrevListHandler =()=>{
        this.setState((prevState, props)=>({
            showList: this._carouselService.getPrev(props.movies)
        }))
    }
    
    componentDidMount(){
        this.setState({
            showList: this.props.movies.slice(0,4)
        })
    }

    render(){
        if(!this.state.showList)
            return <Spinner/>

        return(
            <div className = 'Carousel'>
                <button type='button' className = 'carousel-left-button' onClick={this.PrevListHandler}>&#8249;</button>
                    <MovieGrid movieType = {this.props.movieType} movies = {this.state.showList}/>
                <button type='button' className = 'carousel-right-button' onClick={this.NextListHandler}>&#8250;</button>
            </div>
        )
    }
}

export default Carousel