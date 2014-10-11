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
    }
];

var interface_abstracts = [
    {
        name:'landing',
        widgets : [
            {'header': ['logo', {'search_form':{'search_group' : ['search_field', 'search_button']}}]},
            {'footer': ['footer-content']}
        ]
    },{
        name:'not_found',
        widgets : [
            {'header': ['logo', {'search_form':{'search_group' : ['search_field', 'search_button']}}]},
            {'content': 'warning'},
            {'footer': ['footer-content']}
        ]
    },{
        name: 'results',
        widgets : [
            {'header': ['logo', {'search_form':{'search_group' : ['search_field', 'search_button']}}]},
            {'content': [
                { name: "results", datasource: "$data.result",
                children: [
                    {name: 'result_panel', when:'hasName', children: {'result_item': {'result_link': ['result_icon', 'result_title', 'result_details']}}
                }]}
            ]},
            {'footer': ['footer-content']}
        ]
    }

];

var head = [
    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
    {name: 'secondary_css', widget:'Head', href:'css/freebase.css', tag: 'style'},
    {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
    {name: 'title', widget:'Title', value: '"FreeBase"'}
];

var concrete_interface = [
    {
        name: 'landing',
        head: head,
        maps: [

        { name: 'header', widget: 'SimpleHtml', tag:'div', class:'container-fluid text-center fundo' },
        { name: 'logo', widget: 'SimpleHtml', tag:'img', src:'"imgs/freebase_logo.png"' },

        { name: 'search_form', widget: 'SimpleHtml', tag:'form', onsubmit:'do_search(event);' },
        { name: 'search_group', widget: 'SimpleHtml', tag:'div', class:'input-group form_center col-sm-8' },
        { name: 'search_field', widget: 'SimpleHtml', tag:'input', class:'form-control input-lg', placeholder:'"Escreve o que deseja buscar"' },
        { name: 'search_button', widget: 'BootstrapFormGroupButton', class:'btn-warning', value:'"Buscar"' },

        { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'footer-content', widget: 'BootstrapFooter' }
    ]},{
        name: 'not_found',
        head: head,
        maps: [
        { name: 'header', widget: 'SimpleHtml', tag:'div', class:'container-fluid text-center fundo' },
        { name: 'logo', widget: 'SimpleHtml', tag:'img', src:'"imgs/freebase_logo.png"' },

        { name: 'search_form', widget: 'SimpleHtml', tag:'form', onsubmit:'do_search(event);' },
        { name: 'search_group', widget: 'SimpleHtml', tag:'div', class:'input-group form_center col-sm-8' },
        { name: 'search_field', widget: 'Input', tag:'input', class:'form-control input-lg', value:'busca', placeholder:'"Escreve o que deseja buscar"' },
        { name: 'search_button', widget: 'BootstrapFormGroupButton', class:'btn-warning', value:'"Buscar"' },

        { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'warning', widget: 'SimpleHtml', tag:'div', class:'alert alert-warning', value:'"Pagina nao encontrada"' },

        { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'footer-content', widget: 'BootstrapFooter' }
    ]}
    ,{
        name: 'results',
        head:head,
        maps: [
        { name: 'header', widget: 'SimpleHtml', tag:'div', class:'container-fluid text-center fundo' },
        { name: 'logo', widget: 'SimpleHtml', tag:'img', src:'"imgs/freebase_logo.png"' },

        { name: 'search_form', widget: 'SimpleHtml', tag:'form', onsubmit:'do_search(event);' },
        { name: 'search_group', widget: 'SimpleHtml', tag:'div', class:'input-group form_center col-sm-8' },
        { name: 'search_field', widget: 'SimpleHtml', tag:'input', class:'form-control input-lg', placeholder:'"Escreve o que deseja buscar"' },
        { name: 'search_button', widget: 'BootstrapFormGroupButton', class:'btn-warning', value:'"Buscar"' },

        { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container-fluid' },
        { name: 'results', widget: 'SimpleHtml', tag:'div', class:'row' },
        { name: 'result_panel', widget: 'SimpleHtml', tag:'div', class:'col-xs-12 col-sm-6 col-md-4 col-lg-3' },
        { name: 'result_item', widget: 'SimpleHtml', tag:'div', class:'item well' },
        { name: 'result_link', widget: 'SimpleHtml', tag:'a', href:'navigate("https://www.googleapis.com/freebase/v1/topic" + $data.id)' },
        { name: 'result_icon', widget: 'BootstrapIcon', when:'hasIcon', class:'pull-left', icon:'icons[$data.notable.name]' },
        { name: 'result_title', widget: 'SimpleHtml', tag:'h4', value:'$data.name' },
        { name: 'result_details', widget: 'SimpleHtml', tag:'span', value:'$data.notable.name', when:'hasType' },

        { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'footer-content', widget: 'BootstrapFooter' }
    ]}
];

var ajaxSetup = {
    data : {
        'key': 'AIzaSyC6xDllQ_3e8Q3KWOlguRkg22ZlEekCaDY'
    }
};
window.icons = icons;
window.do_search = function(event){
    event.preventDefault();
    var search = document.getElementById('search_field');
    window.busca = search.value;
    window.location.href = navigate('https://www.googleapis.com/freebase/v1/search?query=' + encodeURIComponent(search.value));
};


if(typeof define === 'function') {
    define([
        // Load our app module and pass it to our definition function
        "jquery",
        "bootstrap",
        'jsynth/init'
    ], function ($, $bootstrap, JSynth) {

        return function Google() {
            this.jsynth = new JSynth.Application(interface_abstracts, concrete_interface, rules, selection);
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


