"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'jsynth/base/init',
            'jsynth/helper'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('../base/init.js'),
            require('../helper.js')
        );
    }
}(this, function (Base, Helper) {
    var Model = Base.Model.extend({
        __name__ : 'Selection.Model'
    });

    var Collection =  Base.Collection.extend({
        __name__ : 'Selection.Collection',
        model:Model,

        evaluate_abstract: function($env, callback){
            if($env.request.params){
                if($env.request.params.URI){
                    var esse = this;
                    $.get($env.request.params.URI, function($data){
                        var abstract = 'not_found';
                        esse.each(function(selection){
                            if(Helper.evaluate(selection.get('when'), $data, $env)){
                                abstract = selection.get('abstract');
                            }
                        });
                        callback(abstract, $data, $env);
                    })
                }
            } else {
                callback('landing', null, $env)
            }
        }
    });

    return {
        Model : Model,
        Collection: Collection
    }

}));