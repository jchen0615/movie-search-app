import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Movie from '../Movie'

Enzyme.configure({adapter: new EnzymeAdapter()})

const test_props = {
    movieID: "test-id",
    movieTitle: "test-title",
    moviePoster: "test-poster",
}

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}
//Needs to test Link

test("'Movie' renders correctly", ()=>{
    const wrapper = shallow(<Movie {...test_props}/>)
    expect(wrapper.find("Link").props().to.pathname).toBe(`/Detail/${test_props.movieID}`)
    expect(findByTestId(wrapper, "movie-cover").props().src).toBe(test_props.moviePoster)
    expect(findByTestId(wrapper, "title").text()).toBe(test_props.movieTitle)
})