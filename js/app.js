define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function($, _, Backbone, Router){

    var interface_select_rules = {
        "ticket/:id" : {
            endpoint : '/api/tickets/:id',
            rules: [{
                when: 't: Ticket',
                abstract: 'interface_ticket'
            },{
                when: 't: Issue',
                abstract: 'interface_issue'
            }]
        },
        "data/:id" : {
            endpoint : '/api/data/:id',
            abstract: 'interface_data'
        }
    };

    var interface_abstracts = {
        interface_data : {
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
        },
        interface_issue : {
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
    };

    var router = Router(interface_select_rules, interface_abstracts);

    return {
        router: router
    };
});