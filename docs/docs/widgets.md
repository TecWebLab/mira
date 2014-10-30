# Comuns

## SimpleHtml

### Parâmetros

O parâmetros que não estão listados e forem informados durante o mapeamento, serão
atribuídos como atributos da tag html.

#### tag

*Default: div*

Tipo de elemento html que será criado.

### Exemplo

Mapear um elemento H1 que quando for clicado exibirá uma mensagem de *olá*:

    { name: 'example', type: 'SimpleHtml', tag:'h1', onclick:'alert("olá");' value:'clique me!'}

Será renderizado:

    <h1 id='example' onclick='alert("olá");'>clique me!</h1>

## Head

Feito para carregar a referencia de ícones, estilos css.

Deve ser utilizado apenas no `head` da interface concreta.

### Parâmetros

O parâmetros que não estão listados e forem informados durante o mapeamento, serão
atribuídos como atributos da tag html criada.

#### tag

*Default: link*

Se o valor informado for **style** ou **icon**, não é necessário informar atributos `type` e `rel`

### Exemplo

    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},

Será renderizado dentro do `head` do HTML como:

    <link type="text/css" rel="stylesheet" id="main_css" href="css/bootstrap.css">

## Meta

Deve ser utilizado apenas no `head` da interface concreta.

### Parâmetros

Qualquer parâmetro informado alem dos padrões, sera atribuídos ao meta criado.

### Exemplo

    { name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1' }

Será renderizado dentro do `head` do HTML como:

    <meta name="viewport" content="width=device-width, initial-scale=1">

## Title

Título da página.

Deve ser utilizado apenas no `head` da interface concreta.

### Exemplo

    { name: 'title', widget:'Title', value: '"Your App Title"' }

Será renderizado dentro do `head` do HTML como:

    <title>Your App Title</title>

## ImageHtml

Feito para exibir imagens.

Os parâmetros informados durante o mapeamento, serão atribuídos como atributos da tag `img` gerada.

# BootStrap

Conjunto de widgets que utilizando da estrutura criada pelo framework de CSS, o [Bootstrap](http://getbootstrap.com)

## BoostrapSimple

### Parâmetros

O parâmetros que não estão listados e form informados durante o mapeamento, serão
atribuídos como atributos da tag html.

#### xs

Funcionalidade de Grid do Bootstrap, Para telas extra largas como desktop

#### sm

Para telas pequenas, como smartphone

#### md

Para telas médias, como tablets

#### lg

Para telas largas, como notebooks

#### print

O que será exibido na hora de imprimir o documento em uma impressora ou PDF


## BootstrapIcon

## BootstrapImageBox

## BootstrapFooter

### Lista de Parâmetros:


#### img
#### text
#### bg
#### pull
#### list
#### dl
#### table
#### form
#### btn
#### input
#### sr
#### has
