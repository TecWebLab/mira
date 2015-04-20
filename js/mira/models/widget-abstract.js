"use strict";

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore',
            'mira/helper',
            'mira/base/init',
            'mira/base/view',
            'mira/models/api'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('underscore'),
            require('../helper.js'),
            require('../base/init.js'),
            require('../base/view.js'),
            require('./api.js')
        );
    }
}(this, function (_, Helper, Base, MiraView, Api) {

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

        isVisible: function($data, $env, $bind){
            if(this.get('when')) {
                return Helper.evaluate(this.get('when'), $data.attributes, $env, $data, $bind);
            }
            return true;
        },

        getBind: function($data, $env){
            if(this.get('bind')){
                try{
                    return eval(this.get('bind'))
                } catch (e){
                    console.log('Error on bind attr of widget abstract', this, this.get('bind'));
                    return null;
                }
            }
            return null;
        },

        getRender: function(concrete, $data, $env, $bind){
            var maps = concrete.get('maps').where({'name': this.get('name')});
            var map_selected = null;
            _.each(maps, function(map){
                if(map.isVisible($data, $env)) {
                    map_selected = map;
                }
            }, this);
            return map_selected
        },

        buildWidget: function($parent, concrete, $data, $env, callback) {
            var esse = this;
            var $bindl = this.getBind($data.attributes, $env);
            var next = function ($bind) {
                var map = esse.getRender(concrete, $data, $env, $bind);
                if (map && esse.isVisible($data, $env, $bind)) {
                    map.getHtml($parent, $data, $env, $bind, callback);
                }
            };

            if (this.get('select')) {
                $.ajax({
                    url: $env.request.uri.source,
                    select: this.get('select'),
                    success: function (data) {
                        next(data);
                    }
                });
            } else {
                next($bindl);
            }

            /*
            var $bind = this.getBind($data.attributes, $env);
            var map = this.getRender(concrete, $data, $env, $bind);
            if (map && this.isVisible($data, $env, $bind)) {
                map.getHtml($parent, $data, $env, $bind, callback);

            }*/
        },

        registerCollection: function($env, collection){
            if($env.collections[this.get('name')]){
                if(typeof $env.collections[this.get('name')] != Array){
                    $env.collections[this.get('name')] = [$env.collections[this.get('name')]];
                }
                $env.collections[this.get('name')].push(collection);

            } else {
                $env.collections[this.get('name')] = collection;
            }
        },

        requestSelect: function(){


        },

        buildChildren: function($parent, concrete, $data, $env){
            var esse = this;
            var $bind = this.getBind($data.attributes, $env);
            if(this.get('datasource')){
                var itemWidget = this.get('children').at(0);
                this.requestData($data, $env, $bind, function(collection){

                    esse.registerCollection($env, collection);

                    var view = new MiraView.Collection({
                        collection: collection,
                        model: $data,
                        $el: $parent,
                        $env: $env,
                        $bind: $bind,
                        widget: this,
                        concrete: concrete,
                        itemWidget: itemWidget
                    });

                    view.render();

                });
            }  else {
                this.get('children').each(function (widget, i) {
                    widget.getHtml($parent, concrete, $data, $env);
                }, this);
            }
        },

        getHtml: function($parent, concrete, $data, $env){
            var esse = this;
            var anchor = Helper.buildAnchor();
            var temp = Helper.buildAnchor();
            $parent.append(anchor);
            this.buildWidget(temp, concrete, $data, $env, function(options){
                esse.buildChildren(options.$children, concrete, $data, $env);
                anchor.after(temp.children());
                anchor.remove();
            });
        },

        buildUrlDatasource: function(parentData, $env, $bind){
            var datasource = this.get('datasource');
            var endpoint_build = _.template(datasource.substring(4), Helper.buildObjectToValidate(parentData, $env, $bind));
            return endpoint_build;
        },

        buildParentDataDatasource: function($data){
            return eval(this.get('datasource'));
        },

        requestData: function(parentData, $env, $bind, callback){
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
                if(data instanceof Backbone.Collection){
                    collection = data;
                } else {
                    var collection = new Api.Collection(data, {
                        parse: parse || Api.Collection.prototype.parse
                    });
                }
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