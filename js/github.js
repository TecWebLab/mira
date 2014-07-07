"use strict";

var sourceUsers = [{
    name: 'Ezequiel Bertti',
    link: 'https://api.github.com/users/ebertti'
    },{
    name: 'Joao Leite',
    link: 'https://api.github.com/users/joaoleite'
}];

var rules = [{
    name: 'DescricaoPequena',
    validate: 'data.name.length < 55'
},{
    name: 'isUser',
    validate: 'data.login != null'
},{
    name: 'haveStar',
    validate: 'data.stargazers_count > 0'
},{
    name: 'haveWatch',
    validate: 'data.watchers_count > 0'
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
                  { name: "seguidores", datasource: "url:<%= data.followers_url %>",
                      children: {"seguidor": ['avatar_seguidor']}
                  }, 'seguidores_mais']},
                  {'repositorios_panel' : ['repositorios_title',
                  { name: "repositorios", datasource: "url:<%= data.repos_url %>",
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
        name: 'landing', maps: [
        { name: 'navigation', widget: 'BootstrapNavigation', value:'"GitHub"'},
        { name: 'navigation-list', widget: 'BootstrapNavigationList'},
        { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'data.name', href:'navigate(data.link)'},

        { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'texto', widget: 'SimpleHtml', tag:'h1', value:'"Clique em um usuario acima"' },

        { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'footer-content', widget: 'BootstrapFooter' }
    ]},{
        name: 'not_found', maps: [
        { name: 'navigation', widget: 'BootstrapNavigation', value:'"GitHub"'},
        { name: 'navigation-list', widget: 'BootstrapNavigationList'},
        { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'data.name', href:'navigate(data.link)'},

        { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'texto', widget: 'SimpleHtml', tag:'h1', value:'"Pagina nao encontrada"' },

        { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'footer-content', widget: 'BootstrapFooter' }
    ]}
    ,{
        name: 'user', maps: [
        { name: 'navigation', widget: 'BootstrapNavigation', value:'"GitHub"'},
        { name: 'navigation-list', widget: 'BootstrapNavigationList'},
        { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'data.name', href:'navigate(data.link)'},

        { name: 'content', widget: 'ProfileContainer' },
        { name: 'user', widget: 'SimpleHtml', class:'clearfix' },
        { name: 'avatar', widget: 'ProfileImage', value:'data.avatar_url' },
        { name: 'detail', widget: 'SimpleHtml', class:'col-xs-12 col-sm-8' },
        { name: 'name', widget: 'SimpleHtml', tag: 'h2', value: 'data.name' },
        { name: 'login', widget: 'ProfileDetail', detail: 'Login', value: 'data.login'},
        { name: 'bio', widget: 'ProfileDetail', detail: 'Bio', value: 'data.bio'},
        { name: 'blog', widget: 'ProfileDetail', detail: 'Blog', value: 'data.blog'},
        { name: 'company', widget: 'ProfileDetail', detail: 'Company', value: 'data.company'},
        { name: 'location', widget: 'ProfileDetail', detail: 'Location', value: 'data.location'},
        { name: 'seguidores_panel', widget: 'SimpleHtml', class:'clearfix' },
        { name: 'seguidores_title', widget: 'SimpleHtml', tag: 'h3', class:'clearfix', value:'"Seguidores"'},
        { name: 'seguidores', widget: 'SimpleHtml', tag: 'div'},
        { name: 'seguidor', widget: 'SimpleHtml', tag: 'a', href: 'navigate(data.url)'},
        { name: 'avatar_seguidor', widget: 'SimpleHtml', class:'col-md-2 col-xs-3 img-circle img-responsive', tag: 'img', src: 'data.avatar_url + "s=80"', alt:'data.login', title:'data.login'},
        { name: 'repositorios_panel', widget: 'SimpleHtml', class:'clearfix' },
        { name: 'repositorios_title', widget: 'SimpleHtml', tag: 'h3', value:'"Repositorios"'},
        { name: 'repositorios', widget: 'SimpleHtml', tag: 'div'},
        { name: 'repositorio', widget: 'SimpleHtml', tag: 'div', class:'media'},
        { name: 'nome', widget: 'SimpleHtml', tag: 'h4', value: 'data.name', class:'media-heading'},
        { name: 'descricao', widget: 'SimpleHtml', tag: 'span', value: 'data.description'},
        { name: 'box', widget: 'SimpleHtml', tag: 'ul', class:'nav nav-pills nav-stacked pull-right'},
        { name: 'watch', widget: 'ProfileCount', icon:'eye-close', value:'data.watchers_count'},
        { name: 'watch', widget: 'ProfileCount', icon:'eye-open', value:'data.watchers_count', when:'haveWatch'},

        { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'footer-content', widget: 'BootstrapFooter' }
    ]}
];

var ajaxSetup = {
    headers: { "Authorization": "token f4ed0e86730b094fca1bb0d7003515b61c5afd14" }
};

if(typeof define === 'function') {
    define([
        // Load our app module and pass it to our definition function
        "jquery",
        "bootstrap",
        'jsynth/init'
    ], function ($, $bootstrap, JSynth) {

        return function GitHub() {
            $.ajaxSetup(ajaxSetup);
            this.jsynth = new JSynth.Application(interface_abstracts, concrete_interface, rules, selection);
        };

    });
} else {

    ajaxSetup.headers['User-Agent'] = "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.3 Safari/537.36"

    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


