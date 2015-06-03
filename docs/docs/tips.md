# Dicas

Dicas para uso do MIRA

# Modelos distribuído em módulos

Na declaração da função principal, poderá ser feito a requisição dos módulos para o MIRA, assim, o projetista poderá
separar os modelos em vários módulos.

Estrutura de arquivos

    path/to/mira/
        index.html

        css/
        imgs/
        fonts/
        js/
            index.js # your application
            abstract.js
            concrete.js
            rules.js
            selection.js

            mira/
            libs/

Exemplo do módulo da aplicação:

    if(typeof define === 'function') {

        define([
            "jquery",
            "bootstrap",
            'mira/init',
            'rules',
            'selection',
            'abstract',
            'concrete'
        ], function Main($, $bootstrap, Mira, rules, selection, abstract, concrete) {

            return function MyApplication() {
                this.mira = new Mira.Application(abstract, concrete, rules, selection, conf);
            };

        });
    }

Exemplo modelos separados em módulos

### condition.js

    define([], function () {
        return [
            {
                name: 'hasName',
                validate: '$data.name != null'
            },{
                 name: 'hasLogin',
                 validate: '$data.login != null'
            }
        ];
    });

### rules.js

    define([], function () {
        return [
            {
                when: 'hasName'
                abstract: 'abstract_name',
                concrete: 'concrete_name'
            }
        ];
    });

### abstract.js

    define([], function () {
        return [{
            name: 'abstract_name',
            widgets: [
                'widget1',
                'widget2',
                'widget3'
            ]
        }]
    });

### concrete.js

    define([], function () {
        return [{
            name: 'concrete_name',
            head: [
                { name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
                { name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
                { name: 'title', widget:'Title', value: '"YourApp"'}
            ]
            maps: [
                { name: 'widget1', widget: 'SimpleHtml', tag:'h1', class:'well', value:'$data.name' },
                { name: 'widget2', widget: 'SimpleHtml', tag:'p', class:'well', value:'sem login' },
                { name: 'widget3', widget: 'SimpleHtml', tag:'p', class:'well', value:'inativo' },

                { name: 'widget1', widget: 'SimpleHtml', tag:'h1', class:'well', value:'$data.login', when: 'hasLogin' },
                { name: 'widget2', widget: 'SimpleHtml', tag:'p', class:'well', value:'$data.join', when: 'hasLogin' },
                { name: 'widget3', widget: 'SimpleHtml', tag:'p', class:'well', value:'$data.active', when: 'hasLogin' },
            ]
        }]
    });

# Criando Funções

As declarações de funções devem ser feitas dentro da função [Main](start.md#funcao-principal-main) que da início a aplicação.

    function Main($, $bootstrap, Mira) {

        this.my_function1 = function(){
            console.log('sou uma função que pode ser chamada em qualquer contexto da aplicação');
            return true;
        }

        this.my_function_with_args = function($data){
            return $data != null;
        }

        return function MyApplication() {
            this.mira = new Mira.Application(interface_abstracts, concrete_interface, rules, selection, conf);
        };

    }

Desta forma, a função estará disponível em qualquer contexto da aplicação, como neste exemplo:

    var rules = [{
        name: 'condicao_com_com_funcao',
        validate: 'my_function() && my_function_with_args($data)'
    }]


    var concrete = [{
        name: 'exemplo',
        maps: [
            { name:'simples', type:'SimpleHtml', value:'my_function_with_args($data)'}
        ]
    }]
