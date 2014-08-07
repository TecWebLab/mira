"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore',
            'jsynth/helper',
            'jsynth/base/init',
            'jsynth/models/api'
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

        idAttribute: 'name',

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

        isVisible: function(data, request, device){
            if(this.get('when')) {
                return Helper.evaluate(this.get('when'), data.attributes, request, device);
            }
            return true;
        },

        getRender: function(concrete, data, request, device){
            var maps = concrete.get('maps').where({'name': this.get('name')});
            _.each(maps, function(map){
                if(map.isVisible(data, request, device)) {
                    this.map = map;
                }
            }, this);
        },

        getHtml: function($parent, concrete, data, request, device){
            var esse = this;
            this.getRender(concrete, data, request, device);
            if(this.map && this.isVisible(data, request, device)) {
                var ret = this.map.getHtml($parent, data, request, device);

                if(this.get('datasource')){
                    ret.view = this.buildView(ret.$el, data);
                    var itemWidget = this.get('children').at(0);
                    this.requestData(data, request, device, function(collection){
                        collection.each(function(m){
                            var retSubview = itemWidget.getHtml(ret.$children, concrete, m, request, device);
                            var subview = esse.buildView(retSubview.$el);
                            ret.view.subview.push(subview);
                        });
                    });
                } else {
                    this.get('children').each(function (widget) {
                        widget.getHtml(ret.$children, concrete, data, request, device);
                    }, this);
                }
                return ret;
            }
        },

        buildView: function($el, data){
            var view = new Base.View({
                el: $el,
                model: data
            });
            view.subview = [];
            return view;
        },

        buildUrlDatasource: function(parentData, request, device){
            var datasource = this.get('datasource');
            var endpoint_build = _.template(datasource.substring(4), Helper.buildObjectToValidate(parentData, request, device));
            return endpoint_build;
        },

        buildParentDataDatasource: function(data){
            return eval(this.get('datasource'));
        },

        requestData: function(parentData, request, device, callback){
            var esse = this;
            var datasource = this.get('datasource');
            var parse = Helper.buildFunction(this.get('parse'), this);

            if(datasource.indexOf('url:') == 0) {
                var endpoint = this.buildUrlDatasource(parentData, request, device);
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
            } else if(datasource.indexOf('data.')) {
                var data = this.buildParentDataDatasource(parentData);
                var collection = new Api.Collection(data, {
                    parse: parse || Api.Collection.prototype.parse
                });
                callback(collection);
            } else {
                console.log('erro no requestData ' + datasource, this);
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