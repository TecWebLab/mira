"use strict";

define([
    'underscore',
    'jsynth/base/init',
    'jsynth/models/widget-abstract'
], function (_, Base, WidgetAbstract) {

    var Model = Base.Model.extend({

        idAttribute: 'name',

        parse: function(data){
            data.widgets = new WidgetAbstract.Model(data.widgets, {parse:true});
            return data;
        },

        getAllChildren: function(){
            if(!this.allChildren){
                var children = new WidgetAbstract.Collection();
                var parent = this.get('widgets');
                parent.getAllChildren(children);
                this.allChildren = children;
            }
            return this.allChildren;
        },

        getHtml: function($parent, model){
            var parent = this.get('widgets');
            var html = parent.getHtml($parent, model);
            return html;
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


});