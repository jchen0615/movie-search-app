const promise = require('promise')

const fakeDetailData = {
    detail:{
        overview: "test-overview",
        genre: "test-genre",
        tagline: "test-tagline",
        hours: "test-hours",
        minutes: "test-minutes",
        video: "test-video"
    },
    movieList: ["test-movie-1", "test-movie-2"],
    reviews: ["test-review-1, test-review-2"]
}

function getDetailData(id){
    return new Promise((resolve, reject)=>{
        resolve(fakeDetailData)
    })
}

module.exports={
    'getDetailData':getDetailData
}