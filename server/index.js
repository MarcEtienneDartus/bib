const bib = require('./bib');
var express = require('express');

var app = express();

let restaurantsMemory = [];

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(restaurantsMemory);
});

app.listen(4000,async () => {
    const restaurants = await bib.get();
    restaurantsMemory = restaurants;
    console.log('Server ready')
});