"use strict";

var sourceUsers = [{
    name: 'Ezequiel Bertti',
    link: 'https://api.github.com/users/ebertti'
    },{
    name: 'Joao Leite',
    link: 'https://api.github.com/users/joaoleite'
}];

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
        widgets : [
            {'navigation': {name:'navigation-list', children:['navigation-list-item'], datasource:sourceUsers}},
            {'content': ['texto']},
            {'footer': ['footer-content']}
        ]
    },{
        name:'not_found',
        widgets : {
            name:"main_page",
            children: ['texto']
        }
    },{
        name: 'user',
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
        { name: 'navigation', widget: 'BootstrapNavigation', value:'"GitHub"'},
        { name: 'navigation-list', widget: 'BootstrapNavigationList'},
        { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'data.name', href:'data.link'},

        { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'texto', widget: 'SimpleHtml', tag:'h1', value:'"Clique em um usuario acima"' },

        { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'footer-content', widget: 'BootstrapFooter' }
    ]},{
        name: 'not_found', maps: [
        { name: 'main_page', widget: 'SimpleHtml', tag:'div' },
        { name: 'texto', widget: 'SimpleHtml', tag:'h1', value:'"Não selecionou nenhuma interface"' }
    ]}
    ,{
        name: 'user', maps: [
        { name: 'main_page', widget: 'SimpleHtml', tag:'div' },
        { name: 'user', widget: 'SimpleHtml', tag: 'div', class:'caption', value: 'data.name' },
        { name: 'login', widget: 'SimpleHtml', tag: 'span', value: 'data.login'},
        { name: 'repositorios', widget: 'SimpleHtml', tag: 'div'},
        { name: 'repositorio', widget: 'SimpleHtml', tag: 'div'},
        { name: 'nome', widget: 'SimpleHtml', tag: 'span', value: 'data.name'},
        { name: 'link', widget: 'SimpleHtml', tag: 'span', value: 'data.html_url'}
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


