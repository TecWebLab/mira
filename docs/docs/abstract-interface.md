# Interface Abstrata

É o esqueleto da interface, onde definimos a ordem, origem dos dados e hierarquia dos elementos para que venham a ser
mapeados pela [Interface Concreta](concrete-interface.md).

    var abstracts = [ 
        { 
            name: "interface_name",
            widgets: [
                ...
            ]
        },
        
        ...
    
    ];
    
Cada interface abstrata é composta por 2 parâmetros:

## Parâmetros

### name

Nome da interface abstrata, este nome será utilizado pela* (ou PELO ou só NO) no parâmetro `abstract` de elementos da 
[Seleção de Interface](interface-selection.md).

### widgets

Uma lista de widgets abstratos que compõem a interface.

# Widget Abstrato

O widget abstrato compõem a estrutura de interface abstrata

    {
        name: 'widget_name',
        when: ''
        datasource: 'url_or_property',
        parser: '',
        cache: true
        expires: 3600000
        children: [ ]
    }

Um widget abstrato é composto pelos parâmetros:

## Parâmetros

### name

Nome do widget abstrato, este nome será utilizado no mapeamento de widgets concretos na interface concreta.

### when

*Opcional*

Informar a regra que deve ser avaliada para que este widget seja exibido na interface.

Caso queira usar duas regras, você pode colocar uma seguida da outra separada por `,`

    { name: 'ambiente_seguro_mobile', when: 'isSecure,isMobile'}

Você pode utilizar uma regra geral ou escrever uma expressão que deverá ser avaliada.

    { name: 'preco' when:'$data.preco != null'}

De preferência a escrever as regras na estrutura de regras do framework, assim será mais fácil de reaproveitar e dar manutenções as regras.

[Mais informações sobre regras](rules.md)

### datasource

*Opcional*

Se você desejar que alguma informação seja baixada em uma API, você pode informar a URL e os dados serão baixados:

    datasource:"url:http://api.domain.com.br/exemplo/"

Pode ser feita referência a uma coleção que foi retornada da URI que foi navegada:

    datasource:"$data.alguma_colecao"

Ou uma URL que foi retornada pela API:

    datasource:"url:<%= $data.alguma_uri %>"

Quando esta propriedade é setada, a propriedade `children` deve obrigatoriamente conter um elemento children composto pelos
widgets que serão repetidos para cada item que será retornado pelo `datasource`:

    {
        name: 'exemplo',
        datasource: 'url:<%= $data.elementos_url %>',
        children: [
            { 
                name: 'repetidor',
                children: [
                    { name: 'prop1' },
                    { name: 'prop2' },
                    ...
                    { name: 'propN' }
                ]
            }
        ]
    }

### parser

*Opcional*

Se a informação que for retornada do `datasource` precisa ser tratada para ser manipulada pelo MIRA, você pode informar
uma função ou informar qual a propriedade deve ser utilizada, Exemplo:

**Dado retornado**

    { "time": 10, "etag": 'FEDCBA0987654321', items: [ 
        {"name": "Ezequiel"},
        {"name": "Daniel"},
        {"name": "Laufer"},
        {"name": "Puc-Rio"},
    ]}

**parser**

    { name: 'exemplo', datasource: 'url:$data.elementos_url', parser:'$data.items' ... }
    
Apenas os dados da propriedade `items` do dado retornado pelo `datasource` serão utilizados pelos filhos do widget abstrato.

**Resultado**

    [
        {"name": "Ezequiel"},
        {"name": "Daniel"},
        {"name": "Laufer"},
        {"name": "Puc-Rio"}
    ]
    
### children

*Opcional*

Uma lista de widgets que são filhos do widget abstrato atual.

Esta propriedade é obrigatória se widget abstrato também possuir algum valor atribuído na propriedade `datasource`.

## Reduzido

Para facilitar a escrita dos widgets abstratos, foi criada uma forma reduzida para se escrever a estrutura.

### Widget Abstrato apenas com o `name`

Se dentro de children de um widget você só precisa de um widget, mas não precisa informar nenhum outro parâmetro,
você pode fazer referência a ele colocando somente uma `string`:
 
    {
        name:'composto',
        children: ['filho1', 'filho2', 'filho3']
    }
    
Isto equivale há:

    {
        name:'composto',
        children: [
            { name: 'filho1' },
            { name: 'filho2' },
            { name: 'filho3' }
        ]
    }
    
### Widget Abstrato com `name` e `children`

Se precisar representar um widget com filhos, você pode adotar a forma reduzida feita com um `object` de javascript,
onde a `key` é o nome do widget, e o seu `value` será composta pelos filhos, podendo ser uma lista ou somente um elemento,  

    {
        name:'composto',
        children: [
            { 'filho' : { 'filho-filho': 'filho-filho-filho' } }
        ]
    }

Isto equivale há:

    {
        name:'composto',
        children: [
            { 
                name: 'filho',
                children: [
                    {
                        name: 'filho-filho',
                        children: [
                            {
                                name: 'filho-filho-filho'                            
                            }
                        ]
                    }
                ]
            }
        ]
    }

# Exemplos

Uma interface com um campo de busca e um botão para realizar a busca:

    {
        name:'search',
        widgets : [
            {'header': ['logo', {'search_form':{'search_group' : ['search_field', 'search_button']}}]},
            {'footer': ['footer-content']}
        ]
    }

Uma interface com resultado de uma busca:

    {
        name: 'results',
        widgets : [
            {'results_box': [
                { name: "results", datasource: "$data.result",
                children: [
                    {name: 'result_panel', when:'hasName', children: {'result_item': {'result_link':
                        ['result_icon', 'result_title', 'result_details']
                     }}
                }]}
            ]},
            {'footer': ['footer-content']}
        ]
    }
