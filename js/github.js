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
    name: 'hasValue',
    validate: 'value.length > 0'
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
                  { name: "seguidores", datasource: "url:<%= data.followers_url %>",
                      children: {"seguidor": ['avatar_seguidor']}
                  },
                  { name: "repositorios", datasource: "url:<%= data.repos_url %>",
                      children: {"repositorio": ['nome', 'link']}
                  }]
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
        { name: 'user', widget: 'SimpleHtml', class:'row' },
        { name: 'avatar', widget: 'ProfileImage', value:'data.avatar_url' },
        { name: 'detail', widget: 'SimpleHtml', class:'col-xs-12 col-sm-8' },
        { name: 'name', widget: 'SimpleHtml', tag: 'h2', value: 'data.name' },
        { name: 'login', widget: 'ProfileDetail', detail: 'Login', value: 'data.login'},
        { name: 'bio', widget: 'ProfileDetail', detail: 'Bio', value: 'data.bio'},
        { name: 'blog', widget: 'ProfileDetail', detail: 'Blog', value: 'data.blog'},
        { name: 'company', widget: 'ProfileDetail', detail: 'Company', value: 'data.company'},
        { name: 'location', widget: 'ProfileDetail', detail: 'Location', value: 'data.location'},
        { name: 'seguidores', widget: 'SimpleHtml', tag: 'div'},
        { name: 'seguidor', widget: 'SimpleHtml', tag: 'a', href: 'navigate(data.url)'},
        { name: 'avatar_seguidor', widget: 'SimpleHtml', class:'col-md-1 img-circle img-responsive', tag: 'img', src: 'data.avatar_url', alt:'data.login', title:'data.login'},
        { name: 'repositorios', widget: 'SimpleHtml', tag: 'div'},
        { name: 'repositorio', widget: 'SimpleHtml', tag: 'div'},
        { name: 'nome', widget: 'SimpleHtml', tag: 'span', value: 'data.name'},
        { name: 'link', widget: 'SimpleHtml', tag: 'span', value: 'data.html_url'},

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

        return function Pinterest() {
            $.ajaxSetup(ajaxSetup);
            this.jsynth = new JSynth.Application(interface_abstracts, concrete_interface, rules, selection);
        };

    });
} else {
    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


