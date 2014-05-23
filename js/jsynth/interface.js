"use strict";

define([
    'underscore',
    'jsynth/base/init'
], function (_, Base) {

    return Base.View.extend({

        el: '#qualquer_lugar',

        initialize: function(abstracts, concrets, rules){
            this.abstracts = abstracts;
            this.concrets = concrets;
            this.rules = rules;

            this.concrets.invoke('load');
        },

        render: function(abstract, request, device){
            this.$el.empty();
            this.concrete = this.concrets.get(abstract.get('concrete') || abstract.get('name'));
            var ret = abstract.getHtml(this.$el, this.concrete, null, request, device);
            return this;
        }

    });

});