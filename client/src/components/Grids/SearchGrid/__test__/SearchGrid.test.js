import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import SearchGrid from '../SearchGrid'

Enzyme.configure({adapter: new EnzymeAdapter()})

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}

test("'Search Grid' renders correctly", ()=>{
    const wrapper = shallow(<SearchGrid/>)
    expect(wrapper).toBeTruthy()
    expect(findByTestId(wrapper, "search-grid")).toBeTruthy()
    expect(findByTestId(wrapper, "search-bar")).toBeTruthy()
    expect(findByTestId(wrapper, "search-input")).toBeTruthy()
    expect(findByTestId(wrapper, "search-background")).toBeTruthy()
    expect(findByTestId(wrapper, "search-input").props().placeholder).toBe("Search for movie here..")
})

describe("Search input", ()=>{
    const mockChange = jest.fn()
    const mockKeypress = jest.fn()
    const mockClick = jest.fn()
    const wrapper = shallow(<SearchGrid inputHandler={mockChange} keyHandler={mockKeypress} clickHandler={mockClick}/>)
    test("function is called when change occurs", ()=>{
        const event = {target:{value: "test"}}
        findByTestId(wrapper, "search-input").simulate('change', event)
        expect(mockChange).toBeCalledWith(event)
    })

    test("function is called when keypress occurs", ()=>{
        const event = {charCode:13}
        findByTestId(wrapper, "search-input").simulate('keypress', event)
        expect(mockKeypress).toBeCalledWith(event)
    })

    test("function is called when search icon is clicked", ()=>{
        findByTestId(wrapper, "search-icon").simulate('click')
        expect(mockClick.mock.calls.length).toBe(1)
    })
})

