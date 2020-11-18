import { redisPort } from '../../server/keys';
import {mockData as data} from "./data.json";

const DETAIL_ENDPOINT = "/api/detail";

module.exports = {
    get: jest.fn((url, req) => {
        switch (url){
            case DETAIL_ENDPOINT:
                if(req.params.id === "test_api_error")
                    return Promise.reject(data.error);
                else if(req.params.id === "test_backend_error")
                    return Promise.reject(data.backendError);
                else
                    return Promise.resolve(data.detail);
        }
    })
}