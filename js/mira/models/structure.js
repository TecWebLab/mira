"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore',
            'mira/helper',
            'mira/base/init',
            'mira/base/view',
            'mira/models/api',
            'mira/models/widget-abstract'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
          require('underscore'),
          require('../helper.js'),
          require('../base/init.js'),
          require('../base/view.js'),
          require('./api.js'),
          require('./widget-abstract.js')
        );
    }
}(this, function (_, Helper, Base, MiraView, Api, Abstract) {

    var Model = Abstract.Model.extend({
        __name__ : 'Structure.Model',

        parse: function(data){
            if(_.isString(data)){
                data = {'name': data}
            }
            if(!data.name){
                data.name = _.keys(data)[0];
                data.children = _.values(data)[0];
            }
            if(_.isString(data.children)){
                data.children = [data.children];
            }
            data.children = new Collection(data.children || [], {parse:true});
            return data;
        },

        prepare: function(abstracts){
            if(!this.original){
                this.original = _.clone(this.attributes);
            }
            this.abstract = abstracts.findWhere({name: this.get('name')});
            this.get('children').invoke('prepare', abstracts);
            if(this.abstract) {
                this.attributes = _.defaults(this.original, this.abstract.attributes);
            } else {
                this.attributes = this.original
            }
        }


    });

    var Collection =  Abstract.Collection.extend({
        __name__ : 'Structure.Collection',
        model:Model
    });

    return {
        Model : Model,
        Collection: Collection
    }

}));