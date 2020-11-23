import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Reviews from '../Reviews'

Enzyme.configure({adapter: new EnzymeAdapter()})

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}

const test_props = {
    list: [
        {
            author: "test-author-1",
            content: "test-content-1",
        },
        {
            author: "test-author-2",
            content: "test-content-2",
        }
    ]
}

describe("'Reviews'", ()=>{

    test("render correctly with list of reviews", ()=>{
        const wrapper = shallow(<Reviews {...test_props}/>)
        expect(findByTestId(wrapper, "header")).toBeTruthy()
        expect(findByTestId(wrapper, "list-reviews")).toBeTruthy()

        const list = wrapper.find("Review")
        expect(list.length).toBe(test_props.list.length)
        list.forEach((review, index)=>{
            expect(review.props().author).toBe(test_props.list[index].author)
            expect(review.props().content).toBe(test_props.list[index].content)
        })
        
    })

    test("render correctly with empty list of reviews", ()=>{
        const wrapper = shallow(<Reviews {...{list:[]}}/>)
        expect(findByTestId(wrapper, "header")).toBeTruthy()
        expect(findByTestId(wrapper, "list-reviews")).toBeTruthy()
        expect(wrapper.find("Review").length).toBe(0)
        expect(findByTestId(wrapper, "list-reviews").text()).toBe("Sorry, this movie currently has no reviews...")
    })
})