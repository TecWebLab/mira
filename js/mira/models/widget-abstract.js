"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore',
            'mira/helper',
            'mira/base/init',
            'mira/models/api'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('underscore'),
            require('../helper.js'),
            require('../base/init.js'),
            require('./api.js')
        );
    }
}(this, function (_, Helper, Base, Api) {

    var Model = Base.Model.extend({
        __name__ : 'Widget.Model',

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

        isVisible: function($data, $env){
            if(this.get('when')) {
                return Helper.evaluate(this.get('when'), $data.attributes, $env);
            }
            return true;
        },

        getRender: function(concrete, $data, $env){
            var maps = concrete.get('maps').where({'name': this.get('name')});
            var map_selected = null;
            _.each(maps, function(map){
                if(map.isVisible($data, $env)) {
                    map_selected = map;
                }
            }, this);
            return map_selected
        },

        getHtml: function($parent, concrete, $data, $env){
            var esse = this;
            var map = this.getRender(concrete, $data, $env);
            if(map && this.isVisible($data, $env)) {
                var ret = map.getHtml($parent, $data, $env);
                if(this.get('datasource')){
                    ret.view = this.buildView(ret.$el, $data);
                    var itemWidget = this.get('children').at(0);
                    this.requestData($data, $env, function(collection){
                        collection.each(function(m){
                            var retSubview = itemWidget.getHtml(ret.$children, concrete, m, $env);
                            if(retSubview) {
                                var subview = esse.buildView(retSubview.$el);
                                ret.view.subview.push(subview);
                            }
                        });
                    });
                } else {
                    this.get('children').each(function (widget) {
                        widget.getHtml(ret.$children, concrete, $data, $env);
                    }, this);
                }
                return ret;
            }
        },

        buildView: function($el, $data){
            var view = new Base.View({
                el: $el,
                model: $data
            });
            view.subview = [];
            return view;
        },

        buildUrlDatasource: function(parentData, $env){
            var datasource = this.get('datasource');
            var endpoint_build = _.template(datasource.substring(4), Helper.buildObjectToValidate(parentData, $env));
            return endpoint_build;
        },

        buildParentDataDatasource: function($data){
            return eval(this.get('datasource'));
        },

        requestData: function(parentData, $env, callback){
            var esse = this;
            var datasource = this.get('datasource');
            var parse = Helper.buildFunction(this.get('parse'), this);

            if(datasource.indexOf('url:') == 0) {
                var endpoint = this.buildUrlDatasource(parentData, $env);
                var collection = new (Api.Collection.extend({
                    url: endpoint,
                    parse: parse || Api.Collection.prototype.parse
                }))();

                collection.fetch({
                    cache: this.get('cache') || true,
                    expires: this.get('expires') || 3600000, //1h
                    success: function (col) {
                        callback(col);
                    }
                });
            } else {
                var data = this.buildParentDataDatasource(parentData.attributes);
                var collection = new Api.Collection(data, {
                    parse: parse || Api.Collection.prototype.parse
                });
                callback(collection);
            }
        },

        prettyPrint: function(){
            var ret = _.pick(this.toJSON(), 'name', 'children', 'datasource');
            ret.children = ret.children.prettyPrint();

            if(_.isObject(ret.datasource)) {
                ret.datasource = 'obj'
            }
            if(_.isEmpty(ret.children)){
                delete ret.children;
            }
            return ret;
        }
    });

    var Collection =  Base.Collection.extend({
        __name__ : 'Widget.Collection',

        model:Model,

        prettyPrint: function(){
            var ret = [];
            this.each(function(abstract){
                ret.push(abstract.prettyPrint())
            });
            return ret;
        }
    });

    return {
        Model : Model,
        Collection: Collection
    }

}));