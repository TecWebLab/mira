"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore',
            'jsynth/base/init',
            'jsynth/models/widget-abstract',
            'jsynth/helper'
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

        getHtml: function($parent, concrete, data, request, device){
            var widgets = this.get('widgets');
            widgets.each(function(widget){
                widget.getHtml($parent, concrete, data, request, device);
            });
            return $parent.html();
        },

        handle: function(data, request, device){
            Gus.interface.render(this, data, request, device);
        },

        prettyPrint: function(){
            var ret = this.toJSON();
            ret.widgets = ret.widgets.prettyPrint();
            return ret;
        }
    });

    var Collection =  Base.Collection.extend({
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