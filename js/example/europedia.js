"use strict";

var rules = [{
        name: 'isResult',
        validate: '$data.result != null'
    },{
        name: 'hasName',
        validate: '$data.name != ""'
    },{
        name: 'hasType',
        validate: '$data.notable != null && $data.notable.name != ""'
    },{
        name: 'hasIcon',
        validate: '$data.notable != null && $data.notable.name != "" && icons[$data.notable.name] != undefined'
    },{
        name: 'isSecure',
        validate: '$env.request.protocol == "https:"'
    },{
        name: 'isTopicDesktopOrTablet',
        validate: '$data.property != null && ($env.device.desktop || $env.device.tablet)'
    },{
        name: 'isTopicMobile',
        validate: '$data.property != null && !($env.device.desktop || $env.device.tablet)'
    },{
        name: 'isProperty',
        validate: '_.keys($data.property).length == 1'
    }
];

var icons = {
    'College/University': 'book',
    'Field of study': 'book',
    'Book': 'book',
    'Musical Artist': 'headphones',
    'Musical Recording': 'headphones',
    'Brazilian state': 'globe',
    'Film festival event': 'video',
    'Neighborhood': 'envelope',
    'Location': 'home',
    'Software': 'cog',
    'Airport': 'plane',
    'Holiday': 'calendar'
};

var selection = [
    {
        when: 'isResult',
        abstract: 'results'
    },{
        when: 'isTopicDesktopOrTablet',
        abstract: 'topicComplete',
        concrete: 'topicComplete'
    },{
        when: 'isTopicMobile',
        abstract: 'topicMobile',
        concrete: 'topic'
    }
];

var interface_abstracts = [
    {
        name:'landing',
        widgets : [
            {'header': ['logo', {'search_form':{'search_group' : ['search_field', 'search_button']}}]},
            'footer'
        ]
    }

];

var head = [
    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
    {name: 'secondary_css', widget:'Head', href:'css/europedia.css', tag: 'style'},
    {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
    {name: 'title', widget:'Title', value: '"Europedia"'}
];

var concrete_interface = [
    {
        name: 'landing',
        head: head,
        maps: [

        { name: 'header', widget: 'SimpleHtml', tag:'div', class:'container-fluid text-center fundo' },
        { name: 'logo', widget: 'SimpleHtml', tag:'img', src:'"imgs/europedia.png"' },

        { name: 'search_form', widget: 'SimpleHtml', tag:'form', onsubmit:'do_search(event);' },
        { name: 'search_group', widget: 'SimpleHtml', tag:'div', class:'input-group form_center col-sm-8' },
        { name: 'search_field', widget: 'SimpleHtml', tag:'input', class:'form-control input-lg', placeholder:'"Escreve o que deseja buscar"' },
        { name: 'search_button', widget: 'BootstrapFormGroupButton', class:'btn-warning', value:'"Buscar"' },

          { name: 'footer', widget: 'TecWebRodape'}
    ]}
];

var ajaxSetup = {

};
window.icons = icons;
window.do_search = function(event){
    event.preventDefault();
    var search = document.getElementById('search_field');
    window.busca = search.value;
    window.location.href = navigate('https://www.europedia.com/search?query=' + encodeURIComponent(search.value));
};


if(typeof define === 'function') {
    define([
        // Load our app module and pass it to our definition function
        "jquery",
        "bootstrap",
        'mira/init'
    ], function ($, $bootstrap, Mira) {

        return function Google() {
            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
            $.ajaxSetup(ajaxSetup);
        };

    });
} else {

    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


