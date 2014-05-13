"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/view'
], function ($, _, Backbone, BaseView) {

    return BaseView.extend({

        el: '#qualquer_lugar',

        initialize: function(routes, abstracts, concrets){
            this.routes = routes;
            this.abstracts = abstracts;
            this.concrets = concrets;

            this.routes.each(function(route){
                route.on('selection', this.abstract_selection, this);
                route.on('get_collection', this.render, this)
            }, this);

            this.concrets.invoke('load');

        },

        render: function(abstract){
            abstract.getHtml(this.$el, this.model);
        },

        abstract_selection: function(options){
            var abstract = this.abstracts.get(options.name);
            var concrete = this.concrets.get(options.name);
            var widgets_abstract = abstract.getAllChildren();
            concrete.mapWidgets(widgets_abstract);
        }

    });

});