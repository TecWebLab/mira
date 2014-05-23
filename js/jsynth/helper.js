"use strict";

define([
    'underscore'
], function (_) {

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
        }
    }

});