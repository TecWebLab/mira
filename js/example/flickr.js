"use strict";

var rules = [{
    name: 'isPerson',
    validate: '$data.username != null'
},{
    name: 'isPerson',
    validate: '$data.username != null'
},{
    name: 'isPhoto',
    validate: '$data.type == "photo"'
},{
    name: 'actualPhoto',
    validate: '$env.$data.id == $data.id'
}
];

var selection = [
    {
        when: 'isPerson',
        abstract: 'timeline'
    },
    {
        when: 'isPhoto',
        abstract: 'photo'
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
        name: "timeline",
        widgets: [
            { name: 'navigation',
                children: [
                    { name:'navigation-list',
                        children:[
                            {name:'navigation-list-item'},
                            {name:'navigation-avatar',
                              children:[
                                  {name:'navigation-avatar-img'}
                              ]
                            }
                        ]
                    }]
            },

            {
                name: "content",
                children: [{
                    name: "amigos",
                    parse:'$data.data',
                    datasource: "url:/me/following",
                    children: [{
                        name: "amigo_box",
                        children: [
                            {name: "amigo_avatar"},
                            {name: "amigo_link"},
                            {name: "slide_gallery",
                             parse:'$data.data',
                             datasource:"url:/photos?user_id=<%= $data.nsid %>",
                             children: [
                                {name: "slide_item",
                                 children:[
                                     {
                                         name: "slide_desc",
                                         children: [
                                             {name: "slide_share"},
                                             {name: "slide_title"}
                                         ]
                                     }
                                 ]
                                }
                             ]}
                        ]
                    }]
                },
                    {   name:'sidebar',
                        children:[
                            {name: 'common_title'},
                            {name:'commons_box',
                             datasource:'url:/interestingness',
                             parse:'$data.data',
                             children:[
                                {   name:'commons_item',
                                    children:[
                                        { name:'commons_img'}
                                    ]
                                }
                             ]
                            }
                        ]
                    }
                ]
            },
            {name: "footer"}]
    },{
        name:'photo',
        widgets : [
            { name: 'navigation',
                children: [
                    { name:'navigation-list',
                        children:[
                            {name:'navigation-list-item'},
                            {name:'navigation-avatar',
                                children:[
                                    {name:'navigation-avatar-img'}
                                ]
                            }
                        ]
                    }]
            },
            {name:'head',
             children:[
                 {name: 'image-box',
                  children:[
                      {name:'imagem-principal'},
                     {name:'mais-box',
                         datasource:'url:/photos?per_page=12&user_id=<%= $data.owner.nsid %>',
                         parse:'$data.data',
                         children:[
                             {   name:'mais-item',
                                 children:[
                                     { name:'mais-img'}
                                 ]
                             }
                         ]
                     }
                  ]
                 }
             ]},
            {name:'content',
             children:[
                 {
                     name: "main",
                     children: [{
                         name: "user-box",
                         children: [
                             { name: "user-avatar-link",
                               children: [{name: "user-avatar"}]
                             },
                             {name: "user-name"},
                             {name: "photo-name"}]
                     },{
                         name:'star-box',
                         datasource:'url:/favorites?photo_id=<%= $data.id %>',
                         parse:'[$data]',
                         children:[
                             {name: 'star-item',
                              children:[
                                  {name: 'star-desc'},
                                  {name: 'star-qtd'}
                              ]
                             }
                         ]
                     },{
                         name:'comment-box',
                         datasource:'url:/comments?photo_id=<%= $data.id %>',
                         children:[
                             {name: 'comment-item',
                                 children:[
                                     {name: 'comment-author',
                                      children:[
                                          {name: 'comment-avatar'}
                                      ]
                                     },
                                     {name: 'comment-author-name'},
                                     {name: 'comment-content'}
                                 ]
                             }
                         ]
                     }


                     ]
                 }
             ]
            },

            {name:'footer'}
        ]
    },{
        name:'not_found',
        widgets : [
            {'header': ['logo', {'search_form':{'search_group' : ['search_field', 'search_button']}}]},
            {'content': 'warning'},
            {'footer': ['footer-content']}
        ]
    }

];

