"use strict";

var rules = [{
        name: 'isResult',
        validate: '$data.action == "search.json"'
    },{
        name: 'isJsonLD',
        validate: '$data["@context"] != null'
    },{
        name: 'hasDbpedia',
        validate: '$env.methods.get_datasource_dbpedia_uri($dataObj.rdf_prop("dc:contributor")) != null'
    },{
        name: 'isMobile',
        validate: '$env.device.mobile == true'
    },{
        name: 'hasPreview',
        validate: '$dataObj.rdf_prop("edm:isShownBy").length > 0'
    },{
        name: 'isSound',
        validate: '$dataObj.rdf_prop("edm:type")[0] == "SOUND"'
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
    'SOUND': 'music',
    'VIDEO': 'film',
    '3D': 'asterisk'
};

var selection = [
    {
        when: 'isResult',
        abstract: 'results'
    }, {
        when: 'isJsonLD',
        abstract: 'topic'
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
            {name: 'header', children:[
                {name: 'logo'},
                {name: 'search_form', children:[
                    {name: 'search_group', children:[
                        {name: 'search_field'},
                        {name:'search_button'}
                    ]
                }]
            }]},
            {name:'content', children: [
                { name: "results", children: [
                        {name: 'result_panel', children: [
                                { name:"result-box", children:[
                                    { name: 'result-media-link', children: [
                                        {name: "result-media"}]
                                    },
                                    { name:"result-title"},
                                    { name:"result-contributor"},
                                    { name:"result-contributor-value"},
                                    { name:"result-date"},
                                    { name:"result-date-value"},
                                    { name:"result-format"},
                                    { name:"result-format-value"},
                                    { name:'result-player'},
                                    { name:"result-extra-info", children:[
                                        { name:"result-subject"},
                                        { name:"result-subject-value"},
                                        { name:"result-identifier"},
                                        { name:"result-identifier-value"},
                                        { name:"result-language"},
                                        { name:"result-language-value"},
                                        { name:"result-provider"},
                                        { name:"result-provider-value"},
                                        { name:"result-country" },
                                        { name:"result-country-value" }
                                    ]}
                                ]
                                }
                            ]
                        },{
                            name: 'sidebar-dbpedia',
                            when: 'hasDbpedia',
                            datasource:'url:<%= $env.methods.get_datasource_dbpedia_uri($dataObj.rdf_prop("dc:contributor")) %>',
                            children:[
                                {name: 'dbpedia-item', children:[
                                    {name: 'dbpedia-logo'},
                                    {name: 'dbpedia-title'},
                                    {name: 'dbpedia-link'},
                                    {name: 'dbpedia-thumbs', children:[
                                        {name: 'dppedia-imgs',
                                            when: 'isAuthorOfSomething',
                                            datasource:'$dataObj.dbpedia_rdf_resource("http://dbpedia.org/ontology/author")',
                                            children:[
                                                {name: 'dppedia-img-link'},
                                                {name: 'dppedia-img'}
                                            ]
                                        }]
                                    }
                            ]}]
                        }
                    ]}
            ]},
            {name: 'footer'}
        ]
    }
];

