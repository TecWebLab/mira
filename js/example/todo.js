"use strict";

var rules = [{
    name: 'isFeito',
    validate: '$data.feito == true'
},{
    name: 'hasLocation',
    validate: '$data.tarefa.indexOf("@") != -1'
},{
    name: 'inEdition',
    validate: '$data.$edit != null'
}];

var selection = [
];

var interface_abstracts = [
    {
        name:'landing',
        widgets : [
            {'container':[
                {'head': 'title'},
                {'content': [
                 { 'form_tarefa': 'input_tarefa'},
                 {name: 'items',
                  datasource:'todo_list',
                  children:[
                    {'item':
                        {'tipo': [
                            {controls: [
                                {name:'feito', bind:'$data.feito'},
                                {name:'editar'},
                                {name:'remover'}
                            ]},
                            {name:'tarefa', bind:'$data.tarefa'},
                            {name:'imagem_tarefa'}
                         ]
                        }
                    }
                  ]
                 }]
                }
            ]}
        ]
    }
];

var GeralHead = [
    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
    {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
    {name: 'title', widget:'Title', value: '"Todo List"'}
];

var concrete_interface = [
    {
        name: 'landing',
        head: GeralHead,
        maps: [

        { name: 'container', class:'container' },
        { name: 'head', alert:'success' },
        { name: 'title', tag:'h1', text:'center', value:'"Tarefas"' },

        { name: 'content', class:'row', md:'6,offset-3' },
        { name: 'form_tarefa'},
        { name: 'input_tarefa', widget:'BootstrapFormControl', input:{type:'text', events:{ keydown:'adicionar' }, placeholder:'Descrição da Tarefa'} },

        { name: 'items' },
        { name: 'item', form:'horizontal' },
        { name: 'tipo', alert:"warning", class:'row' },
        { name: 'tipo', alert:"info", class:'row', when:'isFeito'},
        { name: 'controls', md:1 },
        { name: 'feito', widget:'BootstrapIcon', value:'unchecked',  events: { click: 'marcar' } },
        { name: 'feito', widget:'BootstrapIcon', value:'check',  events: { click: 'marcar' }, when:'isFeito' },
        { name: 'editar', widget:'BootstrapIcon', value:'edit',  events: { click: 'habilitar_edicao' } },
        { name: 'remover', widget:'BootstrapIcon', value:'remove',  events: { click: 'remover' } },
        { name: 'imagem_tarefa', widget:'MapStatic', size:'450x200', value:'$data.tarefa.substring($data.tarefa.indexOf("@"))', class:'thumbnail', when:'hasLocation' },
        { name: 'tarefa', class:'lead', value:'$bind', md:'8', events: { click:'habilitar_edicao' } },
        { name: 'tarefa', widget:'BootstrapFormControl', md:8, input:{ value:'$bind', events:{ keydown:'editar' } }, when:'inEdition' }
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

        return function Todo() {
            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
            Mira.Widget.setDefault('BootstrapSimple');

            window.todo_list = new Mira.Api.Collection([{
                tarefa: 'Programar em JS',
                feito: true
            },{
                tarefa: 'Ir a PUC',
                feito: false
            },{
                tarefa: 'Visitar @ London',
                feito: false
            }]);

            window.marcar = function(options){
                options.$dataObj.set('feito', !options.$dataObj.get('feito'))
            };

            window.adicionar = function(options){
                if(options.$event.keyCode == 13 && options.$event.target.value) {
                    window.todo_list.add({
                        tarefa: options.$event.target.value,
                        feito: false
                    }, {at: 0});
                    options.$dataObj.trigger('change');
                }
            };

            window.habilitar_edicao = function(options){
                if(!options.$dataObj.get('$edit')) {
                    options.$dataObj.set('$edit', true);
                }
                options.$event.stopPropagation();

            };

            window.editar = function(options){
                if(options.$event.keyCode == 13) {
                    if(options.$event.target.value){
                        options.$dataObj.set('tarefa', options.$event.target.value);
                    } else {
                        options.$dataObj.remove();
                    }
                    options.$dataObj.set('$edit', undefined);
                }
                if(options.$event.keyCode == 27){
                    options.$dataObj.set('$edit', undefined);
                }
            };

            window.remover = function (options) {
                options.$dataObj.destroy();
            }
        };

    });
} else {

    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


