"use strict";

define([
    'underscore',
    'jsynth/base/init'
], function (_, Base) {

    var Model = Base.Model.extend({

        idAttribute: 'name',

        parse: function(data){
            var WidgetAbstract = require('jsynth/models/widget-abstract');
            data.children = new WidgetAbstract.Collection(data.children || [], {parse:true});
            return data;
        },

        can_has_children: function(){
            return _.indexOf(['CompositeInterfaceElement', 'AbstractInterface'], this.get('widget')) > -1
        },
        
        getAllChildren: function (children) {
            if(!children){
                var WidgetAbstract = require('jsynth/models/widget-abstract');
                children = new WidgetAbstract.Collection();
            }
            children.add(this);
            this.get('children').each(function(widget){
                children.add(widget.getAllChildren(children));
            }, this);
            return children;
        },

        getHtml: function($parent, model){
            if(this.concrete) {
                var ret = this.concrete.getHtml($parent, model);
                this.get('children').each(function (widget) {
                    widget.getHtml(ret.$children, model);
                }, this);
                return ret;
            }

        }
    });

    var Collection =  Base.Collection.extend({
        model:Model
    });

    return {
        Model : Model,
        Collection: Collection
    }

});