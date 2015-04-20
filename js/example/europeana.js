"use strict";

var rules = [{
        name: 'isResult',
        validate: '$data.action == "search.json"'
    },{
        name: 'isJsonLD',
        validate: '$data["@context"] != null'
    },{
        name: 'hasName',
        validate: '$data.name != ""'
    },{
        name: 'hasType',
        validate: '$data.notable != null && $data.notable.name != ""'
    },{
        name:'hasPT',
        validate: '$data.edmConceptPrefLabelLangAware != null && $data.edmConceptPrefLabelLangAware.pt != null'
    },{
        name: 'hasImage',
        validate: '$data.edmPreview != null'
    },{
        name: 'hasIcon',
        validate: '$data.type != null && icons[$data.type] != undefined'
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
    'IMAGE': 'picture',
    'TEXT': 'font',
    'SOUND': 'music'
};

var selection = [
    {
        when: 'isResult',
        abstract: 'results'
    },{
        when: 'isJsonLD',
        abstract: 'topic',
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

    },{
    name: 'results',
    widgets : [
      {'header': ['logo', {'search_form':{'search_group' : ['search_field', 'search_button']}}]},
      {'content': [
        { name: "results", datasource: "$data.items",
          children: [
            {name: 'result_panel', children: {'result_item': {'result_link': ['result_icon', 'result_title', 'result_details', 'result_thumb']}}
            }]}
      ]},
      'footer'
    ]
  },{
        name: 'topic',
        widgets : [
            {'header': ['logo', {'search_form':{'search_group' : ['search_field', 'search_button']}}]},
            {'content': [
                { name: "results",
                    children: [
                        {name: 'result_panel',
                            children: [
                                { name:"result-box",
                                children:[
                                    { name:"result-country" },
                                    { name:"result-country-value", select:'select ?o { ?s <http://www.europeana.eu/schemas/edm/country> ?o}' },
                                    { name:"result-name" },
                                    { name:"result-name-value", select:'select ?o { ?s <http://purl.org/dc/elements/1.1/title> ?o}' },
                                ]
                                }
                            ]

                        }]}
            ]},
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
        { name: 'search_field', widget: 'SimpleHtml', tag:'input', class:'form-control input-lg', placeholder:'"Please type search term"' },
        { name: 'search_button', widget: 'BootstrapFormGroupButton', class:'btn-warning', value:'"Search"', events:{'click': 'do_search'} },

          { name: 'footer', widget: 'TecWebRodape'}
    ]},{
    name: 'results',
    head:head,
    maps: [
      { name: 'header', widget: 'SimpleHtml', tag:'div', class:'container-fluid text-center fundo' },
      { name: 'logo', widget: 'SimpleHtml', tag:'img', src:'"imgs/europedia.png"' },

      { name: 'search_form', widget: 'SimpleHtml', tag:'form', onsubmit:'do_search(event);' },
      { name: 'search_group', widget: 'SimpleHtml', tag:'div', class:'input-group form_center col-sm-8' },
      { name: 'search_field', widget: 'SimpleHtml', tag:'input', class:'form-control input-lg', placeholder:'"Please type search term"' },
      { name: 'search_button', widget: 'BootstrapFormGroupButton', class:'btn-warning', value:'"Search"', events:{'click': 'do_search'} },

      { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container-fluid' },
      { name: 'results', widget: 'SimpleHtml', tag:'div', class:'row' },
      { name: 'result_panel', widget: 'SimpleHtml', tag:'div', class:'col-xs-12 col-sm-6 col-md-4 col-lg-3' },
      { name: 'result_item', widget: 'SimpleHtml', tag:'div', class:'item well' },
      { name: 'result_link', widget: 'SimpleHtml', tag:'a', href:'navigate(replace_for_ld($data.link))' },
      { name: 'result_icon', widget: 'BootstrapIcon', when:'hasIcon', class:'pull-left', icon:'icons[$data.type]' },
      { name: 'result_thumb', class:'col-md-11', tag:'img', when:'hasImage', src:'$data.edmPreview[0]' },
      { name: 'result_title', widget: 'SimpleHtml', tag:'h4', value:'$data.title[0]' },
      { name: 'result_details', widget: 'SimpleHtml', tag:'span', value:'$data.edmConceptPrefLabelLangAware.pt.join(", ")', when:'hasPT' },

      { name: 'footer', widget: 'TecWebRodape'}
    ]},{
        name: 'topic',
        head:head,
        maps: [
            { name: 'header', widget: 'SimpleHtml', tag:'div', class:'container-fluid text-center fundo' },
            { name: 'logo', widget: 'SimpleHtml', tag:'img', src:'"imgs/europedia.png"' },

            { name: 'search_form', widget: 'SimpleHtml', tag:'form', onsubmit:'do_search(event);' },
            { name: 'search_group', widget: 'SimpleHtml', tag:'div', class:'input-group form_center col-sm-8' },
            { name: 'search_field', widget: 'SimpleHtml', tag:'input', class:'form-control input-lg', placeholder:'"Please type search term"' },
            { name: 'search_button', widget: 'BootstrapFormGroupButton', class:'btn-warning', value:'"Search"', events:{'click': 'do_search'} },

            { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container-fluid' },
            { name: 'results', widget: 'SimpleHtml', tag:'div', class:'row' },
            { name: 'result_panel', widget: 'SimpleHtml', tag:'div', class:'col-xs-12 col-sm-6 col-md-4 col-lg-3' },
            { name: 'result-box', widget: 'SimpleHtml', tag:'div', class:'item well' },
            { name:"result-country", value:'Country:' },
            { name:"result-country-value", value:'$bind[0].o.value'},
            { name:"result-name", value:'Name:' },
            { name:"result-name-value", value:'$bind[0].o.value'},

            { name: 'footer', widget: 'TecWebRodape'}
        ]}
];

var ajaxSetup = {
  qs : {
    'wskey': 'o5jbXH88a'
  }
};

var conf = {
  icons: icons,
  events: {
    do_search: function (options) {
      options.$event.preventDefault();
      var search = $('#search_field').val();
      window.location.href = navigate('http://www.europeana.eu/api/v2/search.json',
        {
          'query': search,
          'rows': 50
        }

      );
    }
  }
};

var replace_for_ld = function(uri){
    return uri.replace('.json', '.jsonld');
};

if(typeof define === 'function') {
    define([
        // Load our app module and pass it to our definition function
        "jquery",
        "bootstrap",
        'mira/init'
    ], function ($, $bootstrap, Mira) {

        return function Google() {
            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection, conf);
            $.ajaxSetup(ajaxSetup);
            app.useServer();
        };



    });
} else {

    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


