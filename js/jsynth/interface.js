"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/view'
], function ($, _, Backbone, BaseView) {

    return BaseView.extend({
        initialize: function(routes, abstracts){
            this.routes = routes;
            this.abstracts = abstracts;

            this.routes.each(function(route){
                route.on('selection', this.abstract_selection, this);
            }, this);
        },

        abstract_selection: function(options){
            var abstract = this.abstracts.get(options.name);
            console.log(abstract);



        }

    });

});