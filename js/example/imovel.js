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
        when: 'isImovel',
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
    }, {
        name: 'imovel',
        widgets: [
            { name: 'carousel', datasource: '$data.fotos', children: ['carousel_item'] },
            {
                'content': [
                    'nome',
                    {

                        'detalhes':[{'row' : [{
                            'localizacao_box': ['localizacao_title',
                                {name: 'localizacao_lista', datasource: '$data.localizacao', children: 'localizacao_item'}]
                        }, {
                            'negociacao_box': ['negociacao_title',
                                {name: 'negociacao_lista', datasource: '$data.venda', children: 'negociacao_item', when: 'isVenda'},
                                {name: 'negociacao_lista', datasource: '$data.lancamento', children: 'negociacao_item', when: 'isLancamento'},
                                {name: 'negociacao_lista', datasource: '$data.aluguel', children: 'negociacao_item', when: 'isAluguel'}
                            ]
                        }]}, 'descricao_title', 'descricao'
                        ]
                    },
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

        { name: 'container', class:'container' },
        { name: 'head', class:'jumbotron' },
        { name: 'title', tag:'h1', text:'center', value:'"Escolha seu Imóvel"' },

        { name: 'content',  class:'row', md:'10,offset-1' },
        { name: 'items', widget: 'BootstrapSimple' },
        { name: 'item',  md:'6'},
        { name: 'tipo',  class:'panel-body', alert:'info', when:'isAluguel' },
        { name: 'tipo',  class:'panel-body', alert:'success', when:'isLancamento' },
        { name: 'tipo',  class:'panel-body', alert:'warning', when:'isVenda' },
        { name: 'link',  tag:'a', href:'navigate("/api/imovel/" + $data.id)' },
        { name: 'nome',  tag:'p', class:'lead', text:'center',  value:'$data.nome' },
        { name: 'bairro',  tag:'p', text:'center', value:'$data.bairro'}

    ]},{
        name: 'imovel',
        head:GeralHead.concat([
            {name: 'title', widget:'Title', value: '"Imovel | " + $data.tipo  + " | " + $data.nome'}
        ]),
        maps: [
            { name: 'carousel', widget: 'BootstrapCarousel' },
            { name: 'carousel_item', widget: 'BootstrapCarouselItem', value:'$data.desktop', when:'$env.device.desktop == true' },
            { name: 'carousel_item', widget: 'BootstrapCarouselItem', value:'$data.mobile', when:'$env.device.mobile == true' },
            { name: 'carousel_item', widget: 'BootstrapCarouselItem', value:'$data.tablet', when:'$env.device.tablet == true' },

            { name: 'content', class:'container' },
            { name: 'nome', tag:'h1', text:'center', alert:'info', value:'$data.nome', when:'isAluguel' },
            { name: 'nome', tag:'h1', text:'center', alert:'success', value:'$data.nome', when:'isLancamento'},
            { name: 'nome', tag:'h1', text:'center', alert:'warning', value:'$data.nome', when:'isVenda'},
            { name: 'row', class:'row well' },
            { name: 'detalhes', md:'8' },
            { name: 'localizacao_box', md:'6' },
            { name: 'localizacao_title', tag:'h3', value:'"Localização"' },
            { name: 'localizacao_lista', tag:'ul' },
            { name: 'localizacao_item', tag:'li', value:'$data.item'},
            { name: 'negociacao_box', md:'6' },
            { name: 'negociacao_title', tag:'h3', value:'"Formas de Pagamento"', when:'isVenda' },
            { name: 'negociacao_title', tag:'h3', value:'"Contrato de Locação"', when:'isAluguel' },
            { name: 'negociacao_title', tag:'h3', value:'"Lançamento"', when:'isLancamento' },
            { name: 'negociacao_lista', tag:'ul' },
            { name: 'negociacao_item', tag:'li', value:'$data.item' },
            { name: 'descricao_title', tag:'h3', text:'center', value:'"Descrição"'},
            { name: 'descricao', widget: "BootstrapSimple", tag:'p', value:'$data.descricao'},
            { name: 'mapa_box', widget: "BootstrapSimple", md:'4'},
            { name: 'mapa', widget:'MapStatic', value:'$data.bairro', class:'thumbnail' },
            { name: 'mapa', widget: "MapDynamic", address:'$data.bairro', options:{ zoom:13}, when:'$env.device.desktop == true'}


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
            Mira.Widget.setDefault('BootstrapSimple');
        };

    });
} else {

    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


