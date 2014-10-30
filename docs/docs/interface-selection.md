# Seleção de Interface

Quando há navegação para uma URI, será feita a seleção de interface de acordo com os dados retornados pela URI, se nenhuma
URI for informada na URL, será selecionado a interface abstrata e concreta com o nome `landing`. Se nenhuma regra for atendida,
será selecionada a interface abstrata e concreta com o nome `not_found`, por isto, é obrigatório definir estas duas interfaces
em sua aplicação.

    var selection = [
        {
            when: 'rule_name',
            abstract: 'abstract_interface_name'
            concrete: 'concrete_interface_name' # opcional
        },
        
        ...
    
    ];

Cada objeto da seleção de interface é composta por 3 parâmetros:

## Parâmetros

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

