"use strict";

var rules = [{
    name: 'Venceu',
    validate: '$data.ponto == 3'
},{
    name: 'Empatou',
    validate: '$data.ponto == 1'
},{
    name: 'Perdeu',
    validate: '$data.ponto == 0'
},{
    name: 'Penaltis',
    validate: '$data.penaltis_favor != null && $data.penaltis_contra != null'
},{
    name: 'Visitante',
    validate: '$data.local == "visitante"'
},{
    name: 'Casa',
    validate: '$data.local == "casa"'
},{
    name:'isTime',
    validate: '$data.id != null'
}];

var selection = [
    {
        when: 'isTime',
        abstract: 'time'
    }
];

var interface_abstracts = [
    {
        name:'landing',
        widgets : [
            {'container':[
                {'head': 'title'},
                {'content': {name: 'items', datasource:'url:<%= "/api/futebol" %>', children:[
                    {'item':
                    {'tipo': { 'link': ['nome', 'estado']}}
                    }
                ]}
                }
            ]}
        ]
    }, {
        name: 'time',
        widgets: [
            { 'display': 'nome' },
            {
                'content': [
                    {'jogos_box' :
                        ['jogos_title',
                            {name:'jogos_lista', datasource:'$data.jogos', children:[
                                {'item_box':[
                                    {'placar':[,
                                            {name: 'adversario', when:'Visitante'},
                                            'placar_texto',
                                            {name: 'adversario', when:'Casa'}
                                        ]},
                                    'penaltis'
                                ]}
                            ]}
                    ]},
                    {'mapa_box': 'mapa'}
                ]
            }
        ]
    }
];

var GeralHead = [
    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
    {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'}
];

var concrete_interface = [
    {
        name: 'landing',
        head: GeralHead.concat([
            {name: 'title', widget:'Title', value: '"Imovel"'}
        ]),
        maps: [

            { name: 'container', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'head', widget: 'SimpleHtml', tag:'div', class:'jumbotron' },
            { name: 'title', widget: 'BootstrapSimple', tag:'h1', text:'center', value:'"Futebol"' },

            { name: 'content', widget: 'BootstrapSimple', class:'row', md:'10,offset-1' },
            { name: 'items', widget: 'BootstrapSimple' },
            { name: 'item', widget: 'BootstrapSimple', md:'6'},
            { name: 'tipo', widget: 'BootstrapSimple', class:'panel-body', alert:'warning', when:'Empatou' },
            { name: 'tipo', widget: 'BootstrapSimple', class:'panel-body', alert:'success', when:'Venceu' },
            { name: 'tipo', widget: 'BootstrapSimple', class:'panel-body', alert:'danger', when:'Perdeu' },
            { name: 'link', widget: 'BootstrapSimple', tag:'a', href:'navigate("/api/futebol/" + $data.id)' },
            { name: 'nome', widget: 'BootstrapSimple', tag:'p', class:'lead', text:'center',  value:'$data.nome' },
            { name: 'estado', widget: 'BootstrapSimple', tag:'p', text:'center', value:'$data.estado'}

        ]},{
        name: 'time',
        head:GeralHead.concat([
            {name: 'title', widget:'Title', value: '$data.nome'}
        ]),
        maps: [

            { name: 'display', widget: 'SimpleHtml', tag:'div', class:'container jumbotron' },
            { name: 'nome', widget: 'BootstrapSimple', tag:'h1', text:'center,info', value:'$data.nome' },

            { name: 'content', widget: 'BootstrapSimple', class:'container' },
            { name: 'jogos_box', widget: 'BootstrapSimple', md:'8' },
            { name: 'jogos_title', widget: 'BootstrapSimple', tag:'h3', text:'center', value:'Partidas' },
            { name: 'jogos_lista', widget: 'BootstrapSimple', class:'row' },

            { name: 'item_box', widget: 'BootstrapSimple', text:'center', alert:'warning', when:'Empatou' },
            { name: 'item_box', widget: 'BootstrapSimple', text:'center', alert:'success', when:'Venceu' },
            { name: 'item_box', widget: 'BootstrapSimple', text:'center', alert:'danger', when:'Perdeu' },

            { name: 'placar', widget:'BootstrapSimple', tag:'h4'},
            { name: 'placar_texto', widget:'BootstrapSimple', tag:'span', value:'" " + $data.gols_contra + " X " + $data.gols_favor + " " + $env.$data.nome', when:'Visitante'},
            { name: 'placar_texto', widget:'BootstrapSimple', tag:'span', value:'$env.$data.nome + " " + $data.gols_favor + " X " + $data.gols_contra + " "', when:'Casa'},

            { name: 'penaltis', widget:'BootstrapSimple', tag:'p', value:'$data.penaltis_contra + " X " + $data.penaltis_favor', when:'Penaltis,Visitante'},
            { name: 'penaltis', widget:'BootstrapSimple', tag:'p', value:'$data.penaltis_favor + " X " + $data.penaltis_contra', when:'Penaltis,Casa'},

            { name: 'adversario', widget:'BootstrapSimple', tag:'a', value:'$data.contra', href:'navigate("/api/futebol/" + $data.contra_id)' },

            { name: 'mapa_box', widget:'BootstrapSimple', md:"4"},
            { name: 'mapa', widget:'MapStatic', value:'$data.sede', class:'thumbnail' },
            { name: 'mapa', widget:"MapDynamic", address:'$data.sede', options:{ zoom:13 }, when:'$env.device.desktop == true'}


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

        return function Futebol() {
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


