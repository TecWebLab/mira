"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone_query',
    'jsynth/init',
    'jsynth/interface'
], function($, _, Backbone, BackboneQuery, JSynth, Interface){

    var AppRouter = Backbone.Router.extend({

        initialize: function (interface_select_rules, interface_abstracts, interface_concretes, rules) {
            this.routes = new JSynth.Route.Collection(interface_select_rules, {parse:true});
            this.abstract = new JSynth.InterfaceAbstract.Collection(interface_abstracts, {parse:true});
            this.concrets = new JSynth.InterfaceConcrete.Collection(interface_concretes, {parse:true});
            this.rules = new JSynth.Rule.Collection(rules, {parse:true});
            this.routes.register_route(this);
            this.interface = new Interface(this.routes, this.abstract, this.concrets, this.rules);

        }
    });

    return function(interface_select_rules, interface_abstracts, interface_concretes, rules){
        var router = new AppRouter(interface_select_rules, interface_abstracts, interface_concretes, rules);
        Backbone.history.start();
        return router;
    };
});