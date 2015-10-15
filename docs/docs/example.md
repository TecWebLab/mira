Alguns exemplos de aplicações utilizando o MIRA.

# Lista de Tarefas (com eventos)

[http://mira.tecweb.inf.puc-rio.br/?app=example/todo](http://mira.tecweb.inf.puc-rio.br/?app=example/todo)

## Modelos

    var conditions = [{
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
                    }, 'footer'
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
            { name: 'tarefa', widget:'BootstrapFormControl', md:8, input:{ value:'$bind', events:{ keydown:'editar' } }, when:'inEdition' },
            
            { name: "footer", widget:'TecWebRodape' }
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
                var app = new Mira.Application(interface_abstracts, concrete_interface, conditions, selection);
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
                    } else {
                        options.$dataObj.set('$edit', undefined);
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


# Google

Este exemplo usa autenticação com a API do Google utilizando o protocolo OAuth 2.0.
Para funcionar, ele precisa estar em um ambiente HTTPS.

[http://mira.tecweb.inf.puc-rio.br/?app=example/google](http://mira.tecweb.inf.puc-rio.br/?app=example/google)

## Modelos

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

            { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'footer-content', widget: 'BootstrapFooter' }
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

            { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'footer-content', widget: 'BootstrapFooter' }
        ]}
    ];

## Start do MIRA

    if(typeof define === 'function') {
        define([
            "jquery",
            "bootstrap",
            'mira/init'
        ], function ($, $bootstrap, Mira) {

            return function Google() {
                this.mira = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
                window.request_oauth = function(){
                    var api_key = "YOUR_API_KEY";
                    var params = {
                        scope: 'email profile https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.circles.read https://www.googleapis.com/auth/plus.login',
                        response_type: 'token',
                        client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
                        redirect_uri: 'https://localhost:3000/?app=google'
                    };
                    var url = "https://accounts.google.com/o/oauth2/auth?" + $.param(params);
                    window.location.href = url;
                };
                this.mira.on('route:not_found', function(queryString){
                    var params = {}, regex = /([^&=]+)=([^&]*)/g, m;
                    while (m = regex.exec(queryString)) {
                        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
                    }
                    var a = 'https://www.googleapis.com/oauth2/v1/userinfo';
                    ajaxSetup = {
                        data : {
                            'key': api_key
                        },
                        'headers': { Authorization: 'Bearer ' + params['access_token']}
                    };
                    window.location.href = window.navigate(a);
                });

                $.ajaxSetup(ajaxSetup);
            };

        });
    } else {
        exports.ajaxSetup = {};
        exports.abstracts = interface_abstracts;
        exports.mapping = concrete_interface;
        exports.selection = selection;
        exports.rules = rules;
    }


# Github

