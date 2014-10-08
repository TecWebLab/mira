"use strict";

var _ = require('underscore');
var backbone = require('backbone');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var request = require('request');
var optimist = require('optimist');

var app = optimist.argv.app;

var Rule = require('./models/rule.js');
var Selection = require('./models/selection.js');
var Jsynth = require(app);

Jsynth.ajaxSetup.headers['User-Agent'] = "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.3 Safari/537.36"

// start do servidor
var server = express();
// para exibir o log
server.use(morgan());
// criando servidor para arquivos estaticos
server.use(express.static(path.normalize(__dirname + '/../..'),  { maxAge: 60 * 60 * 1000 }));

var rules = new Rule.Collection(Jsynth.rules, {parse:true});
var selection = new Selection.Collection(Jsynth.selection, {parse:true});

server.route('/server.js').all(function(req, res, next){
    var options = _.extend({
        json: true,
        url: req.param('URI')
    }, Jsynth.ajaxSetup || {});

    request(options, function (error, response, body) {
        var abstract_select = null;
        selection.each(function(select){
            if(select.get('when')){
                var rule = rules.get(select.get('when'));
                if(rule.evaluate(body, req, {}, {})){
                    abstract_select = select.get('abstract');
                }
            }
        });

        if (!error && response.statusCode == 200) {
            res.send(abstract_select);
        }
    });
});

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./server.key', 'utf8');
var certificate = fs.readFileSync('./server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};


var httpServer = http.createServer(server);
var httpsServer = https.createServer(credentials, server);

httpServer.listen(80);
httpsServer.listen(443);
