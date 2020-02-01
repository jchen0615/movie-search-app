import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

instance.defaults.headers.common['Authorization'] = '?api_key=0d727a18472e40764f879642668f20f9';
// instance.interceptors.request...

export default instance;