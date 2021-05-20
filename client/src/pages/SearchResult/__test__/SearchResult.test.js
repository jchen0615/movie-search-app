import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import SearchResult from '../SearchResult'
import {mockData as mockData} from '../../../../__mocks__/data.json';

Enzyme.configure({adapter: new EnzymeAdapter()})

const test_props = {
    location:{
        state: {
            value: "test-value",
        }
    }
}

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}


window.scrollTo = jest.fn();

describe("'Search Result'", ()=>{

    const test_state = {
        movieList: ["test-list-1", "test-list-2"],
        pageNumber: 1,
        totalPages: 10,
        totalResults: 235,
        lastPage: false,
        loading: true,
        errorMsg: null
    }
    
    const wrapper = shallow(<SearchResult {...test_props}/>, {disableLifecycleMethods: true})
    wrapper.instance().getSearchResults = jest.fn()

    test("renders correctly when still loading", ()=>{
        expect(wrapper.find("Spinner")).toBeTruthy()
    })

    test("renders correctly when finish loading", ()=>{
        wrapper.setState(test_state)
        wrapper.setState({loading:false})
        wrapper.update();
        expect(wrapper.find("NavigationBar").length).toBe(1)
        expect(findByTestId(wrapper, "search-message-container").length).toBe(1)
        expect(findByTestId(wrapper, "search-message").length).toBe(1)
        expect(findByTestId(wrapper, "search-message").text()).toBe(`Showing page ${test_state.pageNumber} of ${test_state.totalPages}`)
        expect(wrapper.find("SearchList").props().list).toBe(test_state.movieList)
        expect(wrapper.find("PageNavigation")).toBeTruthy()
    })

    test("renders correctly when encounter error", ()=>{
        wrapper.setState({errorMsg: "Test"})
        expect(wrapper.find("Error")).toBeTruthy()
    })

    test("calls getSearchResults function on mount", ()=>{
        const spy = jest.spyOn(wrapper.instance(), 'getSearchResults')
        wrapper.instance().componentDidMount()
        expect(spy).toHaveBeenCalled()
    })
})


describe("'Search Result' fetch", ()=>{

    const searchList = mockData.search.data.movieList;
    const totalPages = mockData.search.data.totalPages;
    const totalResults = mockData.search.data.totalResults;

    jest.mock("axios");
    test("Fetches data from TMDb API", (done)=>{
        const wrapper = shallow(<SearchResult {...test_props}/>)
        setTimeout(()=>{
            wrapper.update();
            const state = wrapper.instance().state;
            expect(state.movieList).toEqual(searchList);
            expect(state.totalPages).toEqual(totalPages);
            expect(state.totalResults).toEqual(totalResults);
            done();
        })
    })
})