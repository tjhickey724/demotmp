#!/usr/bin/env node --harmony

/***
 firstServer.js
 This is a simple server illustrating middleware and basic REST functionality
 ***/

'use strict';
const
express = require('express'), 
bodyParser = require('body-parser'), // this allows us to pass JSON values to the server (see app.put below)
app = express();
var idCounter = 4;
var myData = [{
    "id": 0,
    "action": "Flowers",
    "done": false,
    "price": 1,
    "quantity": 5
}, {
    "id": 1,
    "action": "Shoes",
    "done": false,
    "price": 2,
    "quantity": 4
}, {
    "id": 2,
    "action": "Tickets",
    "done": true,
    "price": 3,
    "quantity": 30
}, {
    "id": 3,
    "action": "Coffee",
    "done": false,
    "price": 4,
    "quantity": 2
}];

// serve static content from the public folder 
app.use("/", express.static(__dirname + '/public'));

app.use(bodyParser.json());


// create middleware to log the requests
app.use(function(req, res, next) {
    console.log('%s %s %s %s', req.method, req.url, JSON.stringify(req.body), req.ip);
    next();
});

// get a particular item from the model
app.get('/model/:id', function(req, res) {
    var n = req.params.id;
    res.json(200, myData[n]);
});

// get all items from the model
app.get('/showall.json', function(req, res) {
    res.json(200, myData);
});

// change an item in the model
app.put('/model/:id', function(req, res) {
    var n = req.params.id;
    myData[n] = req.body;
    // put in some error checking if n <= myData.length
    res.json(200, {});
});

// add new item to the model
app.post('/model', function(req, res) {
    req.body.id = idCounter;
    idCounter++;
    myData.push(req.body);
    res.json(200, {});
});

// get a particular item from the model
// Wow!  This doesn't work at all!!!
app.delete('/model/:id', function(req, res) {
    var id = req.params.id;
    // find the index n of the element with that id and splice it out ...

    for(var i = 0 ; i< myData.length; i++){
        if (myData[i].id == id){ 
            myData.splice(i,1); break;}
    }
 
    res.json(200, {});
});


// listen on port 3000
var port = 3000;
app.listen(port, function() {
    console.log("server is listening on port " + port);
});
