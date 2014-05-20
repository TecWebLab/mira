"use strict";
var requirejs = require("requirejs");
var assert = require('assert');

requirejs.config({
    baseUrl: '..',
    paths : {
        nools: 'libs/nools',
        backbone: 'libs/backbone',
        backbone_query: 'libs/backbone.queryparams',
        backbone_querystring_shim: 'libs/backbone.queryparams-1.1-shim',
        backbone_jsynth: 'libs/backbone.jsynth',
        underscore: 'libs/underscore',
        jquery: 'libs/jquery-2.1.0',
        "bootstrap": 'libs/bootstrap',
        text: 'libs/text'
    },
    shim: {
        "underscore": {
            deps: [],
            exports: "_"
        },
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});

suite('Rule', function(){
    suite('Load Model', function(){
        var ModelRule;
        setup(function(done){
            console.log(__filename);
            requirejs(['jsynth/models/route'],
                function(mod) {
                    ModelRule = mod;
                    done();
                });
        });



        test('nao deve disparar exception', function(){
            var model = new ModelRule();
            console.log('fire');
        });
    });

});
