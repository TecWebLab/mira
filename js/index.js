"use strict";

var exemplos = [
    {name: "Freebase", href:"/?app=example/freebase"},
    {name: "Google", href:"/?app=example/google"},
    {name: "Github", href:"/?app=example/github"},
    {name: "Imobiliária", href:"/?app=example/imovel"},
    {name: "Futebol", href:"/?app=example/futebol"},
    {name: "Flickr", href:"/?app=example/flickr"},
    {name: "Todo", href:"/?app=example/todo"},
    {name: "Europeana", href:"/?app=example/europeana"}
];

var rules = [];

var selection = [];

var interface_abstracts = [
    {
        name:'landing',
        widgets : [
            { 'header': {'content': ['title', 'description', 'examples',
                { name: 'apps', datasource:exemplos, children: 'app' },
                'builder', 'builder_link',
                'docs', 'docs_link',
                'repository', 'repository_codeplex', 'repository_github'
            ]}},
            {'footer': ['footer-tecweb', 'footer-puc']}
        ]
    }
];

var head = [
    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
    {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
    {name: 'title', widget:'Title', value: '"MIRA | Model Interface for REST Applications"'}
];

var concrete_interface = [
    {
        name: 'landing',
        head: head,
        maps: [

        { name: 'header', widget: 'BootstrapSimple', class:'jumbotron' },
        { name: 'content', widget: 'BootstrapSimple', class:'container' },
        { name: 'title', widget: 'BootstrapSimple', tag:'h1', value:'"MIRA"' },
        { name: 'description', widget: 'BootstrapSimple', tag:'p', value:'"Model Interface for REST Application"' },
        { name: 'examples', widget: 'BootstrapSimple', tag:'p', value:'"Try some examples"' },
        { name: 'apps', widget: 'BootstrapSimple', class:'btn-toolbar' },
        { name: 'app', widget: 'BootstrapSimple', tag:'a', btn:'primary,lg', xs:'block', sm:'inline', md:'inline', lg:'inline', href:'$data.href', value:'$data.name' },

        { name: 'docs', widget: 'BootstrapSimple', tag:'h3', value:'"Documentation available at"' },
        { name: 'docs_link', widget: 'BootstrapSimple', tag:'a', btn:'info,lg', xs:'block', sm:'inline', md:'inline', lg:'inline', value:'"Docs"', href:'"http://mira.tecweb.inf.puc-rio.br/docs"'},

        { name: 'builder', widget: 'BootstrapSimple', tag:'h3', value:'"Builder of Abstract Interface available at"' },
        { name: 'builder_link', widget: 'BootstrapSimple', tag:'a', btn:'info,lg', xs:'block', sm:'inline', md:'inline', lg:'inline', value:'"Builder"', href:'"http://ebertti.github.io/mira-ui/"'},


        { name: 'repository', widget: 'BootstrapSimple', tag:'h3', value:'"Source code available at"' },
        { name: 'repository_codeplex', widget: 'BootstrapSimple', tag:'a', btn:'info,lg', xs:'block', sm:'inline', md:'inline', lg:'inline', value:'"CodePlex"', href:'"http://mira.codeplex.com"'},
        { name: 'repository_github', widget: 'BootstrapSimple', tag:'a', btn:'info,lg', xs:'block', sm:'inline', md:'inline', lg:'inline', value:'"Github"', href:'"https://github.com/TecWebLab/mira"'},

        { name: 'footer', widget: 'TecWebRodape'}
    ]}
];

if(typeof define === 'function') {
    define([
        // Load our app module and pass it to our definition function
        "jquery",
        "bootstrap",
        'mira/init'
    ], function ($, $bootstrap, Mira) {

        return function Index() {
            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
        };

    });
} else {
    exports.ajaxSetup = {};
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


