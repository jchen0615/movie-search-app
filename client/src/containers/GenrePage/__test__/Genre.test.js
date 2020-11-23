import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Genre from '../Genre';
import {mockData as mockData} from '../../../../__mocks__/data.json';

Enzyme.configure({adapter: new EnzymeAdapter()})
window.scrollTo = jest.fn();

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

const test_props_now = {
    location:{
        state: {
            now: true,
            id: null
        }
    },
    match:{
        params:{
            genre: null
        }
    }
}

const test_props_genre = {
    location:{
        state: {
            now: false,
            id: "test-id"
        }
    },
    match:{
        params:{
            genre: "Test genre"
        }
    }
}

describe("'Genre page'", ()=>{
    const wrapper = shallow(<Genre {...test_props_genre}/>, {disableLifecycleMethods: true})
    wrapper.instance().getMoviesByGenre = jest.fn()

    test("renders correctly when still loading", ()=>{
        expect(wrapper.find("Spinner")).toBeTruthy()
    })

    test("renders correctly when finish loading", ()=>{
        wrapper.setState(test_state)
        wrapper.setState({loading:false})
        expect(wrapper.find("NavigationBar").length).toBe(1)
        expect(wrapper.find("MovieGrid").length).toBe(1)
        expect(wrapper.find("MovieGrid").props().movieType).toBe(test_props_genre.match.params.genre)
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
    const wrapper = shallow(<Genre {...test_props_now}/>, {disableLifecycleMethods: true})
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


describe("Fetch data from TMDb", ()=>{

    const movieList = mockData.genre.data.movieList;
    const totalPages = mockData.genre.data.totalPages;
    const errorMsg = mockData.error.response.data.errorMsg;
    const backendErrorMsg = mockData.backendError.response.statusText;

    const api_error_props ={
        location:{
            state:{
                id: "test_api_error"
            }
        },
        history:{
            goBack: jest.fn()
        }
    }
    
    const backend_error_props ={
        location:{
            state:{
                id: "test_backend_error"
            }
        },
        history:{
            goBack: jest.fn()
        }
    }
    
    jest.mock("axios");
    
    test("'Genre page' fetches data from TMDb API", (done)=>{
        const wrapper = shallow(<Genre {...test_props_genre}/>)
        setTimeout(()=>{
            wrapper.update()
            const state = wrapper.instance().state;
            expect(state.movies).toEqual(movieList);
            expect(state.totalPages).toEqual(totalPages);
            done();
        })
    })

    test("'Now Playing' page fetches data from TMDb API", (done)=>{
        const wrapper = shallow(<Genre {...test_props_now}/>)
        setTimeout(()=>{
            wrapper.update()
            const state = wrapper.instance().state;
            expect(state.movies).toEqual(movieList);
            expect(state.totalPages).toEqual(totalPages);
            done();
        })
    })

    test("displays error message if request to TMDb fails", (done)=>{
        const wrapper = shallow(<Genre {...api_error_props}/>);
        setTimeout(()=>{
            wrapper.update();
            expect(wrapper.instance().state.errorMsg).toEqual(errorMsg);
            expect(wrapper.find("Spinner").length).toBe(0)
            expect(wrapper.find("Error").length).toBe(1)
            done();
        })
    })

    test("displays error message if request to backend fails", (done)=>{
        const wrapper = shallow(<Genre {...backend_error_props}/>);
        setTimeout(()=>{
            wrapper.update();
            expect(wrapper.instance().state.errorMsg).toEqual(backendErrorMsg);
            expect(wrapper.find("Spinner").length).toBe(0)
            expect(wrapper.find("Error").length).toBe(1)
            done();
        })
    })
})
