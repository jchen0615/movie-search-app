import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import MovieList from '../MovieList'

Enzyme.configure({adapter: new EnzymeAdapter()})

const test_props = {
    movies:[
        {
            id:"test-id-1",
            title: "test-title-1",
            poster: "test-poster-1",
            date: "test-date-1",
            voteAverage: "test-vote-1"
        },
        {
            id:"test-id-2",
            title: "test-title-2",
            poster: "test-poster-2",
            date: "test-date-2",
            voteAverage: "test-vote-2"
        }
    ]
}

describe("'Movie List'", ()=>{
    
    test("renders correctly with list of movies", ()=>{
        const wrapper = shallow(<MovieList {...test_props}/>)
        expect(wrapper).toBeTruthy()
        const list = wrapper.find("Movie")
        expect(list.length).toBe(test_props.movies.length)
        list.forEach((movie, index)=>{
            expect(movie.props().movieID).toBe(test_props.movies[index].id)
            expect(movie.props().movieTitle).toBe(test_props.movies[index].title)
            expect(movie.props().moviePoster).toBe(test_props.movies[index].poster)
            expect(movie.props().date).toBe(test_props.movies[index].date)
            expect(movie.props().voteAverage).toBe(test_props.movies[index].voteAverage)
        })
    })

    test("renders correctly with empty list of movies", ()=>{
        const wrapper = shallow(<MovieList {...{movies:[]}}/>)
        expect(wrapper).toBeTruthy()
        expect(wrapper.find("Movie").length).toBe(0)
        expect(wrapper.find("[data-testid='no-movies']").text()).toBe("Sorry, no movies available at the moment...")
    })

})