var head = [
    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
    {name: 'app_css', widget:'Head', href:'css/flickr.css', tag: 'style'},
    {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'}
];

var concrete_interface = [
    {
        name: 'landing',
        head: head.concat(
            [{name: 'title', widget:'Title', value: '"Flickr"'}]
        ),
        maps: [
            { name: 'navigation', widget: 'BootstrapNavigation', value:'"Flickr"'},

            { name: 'content', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'texto', widget: 'SimpleHtml', tag:'h1', value:'"Faça sua autenticação"' },

            { name: 'oauth', widget: 'SimpleHtml', tag:'button', value:'"Flickr"', onclick:'"request_oauth()"' },

            { name: 'footer', widget: 'SimpleHtml', tag:'div', class:'container' },
            { name: 'footer-content', widget: 'BootstrapFooter' }
        ]
    },{

        name: "timeline",
        head: head.concat([
                {name: 'title', widget:'Title', value: '$data.realname._content'},
                {name: 'galery_css', widget:'Head', tag:'style', href:'js/example/flickr/lightSlider.css'}
            ]),
        maps: [
            { name: 'navigation', widget: 'BootstrapNavigation', value:'"Flickr"'},
            { name: 'navigation-list', widget: 'BootstrapNavigationList'},
            { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'$data.realname._content', href:'navigate("/me")'},
            { name: 'navigation-avatar', widget: 'BootstrapNavigationListItem', tag:'a', class:'navbar-brand', href:'navigate("/me")'},
            { name: 'navigation-avatar-img', tag:'img', class:'img-circle', src:'$data.picture', width:"33", height:'33'},
            { name: "busca" },
            { name: "foto", tag:'img', src:'' },
            { name: "content", class:'container' },
            { name: "amigos", md:8 },
            { name: "amigo_box", widget:'BootstrapPanelBody', class:'panel-default'},
            { name: "amigo_box_body", class:'panel-body'},

            { name: "amigo_avatar", tag: 'img', md:"2", img:'circle,responsive', src:'$data.thumbnail'},
            { name: "amigo_link", tag:'h3', value:'$data.realname' },

            { name: "slide_gallery", widget:'FlickrGallery' },
            { name: "slide_item", widget:'FlickrGalleryItem', 'data-thumb':'$data.thumbnail', img:{ src:"$data.picture"}, link: { href:'navigate("/photo?photo_id=" + $data.id)' } },
            { name: "slide_desc",  class:"lslide-description" },
            { name: "slide_title", tag:'h4', value:'$data.title' },
            { name: "slide_share", widget:'BootstrapIcon', class:'pull-right', icon:'share' },

            { name: 'sidebar', md:4 },
            { name: 'commons_box', widget:'BootstrapPanelBody', class:'panel-default' },
            { name: 'common_title', tag:'h3', value:'"Destaques"' },
            { name: 'commons_item', tag:'a'  },
            { name: 'commons_img', tag: 'img', md:"4", class:'thumbnail', src:'$data.size.square' },


            { name: "footer" }
        ]
    },{

        name: "photo",
        head: head.concat([
            {name: 'title', widget:'Title', value: '$data.title._content'}
        ]),
        maps: [
            { name: 'navigation', widget: 'BootstrapNavigation', value:'"Flickr"'},
            //{ name: 'navigation-list', widget: 'BootstrapNavigationList'},
            { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'', href:'navigate("/me")'},
            { name: 'navigation-avatar', widget: 'BootstrapNavigationListItem', tag:'a', class:'navbar-brand', href:'navigate("/me")'},
            { name: 'navigation-avatar-img', tag:'img', class:'img-circle', src:'', width:"33", height:'33'},

            { name: 'head', class:'jumbotron'},
            { name: 'image-box', class:'container', text:'center'},
            { name: "imagem-principal", tag:'img', src:"$data.size.s1024" },

            {name:'mais-box', class:'row'},
            {name:'mais-item', tag:'a', href:'navigate("/photo?photo_id=" + $data.id)', md:1, class:'thumbnail'},
            {name:'mais-item', tag:'a', href:'navigate("/photo?photo_id=" + $data.id)', md:1, class:'thumbnail alert-info', when:'actualPhoto'},
            {name:'mais-img', tag:'img', src:'$data.size.square'},

            { name: "content", class:'container' },

            { name: "main", md:7 },
            { name: "user-box", class:'row' },
            { name: "user-avatar-link", tag:'a', href:'navigate("/user?id=" + $data.owner.nsid)' },
            { name: "user-avatar", tag:'img', md:"2", img:'circle,responsive', src:'$data.owner.thumbnail' },
            { name: "user-name", tag:'h4', value:'$data.owner.realname' },
            { name: "photo-name", tag:'h4', value:'$data.title._content' },

            { name: "star-box", class:'row', md:'offset-2'  },
            { name: 'star-item', label:'info' },
            { name: 'star-desc', widget:'BootstrapIcon', icon:'star' },
            { name: 'star-qtd', tag:'span', value:'$data.photo.person.length' },

            { name: 'comment-box', class:'row' },
            { name: 'comment-item', widget:'BootstrapPanelBody', class:'panel-default' },
            { name: 'comment-author', tag:'a', md:'2' },
            { name: 'comment-avatar', tag:'img', img:'circle', src:'$data.thumbnail' },
            { name: 'comment-author-name', tag:'h4', value:'$data.realname || $data.authorname' },
            { name: 'comment-content', tag:'blockquote', md:'9,offset-2', value:'$data._content' },


            { name: "footer" }
        ]
    }
];


if(typeof define === 'function') {
    define([
        // Load our app module and pass it to our definition function
        "jquery",
        "bootstrap",
        'mira/init',
        'hello',
        'example/flickr/selection',
        'example/flickr/widgets'
    ], function ($, $bootstrap, Mira, Hello, FlickrSelection, FlickrWidgets) {

        return function Flickr() {
            // substituindo fabricas
            Mira.Selection = FlickrSelection;
            Mira.Abstract.Widget.Model.prototype.requestData = function(parentData, $env, callback){
                var esse = this;
                var datasource = this.get('datasource');
                var parse = Mira.Helper.buildFunction(this.get('parse'), this);

                if(datasource.indexOf('url:') == 0) {
                    var endpoint = this.buildUrlDatasource(parentData, $env);
                    Hello('flickr').api(endpoint).then(function(data){
                        var CollectionClass = Mira.Api.Collection.extend({
                                'parse': parse || Mira.Api.Collection.prototype.parse
                            });
                        var collection = new CollectionClass(data, { 'parse': true });
                        callback(collection);
                    });

                } else {
                    var data = this.buildParentDataDatasource(parentData.attributes);
                    var CollectionClass = Mira.Api.Collection.extend({
                        'parse': parse || Mira.Api.Collection.prototype.parse
                    });
                    var collection = new CollectionClass(data, { 'parse': true });
                    callback(collection);
                }
            };


            Hello.init({
                flickr: 'e93d705a7714549fe2c0e7e307aa26cb'
            },{
                oauth_proxy : 'https://auth-server.herokuapp.com/proxy'
            });


            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
            Mira.Widget.register(FlickrWidgets);
            Mira.Widget.setDefault('BootstrapSimple');


            window.request_oauth = function(){
                Hello('flickr').login().then(function(){
                    window.location.href = '#?URI=/me'
                });
            };

            window.datasource = function (uri, params) {
                if(params) {
                    return 'url:' + uri + '&' + Mira.Helper.toQueryString(params);
                }
                return 'url:' + uri;
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


