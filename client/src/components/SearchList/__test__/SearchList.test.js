import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import SearchList from '../SearchList'

Enzyme.configure({adapter: new EnzymeAdapter()})

const test_props = {
    list:[
        {
            id:"test-id-1",
            title: "test-title-1",
            poster: "test-poster-1",
            date: "test-date-1",
            voteAverage: "test-vote-1",
            overview: "test-overview-1"
        },
        {
            id:"test-id-2",
            title: "test-title-2",
            poster: "test-poster-2",
            date: "test-date-2",
            voteAverage: "test-vote-2",
            overview: "test-overview-2"
        }
    ]
}

describe("'Search List'", ()=>{
    
    test("renders correctly with list of movies", ()=>{
        const wrapper = shallow(<SearchList {...test_props}/>)
        const list = wrapper.find("ResultMovie")
        expect(list.length).toBe(test_props.list.length)
        list.forEach((movie, index)=>{
            expect(movie.props().movieID).toBe(test_props.list[index].id)
            expect(movie.props().movieTitle).toBe(test_props.list[index].title)
            expect(movie.props().moviePoster).toBe(test_props.list[index].poster)
            expect(movie.props().date).toBe(test_props.list[index].date)
            expect(movie.props().voteAverage).toBe(test_props.list[index].voteAverage)
            expect(movie.props().overview).toBe(test_props.list[index].overview)
        })
    })

    test("renders correctly with empty list of movies", ()=>{
        const wrapper = shallow(<SearchList {...{list:[]}}/>)
        expect(wrapper.find("ResultMovie").length).toBe(0)
    })

})