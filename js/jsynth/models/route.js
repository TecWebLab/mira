"use strict";

define([
    'underscore',
    'jsynth/helper',
    'jsynth/base/init',
    'jsynth/models/route-rule',
    'jsynth/models/api'
], function(_, Helper, Base, RouteRule, Api) {

    var Model = Base.Model.extend({

        idAttribute: 'url',

        initialize: function(inter){
            this.interface = inter;
            _.bindAll(this, 'handle');
        },

        parse: function(data){
            if(_.isArray(data.rules)){
                data.rules = new RouteRule.Collection(data.rules);
            }
            return data;
        },

        build_url_request: function(request, device){
            var endpoint = this.get('endpoint');
            var endpoint_build = endpoint.format(request.args);
            return endpoint_build;
        },

        request_data: function(request, device, callback){
            var esse = this;
            var endpoint = this.build_url_request(request, device);

            var parse = Helper.buildFunction(this.get('parse'), this);

            var collection = new (Api.Collection.extend({
                url: endpoint,
                parse: parse  || Api.Collection.prototype.parse
            }))();

            collection.fetch({
                cache: this.get('cache') || true,
                expires: this.get('expires') || 3600000, //1h
                success: function(col){
                    callback(col);
                }
            });
        },

        has_rules: function(){
            return this.get('rules') != undefined;
        },

        abstract_selection_by_rule: function(model, request, device){
            var name = null;
            if(_.isArray(this.get('rules'))){
                _.each(this.get(rules), function(rule){
                    var when = this.interface.rules.get(rule.when);
                    if(when.evaluate(model.attributes, request, device)){
                        name = rule.abstract;
                    }
                }, this);
            }
            return name;
        },

        request_builder: function(args){
            var ar = Array.prototype.slice.call(args, 0);
            var request = _.pick(Backbone.history.location,
            'hash', 'host', 'hostname', 'href', 'origin', 'pathname', 'port', 'protocol', 'search');
            if(args.length && _.isObject(ar[ar.length - 1])){
                request.args = ar.slice(0, ar.length - 1);
                request.params = ar[ar.length - 1];
            } else {
                request.args = ar;
                request.params = null;
            }
            return request;
        },

        device_builder: function(){
            return {};
        },

        handle: function(){

            var request = this.request_builder(arguments);
            var device = this.device_builder();

            var esse = this;
            this.request_data(request, device, function(collection){
                var model = collection.at(0);
                var name = null;
                if(esse.has_rules()){
                    name = esse.abstract_selection_by_rule(model, request, device);
                } else if(esse.get('abstract')){
                    name = esse.get('abstract');
                }
                if(!name){
                    throw new Error("rules ou abstract não foram definidos corretamente na regra.")
                }
                esse.trigger('selection', {
                    name: name,
                    model:model,
                    collection:collection,
                    request: request,
                    device: device
                });
            });

        }

    });

    var Collection =  Base.Collection.extend({
        model:Model,

        register_route: function(backbone_route){
            this.each(function(route){
                backbone_route.route(
                    route.get('url'),
                    route.get('name') || route.get('url'),
                    route.handle
                )
            });
        }
    });

    return {
        Model : Model,
        Collection: Collection,
        Rule: RouteRule
    }
});