import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import MovieGrid from '../MovieGrid'

Enzyme.configure({adapter: new EnzymeAdapter()})

const test_props = {
    movieType: "test",
    movies:["test"]
}

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}

test("'Movie Grid' renders correctly", ()=>{
    const wrapper = shallow(<MovieGrid {...test_props}/>)
    expect(wrapper).toBeTruthy()
    expect(findByTestId(wrapper, "header-grid")).toBeTruthy()
    expect(findByTestId(wrapper, "grid-header").text()).toBe(test_props.movieType)
    expect(findByTestId(wrapper, "grid-list")).toBeTruthy()
    expect(wrapper.find("MovieList").props().movies).toBe(test_props.movies)
})