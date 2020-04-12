import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Detail from '../Detail'

Enzyme.configure({adapter: new EnzymeAdapter()})

const test_props = {
    location:{
        state:{
            id: "test-id",
            title: "test-title",
            date: "test-date",
            voteAverage: "test-vote",
            poster: "test-poster",
        }
    },
    history:{
        goBack: jest.fn()
    }
}

const test_state = {
    similarMovies: ["test-movie-1", "test-movie-2"],
    overview: "test-overview",
    genre: "test-genre",
    tagline: "test-tagline",
    hours: "test-horus",
    minutes: "test-minutes",
    video: "test-video",
    reviews: "test-reviews",
    errorMsg: null,
    Loaded:true
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
        wrapper.setState({errorMsg: "test-error"})
        expect(wrapper.state().errorMsg).toBe("test-error")
        expect(wrapper.find("Error").length).toBe(1)
    })
    
    test("does not render loading when error message is not null", ()=>{
        wrapper.setState({Loaded: false})
        expect(wrapper.state().errorMsg).toBeTruthy()
        expect(wrapper.find("Spinner").length).toBe(0)
    })

    test("render loading correctly when no error message received", ()=>{
        wrapper.setState({Loaded: false})
        wrapper.setState({errorMsg: null})
        expect(wrapper.state().errorMsg).toBeFalsy()
        expect(wrapper.find("Spinner").length).toBe(1)
    })

    test("render correctly when finish loading", ()=>{
        wrapper.setState(test_state)
        expect(wrapper.find("Spinner").length).toBe(0)
        expect(wrapper.find("Error").length).toBe(0)
        expect(wrapper.find("BackBtn")).toBeTruthy()
        expect(wrapper.find("Navigation")).toBeTruthy()
        expect(wrapper.find("GeneralInfo").length).toBe(1)
        const info = wrapper.find("GeneralInfo").props()
        //Check general info has correct props
        expect(info.id).toBe(test_props.location.state.id)
        expect(info.title).toBe(test_props.location.state.title)
        expect(info.date).toBe(test_props.location.state.date)
        expect(info.vote).toBe(test_props.location.state.voteAverage)
        expect(info.poster).toBe(test_props.location.state.poster)
        expect(info.overview).toBe(test_state.overview)
        expect(info.genre).toBe(test_state.genre)
        expect(info.tagline).toBe(test_state.tagline)
        expect(info.hours).toBe(test_state.hours)
        expect(info.minutes).toBe(test_state.minutes)
        expect(info.video).toBe(test_state.video)
        
        expect(wrapper.find("Reviews").props().list).toMatch(test_state.reviews)
        expect(wrapper.find("Carousel").props().movies).toBe(test_state.similarMovies)
    })
})