"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore',
            'jsynth/base/init'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('underscore'),
            require('../base/init.js')
        );
    }
}(this, function (_, Base) {
    var Model = Base.Model.extend({
        __name__ : 'Rule.Model',

        idAttribute: 'name',

        evaluate: function($data, $env, $dataObj){
            try {
                return eval(this.get('validate')) == true;
            } catch (e){
                console.log("Error on rule" + this.get('name'), this, $data, $env);
                return false;
            }
        }
    });

    var Collection =  Base.Collection.extend({
        __name__ : 'Rule.Collection',

        model: Model
    });

    return {
        Model: Model,
        Collection: Collection
    }
}));
