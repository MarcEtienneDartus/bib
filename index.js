const bib = require('./server/bib');
var express = require('express');

var app = express();

let restaurantsMemory = [];

app.get('/', (req, res) => {
    res.send(restaurantsMemory);
});

app.listen(4000,async () => {
    const restaurants = await bib.get();
    restaurantsMemory = restaurants;
    console.log('Server ready')
});