"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/model',
    'jsynth/collections/route-rule',
    'jsynth/collections/api'
], function($, _, Backbone, ModelBase, CollectionRouteRule, CollectionApi) {

    return ModelBase.extend({

        idAttribute: 'url',

        initialize: function(){
            _.bindAll(this, 'handle');
        },

        parse: function(data){
            if(_.isArray(data.rules)){
                data.rules = new CollectionRouteRule(data.rules);
            }
            return data;
        },

        request_data: function(){
            var endpoint = this.get('endpoint');

            var collection = new CollectionApi({
                url: endpoint
            });

            //collection.sync();
            return collection;
        },

        has_rules: function(){
            return this.get('rules') && _.isArray(this.get('rules').rules)
        },

        handle: function(){
            if(this.has_rules()){
                var collection = this.request_data();
            } else if(this.get('abstract')){
                this.trigger('selection', {
                        name: this.get('abstract'),
                        collection: this.request_data()
                    }
                )
            } else {
                throw new Error("rules ou abstract não foram definidos corretamente na regra.")
            }
        }

    });
});