var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var morgan = require('morgan');

var port = 3000;
var host = '127.0.0.1';

var websitesRouter = require('./websites');

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/websites', websitesRouter);

app.use((err, req, res, next) => {
    if (err) {
        console.log("server.js - 21")
        res.status(500).send(err)
    }
});

app.listen(port, host, function () {
    console.log('Listrning on http://localhost:', port);
})