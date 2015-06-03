# Default

Caso não seja informado o atributo `widget` durante o mapeamento, será assumido o widget padrão do MIRA, o **SimpleHtml**

Caso deseje alterar o widget padrão, você pode fazer isto após o start da aplicação, como neste exemplo que altera para o **BootstrapSimple**:

    return function Index() {
        var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
        Mira.Widget.setDefault("BootstrapSimple");
    };

# Atributos Básicos

## name

Nome do widget, este nome será utilizado para fazer referência a qual Widget Abstrato deverá ser mapeado por este Widget Concreto.

## when

*Opcional*

Condição que deverá ser verdadeira para que este Widget Concreto mapeie o Widget Abstrato.

Caso queira usar duas condições, você pode colocar uma seguida da outra separada por `,`, neste caso, todas as condições infomadas deverão retornar `true`
para que esta seleção seja a escolhida.

    { name: 'ambiente_seguro_mobile', when: 'isSecure,isMobile'}

Você pode utilizar uma condição geral ou escrever uma expressão que deverá ser avaliada.

    { name: 'preco' when:'$data.preco != null'}

De preferência a escrever as condições na estrutura de condições do framework, assim será mais fácil de reaproveitar e dar manutenção as condições.

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

Feito para carregar a referência de ícones, estilos css.

Deve ser utilizado apenas no `head` da interface concreta.

### Parâmetros

Os parâmetros que não estão listados e forem informados durante o mapeamento, serão
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

Qualquer parâmetro informado além dos padrões, serão atribuídos a meta criado.

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

#### sm

Funcionalidade de grid do Bootstrap, para telas pequenas, como smartphone

#### md

Funcionalidade de grid do Bootstrap, para telas médias, como tablets

#### lg

Funcionalidade de grid do Bootstrap, para telas largas, como notebooks

#### xs

Funcionalidade de grid do Bootstrap, para telas extra largas como desktop

#### print

O que será exibido na hora de imprimir o documento em uma impressora ou PDF

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

## Outros widgets com base no Bootstrap

* BootstrapSimple
* BootstrapFormControl
* BootstrapModalDialog
* BootstrapModalHeader
* BootstrapModalBody
* BootstrapModalFooter
* BootstrapPanelBody
* BootstrapCarousel
* BootstrapCarouselItem
* BootstrapIcon
* BootstrapImageBox
* BootstrapFooter
* BootstrapNavigation
* BootstrapNavigationList
* BootstrapNavigationListItem
* BootstrapFormGroupButton

## Outros widget

* MapStatic
* MapDynamic
* Input
* Head
* Meta
* Title
* ImageHtml
* AudioPlayer
* ProfileContainer
* ProfileImage
* ProfileDetail
* ProfileCount
* TecWebRodape

