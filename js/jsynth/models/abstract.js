"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore',
            'mira/base/init',
            'mira/models/widget-abstract',
            'mira/helper'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('underscore'),
            require('../base/init.js'),
            require('./widget-abstract.js'),
            require('../helper.js')
        );
    }
}(this, function (_, Base, WidgetAbstract, Helper) {

    var Model = Base.Model.extend({
        __name__ : 'Abstract.Model',

        idAttribute: 'name',

        initialize: function(){
            _.bindAll(this, 'handle');
        },

        parse: function(data){
            if(_.isArray(data.widgets)) {
                data.widgets = new WidgetAbstract.Collection(data.widgets, {parse: true});
            } else {
                data.widgets = new WidgetAbstract.Collection([data.widgets], {parse: true});
            }
            return data;
        },

        getHtml: function($parent, concrete, $data, $env){
            var widgets = this.get('widgets');
            widgets.each(function(widget){
                widget.getHtml($parent, concrete, $data, $env);
            });
            return $parent.html();
        },

        handle: function(concrete, $data, $env){
            mira.interface.render(this, concrete,  $data, $env);
        },

        prettyPrint: function(){
            var ret = this.toJSON();
            ret.widgets = ret.widgets.prettyPrint();
            return ret;
        }
    });

    var Collection =  Base.Collection.extend({
        __name__ : 'Abstract.Collection',

        model:Model,

        prettyPrint: function(){
            var ret = [];
            this.each(function(abstract){
               ret.push(abstract.prettyPrint())
            });
            return Helper.source(ret);
        }
    });

    return {
        Model : Model,
        Collection: Collection,
        Widget: WidgetAbstract
    }


}));