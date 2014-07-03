"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore',
            'jsynth/base/init',
            'jsynth/models/widget-abstract'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('underscore'),
            require('../base/init.js'),
            require('./widget-abstract.js')
        );
    }
}(this, function (_, Base, WidgetAbstract) {

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
        }
    });

    var Collection =  Base.Collection.extend({
        model:Model
    });

    return {
        Model : Model,
        Collection: Collection,
        Widget: WidgetAbstract
    }


}));