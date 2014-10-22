# Começando um Projeto

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