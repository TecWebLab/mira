"use strict";

require.config({
    baseUrl: 'js',
    paths : {
        nools: 'libs/nools',
        backbone: 'libs/backbone',
        backbone_query: 'libs/backbone.queryparams',
        backbone_querystring_shim: 'libs/backbone.queryparams-1.1-shim',
        backbone_jsynth: 'libs/backbone.jsynth',
        underscore: 'libs/underscore',
        jquery: 'libs/jquery-2.1.0',
        "bootstrap": 'libs/bootstrap',
        text: 'libs/text'
    },
    shim: {
        "underscore": {
            deps: [],
            exports: "_"
        },
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});

var rules = [{
    name: 'BigTitle',
    validate: 'model.title.length > 10'
}];

var interface_select_rules = [{
    url: "ticket/:id",
    endpoint : '/api/tickets/:id',
    rules: [{
        when: 't: Ticket',
        abstract: 'interface_ticket'
    },{
        when: 't: Issue',
        abstract: 'interface_issue'
    }]
},{
    url: "data/:id",
    endpoint : '/jsynth/data.php',
    abstract: 'interface_data'
},{
    url: "outro",
    endpoint : '/jsynth/data.php',
    abstract: 'interface_outro'
}];

var interface_abstracts = [
    {
        name: 'interface_data' ,
        widgets : {
            name:"main_page", widget_type: "AbstractInterface",
            children: [{
                name: "header", widget_type: "CompositeInterfaceElement",
                children: [
                    { name:"ticket_id", widget_type: "ElementExhibitor" },
                    { name:"ticket_title", widget_type: "ElementExhibitor" }
                ]},{
                name: "body", widget_type: "CompositeInterfaceElement",
                children: [
                    { name:"ticket_assign", widget_type: "ElementExhibitor" },
                    { name:"ticket_description", widget_type: "ElementExhibitor" }
                ]}
            ]
        }
    },{
        name: 'interface_outro' ,
        widgets : {
            name:"main_page", widget_type: "AbstractInterface",
            children: [{
                name: "header", widget_type: "CompositeInterfaceElement",
                children: [
                    { name:"ticket_id", widget_type: "ElementExhibitor" },
                    { name:"ticket_title", widget_type: "ElementExhibitor" }
                ]},{
                name: "body", widget_type: "CompositeInterfaceElement",
                children: [
                    { name:"ticket_assign", widget_type: "ElementExhibitor" },
                    { name:"ticket_description", widget_type: "ElementExhibitor" }
                ]}
            ]
        }
    },{
        name: 'interface_issue',
        widgets : {
            name:"main_page", widget_type: "AbstractInterface",
            children: [{
                name: "header", widget_type: "CompositeInterfaceElement",
                children: [
                    { name:"issue_id", widget_type: "ElementExhibitor" },
                    { name:"issue_title", widget_type: "ElementExhibitor" }
                ]},{
                name: "body", widget_type: "CompositeInterfaceElement",
                children: [
                    { name:"issue_description", widget_type: "ElementExhibitor" }
                ]}
            ]
        }
    }
];

var concrete_interface = [
    { name: 'interface_data', widgets: [
            { name: 'main_page', widget: 'SimpleHtml', tag:'div' },
            { name: 'header', widget: 'SimpleHtml', tag:'h1' },
            { name: 'ticket_id', widget: 'SimpleHtml', tag: 'span', value: 'model.ticket_id' },
            { name: 'ticket_title', widget: 'SimpleHtml', tag: 'span', value: '" | " + model.title' },
            { name: 'body', widget: 'SimpleHtml', tag:'div'},
            { name: 'ticket_assign', widget: 'SimpleHtml', tag:'span', value: 'model.assign' },
            { name: 'ticket_description', widget: 'SimpleHtml', tag:'span', value: 'model.description' }
        ]
    },{   name: 'interface_outro', widgets: [
        { name: 'main_page', widget: 'SimpleHtml', tag:'div' },
        { name: 'header', widget: 'SimpleHtml', tag:'h2', value: 'model.ticket_id + " | " + model.title' },
        { name: 'body', widget: 'SimpleHtml', tag:'div'},
        { name: 'ticket_assign', widget: 'SimpleHtml', tag:'p', value: 'model.assign' },
        { name: 'ticket_description', widget: 'SimpleHtml', tag:'p', value: 'model.description' }
        ]
    }
];


require([
    // Load our app module and pass it to our definition function
    "jquery",
    "bootstrap",
    'jsynth/init',
    'jsynth/router'
], function($, $bootstrap, JSynth, Router){
    var a = Router(interface_select_rules, interface_abstracts, concrete_interface, rules);

});

