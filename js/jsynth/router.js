"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone_query',
    'jsynth/init',
    'jsynth/interface'
], function($, _, Backbone, BackboneQuery, JSynth, Interface){

    function montar_estrutura_abstrata(widgets_abstratos){

        $('#lugar_qualquer').html(JSON.stringify(widgets_abstratos));

    }

    function render_widget(name, params){
        var template = require('text!templates/' + name + '.html');
        return _.template(template, params);
    }

    var AppRouter = Backbone.Router.extend({

        initialize: function (interface_select_rules, interface_abstracts) {
            this.routes = new JSynth.Route.Collection(interface_select_rules, {parse:true});
            this.abstract = new JSynth.InterfaceAbstract.Collection(interface_abstracts, {parse:true});
            this.routes.register_route(this);
            this.interface = new Interface(this.routes, this.abstract);

        }
    });

    return function(interface_select_rules, interface_abstracts){
        var router = new AppRouter(interface_select_rules, interface_abstracts);
        Backbone.history.start();
        return router;
    };
});