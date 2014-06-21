"use strict";

var express = require('express');
var path = require('path');
var morgan = require('morgan');
var request = require('request');
var jsynth = require('../pinterest.js');
var rule = require('./models/rule.js');

var server = express();
server.use(morgan());

// criando servidor para arquivos estaticos
server.use(express.static(path.normalize(__dirname + '/../..')));

server.route('/server.js').all(function(req, res, next){
    var uri = req.param('URI');
    request(uri, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    });
});

server.listen(80);