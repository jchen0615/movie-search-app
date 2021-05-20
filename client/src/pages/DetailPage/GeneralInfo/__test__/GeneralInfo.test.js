import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import GeneralInfo from '../GeneralInfo'

Enzyme.configure({adapter: new EnzymeAdapter()})

const test_props = {
    video: "test-video",
    poster: "test-poster",
    title: "test-title",
    overview: "test-overview",
    tagline: "test-tagline",
    hours: "test-hours",
    minutes: "test-minutes",
    date: "test-date",
    genre: "test-genre",
    vote: "test-vote"
}

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}

describe("'General info'", ()=>{
    test("'General Info' renders correctly with props", ()=>{
        const wrapper = shallow(<GeneralInfo {...test_props}/>)
        expect(findByTestId(wrapper, "overview-grid")).toBeTruthy()
        expect(findByTestId(wrapper, "detail-cover").props().src).toBe(test_props.poster)
        expect(findByTestId(wrapper, "video").props().src).toBe(test_props.video)
        expect(findByTestId(wrapper, "detail-title").text()).toBe(test_props.title)
        expect(findByTestId(wrapper, "detail-overview").text()).toBe(test_props.overview)
        expect(findByTestId(wrapper, "tagline").text()).toBe(test_props.tagline)
        expect(findByTestId(wrapper, "general-info")).toBeTruthy()
        expect(findByTestId(wrapper, "info")).toBeTruthy()
        expect(findByTestId(wrapper, "duration").text()).toContain(test_props.hours)
        expect(findByTestId(wrapper, "duration").text()).toContain(test_props.minutes)
        expect(findByTestId(wrapper, "released-date").text()).toContain(test_props.date)
        expect(findByTestId(wrapper, "genre").text()).toContain(test_props.genre)
        expect(findByTestId(wrapper, "rating").text()).toContain(test_props.vote)
    })
})


