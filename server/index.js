const keys = require('./keys');
const express = require('express');
const axios = require('axios')
const cors = require('cors');
const TMDB_client = require('./TMDB_client');

const app = express();
const port = 5000;
//app.use(cors({origin: 'http://localhost:8080'}));

app.use(cors());
app.use(bodyParser.json());

app.get('/home', (req, res) => {
    TMDB_client.getHomePage();
    
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
  