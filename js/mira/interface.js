"use strict";

define([
    'underscore',
    'jquery',
    'mira/base/init',
    'mira/base/view'
], function (_, $, Base, View) {

    return View.Data.extend({

        __name__ : 'Interface',

        el: 'body',

        initialize: function(abstracts, concrets, rules, selection){
            this.abstracts = abstracts;
            this.concrets = concrets;
            this.rules = rules;
            this.selection = selection;
        },

        full_render: function(abstract, concrete, $data, $env){
            this.abstract = abstract;
            this.concrete = concrete;
            this.setModel(new Base.Model($data));
            this.$env = $env;

            this.render()
        },

        render: function(){
            this.$el.empty();
            var $head = $('head');
            this.concrete.buildHead($head, this.model, this.$env);
            this.abstract.getHtml(this.$el, this.concrete, this.model, this.$env);
            return this;
        }

    });

});