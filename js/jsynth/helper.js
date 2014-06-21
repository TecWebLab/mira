"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('underscore')
        );
    }
}(this, function (_) {

    return {
        buildFunction: function(value, context){
            var func;
            if(_.isString(value)){
                func = function(data){
                    try {
                        return eval(value);
                    } catch (ex){
                        console.log('erro na funcao do parser da rota ' , value);
                        return data
                    }
                };
            } else if(_.isFunction(value)) {
                func = value
            }
            if(func && context){
                func = _.bind(func, context);
            }
            return func
        },

        buildObjectToValidate: function(data, request, device, options){
            options || (options = {});
            return _.extend({}, {
                data: data,
                request: request,
                device: device
            }, options)
        },

        evaluate: function(when, data, request, device){
            var rule = Gus.interface.rules.get(when);
            var ret = rule.evaluate(data.attributes, request, device, data);
            return ret
        }
    }

}));