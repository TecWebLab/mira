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
                        { name:"user_name", bind:"$data.name", when: 'hasDetail'},
                        { name:"login", bind:"$data.login", when: 'hasDetail' },
                        { name:"bio", bind:"$data.bio", when: 'hasDetail' },
                        { name:"blog", bind:"$data.blog", when: 'hasDetail' },
                        { name:"company", bind:"$data.company", when: 'hasDetail' },
                        { name:"location", bind:"$data.location", when: 'hasDetail' } ] },
                    { name:"follows_panel",
                        children:[ { name:"follows_title" },
                            { name:"follows", datasource:"url:<%= $data.followers_url %>",
                                children:[ { name:"follow", bind:"$data.url",
                                    children:[ { name:"follow_avatar", bind:"$data.avatar_url" } ] } ]  }
                            ] },
                    { name:"repositories_panel",
                        children:[ { name:"repositories_title" },
                            { name:"repositories", datasource:"url:<%= $data.repos_url %>",
                                children:[ { name:"repository",
                                    children:[ { name:"repository_name", bind:"$data.name" },
                                        { name:"repository_description", bind:"$data.description" },
                                        { name:"repository_watch", bind:"$data.watchers_count" } ] } ]
                                } ] } ] },
            { name:"footer" } ]
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
            {'user': ['avatar', {'detail': ['user_name', 'login', 'bio', 'blog', 'company', 'location']}]},
            {'repository': ['repository_name', 'repository_description', {box: ['repository_watch']}]}
        ],

        maps: [
        { name: 'navigation', widget: 'BootstrapNavigation', value:'"GitHub"'},
        { name: 'navigation-list', widget: 'BootstrapNavigationList'},
        { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'$bind', href:'navigate($data.link)'},

        { name: 'content', widget: 'ProfileContainer' },
        { name: 'user', class:'clearfix' },
        { name: 'avatar', widget: 'ProfileImage', value:'$data.avatar_url' },
        { name: 'detail', class:'col-xs-12 col-sm-8' },
        { name: 'user_name', tag: 'h2', value: '$bind' },
        { name: 'login', widget: 'ProfileDetail', detail: 'Login', value: '$bind'},
        { name: 'bio', widget: 'ProfileDetail', detail: 'Bio', value: '$bind'},
        { name: 'blog', widget: 'ProfileDetail', detail: 'Blog', value: '$bind'},
        { name: 'company', widget: 'ProfileDetail', detail: 'Company', value: '$bind'},
        { name: 'location', widget: 'ProfileDetail', detail: 'Location', value: '$bind'},
        { name: 'follows_panel', class:'clearfix' },
        { name: 'follows_title', tag: 'h3', class:'clearfix', value:'"Seguidores"'},
        { name: 'follows' },
        { name: 'follow', tag:'a', href: 'navigate($bind)'},
        { name: 'follow_avatar', widget: 'BootstrapSimple', md:'1', xs:'2', img:'circle,responsive', tag: 'img', src: '$bind + "s=80"', alt:'$data.login', title:'$data.login'},
        { name: 'repositories_panel', class:'clearfix' },
        { name: 'repositories_title', tag: 'h3', value:'"Repositórios"'},
        { name: 'repositories' },
        { name: 'repository', class:'media'},
        { name: 'repository_name', tag: 'h4', value: '$data.name', class:'media-heading'},
        { name: 'repository_description', tag: 'span', value: '$data.description'},
        { name: 'box', tag: 'ul', class:'nav nav-pills nav-stacked pull-right'},
        { name: 'repository_watch', widget: 'ProfileCount', icon:'eye-close', value:'$bind'},
        { name: 'repository_watch', widget: 'ProfileCount', icon:'eye-open', value:'$bind', when:'haveWatch'},

        { name: 'footer', widget: 'TecWebRodape' }
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


