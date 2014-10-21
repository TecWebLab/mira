# Seleção de Interface

Quando há uma navegação para uma URI, será feita a seleção de interface de acordo com os dados retornados pela URI

    var selection = [
        {
            when: 'rule_name',
            abstract: 'abstract_interface_name'
            concrete: 'concrete_interface_name' # opcional
        },
        
        ...
    
    ];

Cada objeto da seleção de interface é composta por 3 parametros:

## Parametros

### `when`

Regra, da lista de regras do modelo, que será utilizada para validar e seleção.

### `abstract`

Nome da interface abstrata que será utilizado quando a regra for verdadeira.

### `concrete`

*Opcional*

Caso um nome não seja informado, ele utilizará o mesmo nome da interface abstrata.

# Exemplos

Selecionar uma interface abstrata diferente de concreta:

    {
        when: 'isRule',
        abstract: 'abstractRule'
        concrete: 'concreteRule'
    }
    
Selecionar uma interface concreta e abstrata com o mesmo nome:

    {
        when: 'isAnotherRule',
        abstract: 'my_interface'
    }

