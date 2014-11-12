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

Informe a regra que deve ser avaliada para que seja selecionada a interface abstrata e concreta.

Caso queira usar duas regras, você pode colocar uma seguida da outra separada por `,`, neste caso, todas as regras infomadas deverão retornar `true`
para que esta seleção seja a escolhida.

    { name: 'ambiente_seguro_mobile', when: 'isSecure,isMobile'}

Você pode utilizar uma regra geral ou escrever uma expressão que deverá ser avaliada.

    { name: 'preco' when:'$data.preco != null'}

De preferência a escrever as regras na estrutura de regras do framework, assim será mais fácil de reaproveitar e dar manutenção as regras.

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

