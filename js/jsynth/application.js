"use strict";

define([
    'underscore',
    'backbone',
    'backbone_query', // plugin - apenas extendendo - n usar a classe
    'backbone_cache', // plugin - apenas extendendo - n usar a classe
    'string-format' // plugin - apenas extendendo - n usar a classe
], function(_, Backbone, BackboneQuery, BackboneCache, StringFormat){

    var Application = Backbone.Router.extend({

        initialize: function (interface_abstracts, interface_concretes, rules_lib) {
            var JSynth = require('jsynth/init');
            var abstract = new JSynth.Abstract.Collection(interface_abstracts, {parse:true});
            var concrets = new JSynth.Concrete.Collection(interface_concretes, {parse:true});
            var rules = new JSynth.Rule.Collection(rules_lib, {parse:true});
            this.register_routes(abstract);
            this.interface = new JSynth.Interface(abstract, concrets, rules, this);
            window.Gus = this;
        },

        register_routes: function(abstracts){
            abstracts.each(function(abstract){
                this.route(
                    abstract.get('name') == 'landing' ? '' : abstract.get('name'),
                    function(params){
                        var request = this.buildRequest(params);
                        var device = this.buildDevice();
                        abstract.handle(request, device);
                    }
                )
            }, this);
        },

        buildRequest: function(params){
            this.request = _.pick(Backbone.history.location,
                'hash', 'host', 'hostname', 'href', 'origin', 'pathname', 'port', 'protocol', 'search');
            this.request.params = params;
            return this.request.request;
        },

        buildDevice: function(){
            this.device = {};
            return this.device
        }

    });

    return Application;

});