"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'mira/base/init',
            'mira/models/api',
            'mira/helper',
            'hello'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('../base/init.js'),
            require('../models/api.js'),
            require('../helper.js'),
            require('../libs/hello.js')
        );
    }
}(this, function (Base, Api, Helper, Hello) {
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
                    Hello('flickr').api($env.request.params.URI, $env.request.params.params).then(function(data) {
                        var $data = new Api.Model(data);
                        var abstract = 'not_found';
                        var concrete = abstract;
                        esse.each(function(selection){
                            if(Helper.evaluate(selection.get('when'), $data, $env)){
                                abstract = selection.get('abstract');
                                concrete = selection.get('concrete') || selection.get('abstract')
                            }
                        });
                        callback(abstract, concrete, $data, $env);
                    });
                }
            } else {
                callback('landing', 'landing', null, $env)
            }
        }
    });

    return {
        Model : Model,
        Collection: Collection
    }

}));