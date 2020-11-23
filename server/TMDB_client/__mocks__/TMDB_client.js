const promise = require('promise')

const mockDetailData = {
    test_id:{
        detail:{
            overview: "test_overview",
            genre: "test_genre",
            tagline: "test_tagline",
            hours: "test_hours",
            minutes: "test_minutes",
            video: "test_video"
        },
        movieList: ["test_movie_1", "test_movie_2"],
        reviews: ["test_review_1, test_review_2"]
    },
}

const mockSearchResult = {
    movieList: ["test_movie_1", "test_movie_2"],
    totalResults: "25",
    totalPages: "3"
}

const mockGenreResult = {
    movieList: ["test_movie_1", "test_movie_2"], 
    totalPages: "3"
}

const mockHomePage = {
    nowPlaying: ["test_now_playing_movie_1", "test_now_playing_movie_2"], 
    popularMovies: ["test_popular_movie_1", "test_popular_movie_2"]
}

function getDetailData(id){
    return new Promise((resolve, reject)=>{
        if(id==="test_id")
            resolve(mockDetailData[id])
        else
            reject("test_error")
    })
}

function getSearchResults(searchValue, pageNumber){

    return new promise((resolve, reject)=>{
        if(searchValue === "test-error")
            reject("test_error");
        else
            resolve(mockSearchResult)
    })
}

function getMoviesByGenre(pageNumber, releaseYear, id){

    return new promise((resolve, reject)=>{
        if(id === "test_error")
            reject("test_error")
        else
            resolve(mockGenreResult)
    })
}

function getNowPlaying(pageNumber){

    return new promise((resolve, reject)=>{
            resolve(mockGenreResult)
    })
}

function getHomePage(){
    console.log("IN MOCK HOMEPAGE")
    return new promise(function(resolve, reject){
        resolve(mockHomePage)
    })
}

module.exports={
    'getDetailData':getDetailData,
    'getSearchResults': getSearchResults,
    'getMoviesByGenre': getMoviesByGenre,
    'getNowPlaying': getNowPlaying,
    'getHomePage': getHomePage
}