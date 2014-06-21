"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'jsynth/base/init'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('../base/init.js')
        );
    }
}(this, function (Base) {
    var Model = Base.Model.extend({

    });

    var Collection =  Base.Collection.extend({
        model:Model
    });

    return {
        Model : Model,
        Collection: Collection
    }

}));