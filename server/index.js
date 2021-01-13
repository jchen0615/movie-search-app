const express = require('express');
const cors = require('cors');
const TMDB_client = require('./TMDB_client');
const bodyParser = require('body-parser');
const redis = require('redis');
const keys = require('./keys');

const app = express();
const PORT = 5000;

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort||6379,
    retry_strategy: () => 1000,
});

app.use(cors());
app.use(bodyParser.json());

//Redis cache layer
function cache(req, res, next){
    const key = req.path==='/home'? req.path: req.path+'-'+req.query.id+'-'+req.query.pageNumber;
    redisClient.get(key, (err, data) =>{
        if(err) throw err;

        if(data!==null){
            res.send(JSON.parse(data)).status(200);
        }
        else{
            next();
        }
    })
}

//Send get request to TMDb API to fetch data needed for frontend homepage
app.get('/home', cache, (req, res) => {
    TMDB_client.getHomePage().then((response)=>{
        redisClient.setex(req.path, 86400, JSON.stringify(response))
        res.send(response).status(200);
    }).catch((error)=>{
        res.status(error.errorCode).send({errorMsg: error.errorMsg? error.errorMsg: "Unexpected error"});
    });
});

//Send get request to TMDb API to fetch search result based on keyword entered
app.get('/search', (req, res) => {
    TMDB_client.getSearchResults(req.query.value, req.query.pageNumber).then((response)=>{
        res.send(response).status(200);
    }).catch((error)=>{
        res.status(error.errorCode).send({errorMsg: error.errorMsg});
    });
});

//Send get request to TMDb API to fetch search result based on filter values provided by user
app.get('/discover', (req, res) => {

    function discover(keyword){
        TMDB_client.getDiscover(req.query.year, req.query.cast, req.query.genre, keyword, req.query.pageNumber).then((response)=>{
            res.send(response).status(200);
        }).catch((error)=>{
            res.status(error.errorCode).send({errorMsg: error.errorMsg});
        });
    }
    
    if(req.query.keyword.length>0){
        TMDB_client.getKeywordID(req.query.keyword).then((response)=>{
            discover(response.keywordID);
        }).catch((error)=>{
            res.status(error.errorCode).send({errorMsg: error.errorMsg});
        })
    }else{
        discover(req.query.keyword);
    }
});

//Send get request to TMDb API to fetch movies by genre
app.get('/genre', cache, (req, res) => {
    TMDB_client.getMoviesByGenre(req.query.pageNumber, req.query.releaseYear, req.query.id).then((response)=>{
        redisClient.setex(req.path+'-'+req.query.id+'-'+req.query.pageNumber, 86400, JSON.stringify(response))
        res.send(response).status(200);
    }).catch((error)=>{
        res.status(error.errorCode).send({errorMsg: error.errorMsg});
    });
});

//Send get request to TMDb API to fetch movies that are now playing
app.get('/now_playing',cache, (req, res) => {
    TMDB_client.getNowPlaying(req.query.pageNumber).then((response)=>{
        redisClient.setex(req.path, 86400, JSON.stringify(response))
        res.send(response).status(200);
    }).catch((error)=>{
        res.status(error.errorCode).send({errorMsg: error.errorMsg});
    });
});

//Send get request to TMDb API to fetch details for selected movie
app.get('/detail', (req, res) => {
    TMDB_client.getDetailData(req.query.id).then((response)=>{
        res.send(response).status(200);
    }).catch((error)=>{
        res.status(error.errorCode).send({errorMsg: error.errorMsg? error.errorMsg: "Unexpected error"});
    });
});

//Send get request to TMDb API to 
app.get('/quick_search', (req, res) =>{
    TMDB_client.getSimpleSearch(req.query.searchValue).then((response)=>{
        res.send(response).status(200);
    }).catch((error)=>{
        res.status(error.errorCode).send({errorMsg: error.errorMsg? error.errorMsg: "Unexpected error"});
    });
});

//Send get request to TMDb API to fetch ID of a cast/crew
app.get('/person_id', (req, res) =>{
    TMDB_client.getPersonID(req.query.searchValue).then((response)=>{
        res.send(response).status(200);
    }).catch((error)=>{
        res.status(error.errorCode).send({errorMsg: error.errorMsg? error.errorMsg: "Unexpected error"});
    });
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
  