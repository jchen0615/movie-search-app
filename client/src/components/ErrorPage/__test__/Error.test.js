import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Error from '../Error'

Enzyme.configure({adapter: new EnzymeAdapter()})

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}


describe("'Error'", ()=>{
    
    //Test render if no error message received
    test("renders correctly when no error message received", ()=>{
        const wrapper = shallow(<Error/>)
        expect(findByTestId(wrapper, "error-message")).toBeTruthy()
        expect(wrapper.find("Navigation")).toBeTruthy()
        const errorText = findByTestId(wrapper, "error-text")
        expect(errorText.text()).toContain("No message received")
    })
    
    //Test render if error message is received
    test("'Error' renders correctly when error message received", ()=>{
        const errorMessage = "test error message"
        const wrapper = shallow(<Error msg={errorMessage}/>)
        expect(findByTestId(wrapper, "error-message")).toBeTruthy()
        expect(wrapper.find("Navigation")).toBeTruthy()
        const errorText = findByTestId(wrapper, "error-text")
        expect(errorText.text()).toContain(errorMessage)
    })
})