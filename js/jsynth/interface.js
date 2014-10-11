"use strict";

define([
    'underscore',
    'jquery',
    'jsynth/base/init'
], function (_, $, Base) {

    return Base.View.extend({

        __name__ : 'Interface',

        el: 'body',

        initialize: function(abstracts, concrets, rules, selection){
            this.abstracts = abstracts;
            this.concrets = concrets;
            this.rules = rules;
            this.selection = selection;

            this.concrets.invoke('load');
        },

        render: function(abstract, concrete, $data, $env){
            this.$el.empty();
            var $head = $('head');
            this.concrete = concrete;
            var dataobj = new Base.Model($data);
            this.concrete.buildHead($head, dataobj, $env);
            var ret = abstract.getHtml(this.$el, this.concrete, dataobj, $env);
            return this;
        }

    });

});