import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Home from '../Home';
import {mockData as mockData} from '../../../../__mocks__/data.json';

Enzyme.configure({adapter: new EnzymeAdapter()});

const findByTestId = (wrapper, val)=>{
    return wrapper.find("[data-testid='"+val+"']");
};

//Tests rendering based on conditions
describe("'Home page'", ()=>{
    const wrapper = shallow(<Home/>, {disableLifecycleMethods: true});
    wrapper.instance().getHome = jest.fn();
    
    test("renders correctly when still loading", ()=>{
        expect(wrapper.find("Spinner")).toBeTruthy();
    });

    test("renders correctly when finish loading", ()=>{
        wrapper.setState({loaded:true});
        expect(wrapper.find('div.Home-page')).toBeTruthy();
        expect(wrapper.find('div.navigation-bar')).toBeTruthy();
        expect(wrapper.find('#home-grid-1')).toBeTruthy();
        expect(wrapper.find('#home-grid-2')).toBeTruthy();
        expect(wrapper.find('#home-grid-3')).toBeTruthy();
    });

    test("renders correctly when encounter error", ()=>{
        wrapper.setState({errorMsg: "Test"});
        expect(wrapper.find("Error")).toBeTruthy();
    });

    test("calls getData function on mount", ()=>{
        const spy = jest.spyOn(wrapper.instance(), 'getHome');
        wrapper.instance().componentDidMount();
        expect(spy).toHaveBeenCalled();
    });
});

describe("'Home Page' fetches", ()=>{

    const nowPlaying = mockData.home.data.nowPlaying;
    const popular = mockData.home.data.popularMovies;
    jest.mock("axios");

    test("Fetches data from TMDb API", (done)=>{
        const wrapper = shallow(<Home />);
        setTimeout(()=>{
            wrapper.update();
            const state = wrapper.instance().state;
            expect(state.popularMovies).toEqual(popular);
            expect(state.nowPlaying).toEqual(nowPlaying);
            done();
        })
    })

});

//------NO LONGER VALID PER NEW HOMEPAGE DESIGN-------
//Tests functionality of searchClickHandler()
/*
describe("Search click handler", ()=>{
    const wrapper = shallow(<Home/>, {disableLifecycleMethods: true});
    const val = "test";
    test("when trigger, 'search' is false when search value is null", ()=>{
        wrapper.instance().searchClickHandler({});
        expect(wrapper.state('search')).toBeTruthy();
    });

    wrapper.setState({searchValue: val})
    test("when trigger, 'search' is set to true when search value is not null", ()=>{
        wrapper.instance().searchClickHandler({});
        expect(wrapper.state('search')).toBeTruthy();
    });
});


//Tests functionality of searchInputHandler()
describe("Search input handler", ()=>{
    const wrapper = shallow(<Home/>, {disableLifecycleMethods: true});
    const val = "test";
    const event = {target: {value:val}};
    test("when trigger, 'searchValue' is updated", ()=>{
        wrapper.instance().searchInputHandler(event);
        expect(wrapper.state('searchValue')).toBe(val);
    });
});


//Tests functionality of EnterKeyHandler()
describe("Enter key handler", ()=>{
    const wrapper = shallow(<Home/>, {disableLifecycleMethods: true});
    const val = "test";

    test("when trigger, 'search' is false if 'searchValue' is null and key is Enter", ()=>{
        const event = {charCode:13};
        wrapper.instance().EnterKeyHandler(event);
        expect(wrapper.state('search')).toBeFalsy();
    });

    test("when trigger, 'search' is false if 'searchValue' is null and key is not Enter", ()=>{
        const event = {charCode:14};
        wrapper.instance().EnterKeyHandler(event);
        expect(wrapper.state('search')).toBeFalsy();
    });

    test("when trigger, 'search' is false if 'searchValue' is not null and key is not Enter", ()=>{
        const event = {charCode:14};
        wrapper.setState({searchValue: val});
        wrapper.instance().EnterKeyHandler(event);
        expect(wrapper.state('search')).toBeFalsy();
    });    
    
    test("when trigger, 'search' is true if 'searchValue' is not null and key is Enter", ()=>{
        const event = {charCode:13};
        wrapper.setState({searchValue: val});
        wrapper.instance().EnterKeyHandler(event);
        expect(wrapper.state('search')).toBeTruthy()
    });    
});
*/