"use strict";

define([
    'underscore',
    'backbone',
    'backbone_query', // plugin - apenas extendendo - n usar a classe
    'backbone_cache', // plugin - apenas extendendo - n usar a classe
    'string-format' // plugin - apenas extendendo - n usar a classe
], function(_, Backbone, BackboneQuery, BackboneCache, StringFormat){

    var JSynth = null;

    var Application = Backbone.Router.extend({

        initialize: function (interface_abstracts, interface_concretes, rules_lib, selection_rules) {
            JSynth = requirejs('jsynth/init');
            var abstract = new JSynth.Abstract.Collection(interface_abstracts, {parse:true});
            var concrets = new JSynth.Concrete.Collection(interface_concretes, {parse:true});
            var rules = new JSynth.Rule.Collection(rules_lib, {parse:true});
            var selection = new JSynth.Selection.Collection(selection_rules, {parse:true});
            this.interface = new JSynth.Interface(abstract, concrets, rules, selection, this);
            window.Gus = this;

            _.bindAll(this, 'selected');
        },

        routes: {
            "": "selection"
        },

        selection: function(params){
            var request = this.buildRequest(params);
            var device = this.buildDevice();
            this.interface.selection.evaluate_abstract(request, device, this.selected);
        },

        selected: function(abstract_name, data, request, device){
            var abstract = this.interface.abstracts.get(abstract_name);
            abstract.handle(data, request, device);
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
            return this.request;
        },

        buildDevice: function(){
            this.device = {};
            return this.device
        }

    });

    return Application;

});