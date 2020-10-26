
import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Detail from '../Detail'

Enzyme.configure({adapter: new EnzymeAdapter()})

const test_props = {
    location:{
        state:{
            id: "test_id",
            title: "test_title",
            date: "test_date",
            voteAverage: "test_vote",
            poster: "test_poster",
        }
    },
    history:{
        goBack: jest.fn()
    }
}

const error_props ={
    location:{
        state:{
            id: "test_error"
        }
    }
}

const test_state = {
    similarMovies: ["test_movie-1", "test_movie-2"],
    overview: "test_overview",
    genre: "test_genre",
    tagline: "test_tagline",
    hours: "test_horus",
    minutes: "test_minutes",
    video: "test_video",
    reviews: "test_reviews",
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

jest.mock("../../../service/TMDB_client/TMDB_client")
describe("Detail page fetch", ()=>{

    window.scrollTo = jest.fn();

    test("fetches movie detail from TMDb", (done)=>{
        const wrapper = shallow(<Detail {...test_props}/>);
        setTimeout(()=>{
            wrapper.update();
            const state = wrapper.instance().state;
            expect(state.overview).toEqual("test_overview");
            expect(state.genre).toEqual("test_genre");
            expect(state.tagline).toEqual("test_tagline");
            expect(state.hours).toEqual("test_hours");
            expect(state.minutes).toEqual("test_minutes");
            expect(state.video).toEqual("test_video");
            expect(state.similarMovies).toEqual(["test_movie_1", "test_movie_2"]);
            expect(state.reviews).toEqual(["test_review_1, test_review_2"])
            done();
        })
    })

    test("receives error message if request to TMDb fails", (done)=>{
        const wrapper = shallow(<Detail {...error_props}/>);
        setTimeout(()=>{
            wrapper.update();
            expect(wrapper.instance().state.errorMsg).toEqual("test_error");
            expect(wrapper.find("Spinner").length).toBe(0)
            expect(wrapper.find("Error").length).toBe(1)
            done();
        })
    })

})
