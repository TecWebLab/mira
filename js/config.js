"use strict";

requirejs.config({
    baseUrl: 'js',

    paths : {
        nools: 'libs/nools',
        backbone: 'libs/backbone',
        backbone_query: 'libs/backbone.queryparams',
        backbone_querystring_shim: 'libs/backbone.queryparams-1.1-shim',
        backbone_jsynth: 'libs/backbone.jsynth',
        underscore: 'libs/underscore',
        jquery: 'libs/jquery-2.1.0',
        "bootstrap": 'libs/bootstrap',
        text: 'libs/text',
        'string-format': 'libs/string-format',
        'backbone_cache': 'libs/backbone.fetch-cache'
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

requirejs([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var scripts = document.getElementsByTagName('script');
    _.each(scripts, function (script) {
        window.app = {};
        var dataApp = script.getAttribute('data-app');
        if (dataApp) {
            require([dataApp], function (App) {
                window.app[dataApp] = new App();
                Backbone.history.start();
            })
        }
    });
});