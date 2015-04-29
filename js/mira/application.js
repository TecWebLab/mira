"use strict";

define([
    'underscore',
    'backbone',
    'modernizr',
    'device',
    'backbone_query', // plugin - apenas extendendo - n usar a classe
    'string-format' // plugin - apenas extendendo - n usar a classe
], function(_, Backbone, Modernizr, Device, BackboneQuery, StringFormat){

    var Mira = null;

    var Application = Backbone.Router.extend({

        __name__ : 'Application',

        initialize: function (interface_abstracts, interface_concretes, rules_lib, selection_rules, conf) {
            Mira = requirejs('mira/init');
            var abstract = new Mira.Abstract.Collection(interface_abstracts, {parse:true});
            var concretes = new Mira.Concrete.Collection(interface_concretes, {parse:true});
            var rules = new Mira.Rule.Collection(rules_lib, {parse:true});
            var selection = new Mira.Selection.Collection(selection_rules, {parse:true});
            this.interface = new Mira.Interface(abstract, concretes, rules, selection, this);
            window.mira = this;
            window.navigate = Mira.Helper.navigate;
            this.conf = conf || {};
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
            this.buildEnvData($env, $data);
            var abstract = this.interface.abstracts.get(abstract_name);
            var concrete = this.interface.concrets.get(concrete_name);
            abstract.handle(concrete, $data, $env);
        },

        buildEnvData: function($env, $data){
            if($data instanceof Mira.Base.Model){
                $env.$data = $data.attributes;
                $env.$dataObj = $data;
            } else {
                $env.$data = $data;
                $env.$dataObj = new Mira.Api.Model($data);
            }
        },

        buildEnv: function(params){
            if(!this.$env) {
                this.$env = {};
            }

            this.$env.request = _.pick(Backbone.history.location,
                'hash', 'host', 'hostname', 'href', 'origin', 'pathname', 'port', 'protocol', 'search');
            this.$env.request.params = params;

            if(params && params.URI) {
                this.$env.request.uri = Mira.Helper.parseURL(params.URI)
            }
            this.$env.device = Device;
            this.$env.device.features = Modernizr;

            this.$env.collections = {};
            this.$env.events = this.conf.events || {};
            this.$env.methods = this.conf.methods || {};

            this.trigger('build_env', this.$env);

            return this.$env;
        },

        useServer: function(endpoint){
          endpoint = endpoint || '/server.js';

          var original = Backbone.$.ajax;

          Backbone.$.ajax = function(options) {

            var new_options = _.omit(options, 'data', 'type', 'url', 'select');

            var data = _.pick(options, 'data', 'type', 'url');

            _.extend(data, {
              app: window.app.name,
                select: options.select || undefined
            });

            _.extend(new_options, {
              data: data,
              type: 'get',
              url: endpoint
            });

            return original.apply(Backbone.$, [new_options]);
          };

        }

    });

    return Application;

});