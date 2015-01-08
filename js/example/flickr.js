"use strict";

var rules = [{
    name: 'isMe',
    validate: '$data.me == true'
},{
    name: 'isPerson',
    validate: '$data.person != null'
},{
    name: 'isPhoto',
    validate: '$data.type == "photo"'
},{
    name: 'actualPhoto',
    validate: '$env.$data.id == $data.id'
},{
    name:'isUserPhoto',
    validate: '$env.$login.user_nsid == $data.owner.nsid'
},{
    name:'groupToAdd',
    validate: '($data.admin == 1 && $data.moderador == 1) || $env.$login.user_nsid == $env.$data.owner.nsid'
},{
    name:'needApprove',
    validate: '$data.privacy == 2'
},{
    name:'waitingApprove',
    validate: '$data.$status == 2'
},{
    name:'approved',
    validate: '$data.$status == "ok"'
}];

var selection = [
    {
        when: 'isMe',
        abstract: 'timeline'
    },{
        when: 'isPerson',
        abstract: 'user'
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
                            {name: 'amigo_link',
                             children:[
                                 {name: "amigo_avatar"},
                                 {name: "amigo_name"}
                             ]},
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
        name:'user',
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
                    name: "photos_box",
                    datasource: "url:/photos?user_id=<%= $data.person.id %>&per_page=50",
                    parse:'$data.data',
                    children: [{
                        name: "photo_item",
                        children: [
                            {name: "photo_title"},
                            {name: "photo_src"}
                        ]
                    }]
                }]
            },
            {name: "footer"}]
    }
    ,{
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
                 },{
                     name: 'sidebar',
                     children:[
                         {name:'count-box',
                          children:[
                              {
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
                              },
                              {
                                  name:'view-count-box',
                                  children:[
                                      {name: 'view-count-item',
                                          children:[
                                              {name: 'view-count-desc'},
                                              {name: 'view-count-qtd'}
                                          ]
                                      }
                                  ]
                              },
                              {
                                  name:'comment-count-box',
                                  children:[
                                      {name: 'comment-count-item',
                                          children:[
                                              {name: 'comment-count-desc'},
                                              {name: 'comment-count-qtd'}
                                          ]
                                      }
                                  ]
                              },
                              {
                                  name:'taken-box',
                                  children:[
                                      {name: 'taken-item',
                                          children:[
                                              {name: 'taken-desc'},
                                              {name: 'taken-qtd'}
                                          ]
                                      }
                                  ]
                              }
                          ]
                         },{
                             name: "groups-box",
                             children: [
                                 {name: 'group-submit'},
                                 {name: "groups-title"},
                                 {
                                     name: "groups-itens",
                                     datasource: 'url:/photo/context?photo_id=<%= $env.$data.id %>',
                                     parse: '$data.pool',
                                     children: [{
                                         name: "groups-item",
                                         children: [
                                             {name: "group-thumb"},
                                             {name: "group-name"},
                                             {name: "group-status"}
                                         ]
                                     }]
                                 },
                                 {name:'group-submit-box',
                                  children:[
                                      {name:'group-submit-box-header',
                                       children:[
                                           {name:'group-submit-box-header-title'}
                                       ]},
                                      {name:'group-submit-box-body',
                                       children:[
                                          {
                                              name:'group-submit-box-body-groups',
                                              datasource: 'url:/photo/listGroups',
                                              parse:'$data.groups.group',
                                              children:[{
                                                      name: "group-submit-box-body-groups-item",
                                                      children: [
                                                          {name: "group-submit-box-body-groups-thumb"},
                                                          {name: "group-submit-box-body-groups-name"},
                                                          {name: "group-submit-box-body-groups-status"}
                                                      ]
                                                  }
                                              ]
                                          }
                                       ]
                                      },
                                      {name:'group-submit-box-footer'}
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

            { name: 'oauth', widget: 'SimpleHtml', tag:'button', value:'"Flickr"', events: {click: 'request_oauth'} },

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
            { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'$env.$login.fullname', href:'navigate("/me")'},
            { name: 'navigation-avatar', widget: 'BootstrapNavigationListItem', tag:'a', class:'navbar-brand', href:'navigate("/user?user_id=" + $env.$login.user_nsid)'},
            { name: 'navigation-avatar-img', tag:'img', class:'img-circle', src:'$env.$login.info.picture', width:"33", height:'33'},
            { name: "busca" },
            { name: "foto", tag:'img', src:'' },
            { name: "content", class:'container' },
            { name: "amigos", md:8 },
            { name: "amigo_box", widget:'BootstrapPanelBody', class:'panel-default'},
            { name: "amigo_box_body", class:'panel-body'},

            { name: "amigo_link", tag:'a', href:'navigate("/user?user_id=" + $data.nsid)'},
            { name: "amigo_avatar", tag: 'img', md:"2", img:'circle,responsive', src:'$data.thumbnail'},
            { name: "amigo_name", tag:'h3', value:'$data.realname' },

            { name: "slide_gallery", widget:'FlickrGallery' },
            { name: "slide_item", widget:'FlickrGalleryItem', 'data-thumb':'$data.thumbnail', img:{ src:"$data.picture"}, link: { href:'navigate("/photo?photo_id=" + $data.id)' } },
            { name: "slide_desc",  class:"lslide-description" },
            { name: "slide_title", tag:'h4', value:'$data.title' },
            { name: "slide_share", widget:'BootstrapIcon', class:'pull-right', icon:'share' },

            { name: 'sidebar', md:4 },
            { name: 'commons_box', widget:'BootstrapPanelBody', class:'panel-default' },
            { name: 'common_title', tag:'h3', value:'"Destaques"' },
            { name: 'commons_item', tag:'a', href:'navigate("/photo?photo_id=" + $data.id)'  },
            { name: 'commons_img', tag: 'img', md:"4", class:'thumbnail', src:'$data.size.square' },


            { name: "footer" }
        ]
    },{
        name: 'user',
        head: head.concat([
            {name: 'title', widget:'Title', value: '$data.person.realname._content'}
        ]),
        maps:[
            { name: 'navigation', widget: 'BootstrapNavigation', value:'"Flickr"'},
            { name: 'navigation-list', widget: 'BootstrapNavigationList'},
            { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'$env.$login.fullname', href:'navigate("/me")'},
            { name: 'navigation-avatar', widget: 'BootstrapNavigationListItem', tag:'a', class:'navbar-brand', href:'navigate("/user?user_id=" + $env.$login.user_nsid)'},
            { name: 'navigation-avatar-img', tag:'img', class:'img-circle', src:'$env.$login.info.picture', width:"33", height:'33'},
            { name: 'content', class:'container-fluid'},
            { name: 'photos_box', widget:'FlickrCollage'},
            { name: 'photo_item', tag:'a', href:'navigate("/photo?photo_id=" + $data.id)' },
            { name: 'photo_title' },
            { name: 'photo_src', tag:'img', src:'$data.size.s500'}
        ]
    },{

        name: "photo",
        head: head.concat([
            {name: 'title', widget:'Title', value: '$data.title._content'}
        ]),
        maps: [
            { name: 'navigation', widget: 'BootstrapNavigation', value:'"Flickr"'},
            { name: 'navigation-list', widget: 'BootstrapNavigationList'},
            { name: 'navigation-list-item', widget: 'BootstrapNavigationListItem', value:'$env.$login.fullname', href:'navigate("/me")'},
            { name: 'navigation-avatar', widget: 'BootstrapNavigationListItem', tag:'a', class:'navbar-brand', href:'navigate("/user?user_id=" + $env.$login.user_nsid)'},
            { name: 'navigation-avatar-img', tag:'img', class:'img-circle', src:'$env.$login.info.picture', width:"33", height:'33'},

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
            { name: "user-avatar-link", tag:'a', href:'navigate("/user?user_id=" + $data.owner.nsid)' },
            { name: "user-avatar", tag:'img', md:"2", img:'circle,responsive', src:'$data.owner.thumbnail' },
            { name: "user-name", tag:'h4', value:'$data.owner.realname' },
            { name: "photo-name", tag:'h4', value:'$data.title._content' },

            { name: 'comment-box', class:'row' },
            { name: 'comment-item', widget:'BootstrapPanelBody', class:'panel-default' },
            { name: 'comment-author', tag:'a', md:'2', href:'navigate("/user?user_id=" + $data.author)' },
            { name: 'comment-avatar', tag:'img', img:'circle', src:'$data.thumbnail' },
            { name: 'comment-author-name', tag:'h4', value:'$data.realname || $data.authorname' },
            { name: 'comment-content', tag:'blockquote', md:'9,offset-2', value:'$data._content' },


            { name: 'sidebar', md:5},
            { name: 'count-box', widget:'BootstrapPanelBody', class:'panel-default' },

            { name: "star-box", md:2  },
            { name: 'star-item', label:'info', title:'Favoritos'  },
            { name: 'star-desc', widget:'BootstrapIcon', icon:'star' },
            { name: 'star-qtd', tag:'span', value:'$data.photo.person.length' },


            { name: "view-count-box", md:2  },
            { name: 'view-count-item', label:'info', title:'Visualizações' },
            { name: 'view-count-desc', widget:'BootstrapIcon', icon:'eye-open' },
            { name: 'view-count-qtd', tag:'span', value:'$data.views' },


            { name: "comment-count-box", md:2  },
            { name: 'comment-count-item', label:'info', title:'Comentários' },
            { name: 'comment-count-desc', widget:'BootstrapIcon', icon:'comment' },
            { name: 'comment-count-qtd', tag:'span', value:'$data.comments._content' },

            { name: "taken-box", md:2  },
            { name: 'taken-item', label:'info', title:'Tirada em' },
            { name: 'taken-desc', widget:'BootstrapIcon', icon:'calendar' },
            { name: 'taken-qtd', tag:'span', value:'$data.dates.taken' },

            { name: 'groups-box', widget:'BootstrapPanelBody', class:'panel-default' },
            { name: 'groups-title', tag:'h3', value:'Groups' },
            { name: 'groups-itens' },
            { name: 'groups-item', md:12 },
            { name: 'group-name', value:'$data.title || $data.name' },
            { name: 'group-thumb', tag:'img', img:'circle', md:3, src:'getThumbnail($data.id, $data.iconserver, $data.iconfarm)' },
            { name: 'group-status' },
            { name: 'group-submit', value:'Add Group', tag:'button', class:'pull-right', onclick:'"show_modal(\'group-submit-box\')"' },
            { name: 'group-submit-box', widget:'BootstrapModalDialog' },
            { name: 'group-submit-box-header', widget:'BootstrapModalHeader' },
            { name: 'group-submit-box-header-title', tag:'h3', value:'Adicionar Grupos' },
            { name: 'group-submit-box-body', widget:'BootstrapModalBody' },
            { name: 'group-submit-box-footer', widget:'BootstrapModalFooter' },


            {name: "group-submit-box-body-groups", class:'row' },
            {name: "group-submit-box-body-groups-item", md:12, when:'groupToAdd'},
            {name: "group-submit-box-body-groups-thumb", tag:'img', img:'circle', pull:'left', src:'getThumbnail($data.id, $data.iconserver, $data.iconfarm)'},
            {name: "group-submit-box-body-groups-name", value:'$data.name' },
            {name: "group-submit-box-body-groups-status", tag:'button', events: {click: 'addGroup'}, value:'Request', btn:'default'},
            {name: "group-submit-box-body-groups-status", tag:'button', events: {click: 'addGroup'}, value:'Request', btn:'warning', when: 'needApprove'},
            {name: "group-submit-box-body-groups-status", tag:'span', events: {click: 'addGroup'}, value:'Waiting', class:'disabled', btn:'warning', when: 'waitingApprove'},
            {name: "group-submit-box-body-groups-status", tag:'span', events: {click: 'addGroup'}, value:'Added', class:'disabled', btn:'success', when: 'approved'},

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
            Mira.Abstract.Widget.Model.prototype.requestData = function(parentData, $env, $bind, callback){
                var esse = this;
                var datasource = this.get('datasource');
                var parse = Mira.Helper.buildFunction(this.get('parse'), this);

                if(datasource.indexOf('url:') == 0) {
                    var endpoint = this.buildUrlDatasource(parentData, $env, $bind);
                    Hello('flickr').api(endpoint).then(function(data){
                        console.log('request ', endpoint, data);
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

            app.on('build_env', function($env){
                if(!$env.$login){
                    $env.$login = hello.getAuthResponse('flickr');
                }
                if(!$env.$login.info){
                    Hello('flickr').api('/me').then(function(data){
                        $env.$login.info = data;
                    })
                }
            });


            window.request_oauth = function(options){
                Hello('flickr').login().then(function(data){
                    options.$env.$login = hello.getAuthResponse('flickr');
                    window.location.href = '#?URI=/me';
                });
            };

            window.addGroup = function (options) {

                if(options.$data.privacy == 2) {
                    options.$dataObj.set('$status', 2);
                } else {
                    options.$dataObj.set('$status', 'ok');
                    var col = options.$env.collections['groups-itens'];
                    col.add(options.$data);
                    col.trigger('reset');
                }

            };

            window.show_modal = function(id){
                $('#' + id).modal();
            };

            window.getThumbnail = function(nsid, iconserver, iconfarm){
                var url="https://www.flickr.com/images/buddyicon.gif";
                if (nsid && iconserver && iconfarm){
                    url="https://farm" + iconfarm + ".staticflickr.com/" +
                    iconserver + "/" +
                    "buddyicons/" + nsid + ".jpg";
                }
                return url;
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

