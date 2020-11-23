import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Spinner from '../Spinner'

Enzyme.configure({adapter: new EnzymeAdapter()})

test("'Spinner' renders correctly", ()=>{
    const wrapper = shallow(<Spinner/>)
    expect(wrapper).toBeTruthy()
})