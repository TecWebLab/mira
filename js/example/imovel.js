"use strict";

var rules = [{
    name: 'isLancamento',
    validate: '$data.tipo == "Lançamento"'
},{
    name: 'isAluguel',
    validate: '$data.tipo == "Aluguel"'
},{
    name: 'isVenda',
    validate: '$data.tipo == "Venda"'
},{
    name: 'isImovel',
    validate: '$data.id != null'
}];

var selection = [
    {
        when: 'isMovel',
        abstract: 'imovel'
    }
];

var interface_abstracts = [
    {
        name:'landing',
        widgets : [
            {'container':[
                {'head': 'title'},
                {'content': {name: 'items', datasource:'url:<%= "/api/imovel" %>', children:[
                        {'item':
                            {'tipo': { 'link': ['nome', 'bairro']}}
                        }
                    ]}
                }
            ]}
        ]
    },{
        name:'not_found',
        widgets : [
            {'header': ['logo', {'search_form':{'search_group' : ['search_field', 'search_button']}}]},
            {'content': 'warning'},
            {'footer': ['footer-content']}
        ]
    },{
        name: 'imovel',
        widgets : [
            {'header': ['logo', {'search_form':{'search_group' : ['search_field', 'search_button']}}]},
            {'content': [
                {'meta': ['meta_type', {'meta_name': {'meta_legend' : ['meta_id', 'meta_creator', 'meta_timestamp']}},
                    {name: 'image_group', datasource:'$data.property["/common/topic/image"].values', children:['image'], when:'$data.property["/common/topic/image"] != null'}
                ]},
                { name: "results", datasource: "_.pairs(_.groupBy(_.pairs($data.property), function(i){ return i[0].split('/')[1]} ))",
                    children: [
                        {'result_group_panel': [
                            'result_group_name',
                            {name: 'result_group', datasource: '$data[1]',
                                children: [{name: 'result_panel',
                                    children: [{'result_item': {'result_link': ['result_icon', 'result_title', 'result_details']}}]
                                }]
                            }]}
                    ]}
            ]},
            {'footer': ['footer-content']}
        ]
    }

];

var head = [
    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
    {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
    {name: 'title', widget:'Title', value: '"Imovel"'}
];

var concrete_interface = [
    {
        name: 'landing',
        head: head,
        maps: [

        { name: 'container', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'head', widget: 'SimpleHtml', tag:'div', class:'jumbotron' },
        { name: 'title', widget: 'BootstrapSimple', tag:'h1', text:'center', value:'"Escolha seu Imóvel"' },

        { name: 'content', widget: 'BootstrapSimple', class:'row', md:'10,offset-1' },
        { name: 'items', widget: 'BootstrapSimple' },
        { name: 'item', widget: 'BootstrapSimple', md:'6'},
        { name: 'tipo', widget: 'BootstrapSimple', class:'panel-body', alert:'info', when:'isAluguel' },
        { name: 'tipo', widget: 'BootstrapSimple', class:'panel-body', alert:'success', when:'isLancamento' },
        { name: 'tipo', widget: 'BootstrapSimple', class:'panel-body', alert:'warning', when:'isVenda' },
        { name: 'link', widget: 'BootstrapSimple', tag:'a', href:'navigate("/api/imovel/" + $data.id)' },
        { name: 'nome', widget: 'BootstrapSimple', tag:'p', class:'lead', text:'center',  value:'$data.nome' },
        { name: 'bairro', widget: 'BootstrapSimple', tag:'p', text:'center', value:'$data.bairro'}

    ]},{
        name: 'imovel',
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

};

if(typeof define === 'function') {
    define([
        "jquery",
        "bootstrap",
        'mira/init'
    ], function ($, $bootstrap, Mira) {

        return function Imovel() {
            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
        };

    });
} else {

    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


