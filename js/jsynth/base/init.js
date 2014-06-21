"use strict";
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'backbone'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('backbone')
        );
    }
}(this, function (Backbone) {

    var Model = Backbone.Model.extend({

    });

    var Collection = Backbone.Collection.extend({
        model: Model
    });

    var View = Backbone.View.extend({

    });

    return {
        Model: Model,
        Collection: Collection,
        View: View
    };
}));