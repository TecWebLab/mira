"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'mira/base/init'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('../base/init.js')
        );
    }
}(this, function (Base) {
    var Model = Base.Model.extend({
        __name__ : 'Api.Model',

        rdf_prop: function(){
            var rdf_prop_arguments = arguments;
            var ret = [];
            _.each(this.attributes['@graph'], function(item_graph){
                _.each(item_graph, function(value, key){
                    if(_.indexOf(rdf_prop_arguments, key) != -1){
                        ret.push(value);
                    }
                })
            });

            return ret;
        }
    });

    var Collection =  Base.Collection.extend({
        __name__ : 'Api.Collection',

        model:Model
    });

    return {
        Model : Model,
        Collection: Collection
    }

}));