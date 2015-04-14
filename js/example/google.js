"use strict";

var rules = [{
        name: 'isUser',
        validate: '$data.name != null'
    },{
        name: 'isSecure',
        validate: '$env.request.protocol == "https:"'
    }
];

var selection = [
    {
        when: 'isUser',
        abstract: 'user'
    }
];

var interface_abstracts = [
    {
        name:'landing',
        widgets : [
            'navigation',
            {'content': ['texto', 'oauth']},
            {'footer': ['footer-content']}
        ]
    },{
        name:'not_found',
        widgets : [
            'navigation',
            {'content': ['texto']},
            {'footer': ['footer-content']}
        ]
    },{
        name: 'user',
        widgets: [
            'navigation',
            { name: "content",
              children: [
                  {'user': ['avatar', {'detail': ['name', 'email', 'id']}]},
                  { 'circulos_panel': ['circulos_title',
                  { name: "circulos", datasource: "url:https://www.googleapis.com/plusDomains/v1/people/<%= $data.id %>/",
                  //{ name: "circulos", datasource: "url:https://www.googleapis.com/plusDomains/v1/people/<%= $data.id %>/circles",
                      children: ["circulo"]}
                  ]}
              ]
            },
            {'footer': ['footer-content']}
        ]
    }

];

var head = [
    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
    {name: 'secondary_css', widget:'Head', href:'css/shop.css', tag:'style'},
    {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
    {name: 'title', widget:'Title', value: '"Google"'},
    {name: 'title', widget:'Title', value: '"Usuario"', when:'isUser'}
];

var concrete_interface = [
    {
        name: 'landing',
        head: head,
        maps: [
        { name: 'navigation', widget: 'BootstrapNavigation', value:'"Google"'},

        { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'texto', widget: 'SimpleHtml', tag:'h1', value:'"Você não está em um ambiente protegido por HTTPS"' },
        { name: 'texto', widget: 'SimpleHtml', tag:'h1', value:'"Faça sua autenticação"', when:'isSecure' },

        { name: 'oauth', widget: 'SimpleHtml', tag:'a', value:'"Ir para ambiente seguro"', href: '"https://" + $env.request.host + $env.request.pathname + $env.request.search'},
        { name: 'oauth', widget: 'SimpleHtml', tag:'button', value:'"Google"', onclick:'"request_oauth()"', when:'isSecure' },

        { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'footer-content', widget: 'BootstrapFooter' }
    ]},{
        name: 'not_found',
        head: head,
        maps: [
        { name: 'navigation', widget: 'BootstrapNavigation', value:'"Google"'},

        { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'texto', widget: 'SimpleHtml', tag:'h1', value:'"Pagina nao encontrada"' },
          { name: "footer", widget:'TecWebRodape' }
    ]}
    ,{
        name: 'user',
        head:head,
        maps: [
        { name: 'navigation', widget: 'BootstrapNavigation', value:'"Google"'},

        { name: 'content', widget: 'ProfileContainer' },
        { name: 'user', widget: 'SimpleHtml', class:'clearfix' },
        { name: 'avatar', widget: 'ProfileImage', value:'$data.picture' },
        { name: 'detail', widget: 'SimpleHtml', class:'col-xs-12 col-sm-8' },
        { name: 'name', widget: 'SimpleHtml', tag: 'h2', value: '$data.name' },
        { name: 'email', widget: 'ProfileDetail', detail: 'Login', value: '$data.email'},
        { name: 'id', widget: 'ProfileDetail', detail: 'ID', value: '$data.id'},

        { name: 'circulos_panel', widget: 'SimpleHtml', class:'clearfix' },
        { name: 'circulos_title', widget: 'SimpleHtml', tag: 'h3', class:'clearfix', value:'"Circulos"'},
        { name: 'circulos', widget: 'SimpleHtml', tag: 'div'},
        { name: 'circulo', widget: 'SimpleHtml', tag: 'a', href: 'navigate($data.url)', value:'$data.name'},
          { name: "footer", widget:'TecWebRodape' }
    ]}
];

var ajaxSetup = {

};


if(typeof define === 'function') {
    define([
        // Load our app module and pass it to our definition function
        "jquery",
        "bootstrap",
        'mira/init'
    ], function ($, $bootstrap, Mira) {

        return function Google() {
            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
            window.request_oauth = function(){
                var api_key = "AIzaSyC6xDllQ_3e8Q3KWOlguRkg22ZlEekCaDY";
                var params = {
                    scope: 'email profile https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.circles.read https://www.googleapis.com/auth/plus.login',
                    response_type: 'token',
                    client_id: '43222689418-4oggh4169fu6htnon5gplqpiteor0uon.apps.googleusercontent.com',
                    redirect_uri: mira.$env.request.href
                };
                var url = "https://accounts.google.com/o/oauth2/auth?" + $.param(params);
                window.location.href = url;
            };
            app.on('route:not_found', function(queryString){
                var params = {}, regex = /([^&=]+)=([^&]*)/g, m;
                while (m = regex.exec(queryString)) {
                    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
                }
                var a = 'https://www.googleapis.com/oauth2/v1/userinfo';
                ajaxSetup = {
                    data : {
                        'key': 'AIzaSyC6xDllQ_3e8Q3KWOlguRkg22ZlEekCaDY'
                    },
                    'headers': { Authorization: 'Bearer ' + params['access_token']}
                };
                $.ajaxSetup(ajaxSetup);
                window.location.href = window.navigate(a);
            });

            $.ajaxSetup(ajaxSetup);
        };

    });
} else {

    ajaxSetup.headers['User-Agent'] = "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.3 Safari/537.36";

    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