var head = [
    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
    {name: 'secondary_css', widget:'Head', href:'css/europedia.css', tag: 'style'},
    {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
    {name: 'title', widget:'Title', value: '"Europeana"'}
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

            { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'results', widget: 'SimpleHtml', tag:'div', class:'row' },
            { name: 'result_panel', tag:'div', md:'12' },
            { name: 'result_panel', when:'hasDbpedia', tag:'div', xs:'12', sm:12, md:8, lg:8 },
            { name: 'result-box', tag:'div', class:'well' },

            { name: 'result-extra-info' },
            { name: 'result-extra-info', when:'isMobile', widget:'Collapsed', title:{value:'Click for more info'} },

            { name:"result-title", tag:'h3', value:'$dataObj.rdf_prop("dc:title")[0]' },
            { name:"result-media-link", tag:'a', href:'$dataObj.rdf_prop("edm:isShownAt")[0]["@id"]', xs:12, sm:12, md:4, lg:4},
            { name:"result-media", tag:'img', img:'thumbnail', src:'$dataObj.rdf_prop("edm:object")[0]["@id"]' },
            { name:"result-contributor", tag:'h4', value: 'Contributor'},
            { name:"result-date", tag: 'h4', value:'@Date'},
            { name:"result-type", tag: 'h4', value:'Type'},
            { name:"result-subject", tag: 'h4', value:'Subject'},
            { name:"result-identifier", tag: 'h4', value:'Identifier'},
            { name:"result-partof", tag: 'h4', value:'Part Of'},
            { name:"result-format", tag:'h4', value:'Format' },
            { name:"result-language", tag: 'h4', value: 'Language'},
            { name:"result-provider", tag: 'h4', value:'Provider'},
            { name:"result-country", tag: 'h4', value:'Country Provider'},
            { name:"result-contributor-value", value:'$dataObj.rdf_prop("dc:contributor")[0]' },
            { name:"result-contributor-value", value:'$dataObj.rdf_prop("dc:contributor")[1]', when:'$dataObj.rdf_prop("dc:contributor").length > 1' },
            { name:"result-date-value", value:'$dataObj.rdf_prop("dc:date")[0]' },
            { name:"result-type-value", value:'$dataObj.rdf_prop("dc:type")[0]' },
            { name:"result-format-value", value:'$dataObj.rdf_prop("dcterms:extent")[0]' },
            { name:"result-subject-value", value:'$dataObj.rdf_prop("dc:subject")[0]' },
            { name:"result-identifier-value", value:'$dataObj.rdf_prop("dc:identifier")[0]' },
            { name:"result-partof-value", value:'$dataObj.rdf_prop("dcterms:isPartOf")[0]' },
            { name:"result-language-value", value:'$dataObj.rdf_prop("dc:language")[0]' },
            { name:"result-provider-value", value:'$dataObj.rdf_prop("edm:dataProvider")[0]' },
            { name:"result-country-value", value:'$dataObj.rdf_prop("edm:country")[0]'},
            { name:"result-player", when:'isSound,hasPreview', widget:'AudioPlayer', source:'$dataObj.rdf_prop("edm:isShownBy")[0]["@id"]'},

            { name:"sidebar-dbpedia", xs:12, sm:12, md:4, lg:4},

            {name: 'dbpedia-item'},
            {name: 'dbpedia-logo', tag:'img', src:'"imgs/dbpedia_logo.png"'},
            //{name: 'dbpedia-title', tag: 'h3', value:'dbpedia_rdf_resource("http://dbpedia.org/property/name")'},
            {name: 'dbpedia-link', tag: 'a', href:'navigate("http://dbpedia.org/")', value:'link'},
            {name: 'dbpedia-thumbs'},

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
  },
  methods: {
      get_datasource_dbpedia_uri: function (values) {
          var dbpedia = null;
          _.each(values, function (value) {
              if (value['@id'] && value['@id'].indexOf("http://dbpedia.org/resource") == 0) {
                  dbpedia = value['@id'].replace('resource', 'data') + '.json';

                  /*
                  dbpedia =  'http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=DESCRIBE+%3C' +
                      value['@id'] +
                      '%3E&output=application%2Fld%2Bjson';
                  */
              }
          });
          return dbpedia
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
        'mira/init',
        'mira/widgets/bootstrap-base'
    ], function ($, $bootstrap, Mira, BootstrapBase) {

        return function Europeana() {
            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection, conf);
            Mira.Widget.setDefault('BootstrapSimple');
            $.ajaxSetup(ajaxSetup);
            app.useServer();

            Mira.Api.Model.prototype.dbpedia_rdf_resource = function(){
                var dbpedia_rdf_arguments = arguments;
                var resources = [];
                _.each(this.attributes, function(parent_value, parent_key){
                    _.each(parent_value, function(value, key){
                        if(_.indexOf(dbpedia_rdf_arguments, value) != -1){
                            resources.push(parent_key);
                        }
                    })
                });
                return resources;
            };

            Mira.Widget.register({
                Collapsed: function($parent, name, $context, options, callback) {
                    var $content;

                    options.title = _.defaults(options.title || {}, {
                        tag:'h3',
                        events: {}
                    });

                    options.content = _.defaults(options.content || {}, {
                        tag:'div',
                        class: 'collapse'
                    });

                    var title_events = {
                        click: function(options){
                            $content.collapse({toggle:true});
                        }
                    };

                    options.title.events = _.defaults(options.title.events, title_events);

                    BootstrapBase.Simple($parent, name, $context, options, function(ret){

                        BootstrapBase.Simple(ret.$children, name + '-title', $context, options.title);

                        BootstrapBase.Simple(ret.$children, name + '-content', $context, options.content, function(ret2){
                            $content = ret2.$element;
                            if(callback){
                                callback(ret2);
                            }
                        });

                    });
                }
            });
        };
    });
} else {

    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


