"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/collection',
    'jsynth/models/route'
], function ($, _, Backbone, CollectionBase, ModelRoute) {

    return CollectionBase.extend({
        model:ModelRoute,

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

});