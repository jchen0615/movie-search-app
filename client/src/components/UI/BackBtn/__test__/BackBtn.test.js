import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import BackBtn from '../BackBtn'

Enzyme.configure({adapter: new EnzymeAdapter()})

test("Function is called when back button is clicked", ()=>{
    const mockClick = jest.fn()
    const wrapper = shallow(<BackBtn goBack={mockClick}/>)
    wrapper.simulate('click')
    expect(mockClick.mock.calls.length).toBe(1)
})
