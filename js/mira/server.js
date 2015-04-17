"use strict";

var _ = require('underscore');
var backbone = require('backbone');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var request = require('request');
var optimist = require('optimist');
var fs = require('fs');

var Rule = require('./models/rule.js');
var Selection = require('./models/selection.js');

// start do servidor
var server = express();
// para exibir o log
server.use(morgan());
// criando servidor para arquivos estaticos
server.use(express.static(path.normalize(__dirname + '/../..'),  { maxAge: 60 * 60 * 1000 }));


server.route('/server.js').all(function(req, res, next){

    var app = '../index.js';
    if(req.query.app){
      app = '../' + req.query.app + '.js';
    }

    var MiraApp = require(app);
    MiraApp.ajaxSetup = MiraApp.ajaxSetup || {};
    MiraApp.ajaxSetup.headers = MiraApp.ajaxSetup.headers || {};
    MiraApp.ajaxSetup.headers['User-Agent'] = MiraApp.ajaxSetup.headers['User-Agent'] ||
    "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.3 Safari/537.36";
    var rules = new Rule.Collection(MiraApp.rules, {parse:true});
    var selection = new Selection.Collection(MiraApp.selection, {parse:true});

    var extra = _.omit(req.query, 'url', 'data', 'type', 'app');


    var options = _.extend({
        json: true
    }, _.pick(req.query, 'data', 'type'),
      extra,
      MiraApp.ajaxSetup);

    var rst = request(req.query.url, options, function (error, response, body) {
        res.send(body);
        /*

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
            res.send({}abstract_select);
        }
        */
    });
    console.log(rst);
});

server.get('/api/:folder', function (req, res, next) {
    var folder = req.params.folder;
    var file_path = path.normalize(__dirname + '/../..') + '/data/' + folder + '/list.json';
    var file;
    fs.readFile(file_path, 'utf8', function (err, data) {
        if (err) throw err;
        file = JSON.parse(data);
        res.json(file);
    });
});


server.get('/api/:folder/:id', function (req, res, next) {
    var folder = req.params.folder;
    var id = req.params.id;
    var file_path = path.normalize(__dirname + '/../..') + '/data/' + folder + '/' + id + '.json';
    var file;
    fs.readFile(file_path, 'utf8', function (err, data) {
        if (err) throw err;
        file = JSON.parse(data);
        res.json(file);
    });
});

server.get('/docs', function(req, res, next){
   res.redirect('http://mestrado.amazingworks.com.br/documentacao/'); 
});


var http = require('http');
var httpServer = http.createServer(server);
httpServer.listen(80);

try {
    var https = require('https');
    var privateKey  = fs.readFileSync(path.normalize(__dirname + '/../..') + '/server.key', 'utf8');
    var certificate = fs.readFileSync(path.normalize(__dirname + '/../..') + '/server.crt', 'utf8');
    var credentials = {key: privateKey, cert: certificate};
    var httpsServer = https.createServer(credentials, server);
    httpsServer.listen(443);
} catch (e){
    console.log('erro ao abrir arquivos para https');
}
