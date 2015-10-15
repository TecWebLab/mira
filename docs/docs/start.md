# Iniciando um Projeto

## Instalando

Baixe o repositório em uma pasta de sua preferência.

### Arquivos

    path/to/mira/
        css/
        fonts/
        imgs/
        js/
           mira/   # modulos do framework
           libs/     # bibliotecas externas utizalidas
           config.js # o que da start na aplicação
           index.js  # módulo que iremos modificar

        index.html   # faz a referencia para a carga da aplicação

É importante que esta pasta `path/to/mira/` possa ser servida e acessível por um servidor de arquivos estáticos como Apache, nginx e etc.

Agora basta ir no navegador e acessar a URL:

    http://your.domain/path/to/mira/

Nesta URL ele irá acessar a aplicação que tem seus modelos definidos no módulo `js\index.js`

Caso queira utilizar outra aplicação, será necessário informar diretamente na URL acessada, como no exemplo:

    http://your.domain/path/to/mira/?app=my_application

Neste caso, a aplicação que será acessada será do módulo `js\my_application.js`

## Servidor

Caso não tenha nenhum destes servidores instalados em seu computador, você pode instalar o **node.js** e rodar o seguinte
comando na pasta onde foi baixado:

    npm install
    
E pode rodar o seguinte comando para rodar sua aplicação:

    node js/mira/server.js
    
Agora basta ir no navegador e acessar a URL:

    http://localhost:3000/

Se nenhuma URI de uma API REST for informada para a aplicação, será exibida a interface `landing` para o usuário.

# Arquivo HTML | index.html

O arquivo **index.html** é o arquivo que inicia o MIRA.

    <!DOCTYPE html>
    <html>
    <head>
        <script data-main="js/config" src="js/libs/require.js"></script>
    </head>
        <body>
            <h1>Carregando...</h1>
        </body>
    </html>

Ele carrega o [require.js](http://requirejs.org) e chama o modulo `js/config.js`.

Este módulo tem as configurações de caminhos para outros módulos e também carrega o modulo da aplicação informada pelo
parâmetro `app`, se nenhum valor for informado, ele carrega o módulo `js/index.js`

# Módulo principal da aplicação | Main

No módulo que será definido os modelos da aplicação, como o `js/index.js`, deverá possuir a chamada para a função principal
para que o MIRA saiba que modelos utilizar para montar sua interface:

    if(typeof define === 'function') {
        // Se o ambiente for em um navegador

        define([
            // Local para se carregar as bibliotecas JavaScript que deseja utilizar,
            // além daquelas que são padrão do MIRA
            "jquery",
            "bootstrap",
            "mira/init"
        ], function Main($, $bootstrap, Mira) {

            return function MyApplication() {
                this.mira = new Mira.Application(interface_abstracts, concrete_interface, rules, selection, conf);
            };

        });
    } else {
        // Utilizado no modo servidor de seleção de interface

        exports.abstracts = interface_abstracts;
        exports.mapping = concrete_interface;
        exports.selection = selection;
        exports.rules = rules;
    }

# Estrutura de Arquivos

## Arquivos

### index.html

O arquivo **index.html** é o arquivo que inicia o MIRA.

### js/index.js

Neste módulo temos uma aplicação de exemplo para se usar como modelo para sua aplicação.

Você pode escrever sua aplicação neste módulo ou criar uma nova aplicação com o nome que desejar na mesma pasta.
A URL para acessar sua aplicação será:

    http://localhost:3000/?app=file_name

### js/config.js
           
Caso queira alterar o path de alguma biblioteca para usar algum CDN ou outra versão, altere este módulo.

## Pastas

Logo a seguir, será explicado o que contém cada pasta

### css/

Nesta pasta temos o `bootstrap.css` e seus arquivos para customizar o css da sua aplicação.

### fonts/

Nesta pasta temos as fontes padrões do bootstrap e você poderá adicionar as suas fontes também.

### imgs/

Nesta pasta temos as imagens estáticas para a sua aplicação.

### js/

Nesta pasta temos toda a estrutura de módulos do framework, dependência de bibliotecas externas e dos modelos da sua aplicação.

### js/mira/

Todos os módulos do framework, evite alterar arquivos nesta pasta.

### js/libs/

Nesta pasta temos todas as bibliotecas que o framework precisa para funcionar, caso queira fazer uso de alguma biblioteca externa, você pode adicionar nesta pasta.

### js/test/

Nesta pasta temos todos os arquivos de testes unitários do framework.
