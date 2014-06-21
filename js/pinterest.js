"use strict";

var rules = [{
    name: 'DescricaoPequena',
    validate: 'data.name.length < 55'
},{
    name: 'isUser',
    validate: 'data.username'
    /* dado do contexto tiver a propriedade username */
}];

var interface_select_rules = [{
    name: 'user',
    when: 'isUser',
    params: {'id': 'data.username' }
}];

interface_select_rules.a = 1;

var interface_abstracts = [
    {
        name:'landing',
        concrete: 'user',
        widgets : {
            name:"main_page", datasource: "url:https://ismaelc-pinterest.p.mashape.com/mashable/boards",
            parse: 'data.body',
            children: {"pin" : ['image', 'name'],
                name: 'link',


            }
        }
    },
    {
        name: 'user' ,
        widgets : {
            name:"main_page", datasource: "url:https://ismaelc-pinterest.p.mashape.com/<%= request.params.id %>/boards",
            parse: 'data.body',
            children: {"pin" : ['image', 'name']}
        }
    }
];

var concrete_interface = [
    {
        name: 'user', maps: [
        { name: 'main_page', widget: 'SimpleHtml', tag:'div' },
        { name: 'pin', widget: 'BootstrapImageBox'},
        { name: 'name', widget: 'SimpleHtml', tag: 'a', class:'caption', value: 'data.name', href:'"http://pinterest.com" + data.href' },
        { name: 'name', widget: 'SimpleHtml', tag: 'h1', class:'caption', value: 'data.name', href:'"http://pinterest.com" + data.href', when:'DescricaoPequena' },
        { name: 'image', widget: 'ImageHtml', value: 'data.src' }
    ]
    }
];



if(typeof define === 'function') {
    define([
        // Load our app module and pass it to our definition function
        "jquery",
        "bootstrap",
        'jsynth/init'
    ], function ($, $bootstrap, JSynth) {

        return function Pinterest() {

            $.ajaxSetup({
                headers: { "X-Mashape-Authorization": "l3yD2xSglfY3UlsULLZ6FCajEXDQNnPe" }
            });

            this.jsynth = new JSynth.Application(interface_abstracts, concrete_interface, rules);

        };

    });
} else {
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.rules = rules;
}


