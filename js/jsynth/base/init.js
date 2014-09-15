"use strict";
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore',
            'backbone'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('underscore'),
            require('backbone')
        );
    }
}(this, function (_, Backbone) {

    function createNamedConstructor(name, constructor) {

        var fn = new Function('constructor', 'return function ' + name.replace('.', '_') + '()\n'
            + '{\n'
            + '    // wrapper function created dynamically for "' + name + '" constructor to allow instances to be identified in the debugger\n'
            + '    constructor.apply(this, arguments);\n'
            + '};');
        return fn(constructor);
    }

    var originalExtend = Backbone.View.extend; // Model, Collection, Router and View shared the same extend function
    var nameProp = '__name__';
    var newExtend = function (protoProps, classProps) {
        if (protoProps && protoProps.hasOwnProperty(nameProp)) {
            // TODO - check that name is a valid identifier
            var name = protoProps[nameProp];
            // wrap constructor from protoProps if supplied or 'this' (the function we are extending)
            var constructor = protoProps.hasOwnProperty('constructor') ? protoProps.constructor : this;
            protoProps = _.extend(protoProps, {
                constructor: createNamedConstructor(name, constructor)
            });
        }
        return originalExtend.call(this, protoProps, classProps);
    };

    Backbone.Model.extend = Backbone.Collection.extend = Backbone.Router.extend = Backbone.View.extend = newExtend;


    var Model = Backbone.Model.extend({
        __name__: 'Base.Model'

    });

    var Collection = Backbone.Collection.extend({
        __name__: 'Base.Collection',

        model: Model
    });

    var View = Backbone.View.extend({
        __name__: 'Base.View'
    });

    return {
        Model: Model,
        Collection: Collection,
        View: View
    };
}));