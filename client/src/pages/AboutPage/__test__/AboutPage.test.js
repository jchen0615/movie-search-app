import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import AboutPage from '../AboutPage'

Enzyme.configure({adapter: new EnzymeAdapter()})

test("'About page' renders correctly", ()=>{
    const wrapper = shallow(<AboutPage/>)
    expect(wrapper).toBeTruthy()
    expect(wrapper.find("Navigation")).toBeTruthy()
    expect(wrapper.find("[data-testid='about-text']")).toBeTruthy()
})