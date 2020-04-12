import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Carousel from '../Carousel'

Enzyme.configure({adapter: new EnzymeAdapter()})

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']")
}

const test_props = {
    movieType: "test",
    movies:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}

describe("'Carousel'", ()=>{
    const wrapper = shallow(<Carousel {...test_props}/>)
    wrapper.instance().NextListHandler = jest.fn()
    wrapper.instance().PrevListHandler = jest.fn()
    test("renders correctly ", ()=>{
        expect(findByTestId(wrapper, "carousel-left-button")).toBeTruthy()
        expect(wrapper.find("MovieGrid").props().movieType).toBe(test_props.movieType)
        expect(wrapper.find("MovieGrid").props().movies).toMatchObject(test_props.movies.slice(0,4))
        expect(findByTestId(wrapper, "carousel-right-button")).toBeTruthy()
    })

    test("renders spinner correctly when loading ", ()=>{
        const wrapper_spinner = shallow(<carousel/>)
        expect(wrapper_spinner.find("Spinner")).toBeTruthy()
    })

    
    test("next list handler triggers when next button clicked", ()=>{
        const spy = jest.spyOn(wrapper.instance(), 'NextListHandler')
        expect(spy).not.toHaveBeenCalled()
        findByTestId(wrapper, "carousel-right-button").simulate("click")
        findByTestId(wrapper, "carousel-right-button").simulate("click")
        expect(spy).toHaveBeenCalled()
        spy.mockClear()
    })

    test("prev list handler triggers when prev button clicked", ()=>{
        const spy = jest.spyOn(wrapper.instance(), 'PrevListHandler')
        expect(spy).not.toHaveBeenCalled()
        findByTestId(wrapper, "carousel-left-button").simulate("click")
        findByTestId(wrapper, "carousel-left-button").simulate("click")
        expect(spy).toHaveBeenCalled()
        spy.mockClear()
    })

})