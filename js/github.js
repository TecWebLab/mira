"use strict";

var rules = [{
    name: 'DescricaoPequena',
    validate: 'data.name.length < 55'
},{
    name: 'isUser',
    validate: 'data.login != null'
}];

var selection = [
    {
        when: 'isUser',
        abstract: 'user'
    }
];

var interface_abstracts = [
    {
        name:'landing',
        widgets : {
            name:"main_page",
            children: ['texto']
        }
    },{
        name:'not_found',
        widgets : {
            name:"main_page",
            children: ['texto']
        }
    },{
        name: 'user',
        rule: 'isUser',
        widgets: {
            name: "main_page",
            children: [{"user": ['login', 'name']}, {
                name: "repositorios", datasource: "url:<%= data.repos_url %>",
                children: {"repositorio": ['nome', 'link']}
            }]
        }
    }

];

var concrete_interface = [
    {
        name: 'landing', maps: [
        { name: 'main_page', widget: 'SimpleHtml', tag:'div' },
        { name: 'texto', widget: 'SimpleHtml', tag:'h1', value:'"clique nas opcoes a cima"' }
    ]},{
        name: 'not_found', maps: [
        { name: 'main_page', widget: 'SimpleHtml', tag:'div' },
        { name: 'texto', widget: 'SimpleHtml', tag:'h1', value:'"Não selecionou nenhuma interface"' }
    ]}
    ,{
        name: 'user', maps: [
        { name: 'main_page', widget: 'SimpleHtml', tag:'div' },
        { name: 'pin', widget: 'BootstrapImageBox'},
        { name: 'name', widget: 'SimpleHtml', tag: 'a', class:'caption', value: 'data.name', href:'"http://pinterest.com" + data.href' },
        { name: 'name', widget: 'SimpleHtml', tag: 'h1', class:'caption', value: 'data.name', href:'"http://pinterest.com" + data.href', when:'DescricaoPequena' },
        { name: 'image', widget: 'ImageHtml', value: 'data.src' }
    ]}
];

var ajaxSetup = {
    headers: { "Authorization": "token f4ed0e86730b094fca1bb0d7003515b61c5afd14" }
};


if(typeof define === 'function') {
    define([
        // Load our app module and pass it to our definition function
        "jquery",
        "bootstrap",
        'jsynth/init'
    ], function ($, $bootstrap, JSynth) {

        return function Pinterest() {
            $.ajaxSetup(ajaxSetup);
            this.jsynth = new JSynth.Application(interface_abstracts, concrete_interface, rules, selection);
        };

    });
} else {
    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


