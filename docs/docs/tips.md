# Dicas

Dicas para uso do MIRA

# Múltiplos Arquivos

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
            this.MIRA = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
        };

    }

Desta forma, a função estará disponível em qualquer contexto da aplicação, como neste exemplo:

    var rules = [{
        name: 'regra_com_com_funcao',
        validate: 'my_function() && my_function_with_args($data)'
    }]


    var concrete = [{
        name: 'exemplo',
        maps: [
            { name:'simples', type:'SimpleHtml', value:'my_function_with_args($data)'}
        ]
    }]



# Eventos

# Alterando Requisição na API



## Instalando o framework

Baixe o repositório em uma pasta de sua preferência. É importante que esta pasta possa ser servida acessível por um 
servidor de arquivos estaticos como Apache, nginx e etc.
 
Caso não tenha nenhum destes servidores instalados, você pode instalar o node.js e rodar o seguinte comando na pasta 
onde foi baixado:

    npm install
    
E pode rodar o seguinte comando para rodar sua aplicação:

    node js/jsynth/server.js 
    
Agora basta ir no navegador e acessar a URL:

    http://localhost/

## Estrutura de Arquivos

    path/to/jsynth/
        css/
        fonts/
        imgs/
        js/
           jsynth/   # arquivos do framework
           libs/     # bibliotecas externas utizalidas
           config.js # o que da start na aplicação
           index.js  # Este arquivo que iremos modificar

### Arquivo index.js

Neste arquivo iremos realizar a configuração dos modelos e regras para executar sua aplicação.

### Arquivo config.js
           
Caso queira alterar o path de alguma biblioteca para usar algum CDN ou outra versão, altere este arquivo.

### Pastas

Logo a seguir, será explicado o que contem cada pasta

#### css/

Nesta pastas temos o `bootstrap.css` e seus arquivos para customizar o css da sua aplicação.

#### fonts/

Nesta pastas temos as fontes padros do bootstrap e você poderá adicionar as suas fontes tambem.

#### imgs/

Nesta pasta temos as imagens estaticas para a sua aplicação.

#### js/

Nesta pasta temos toda a estrutura de arquivos do framework, dependencia de bibliotecas externas e dos modelos da sua aplicação.

#### js/jsynth/

Todos os modulos de javascript do framework, evite alterar arquivos nesta pasta.

#### js/libs/

Nesta pasta temos todas as bibliotecas que o framework precisa para funcionar, caso queira fazer uso de alguma biblioteca externa, você pode adicionar nesta pasta.

#### js/testes/

Nesta pasta temos todos os arquivos de testes unitários do framework.