import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import ResultMovie from '../ResultMovie'

Enzyme.configure({adapter: new EnzymeAdapter()})

const test_props = {
    movieID: "test-id-1",
    movieTitle: "test-title-1",
    moviePoster: "test-poster-1",
    date: "test-date-1",
    voteAverage: "test-vote-1",
    overview: "test-overview-1"
}

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}

describe("'Result Movie'", ()=>{

    test("renders correctly with props", ()=>{
        const wrapper = shallow(<ResultMovie {...test_props}/>)
        expect(wrapper.find("Link").props().to.pathname).toBe("/Detail/"+test_props.movieID)
        expect(findByTestId(wrapper, "search-movie-cover").props().src).toBe(test_props.moviePoster)
        expect(findByTestId(wrapper, "search-info")).toBeTruthy()
        expect(findByTestId(wrapper, "search-title").text()).toBe(`${test_props.movieTitle} | Released: ${test_props.date}`)
        expect(findByTestId(wrapper, "search-overview").text()).toBe(` ---\"${test_props.overview}\"`)
    })

    test("renders correctly without poster", ()=>{
        const wrapper = shallow(<ResultMovie/>)
        expect(findByTestId(wrapper, "search-movie-cover").props().src).toBe("test-file-stub")
    })

})