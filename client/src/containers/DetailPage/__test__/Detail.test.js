import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Detail from '../Detail';
import {mockData as mockData} from '../../../../__mocks__/data.json';

Enzyme.configure({adapter: new EnzymeAdapter()})

const test_props = {
    match:{
        params:{
            id: "test_id",
        }
    },
    history:{
        goBack: jest.fn()
    }
}

const test_state = {
    title: "test_title",
    similarMovies: ["test_movie-1", "test_movie-2"],
    overview: "test_overview",
    genre: "test_genre",
    tagline: "test_tagline",
    hours: "test_horus",
    minutes: "test_minutes",
    video: "test_video",
    reviews: "test_reviews",
    voteAverage: "test_voteAverage",
    releaseDate: "test_releaseDate",
    poster: "test_poster",
    errorMsg: null,
    loading:false
}

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}

describe("'Detail'", ()=>{

    const wrapper = shallow(<Detail {...test_props}/>, {disableLifecycleMethods: true})
    wrapper.instance().getDetail = jest.fn()
    let spy
    afterEach(()=>{
        spy.mockClear()
    })

    test("calls 'getDetail' function when mount", ()=>{
        spy = jest.spyOn(wrapper.instance(), 'getDetail')
        wrapper.instance().componentDidMount()
        expect(spy).toHaveBeenCalled()
    })

    test("renders correctly with error message", ()=>{
        wrapper.setState({errorMsg: "test_error_message", loading:false})
        expect(wrapper.state().errorMsg).toBe("test_error_message");
        expect(wrapper.find("Error").length).toBe(1);
        expect(wrapper.find("Spinner").length).toBe(0);
    })

    test("render loading correctly when no error message received", ()=>{
        wrapper.setState({loading: true})
        wrapper.setState({errorMsg: null})
        expect(wrapper.state().errorMsg).toBeFalsy()
        expect(wrapper.find("Spinner").length).toBe(1)
    })

    test("render correctly when finish loading", ()=>{
        wrapper.setState(test_state);
        expect(wrapper.find("Spinner").length).toBe(0)
        expect(wrapper.find("Error").length).toBe(0)
        expect(wrapper.find("BackBtn")).toBeTruthy()
        expect(wrapper.find("Navigation")).toBeTruthy()
        expect(wrapper.find("GeneralInfo").length).toBe(1)
        const info = wrapper.find("GeneralInfo").props()

        //Check general info has correct props
        expect(info.id).toBe(test_props.match.params.id)
        expect(info.title).toBe(test_state.title)
        expect(info.date).toBe(test_state.releaseDate)
        expect(info.vote).toBe(test_state.voteAverage)
        expect(info.poster).toBe(test_state.poster)
        expect(info.overview).toBe(test_state.overview)
        expect(info.genre).toBe(test_state.genre)
        expect(info.tagline).toBe(test_state.tagline)
        expect(info.hours).toBe(test_state.hours)
        expect(info.minutes).toBe(test_state.minutes)
        expect(info.video).toBe(test_state.video)
        
        expect(wrapper.find("Reviews").props().list).toMatch(test_state.reviews)
        expect(wrapper.find("CarouselHorizontal").props().movies).toBe(test_state.similarMovies)
    })
})


describe("Detail page fetch", ()=>{
     
    const mockDetailData = mockData.detail.data;
    const detail = mockDetailData.detail;
    const errorMsg = mockData.error.response.data.errorMsg;
    const backendErrorMsg = mockData.backendError.response.statusText;

    const api_error_props ={
        match:{
            params:{
                id: "test_api_error"
            }
        },
        history:{
            goBack: jest.fn()
        }
    }
    
    const backend_error_props ={
        match:{
            params:{
                id: "test_backend_error"
            }
        },
        history:{
            goBack: jest.fn()
        }
    }
    
    window.scrollTo = jest.fn();
    jest.mock("axios")
    test("fetches movie detail from TMDb", (done)=>{
        const wrapper = shallow(<Detail {...test_props}/>);
        setTimeout(()=>{
            wrapper.update();
            const state = wrapper.instance().state;
            expect(state.overview).toEqual(detail.overview);
            expect(state.genre).toEqual(detail.genre);
            expect(state.tagline).toEqual(detail.tagline);
            expect(state.hours).toEqual(detail.hours);
            expect(state.minutes).toEqual(detail.minutes);
            expect(state.video).toEqual(detail.video);
            expect(state.similarMovies).toEqual(mockDetailData.movieList);
            expect(state.reviews).toEqual(mockDetailData.reviews)
            done();
        })
    })

    test("displays error message if request to TMDb fails", (done)=>{
        const wrapper = shallow(<Detail {...api_error_props}/>);
        setTimeout(()=>{
            wrapper.update();
            expect(wrapper.instance().state.errorMsg).toEqual(errorMsg);
            expect(wrapper.find("Spinner").length).toBe(0)
            expect(wrapper.find("Error").length).toBe(1)
            done();
        })
    })

    test("displays error message if request to backend fails", (done)=>{
        const wrapper = shallow(<Detail {...backend_error_props}/>);
        setTimeout(()=>{
            wrapper.update();
            expect(wrapper.instance().state.errorMsg).toEqual(backendErrorMsg);
            expect(wrapper.find("Spinner").length).toBe(0)
            expect(wrapper.find("Error").length).toBe(1)
            done();
        })
    })
})
