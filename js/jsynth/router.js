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

        initialize: function (interface_select_rules, interface_abstracts, interface_concretes, rules_lib) {
            var routes = new JSynth.Route.Collection(interface_select_rules, {parse:true});
            var abstract = new JSynth.InterfaceAbstract.Collection(interface_abstracts, {parse:true});
            var concrets = new JSynth.InterfaceConcrete.Collection(interface_concretes, {parse:true});
            var rules = new JSynth.Rule.Collection(rules_lib, {parse:true});
            routes.register_route(this);
            this.interface = new Interface(routes, abstract, concrets, rules);

        }
    });

    return function(interface_select_rules, interface_abstracts, interface_concretes, rules){
        var router = new AppRouter(interface_select_rules, interface_abstracts, interface_concretes, rules);
        Backbone.history.start();
        window.router = router;
        return router;
    };
});