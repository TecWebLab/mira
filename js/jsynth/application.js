"use strict";

define([
    'underscore',
    'backbone',
    'modernizr',
    'backbone_query', // plugin - apenas extendendo - n usar a classe
    'backbone_cache', // plugin - apenas extendendo - n usar a classe
    'string-format' // plugin - apenas extendendo - n usar a classe
], function(_, Backbone, Modernizr, BackboneQuery, BackboneCache, StringFormat){

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
            "": "selection"
        },

        selection: function(params){
            var $env = this.buildEnv(params);
            this.interface.selection.evaluate_abstract($env, this.selected);
        },

        selected: function(abstract_name, $data, $env){
            var abstract = this.interface.abstracts.get(abstract_name);
            abstract.handle($data, $env);
        },

        register_rsssoutes: function(abstracts){
            abstracts.each(function(abstract){
                this.route(
                    abstract.get('name') == 'landing' ? '' : abstract.get('name'),
                    function(params){
                        var $env = this.buildEnv(params);
                        abstract.handle($env);
                    }
                )
            }, this);
        },

        buildEnv: function(params){
            this.$env = {};

            this.$env.request = _.pick(Backbone.history.location,
                'hash', 'host', 'hostname', 'href', 'origin', 'pathname', 'port', 'protocol', 'search');
            this.$env.request.params = params;

            this.$env.device = {};
            this.$env.device.features = Modernizr;

            return this.$env;
        }

    });

    return Application;

});