"use strict";

define([
    'underscore',
    'backbone',
    'modernizr',
    'device',
    'backbone_query', // plugin - apenas extendendo - n usar a classe
    'backbone_cache', // plugin - apenas extendendo - n usar a classe
    'string-format' // plugin - apenas extendendo - n usar a classe
], function(_, Backbone, Modernizr, Device, BackboneQuery, BackboneCache, StringFormat){

    var JSynth = null;

    var Application = Backbone.Router.extend({

        __name__ : 'Application',

        initialize: function (interface_abstracts, interface_concretes, rules_lib, selection_rules) {
            JSynth = requirejs('jsynth/init');
            var abstract = new JSynth.Abstract.Collection(interface_abstracts, {parse:true});
            var concretes = new JSynth.Concrete.Collection(interface_concretes, {parse:true});
            var rules = new JSynth.Rule.Collection(rules_lib, {parse:true});
            var selection = new JSynth.Selection.Collection(selection_rules, {parse:true});
            this.interface = new JSynth.Interface(abstract, concretes, rules, selection, this);
            window.Gus = this;
            window.navigate = JSynth.Helper.navigate;

            _.bindAll(this, 'selected');
        },

        routes: {
            "": "selection",
            "*params": 'not_found'
        },

        selection: function(params){
            var $env = this.buildEnv(params);
            this.interface.selection.evaluate_abstract($env, this.selected);
        },

        selected: function(abstract_name, concrete_name, $data, $env){
            var abstract = this.interface.abstracts.get(abstract_name);
            var concrete = this.interface.concrets.get(concrete_name);
            abstract.handle(concrete, $data, $env);
        },

        buildEnv: function(params){
            this.$env = {};

            this.$env.request = _.pick(Backbone.history.location,
                'hash', 'host', 'hostname', 'href', 'origin', 'pathname', 'port', 'protocol', 'search');
            this.$env.request.params = params;

            if(params && params.URI) {
                this.$env.request.uri = JSynth.Helper.parseURL(params.URI)
            }
            this.$env.device = Device;
            this.$env.device.features = Modernizr;

            return this.$env;
        }



    });

    return Application;

});