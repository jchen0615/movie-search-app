const express = require('express');
const app = express();
const port = 3000;
const TMDB_client = require('../service/TMDB_client/TMDB_client');
const axios = require('axios')
const cors = require('cors');
app.use(cors({origin: 'http://localhost:8080'}));

app.get('/', (req, res) => {
    //var expense=0, income=0, budget=0, year=req.query.year, month = req.query.month;
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=0d727a18472e40764f879642668f20f9&page=1`)
    .then(response =>{
        console.log(response);
        const movieList = response.data.results.map(movie =>{
            return{
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path? key.poster+movie.poster_path : null,
                date: movie.release_date,
                voteAverage: movie.vote_count>0?movie.vote_average:"No rating available"
                }
            })

        resolve({movieList: movieList, totalPage: response.data.total_pages})

     }).catch((error)=>{
        reject(error.response.data.status_message)
     })

     /*
    TMDB_client.getHomePage().then((result)=>{
        console.log(result)
        res.status(200).send(result);
    })
    .catch((error)=>{
        res.status(200).send(error);
    })*/
    //res.status(200).send({"expense":expense, "income":income, "budget":(income-expense)});
    
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
  