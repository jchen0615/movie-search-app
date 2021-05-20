import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Review from '../Review'

Enzyme.configure({adapter: new EnzymeAdapter()})

const test_props = {
    author: "test-author",
    content: "test-content"
}

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}

test("'Review' renders correctly", ()=>{
    const wrapper = shallow(<Review {...test_props}/>)
    expect(findByTestId(wrapper, "author").text()).toBe(`Author: ${test_props.author}`)
    expect(findByTestId(wrapper, "content").text()).toBe(` --- \"${test_props.content}\"`)
})