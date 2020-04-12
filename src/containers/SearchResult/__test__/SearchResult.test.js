import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import SearchResult from '../SearchResult'

Enzyme.configure({adapter: new EnzymeAdapter()})

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}

const test_state = {
    searchList: ["test-list-1", "test-list-2"],
    pageNumber: 1,
    totalPages: 10,
    totalResults: 235,
    lastPage: false,
    loading: true,
    errorMsg: null
}

const test_props = {
    location:{
        state: {
            value: "test-value"
        }
    }
}

describe("'Search Result'", ()=>{
    const wrapper = shallow(<SearchResult {...test_props}/>, {disableLifecycleMethods: true})
    wrapper.instance().getSearchResults = jest.fn()

    test("renders correctly when still loading", ()=>{
        expect(wrapper.find("Spinner")).toBeTruthy()
    })

    test("renders correctly when finish loading", ()=>{
        wrapper.setState(test_state)
        wrapper.setState({loading:false})
        expect(wrapper.find("NavigationBar").length).toBe(1)
        expect(findByTestId(wrapper, "search-message-container").length).toBe(1)
        expect(findByTestId(wrapper, "search-message").length).toBe(1)
        expect(findByTestId(wrapper, "search-message").text()).toBe(`Showing ${test_state.pageNumber} of ${test_state.totalPages} pages for keyword: \"${test_props.location.state.value}\"`)
        expect(wrapper.find("SearchList").props().list).toBe(test_state.searchList)
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