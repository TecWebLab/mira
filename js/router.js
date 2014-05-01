"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone_query'
], function($, _, Backbone, BackboneQuery){

    function montar_estrutura_abstrata(widgets_abstratos){

        $('#lugar_qualquer').html(JSON.stringify(widgets_abstratos));

    }

    function render_widget(name, params){
        var template = require('text!templates/' + name + '.html');
        return _.template(template, params);
    }

    var AppRouter = Backbone.Router.extend({

        initialize: function (interface_select_rules, interface_abstracts) {
            _.each(interface_select_rules, function (url_selection_rule, route) {
                this.route(route, url_selection_rule, function(){
                    var collection = new Backbone.Collection([], {
                        url: url_selection_rule.endpoint
                    });
                    //seleciona regra a ser utilizada
                    if(url_selection_rule.rules && _.isArray(url_selection_rule.rules)){
                        collection.sync();
                        //validar com nools
                    } else if(url_selection_rule.abstract){

                        montar_estrutura_abstrata(interface_abstracts[url_selection_rule.abstract]);

                    } else {
                        throw new Error("rules ou abstract não foram definidos corretamente na regra.")
                    }
                })
            }, this);
        }
    });

    return function(interface_select_rules, interface_abstracts){
        var router = new AppRouter(interface_select_rules, interface_abstracts);
        Backbone.history.start();
        return router;
    };
});