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

    });

    var Collection =  Base.Collection.extend({
        model:Model,

        evaluate_abstract: function(request, device, callback){
            if(request.params){
                if(request.params.URI){
                    var esse = this;
                    $.get(request.params.URI, function(data){
                        var abstract = 'not_found';
                        esse.each(function(selection){
                            if(Helper.evaluate(selection.get('when'), data, request, device)){
                                abstract = selection.get('abstract');
                            }
                        });
                        callback(abstract, data, request, device);
                    })
                }
            } else {
                callback('landing', null, request, device)
            }
        }
    });

    return {
        Model : Model,
        Collection: Collection
    }

}));