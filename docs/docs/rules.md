# Regras

O projetista tem a possibilidade de centralizar as regras que serão utilizadas posteriormente pela aplicação.

    var rules = [{
        name: 'rule_name',
        validate: 'expression_to_evaluate'
        },
    
        ...
    
    ];

 
Cada objeto da regra é composta por 2 parametros:

## Parametros

### name

Nome da regra, este nome será utilizado pela no parametro `when` de elementos da 
[Seleção de Interface](interface-selection.md), 
[Interface Abstrata](concrete-interface.md) e
[Interface Concreta](abstract-interface.md).

### validate

Expressão a ser validada. Esta expressão pode utilizar os seguintes variáveis de contexto do framework.

Veja mais informações em [Variáveis de Contexto](context.md)

# Exemplos

Validar se o dado retornado da URI possui o parametro `name`:

    {
        name: 'hasName',
        validate: '$data.name != ""'
    }   

Validar se o dispositivo que está acessando a aplicação é um desktop ou tablet:

    {
        name: 'isDesktopOrTablet',
        validate: '$env.device.desktop || $env.device.tablet'
    }

Validar se estamos em um ambiente `https`:

    {
        name: 'isSecure',
        validate: '$env.request.protocol == "https:"'
    }
    
Validar se um objecto possui apenas uma propriedade:

    {
        name: 'isProperty',
        validate: '_.keys($data.property).length == 1'
    }