"use strict";

var sourceUsers = [{
    name: 'Ezequiel Bertti',
    link: 'https://api.github.com/users/ebertti'
    },{
    name: 'Magela',
    link: 'https://api.github.com/users/magelinha'
}];

var rules = [{
    name: 'DescricaoPequena',
    validate: '$data.name.length < 55'
},{
    name: 'isUser',
    validate: '$data.login != null'
},{
    name: 'hasDetail',
    validate: '$bind != null'
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
        name:"user",
        widgets:[ { name:"navigation",
            children:[ { name:"navigation-list",datasource:sourceUsers,
                children:[ { name:"navigation-list-item", bind:"$data.name" } ] } ] },
            { name:"content",
                children:[ { name:"user",
                    children:[ { name:"avatar",  bind:"$data.avatar_url" },
                        { name:"name", bind:"$data.name", when: 'hasDetail'},
                        { name:"login", bind:"$data.login", when: 'hasDetail' },
                        { name:"bio", bind:"$data.bio", when: 'hasDetail' },
                        { name:"blog", bind:"$data.blog", when: 'hasDetail' },
                        { name:"company", bind:"$data.company", when: 'hasDetail' },
                        { name:"location", bind:"$data.location", when: 'hasDetail' } ] },
                    { name:"seguidores_panel",
                        children:[ { name:"seguidores_title" },
                            { name:"seguidores", datasource:"url:<%= $data.followers_url %>",
                                children:[ { name:"seguidor", bind:"$data.url",
                                    children:[ { name:"avatar_seguidor", bind:"$data.avatar_url" } ] } ]  },
                            { name:"seguidores_mais" } ] },
                    { name:"repositorios_panel",
                        children:[ { name:"repositorios_title" },
                            { name:"repositorios", datasource:"url:<%= $data.repos_url %>",
                                children:[ { name:"repositorio",
                                    children:[ { name:"nome",
                                        bind:"$data.name" },
                                        { name:"descricao", bind:"$data.description" },
                                        { name:"star" },
                                        { name:"watch", bind:"$data.watchers_count" } ] } ]
                                } ] } ] },
            { name:"footer",
                children:[ { name:"footer-content" } ] } ]
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

        structure:[
            {'user': ['avatar', {'detail': ['name', 'login', 'bio', 'blog', 'company', 'location']}]},
            {"repositorio": ['nome', 'descricao', {box: ['star', 'watch']}]}
        ],

        maps: [
        { name: 'navigation', widget: 'BootstrapNavigation', value:'"GitHub"'},
        { name: 'navigation-list', widget: 'BootstrapNavigationList'},
        { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'$bind', href:'navigate($data.link)'},

        { name: 'content', widget: 'ProfileContainer' },
        { name: 'user', widget: 'SimpleHtml', class:'clearfix' },
        { name: 'avatar', widget: 'ProfileImage', value:'$data.avatar_url' },
        { name: 'detail', widget: 'SimpleHtml', class:'col-xs-12 col-sm-8' },
        { name: 'name', widget: 'SimpleHtml', tag: 'h2', value: '$bind' },
        { name: 'login', widget: 'ProfileDetail', detail: 'Login', value: '$bind'},
        { name: 'bio', widget: 'ProfileDetail', detail: 'Bio', value: '$bind'},
        { name: 'blog', widget: 'ProfileDetail', detail: 'Blog', value: '$bind'},
        { name: 'company', widget: 'ProfileDetail', detail: 'Company', value: '$bind'},
        { name: 'location', widget: 'ProfileDetail', detail: 'Location', value: '$bind'},
        { name: 'seguidores_panel', widget: 'SimpleHtml', class:'clearfix' },
        { name: 'seguidores_title', widget: 'SimpleHtml', tag: 'h3', class:'clearfix', value:'"Seguidores"'},
        { name: 'seguidores', widget: 'SimpleHtml', tag: 'div'},
        { name: 'seguidor', widget: 'SimpleHtml', tag: 'a', href: 'navigate($bind)'},
        { name: 'avatar_seguidor', widget: 'SimpleHtml', class:'col-md-2 col-xs-3 img-circle img-responsive', tag: 'img', src: '$bind + "s=80"', alt:'$data.login', title:'$data.login'},
        { name: 'repositorios_panel', widget: 'SimpleHtml', class:'clearfix' },
        { name: 'repositorios_title', widget: 'SimpleHtml', tag: 'h3', value:'"Repositorios"'},
        { name: 'repositorios', widget: 'SimpleHtml', tag: 'div'},
        { name: 'repositorio', widget: 'SimpleHtml', tag: 'div', class:'media'},
        { name: 'nome', widget: 'SimpleHtml', tag: 'h4', value: '$data.name', class:'media-heading'},
        { name: 'descricao', widget: 'SimpleHtml', tag: 'span', value: '$data.description'},
        { name: 'box', widget: 'SimpleHtml', tag: 'ul', class:'nav nav-pills nav-stacked pull-right'},
        { name: 'watch', widget: 'ProfileCount', icon:'eye-close', value:'$bind'},
        { name: 'watch', widget: 'ProfileCount', icon:'eye-open', value:'$bind', when:'haveWatch'},

        { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'footer-content', widget: 'BootstrapFooter' }
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

        return function GitHub() {
            $.ajaxSetup(ajaxSetup);
            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
        };

    });
} else {
    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


