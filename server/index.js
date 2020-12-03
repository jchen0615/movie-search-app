const express = require('express');
const cors = require('cors');
const TMDB_client = require('./TMDB_client');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
//app.use(cors({origin: 'http://localhost:8080'}));

app.use(cors());
app.use(bodyParser.json());

//Send get request to TMDb API to fetch data needed for frontend homepage
app.get('/api/home', (req, res) => {
    TMDB_client.getHomePage().then((response)=>{
        res.send({
            nowPlaying: response.nowPlaying,
            popularMovies: response.popularMovies
        }).status(200);
    }).catch((error)=>{
        res.status(error.errorCode).send({errorMsg: error.errorMsg? error.errorMsg: "Unexpected error"});
    });
});

//Send get request to TMDb API to fetch search result based on keyword entered
app.get('/api/search', (req, res) => {
    TMDB_client.getSearchResults(req.query.value, req.query.pageNumber).then((response)=>{
        res.send({
            movieList: response.movieList,
            totalResults: response.totalResults,
            totalPages: response.totalPages,
        }).status(200);
    }).catch((error)=>{
        res.status(error.errorCode).send({errorMsg: error.errorMsg});
    });
});

//Send get request to TMDb API to fetch movies by genre
app.get('/api/genre', (req, res) => {
    TMDB_client.getMoviesByGenre(req.query.pageNumber, req.query.releaseYear, req.query.id).then((response)=>{
        res.send({
            movieList:response.movieList,
            totalPages: response.totalPages,
        }).status(200);
    }).catch((error)=>{
        res.status(error.errorCode).send({errorMsg: error.errorMsg});
    });
});

//Send get request to TMDb API to fetch movies that are now playing
app.get('/api/now_playing', (req, res) => {
    TMDB_client.getNowPlaying(req.query.pageNumber).then((response)=>{
        res.send({
            movieList:response.movieList,
            totalPages: response.totalPages,
        }).status(200);
    }).catch((error)=>{
        res.status(error.errorCode).send({errorMsg: error.errorMsg});
    });
});

//Send get request to TMDb API to fetch details for selected movie
app.get('/api/detail', (req, res) => {
    TMDB_client.getDetailData(req.query.id).then((response)=>{
        res.send({
            detail: response.detail,
            movieList: response.movieList,
            reviews: response.reviews
        }).status(200);
    }).catch((error)=>{
        res.status(error.errorCode).send({errorMsg: error.errorMsg? error.errorMsg: "Unexpected error"});
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
  