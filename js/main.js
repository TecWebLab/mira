"use strict";

require.config({
    baseUrl: 'js',
    paths : {
        nools: 'libs/nools',
        backbone: 'libs/backbone',
        backbone_query: 'libs/backbone.queryparams',
        backbone_querystring_shim: 'libs/backbone.queryparams-1.1-shim',
        backbone_jsynth: 'libs/backbone.jsynth',
        underscore: 'libs/underscore',
        jquery: 'libs/jquery-2.1.0',
        "jquery.bootstrap": 'libs/bootstrap',
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
        "jquery.bootstrap": {
            deps: ["jquery"]
        }
    }
});

require([

    // Load our app module and pass it to our definition function
    'app',
    "jquery",
    "jquery.bootstrap"
], function(App, $, $bootstrap){
    // The "app" dependency is passed in as "App"
    var app = App;
});

