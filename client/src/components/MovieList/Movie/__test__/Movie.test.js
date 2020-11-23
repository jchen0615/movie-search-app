import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Movie from '../Movie'

Enzyme.configure({adapter: new EnzymeAdapter()})

const test_props = {
    movieID: "test-id",
    movieTitle: "test-title",
    moviePoster: "test-poster",
    date: "test-date",
    voteAverage: "test-vote-average"
}

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}
//Needs to test Link

test("'Movie' renders correctly", ()=>{
    const wrapper = shallow(<Movie {...test_props}/>)
    expect(wrapper.find("Link").props().to.pathname).toBe(`/Detail/${test_props.movieID}`)
    /*
    const linkState = expect(wrapper.find("Link").props().to.state)
    console.log(linkState)
    expect(linkState.id).toBe(test_props.movieID)
    expect(linkState.title).toBe(test_props.movieTitle)
    expect(linkState.poster).toBe(test_props.moviePoster)
    expect(linkState.date).toBe(test_props.date)
    expect(linkState.voteAverage).toBe(test_props.voteAverage)
    */
    expect(findByTestId(wrapper, "movie-cover").props().src).toBe(test_props.moviePoster)
    expect(findByTestId(wrapper, "title").text()).toBe(test_props.movieTitle)
    expect(findByTestId(wrapper, "released-date").text()).toBe(`Released date: ${test_props.date}`)
})