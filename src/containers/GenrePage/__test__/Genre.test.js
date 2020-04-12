import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Genre from '../Genre'

Enzyme.configure({adapter: new EnzymeAdapter()})

const test_state = {
    id: "test-id",
    movies: ["test-movie-1", "test-movie-2"],
    pageNumber: 1,
    releaseYear: 2020,
    totalPages: 20,
    lastPage: 20,
    loading: true,
    errorMsg: null
}

const test_props_true = {
    location:{
        state: {
            now: true
        }
    },
    match:{
        params:{
            genre: null
        }
    }
}

const test_props_false = {
    location:{
        state: {
            now: false
        }
    },
    match:{
        params:{
            genre: "Test genre"
        }
    }
}

describe("'Genre page'", ()=>{
    const wrapper = shallow(<Genre {...test_props_false}/>, {disableLifecycleMethods: true})
    wrapper.instance().getMoviesByGenre = jest.fn()

    test("renders correctly when still loading", ()=>{
        expect(wrapper.find("Spinner")).toBeTruthy()
    })

    test("renders correctly when finish loading", ()=>{
        wrapper.setState(test_state)
        wrapper.setState({loading:false})
        expect(wrapper.find("NavigationBar").length).toBe(1)
        expect(wrapper.find("MovieGrid").length).toBe(1)
        expect(wrapper.find("MovieGrid").props().movieType).toBe(test_props_false.match.params.genre)
        expect(wrapper.find("MovieGrid").props().movies).toBe(test_state.movies)
        expect(wrapper.find("PageNavigation").length).toBe(1)
    })

    test("renders correctly when encounter error", ()=>{
        wrapper.setState({errorMsg: "Test"})
        expect(wrapper.find("Error")).toBeTruthy()
    })

    test("calls getMoviesByGenre function on mount", ()=>{
        const spy = jest.spyOn(wrapper.instance(), 'getMoviesByGenre')
        wrapper.instance().componentDidMount()
        expect(spy).toHaveBeenCalled()
        spy.mockClear()
    })
})

describe("'Now Playing page'", ()=>{
    const wrapper = shallow(<Genre {...test_props_true}/>, {disableLifecycleMethods: true})
    wrapper.instance().getNowPlaying = jest.fn()

    test("renders correctly when still loading", ()=>{
        expect(wrapper.find("Spinner")).toBeTruthy()
    })

    test("renders correctly when finish loading", ()=>{
        wrapper.setState(test_state)
        wrapper.setState({loading:false})
        expect(wrapper.find("NavigationBar").length).toBe(1)
        expect(wrapper.find("MovieGrid").length).toBe(1)
        expect(wrapper.find("MovieGrid").props().movieType).toBe("Now Playing")
        expect(wrapper.find("MovieGrid").props().movies).toBe(test_state.movies)
        expect(wrapper.find("PageNavigation").length).toBe(1)
    })

    test("renders correctly when encounter error", ()=>{
        wrapper.setState({errorMsg: "Test"})
        expect(wrapper.find("Error")).toBeTruthy()
    })

    test("calls getNowPlaying function on mount", ()=>{
        const spy = jest.spyOn(wrapper.instance(), 'getNowPlaying')
        wrapper.instance().componentDidMount()
        expect(spy).toHaveBeenCalled()
        spy.mockClear()
    })
})