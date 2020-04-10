const axios = require('axios')
const key = require('./GlobalKey')
const promise = require('promise')

//Client service file that handles all HTTP requests to TMDB API
    
//Make axios get request to TMDB API to get detail information for selected movie
function getDetailData(id){
    return new promise(function(resolve, reject){
        axios.all([
            axios.get("/movie/"+id+key.apiKey+"&append_to_response=videos"),
            axios.get("/movie/"+id+"/similar"+key.apiKey),
            axios.get("/movie/"+id+"/reviews"+key.apiKey)
        ]).then(responseArr =>{
            console.log(responseArr)
            let detail = {
                overview: responseArr[0].data.overview? responseArr[0].data.overview : "No overview available",
                genre: responseArr[0].data.genres.length>0? responseArr[0].data.genres[0].name:"No information available",
                tagline: responseArr[0].data.tagline? responseArr[0].data.tagline:"",
                hours: responseArr[0].data.runtime>0? Math.floor(parseInt(responseArr[0].data.runtime, 10)/60): null,
                minutes: responseArr[0].data.runtime>0? Math.floor(parseInt(responseArr[0].data.runtime, 10)%60): null,
                video: responseArr[0].data.videos.results.find(element => element.type==="Trailer")? key.youtube+responseArr[0].data.videos.results.find(element => element.type==="Trailer").key:null
            }
         
            const movieList = responseArr[1].data.results.slice(0,4).map(movie =>{
                return{
                    id: movie.id,
                    title: movie.title,
                    poster: key.poster+movie.poster_path,
                    date: movie.release_date,
                    voteAverage: movie.vote_count>0? movie.vote_average:"No rating available"
                }
            })      

            let list = responseArr[2].data.results.length<=8? responseArr[2].data.results : responseArr[2].data.results.slice(0,8)
            let reviews =  list.filter(function(element){
                return element.content.length<1000
            })
            reviews.map(review=>{
                return {
                    author: review.author,
                    content: review.content
                }
            })
            
            resolve({detail:detail, movieList:movieList, reviews:reviews})
    
        }).catch(error=>{
            console.log(error)
            reject(error.response.data.status_message)
        })
    })
}

//Make axios get request to TMDB API to get search results
function getSearchResults(searchValue, pageNumber){
    return new promise(function(resolve, reject){
        axios.get("/search/movie/"+key.apiKey+"&query="+searchValue+"&page="+pageNumber)
        .then( response =>{

            const movieList = response.data.results.map(movie =>{
                return{
                    id: movie.id,
                    title: movie.title,
                    poster: key.poster+movie.poster_path,
                    date: movie.release_date,
                    voteAverage: movie.vote_count>0?movie.vote_average:"No rating available",
                    overview: movie.overview
                }
            })
            
            result = {
                movieList:movieList,
                totalResults: response.data.total_results,
                totalPages: response.data.total_pages
            }
         
            resolve(result)
         })
         .catch((error)=>{
            reject(error.response.data.status_message)
         })

    })
}

//Make axios get request to TMDB API to get movies by genre
function getMoviesByGenre(pageNumber, releaseYear, id){
    return new promise(function(resolve, reject){
        axios.get("/discover/movie"+key.apiKey+"&sort_by=popularity.desc&page="+pageNumber+"&primary_release_year="
        +releaseYear+"&with_genres="+id)
       .then(response =>{
        const movieList = response.data.results.map(movie =>{
            return{
                id: movie.id,
                title: movie.title,
                poster: key.poster+movie.poster_path,
                date: movie.release_date,
                voteAverage: movie.vote_count>0?movie.vote_average:"No rating available"
                }
            })

            resolve({ movieList: movieList, totalPages: response.data.total_pages,})
        }).catch((error)=>{
            reject(error.response.data.status_message)
        })
    })
}

//Make axios get request to TMDB API to get movies that are currently in theater
function getNowPlaying(pageNumber){
    return new promise(function(resolve, reject){
        axios.get("/movie/now_playing"+key.apiKey+"&page="+pageNumber)
        .then(response =>{
         const movieList = response.data.results.map(movie =>{
             return{
                 id: movie.id,
                 title: movie.title,
                 poster: key.poster+movie.poster_path,
                 date: movie.release_date,
                 voteAverage: movie.vote_count>0?movie.vote_average:"No rating available"
                 }
             })

            resolve({movieList: movieList, totalPage: response.data.total_pages})

         }).catch((error)=>{
            reject(error.response.data.status_message)
         })
    })
}

//Make axios get requests to TMDB API to get data needed to render home page
function getHomePage(){
   
    return new promise(function(resolve, reject){
        axios.all([
            axios.get("/movie/popular"+key.apiKey),
            axios.get("/movie/now_playing"+key.apiKey)
        ]).then(responseArr =>{
            const popularList = responseArr[0].data.results.slice(0,4).map(movie =>{
                return{
                    id: movie.id,
                    title: movie.title,
                    poster: key.poster+movie.poster_path,
                    date: movie.release_date,
                    voteAverage: movie.vote_average
                }
            })
    
            const nowPlayingList = responseArr[1].data.results.slice(0,4).map(movie =>{
                return{
                    id: movie.id,
                    title: movie.title,
                    poster: key.poster+movie.poster_path,
                    date: movie.release_date,
                    voteAverage: movie.vote_average
                }
            })
    
            resolve({nowPlaying: nowPlayingList, popularMovies: popularList})
        }).catch((error)=>{
            reject(error.response.data.status_message)
        })
    })
}

module.exports = {
    'getDetailData': getDetailData,
    'getSearchResults': getSearchResults,
    'getMoviesByGenre': getMoviesByGenre,
    'getNowPlaying': getNowPlaying,
    'getHomePage': getHomePage
}