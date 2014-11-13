Em muitas ocasiões, o projetista precisa de um Widget que não existe dentro da nossa biblioteca de [Widget Concretos](widgets.md).

Nesta sessão será apresentado como o designer deverá criar e como registrar este novo widget para que possa ser usado pela interface da aplicação.

# Criando

Será criada uma `function` que receberá os seguintes parâmetros, e estes não podem ter seus nome modificados: `$parent`, `name`, `$data`, `$env`, `options`

    function($parent, name, $data, $env, options){
        var element = document.createElement('h1');
        element.innerHTML = 'Mira';
        element.id = name;
        var $element = $(element);
        $parent.append(element);
        return {
            $children: $element,
            html: element.innerHTML
        }
    }

## Parâmetros

### `$parent`

É o objeto **JQuery** do elemento pai da estrutura do html.

    <div id="parent">
        <div id="atual"></div>
    </div>

### `name`

Nome que deverá ser adicionado como id do elemento html.

    <div id="nome_do_mapeamento"></div>

### `$data`

Dado do contexto atual que está sendo renderizado o widget.

Veja mais informações em [Variáveis de Contexto](context.md#data)

### `$env`

Informações do ambiente que está sendo executada a interface.

Veja mais informações em [Variáveis de Contexto](context.md#env)

### `options`

Todos os atributos do mapeamento na estrutura de interface concreta

    { name: "widget": widget:"SimpleHtml", tag:"h1", value:"Mira" }

### `return`

Deverá ser retornado um `object` com os atributos `$children` e `html`, onde `$children` será o objeto JQuery que será utilizado para renderizar
os elementos filhos na estrutura dos widgets abstratos. Este `$children` será o `$parent` dos filhos da estrutura.

# Registrando

Após o start da aplicação no modulo que foi informado na url como `app`, será feito o registro dos seus widgets customizados

    return function Index() {
        var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
        Mira.Widget.register({
            CustomWidget: function($parent, name, $data, $env, options){
                var element = document.createElement('h1');
                element.innerHTML = 'Mira';
                element.id = name;
                var $element = $(element);
                $parent.append(element);
                return {
                    $children: $element,
                    html: element.innerHTML
                }
            }
        })
    };

# Helper

O MIRA disponibiliza algumas funções para ajudar na construção de widgets customizados,

## Funções

### Mira.Helper.build_context

Recebe os valores de `$data`, `$env`, `options` e gera um objeto de context para ser utilizado pelas outras funções do helper

### Mira.Helper.build_value

Recebe uma `string` com o `context` e caso sejam informações de contexto, ele fará um build do valor, ou apenas retornara a string.

### Mira.Helper.build_object_with_context

Recebe um `object` e o `context` e faz a chamada de todos os seus valores com a função `build_value`

### Mira.Helper.build_attributes

Recebe um `element` e adiciona todos os atributos do `object` e com o value como da função `build_object_with_context`