[http://mira.tecweb.inf.puc-rio.br/?app=example/github](http://mira.tecweb.inf.puc-rio.br/?app=example/github)

## Modelos

    var sourceUsers = [{
        name: 'Ezequiel Bertti',
        link: 'https://api.github.com/users/ebertti'
        },{
        name: 'Joao Leite',
        link: 'https://api.github.com/users/joaoleite'
    }];

    var rules = [{
        name: 'DescricaoPequena',
        validate: '$data.name.length < 55'
    },{
        name: 'isUser',
        validate: '$data.login != null'
    },{
        name: 'haveStar',
        validate: '$data.stargazers_count > 0'
    },{
        name: 'haveWatch',
        validate: '$data.watchers_count > 0'
    }];

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
                {'navigation': {name:'navigation-list', children:['navigation-list-item'], datasource:sourceUsers}},
                {'content': ['texto']},
                {'footer': ['footer-content']}
            ]
        },{
            name:'not_found',
            widgets : [
                {'navigation': {name:'navigation-list', children:['navigation-list-item'], datasource:sourceUsers}},
                {'content': ['texto']},
                {'footer': ['footer-content']}
            ]
        },{
            name: 'user',
            widgets: [
                {'navigation': {name:'navigation-list', children:['navigation-list-item'], datasource:sourceUsers}},
                { name: "content",
                  children: [
                      {'user': ['avatar', {'detail': ['name', 'login', 'bio', 'blog', 'company', 'location']}]},
                      { 'seguidores_panel': ['seguidores_title',
                      { name: "seguidores", datasource: "url:<%= $data.followers_url %>", cache: false,
                          children: {"seguidor": ['avatar_seguidor']}
                      }, 'seguidores_mais']},
                      {'repositorios_panel' : ['repositorios_title',
                      { name: "repositorios", datasource: "url:<%= $data.repos_url %>",
                          children: {"repositorio": ['nome', 'descricao', {box: ['star', 'watch']}]}
                      }]}
                  ]
                },
                {'footer': ['footer-content']}
            ]
        }

    ];

    var concrete_interface = [
        {
            name: 'landing',
            head:[
                {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
                {name: 'secondary_css', widget:'Head', href:'css/shop.css', tag:'style'},
                {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
                {name: 'title', widget:'Title', value: '"GitHub"'}
            ],
            maps: [
            { name: 'navigation', widget: 'BootstrapNavigation', value:'"GitHub"'},
            { name: 'navigation-list', widget: 'BootstrapNavigationList'},
            { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'$data.name', href:'navigate($data.link)'},

            { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'texto', widget: 'SimpleHtml', tag:'h1', value:'"Clique em um usuario acima"' },

            { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'footer-content', widget: 'BootstrapFooter' }
        ]},{
            name: 'not_found',
            head:[
                {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
                {name: 'secondary_css', widget:'Head', href:'css/shop.css', tag:'style'},
                {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
                {name: 'title', widget:'Title', value: '"GitHub - Pagina não encontrada"'}
            ],
            maps: [
            { name: 'navigation', widget: 'BootstrapNavigation', value:'"GitHub"'},
            { name: 'navigation-list', widget: 'BootstrapNavigationList'},
            { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'$data.name', href:'navigate($data.link)'},

            { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'texto', widget: 'SimpleHtml', tag:'h1', value:'"Pagina nao encontrada"' },

            { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'footer-content', widget: 'BootstrapFooter' }
        ]}
        ,{
            name: 'user',
            head:[
                {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
                {name: 'secondary_css', widget:'Head', href:'css/shop.css', tag:'style'},
                {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
                {name: 'title', widget:'Title', value: '"GitHub de " + ($data.name || $data.login)'}
            ],
            maps: [
            { name: 'navigation', widget: 'BootstrapNavigation', value:'"GitHub"'},
            { name: 'navigation-list', widget: 'BootstrapNavigationList'},
            { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'$data.name', href:'navigate($data.link)'},

            { name: 'content', widget: 'ProfileContainer' },
            { name: 'user', widget: 'SimpleHtml', class:'clearfix' },
            { name: 'avatar', widget: 'ProfileImage', value:'$data.avatar_url' },
            { name: 'detail', widget: 'SimpleHtml', class:'col-xs-12 col-sm-8' },
            { name: 'name', widget: 'SimpleHtml', tag: 'h2', value: '$data.name' },
            { name: 'login', widget: 'ProfileDetail', detail: 'Login', value: '$data.login'},
            { name: 'bio', widget: 'ProfileDetail', detail: 'Bio', value: '$data.bio'},
            { name: 'blog', widget: 'ProfileDetail', detail: 'Blog', value: '$data.blog'},
            { name: 'company', widget: 'ProfileDetail', detail: 'Company', value: '$data.company'},
            { name: 'location', widget: 'ProfileDetail', detail: 'Location', value: '$data.location'},
            { name: 'seguidores_panel', widget: 'SimpleHtml', class:'clearfix' },
            { name: 'seguidores_title', widget: 'SimpleHtml', tag: 'h3', class:'clearfix', value:'"Seguidores"'},
            { name: 'seguidores', widget: 'SimpleHtml', tag: 'div'},
            { name: 'seguidor', widget: 'SimpleHtml', tag: 'a', href: 'navigate($data.url)'},
            { name: 'avatar_seguidor', widget: 'SimpleHtml', class:'col-md-2 col-xs-3 img-circle img-responsive', tag: 'img', src: '$data.avatar_url + "s=80"', alt:'$data.login', title:'$data.login'},
            { name: 'repositorios_panel', widget: 'SimpleHtml', class:'clearfix' },
            { name: 'repositorios_title', widget: 'SimpleHtml', tag: 'h3', value:'"Repositorios"'},
            { name: 'repositorios', widget: 'SimpleHtml', tag: 'div'},
            { name: 'repositorio', widget: 'SimpleHtml', tag: 'div', class:'media'},
            { name: 'nome', widget: 'SimpleHtml', tag: 'h4', value: '$data.name', class:'media-heading'},
            { name: 'descricao', widget: 'SimpleHtml', tag: 'span', value: '$data.description'},
            { name: 'box', widget: 'SimpleHtml', tag: 'ul', class:'nav nav-pills nav-stacked pull-right'},
            { name: 'watch', widget: 'ProfileCount', icon:'eye-close', value:'$data.watchers_count'},
            { name: 'watch', widget: 'ProfileCount', icon:'eye-open', value:'$data.watchers_count', when:'haveWatch'},

            { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'footer-content', widget: 'BootstrapFooter' }
        ]}
    ];

    var ajaxSetup = {
        headers: { "Authorization": "token SUA_API_KEY" }
    };

## Start do MIRA

    if(typeof define === 'function') {
        define([
            "jquery",
            "bootstrap",
            'mira/init'
        ], function ($, $bootstrap, Mira) {

            return function GitHub() {
                $.ajaxSetup(ajaxSetup);
                this.Mira = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
            };

        });
    } else {
        exports.ajaxSetup = ajaxSetup;
        exports.abstracts = interface_abstracts;
        exports.mapping = concrete_interface;
        exports.selection = selection;
        exports.rules = rules;
    }

# Freebase

[http://mira.tecweb.inf.puc-rio.br/?app=example/freebase](http://mira.tecweb.inf.puc-rio.br/?app=example/freebase)

## Modelos

    var rules = [{
            name: 'isResult',
            validate: '$data.result != null'
        },{
            name: 'hasName',
            validate: '$data.name != ""'
        },{
            name: 'hasType',
            validate: '$data.notable != null && $data.notable.name != ""'
        },{
            name: 'hasIcon',
            validate: '$data.notable != null && $data.notable.name != "" && icons[$data.notable.name] != undefined'
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
        'College/University': 'book',
        'Field of study': 'book',
        'Book': 'book',
        'Musical Artist': 'headphones',
        'Musical Recording': 'headphones',
        'Brazilian state': 'globe',
        'Film festival event': 'video',
        'Neighborhood': 'envelope',
        'Location': 'home',
        'Software': 'cog',
        'Airport': 'plane',
        'Holiday': 'calendar'
    };

    var selection = [
        {
            when: 'isResult',
            abstract: 'results'
        },{
            when: 'isTopicDesktopOrTablet',
            abstract: 'topicComplete',
            concrete: 'topicComplete'
        },{
            when: 'isTopicMobile',
            abstract: 'topicMobile',
            concrete: 'topic'
        }
    ];

    var interface_abstracts = [
        {
            name:'landing',
            widgets : [
                {'header': ['logo', {'search_form':{'search_group' : ['search_field', 'search_button']}}]},
                {'footer': ['footer-content']}
            ]
        },{
            name:'not_found',
            widgets : [
                {'header': ['logo', {'search_form':{'search_group' : ['search_field', 'search_button']}}]},
                {'content': 'warning'},
                {'footer': ['footer-content']}
            ]
        },{
            name: 'results',
            widgets : [
                {'header': ['logo', {'search_form':{'search_group' : ['search_field', 'search_button']}}]},
                {'content': [
                    { name: "results", datasource: "$data.result",
                    children: [
                        {name: 'result_panel', when:'hasName', children: {'result_item': {'result_link': ['result_icon', 'result_title', 'result_details']}}
                    }]}
                ]},
                {'footer': ['footer-content']}
            ]
        },{
            name: 'topicComplete',
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
        {name: 'secondary_css', widget:'Head', href:'css/freebase.css', tag: 'style'},
        {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
        {name: 'title', widget:'Title', value: '"FreeBase"'}
    ];

    var concrete_interface = [
        {
            name: 'landing',
            head: head,
            maps: [

            { name: 'header', widget: 'SimpleHtml', tag:'div', class:'container-fluid text-center fundo' },
            { name: 'logo', widget: 'SimpleHtml', tag:'img', src:'"imgs/freebase_logo.png"' },

            { name: 'search_form', widget: 'SimpleHtml', tag:'form', onsubmit:'do_search(event);' },
            { name: 'search_group', widget: 'SimpleHtml', tag:'div', class:'input-group form_center col-sm-8' },
            { name: 'search_field', widget: 'SimpleHtml', tag:'input', class:'form-control input-lg', placeholder:'"Escreve o que deseja buscar"' },
            { name: 'search_button', widget: 'BootstrapFormGroupButton', class:'btn-warning', value:'"Buscar"' },

            { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'footer-content', widget: 'BootstrapFooter' }
        ]},{
            name: 'not_found',
            head: head,
            maps: [
            { name: 'header', widget: 'SimpleHtml', tag:'div', class:'container-fluid text-center fundo' },
            { name: 'logo', widget: 'SimpleHtml', tag:'img', src:'"imgs/freebase_logo.png"' },

            { name: 'search_form', widget: 'SimpleHtml', tag:'form', onsubmit:'do_search(event);' },
            { name: 'search_group', widget: 'SimpleHtml', tag:'div', class:'input-group form_center col-sm-8' },
            { name: 'search_field', widget: 'Input', tag:'input', class:'form-control input-lg', value:'busca', placeholder:'"Escreve o que deseja buscar"' },
            { name: 'search_button', widget: 'BootstrapFormGroupButton', class:'btn-warning', value:'"Buscar"' },

            { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'warning', widget: 'SimpleHtml', tag:'div', class:'alert alert-warning', value:'"Pagina nao encontrada"' },

            { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'footer-content', widget: 'BootstrapFooter' }
        ]},{
            name: 'results',
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
        ]},{
            name: 'topicComplete',
            head:head,
            maps: [
                { name: 'header', widget: 'SimpleHtml', tag:'div', class:'container-fluid text-center fundo' },
                //{ name: 'logo', widget: 'SimpleHtml', tag:'img', src:'"imgs/freebase_logo.png"' },

                { name: 'search_form', widget: 'SimpleHtml', tag:'form', onsubmit:'do_search(event);' },
                { name: 'search_group', widget: 'BootstrapSimple', tag:'div', class:'form_center', input:'group', form:'center', sm:'8' },

                { name: 'search_field', widget: 'SimpleHtml', tag:'input', class:'form-control input-lg', placeholder:'"Freebase"' },
                { name: 'search_button', widget: 'BootstrapFormGroupButton', class:'btn-warning', value:'"Buscar"' },

                { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container-fluid' },
                { name: 'results', widget: 'SimpleHtml', tag:'div', class:'row' },

                { name: 'meta', widget: 'SimpleHtml', tag:'div', class:'well' },
                { name: 'meta_type', widget: 'FreebaseTypes', class:'label_group', value: '$data.property["/type/object/type"].values', when: '$data.property["/type/object/type"] != null'},
                { name: 'meta_name', widget: 'SimpleHtml', tag:'h2', class:'text-center', value: '$data.property["/type/object/name"].values[0].text', when:'$data.property["/type/object/name"] != null'},
                { name: 'meta_legend', widget: 'SimpleHtml', tag:'small'},
                { name: 'meta_id', widget: 'BootstrapIcon', tag: 'span', icon:'file', title: '$data.property["/type/object/id"].values[0].text' },
                { name: 'meta_creator', widget: 'BootstrapIcon', tag: 'span', icon:'user', title: '$data.property["/type/object/creator"].values[0].text'},
                { name: 'meta_timestamp', widget: 'BootstrapIcon', tag:'span', icon:'time', title: '$data.property["/type/object/timestamp"].values[0].text'},

                { name: 'image_group', widget:'SimpleHtml', class:'label_group'},
                { name: 'image', widget:'SimpleHtml', tag:'img', class:'thumbnail', src:'"https://usercontent.googleapis.com/freebase/v1/image" + $data.id'},

                { name: 'result_group_name', widget: 'SimpleHtml', tag:'h3', class:'group text-center bg-info', value:'$data[0]'},
                { name: 'result_group_panel', widget: 'SimpleHtml', class:'row'},
                { name: 'result_group', widget: 'SimpleHtml'},
                { name: 'result_panel', widget: 'SimpleHtml', tag:'div', class:'col-xs-12 col-sm-6 col-md-4 col-lg-3' },
                { name: 'result_item', widget: 'SimpleHtml', tag:'div', class:'item well' },
                { name: 'result_link', widget: 'SimpleHtml', tag:'a', href:'navigate($env.request.uri.protocol + "://" + $env.request.uri.host + $env.request.uri.path + "?filter=" + $data[0])' },
                { name: 'result_title', widget: 'SimpleHtml', tag:'h4', value:'_.last($data[0].split("/"))' },
                { name: 'result_details', widget: 'SimpleHtml', tag:'span', value:'$data[1].values[0].value', when:'$data[1].values != null' },

                { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
                { name: 'footer-content', widget: 'BootstrapFooter' }
            ]},{
            name: 'property',
            head:head,
            maps: [
                { name: 'header', widget: 'SimpleHtml', tag:'div', class:'container-fluid text-center fundo' },
                { name: 'logo', widget: 'SimpleHtml', tag:'img', src:'"imgs/freebase_logo.png"' },

                { name: 'search_form', widget: 'SimpleHtml', tag:'form', onsubmit:'do_search(event);' },
                { name: 'search_group', widget: 'SimpleHtml', tag:'div', class:'input-group form_center col-sm-8' },
                { name: 'search_field', widget: 'SimpleHtml', tag:'input', class:'form-control input-lg', placeholder:'"Escreve o que deseja buscar"' },
                { name: 'search_button', widget: 'BootstrapFormGroupButton', class:'btn-warning', value:'"Buscar"' },

                { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container' },
                { name: 'results', widget: 'SimpleHtml', tag:'div', class:'row' },
                { name: 'result_panel', widget: 'SimpleHtml', tag:'div', class:'col-xs-12 col-sm-12 col-md-12 col-lg-12' },
                { name: 'result_item', widget: 'SimpleHtml', tag:'div', class:'item well' },
                { name: 'result_link', widget: 'SimpleHtml', tag:'a', href:'navigate($env.request.params.URI + "?filter=" + $data[0])' },
                { name: 'result_icon', widget: 'BootstrapIcon', class:'pull-left', icon:'icons[$data[0]]' },
                { name: 'result_title', widget: 'SimpleHtml', tag:'h4', value:'$data[0]' },
                { name: 'result_details', widget: 'SimpleHtml', tag:'span', value:'$data[0]', when:'hagsType' },

                { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
                { name: 'footer-content', widget: 'BootstrapFooter' }
            ]}
    ];

    var ajaxSetup = {
        data : {
            'key': 'YOUR_API_KEY'
        },
        headers: {}
    };


## Start do MIRA

    if(typeof define === 'function') {
        define([
            "jquery",
            "bootstrap",
            'mira/init'
        ], function ($, $bootstrap, Mira) {

            window.icons = icons;
            window.do_search = function(event){
                event.preventDefault();
                var search = document.getElementById('search_field');
                window.busca = search.value;
                window.location.href = navigate('https://www.googleapis.com/freebase/v1/search?query=' + encodeURIComponent(search.value));
            };

            return function Google() {
                this.Mira = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
                $.ajaxSetup(ajaxSetup);
            };

        });
    } else {
        exports.ajaxSetup = ajaxSetup;
        exports.abstracts = interface_abstracts;
        exports.mapping = concrete_interface;
        exports.selection = selection;
        exports.rules = rules;
    }