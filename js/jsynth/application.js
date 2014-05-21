"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone_query',
    'backbone_cache'
], function($, _, Backbone, BackboneQuery, BackboneCache){

    var Application = Backbone.Router.extend({

        initialize: function (interface_select_rules, interface_abstracts, interface_concretes, rules_lib) {
            var JSynth = require('jsynth/init');
            var routes = new JSynth.Route.Collection(interface_select_rules, {parse:true});
            var abstract = new JSynth.InterfaceAbstract.Collection(interface_abstracts, {parse:true});
            var concrets = new JSynth.InterfaceConcrete.Collection(interface_concretes, {parse:true});
            var rules = new JSynth.Rule.Collection(rules_lib, {parse:true});
            routes.register_route(this);
            this.interface = new JSynth.Interface(routes, abstract, concrets, rules);
            Backbone.history.start();
            window.Gus = this;
        }
    });

    return Application;

});