# Bem vindo ao MIRA

Este trabalho apresentará um framework baseado em padrões que permitirá a uma aplicação qualquer definir uma interface
segundo o modelo de interfaces do SHDM. A funcionalidade da aplicação será ativada através de interfaces REST.

Através de uma estrutura composta por **Seleção de Interface**, **Interface Abstrata** e **Interface Concreta**,
o projetista pode montar sua aplicação e fazer com que ela se adapte a diversas APIs REST que seja mapeadas nos modelos
da aplicação.

## Sequencia de execução

![Sequencia de execução](https://raw.githubusercontent.com/TecWebLab/mira/master/docs/docs/img/sequencia.jpg)

## Regras

O projetista tem a possibilidade de centralizar as regras que serão utilizadas posteriormente para a construção da interface da aplicação.

    var rules = [{
        name: 'isUser',
        validate: '$data.login != null'
    },{
        name: 'haveWatch',
        validate: '$data.watchers_count > 0'
    }];

Variáveis do contexto:

 - `$data` : Dados retornados pela API
 - `$env` : Informações do ambiente e da requisição:
 - `$env.request` : Informações da requisição atual:
 - `$env.device` : Informações do dispositivos que está navegando na aplicação
 - `$env.device.features` : Funcionalidades ativas do dispositivo

[Mais informações de construção de regras](docs/docs/rules.md)

----
 
## Seleção de Interface

Quando há uma navegação para uma URI, será feita a seleção de interface de acordo com os dados retornados pela URI

    var selection = [
        {
            when: 'isUser',
            abstract: 'user'
        },{
            when: 'isRepository',
            abstract: 'repository'
        }
    ];


[Mais informações sobre seleção de interface](docs/docs/interface-selection.md)


## Interface Abstrata

    var abstracts = [ 
        { name:"user",
            widgets:[ { name:"navigation",
                children:[ { name:"navigation-list",
                    children:[ { name:"navigation-list-item" } ],
                    datasource:"obj" } ] },
                { name:"content",
                    children:[ { name:"user",
                        children:[ { name:"avatar" },
                            { name:"detail",
                                children:[ { name:"name" },
                                    { name:"login" },
                                    { name:"bio" },
                                    { name:"blog" },
                                    { name:"company" },
                                    { name:"location" } ] } ] },
                        { name:"seguidores_panel",
                            children:[ { name:"seguidores_title" },
                                { name:"seguidores",
                                    children:[ { name:"seguidor",
                                        children:[ { name:"avatar_seguidor" } ] } ],
                                    datasource:"url:<%= data.followers_url %>" },
                                { name:"seguidores_mais" } ] },
                        { name:"repositorios_panel",
                            children:[ { name:"repositorios_title" },
                                { name:"repositorios",
                                    children:[ { name:"repositorio",
                                        children:[ { name:"nome" },
                                            { name:"descricao" },
                                            { name:"box",
                                                children:[ { name:"star" },
                                                    { name:"watch" } ] } ] } ],
                                    datasource:"url:<%= data.repos_url %>" } ] } ] },
                { name:"footer",
                    children:[ { name:"footer-content" } ] } ] }
    ];

## Interface Concreta

    var concret = {
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
    ]}];


[Mais informações sobre interface concreta](docs/docs/concrete-interface.md)

## Screenshot do exemplo

![Screenshot do exemplo](img/screenshot.png)