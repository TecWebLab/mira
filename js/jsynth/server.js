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
var Abstract = require('./models/abstract.js');
var Jsynth = require(app);

// start do servidor
var server = express();
// para exibir o log
server.use(morgan());
// criando servidor para arquivos estaticos
server.use(express.static(path.normalize(__dirname + '/../..')));

var rules = new Rule.Collection(Jsynth.rules, {parse:true});
var abstracts = new Abstract.Collection(Jsynth.selectoin, {parse:true});

server.route('/server.js').all(function(req, res, next){
    var options = _.extend({
        url: req.param('URI')
    }, Jsynth.ajaxSetup || {});

    request(options, function (error, response, body) {
        var abstract_select = null;
        abstracts.each(function(abstract){
            if(abstract.get('rule')){
                var rule = rules.get(abstract.get('rule'));
                if(rule.evaluate(data, req, {}, {})){
                    abstract_select = abstract
                }
            }
        });

        if (!error && response.statusCode == 200) {
            res.send(abstract_select.toJSON());
        }
    });
});

server.listen(80);