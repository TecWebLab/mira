# Iniciando um Projeto

## Instalando

Baixe o repositório em uma pasta de sua preferência.

### Arquivos

    path/to/jsynth/
        css/
        fonts/
        imgs/
        js/
           jsynth/   # arquivos do framework
           libs/     # bibliotecas externas utizalidas
           config.js # o que da start na aplicação
           index.js  # Este arquivo que iremos modificar


## Servidor

É importante que esta pasta possa ser servida e acessível por um servidor de arquivos estáticos como Apache, nginx e etc.

Agora basta ir no navegador e acessar a URL:

    http://your.domain/path/to/jsynth/

Nesta URL ele irá acessar a aplicação que tem seus modelos definidos no arquivo `js\index.js`

Caso queira utilizar outra aplicação, será necessário informar diretamente na URL acessada, como no exemplo:

    http://your.domain/path/to/jsynth/?app=my_application

Neste caso, a aplicação que será acessada será do arquivo `js\my_application.js`

Caso não tenha nenhum destes servidores instalados em seu computador, você pode instalar o node.js e rodar o seguinte
comando na pasta onde foi baixado:

    npm install
    
E pode rodar o seguinte comando para rodar sua aplicação:

    node js/jsynth/server.js 
    
Agora basta ir no navegador e acessar a URL:

    http://localhost/

# Estrutura de Arquivos

    path/to/jsynth/
        css/
        fonts/
        imgs/
        js/
           jsynth/   # arquivos do framework
           libs/     # bibliotecas externas utizalidas
           config.js # o que da start na aplicação
           index.js  # Este arquivo que iremos modificar

## Arquivos

### index.js

Neste arquivo temos uma aplicação de exemplo para se usar como modelo para sua aplicação.

Você pode escrever sua aplicação neste arquivo ou criar uma nova aplicação com o nome que desejar na mesma pasta.
A URL para acessar sua aplicação será:

    http://localhost/?app=file_name


### config.js
           
Caso queira alterar o path de alguma biblioteca para usar algum CDN ou outra versão, altere este arquivo.

## Pastas

Logo a seguir, será explicado o que contem cada pasta

### css/

Nesta pastas temos o `bootstrap.css` e seus arquivos para customizar o css da sua aplicação.

### fonts/

Nesta pastas temos as fontes padros do bootstrap e você poderá adicionar as suas fontes tambem.

### imgs/

Nesta pasta temos as imagens estaticas para a sua aplicação.

### js/

Nesta pasta temos toda a estrutura de arquivos do framework, dependencia de bibliotecas externas e dos modelos da sua aplicação.

### js/jsynth/

Todos os modulos de javascript do framework, evite alterar arquivos nesta pasta.

### js/libs/

Nesta pasta temos todas as bibliotecas que o framework precisa para funcionar, caso queira fazer uso de alguma biblioteca externa, você pode adicionar nesta pasta.

### js/test/

Nesta pasta temos todos os arquivos de testes unitários do framework.