import {mockData as data} from "./data.json";

const DETAIL_ENDPOINT = "/api/detail";
const GENRE_ENDPOINT = "/api/genre";
const NOWPLAYING_ENDPOINT = "/api/now_playing";
const HOME_ENDPOINT = "/api/home";
const SEARCH_ENDPOINT = "/api/search";

module.exports = {
    get: jest.fn((url, req) => {
        if(req && req.params.id === "test_api_error")
            return Promise.reject(data.error);
        else if(req && req.params.id === "test_backend_error")
            return Promise.reject(data.backendError);
        else{
            
            switch (url){
                case DETAIL_ENDPOINT:
                    return Promise.resolve(data.detail);
                case GENRE_ENDPOINT:
                case NOWPLAYING_ENDPOINT:
                    return Promise.resolve(data.genre);
                case HOME_ENDPOINT:
                    return Promise.resolve(data.home);
                case SEARCH_ENDPOINT:
                    return Promise.resolve(data.search);
            }

        }
    }),
}