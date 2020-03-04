const data = require('./AccessToken.json')
const apiKey = data.API_Key
const posterString = "http://image.tmdb.org/t/p/w342";
const youtubeString = "https://www.youtube.com/embed/";

//export default apiKey
module.exports = {
    'poster':posterString,
    'apiKey':"?api_key="+apiKey,
    'youtube':youtubeString
}