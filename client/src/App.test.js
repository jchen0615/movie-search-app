import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App'

Enzyme.configure({adapter: new EnzymeAdapter()})

test('App renders correctly', () => {
  const wrapper = shallow(<App/>)
  expect(wrapper).toBeTruthy()
  expect(wrapper.find("[data-testid='App']").length).toBe(1)
  expect(wrapper.find("Route").length).toBe(7)
});