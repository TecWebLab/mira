var interface_select_rules = {
    "ticket/:id" : {
        endpoint : '/api/tickets/:id',
        rules: [{
            when: 't: Ticket',
            abstract: ''
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
    interface_ticket : {
        name:"main_page", widget_type: "AbstractInterface",
        children: [{
            name: "header", widget_type: "CompositeInterfaceElement",
            children: [
                { name:"ticket_id_title", widget_type: "ElementExhibitor" }
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

var concrete_interface = {
    interface_ticket : [
        { name: 'ticket_id_title', widget: 'HTMLTitle',
            value: 'model.ticket_id + " | " + model.title' },
        { name: 'ticket_assign', widget: 'HTMLLabel', value: 'model.assign' },
        { name: 'ticket_description', widget: 'HTMLtext', value: 'model.description' },
        { when: 'BigTitle', map_to: [
            { name: 'ticket_title', widget: 'HTMLTitleWithTextOnHouver',
                value: 'model.ticket_id', houver_text:'model.title'  }
        ]}
    ]
};

concrete_interface.interface_issue = [
    { name: 'issue_id_title', widget: 'HTMLTitle',
        value: 'model.issue_id + " | " + model.title' },
    { name: 'issue_description', widget: 'HTMLtext', value: 'model.description' },
    { when: 'BigTitle', map_to: [
        { name: 'issue_title', widget: 'HTMLTitleWithTextOnHouver',
            value: 'model.issue_id', houver_text:'model.title'  }
    ]}
];