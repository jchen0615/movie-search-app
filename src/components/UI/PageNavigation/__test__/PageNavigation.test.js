import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import PageNavigation from '../PageNavigation'

Enzyme.configure({adapter: new EnzymeAdapter()})

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}

const test_props = {
    pageNumber: "24",
    setState: jest.fn()
}
test("'Page Navigation' renders correctly", ()=>{
    const wrapper = shallow(<PageNavigation {...test_props}/>)
    expect(findByTestId(wrapper, "prev-page")).toBeTruthy()
    expect(findByTestId(wrapper, "current-page").text()).toBe(test_props.pageNumber)
    expect(findByTestId(wrapper, "next-page")).toBeTruthy()
})
