"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/model',
    'jsynth/base/collection',
    'jsynth/models/route-rule',
    'jsynth/models/api'
], function($, _, Backbone, ModelBase, CollectionBase, RouteRule, Api) {

    var Model = ModelBase.extend({

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

        request_data: function(callback){
            var endpoint = this.get('endpoint');

            var collection = new (Api.Collection.extend({
                url: endpoint
            }))();

            collection.fetch({
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
                    if(name) return; // se um nome já for definido, n valida mais
                    if(when.evaluate(model, request, device)){
                        name = rule.abstract;
                    }
                }, this);
            }
            return name;
        },

        handle: function(request, device){
            var esse = this;
            this.request_data(function(collection){
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
                esse.trigger('selection', { name: name });
            });

        }

    });

    var Collection =  CollectionBase.extend({
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