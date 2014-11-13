# Variáveis de Contexto

O MIRA disponibiliza algumas variáveis que podem ser usadas durante a validação de regras e atribuir valores a atributos
de [Widgets Abstratos](abstract-interface.md#widgets-abstratos) e [Widgets Concretos](widgets.md).

## `$data`

Nesta variável se encontra as informações retornadas pela requisição feita a URI da API REST que foi informada por parâmetro
na URL navegada.

Se em um [Widget Abstrato](abstract-interface.md#widgets-abstratos) existir o atributo `datasource`, o `$data` para os filhos deste Widget será cada
item do datasource.

Se dentro de um Widget filho de um Widget com `datasource` precisar de uma informação do dado retornado pela URI, utilize o [$env.$data](context.md#envdata)

### `$data.$parent`

Se o contexto atual for de um item de um `datasource`, está variável contem os itens do pai do item do datasource.

Caso contrário, esta variável não será definida.

## `$env`

Contem todas as informações além das informações retornadas pela API, como informações da requisição, do dispositivo, das
funcionalidades do dispositivo.

    { request: Object, device: Object, $data: null }

## `$env.request`

Informações que variam de acordo com o requisição feita ao MIRA.

Exemplo para navegação para esta URI: *http://mestrado.amazingworks.com.br/?app=github#?URI=https://api.github.com/users/ebertti*

    hash: "#?URI=https://api.github.com/users/ebertti"
    host: "mestrado.amazingworks.com.br"
    hostname: "mestrado.amazingworks.com.br"
    href: "http://mestrado.amazingworks.com.br/?app=github#?URI=https://api.github.com/users/ebertti"
    origin: "http://mestrado.amazingworks.com.br"
    params: { URI : "https://api.github.com/users/ebertti" }
    pathname: "/"
    port: ""
    protocol: "http:"
    search: "?app=github"
    uri:
        file: "ebertti"
        hash: ""
        host: "api.github.com"
        params: Object
        path: "/users/ebertti"
        port: ""
        protocol: "https"
        query: ""
        relative: "/users/ebertti"
        source: "https://api.github.com/users/ebertti"


### `$env.request.href`

Uma String contendo toda a URL.

### `$env.request.protocol`

Uma String contendo o protocolo da URL, incluindo ':' no final.

### `$env.request.host`

Uma String contendo o host, é o hostname, com ':', e a porta informada na URL.

### `$env.request.hostname`

Uma String contendo o domínio da URL.

### `$env.request.port`

Uma String contendo o número da porta da URL.

### `$env.request.pathname`

Uma String iniciada a partir do primeiro '/' até o final ou até '?' ou '#'.

### `$env.request.search`

Uma String iniciada por '?' seguido pelos parâmetros da URL.

### `$env.request.hash`

Uma String contendo a '#' seguido pela informação de ancora da página.

### `$env.request.origin`

Uma String contendo a URL navegada.

### `$env.request.uri`

Um Object contento a mesma estrutura de informações do `$env.request`, mas para a URI informada como parâmetro.

Se for uma navegação para a interface landing, esta propriedade não contem informações.

### `$env.request.params`

Um Object contendo informações decompostas do que é informado na variável $env.request.hash

Exemplo para *http://localhost/#var1=exemplo&var3=example*

        {
            var1 : 'exemplo'
            var3 : 'example'
        }

## `$env.device`

Contem informações para descobrir qual é o tipo de dispositivo que está acessando a aplicação.

Estas informações também são adicionadas no DOM da página na tag HTML, assim, o designer pode utilizar estas informações
para compor seu CSS.

Exemplo acessando de um desktop com sistema operacional Windows.

    $env.device.android: false
    $env.device.androidPhone: false
    $env.device.androidTablet: false
    $env.device.blackberry: false
    $env.device.blackberryPhone: false
    $env.device.blackberryTablet: false
    $env.device.cordova: undefined
    $env.device.desktop: true
    $env.device.fxos: false
    $env.device.fxosPhone: false
    $env.device.fxosTablet: false
    $env.device.ios: false
    $env.device.ipad: false
    $env.device.iphone: false
    $env.device.ipod: false
    $env.device.landscape: true
    $env.device.meego: false
    $env.device.mobile: false
    $env.device.nodeWebkit: false
    $env.device.portrait: false
    $env.device.tablet: false
    $env.device.windows: true
    $env.device.windowsPhone: false
    $env.device.windowsTablet: false

Veja como fica a tag do HTML:

    <html class="desktop landscape ...">
        ...
    </html>

Veja mais informações sobre na documentação do [Device.js](http://matthewhudson.me/projects/device.js/)


## `$env.device.features`

Contem informações sobre as funcionalidades que o dispositivo que está acessando a aplicação disponibiliza para o seu
usuário.

Estas informações também são adicionadas no DOM da página na tag HTML, assim, o designer pode utilizar estas informações
para compor seu CSS.

    $env.device.feature.adownload: true
    $env.device.feature.apng: false
    $env.device.feature.applicationcache: true
    $env.device.feature.audio: Booleanaudiodata: true
    $env.device.feature.backgroundsize: true
    $env.device.feature.battery: false
    $env.device.feature.bgpositionshorthand: true
    $env.device.feature.bgpositionxy: true
    $env.device.feature.bgrepeatround: false
    $env.device.feature.bgrepeatspace: false
    $env.device.feature.bgsizecover: true
    $env.device.feature.blobconstructor: true
    $env.device.feature.blobworkers: true
    $env.device.feature.borderimage: true
    $env.device.feature.borderradius: true
    $env.device.feature.boxshadow: true
    $env.device.feature.boxsizing: true
    $env.device.feature.canvas: true
    $env.device.feature.canvastext: true
    $env.device.feature.classlist: true
    $env.device.feature.contenteditable: true
    $env.device.feature.contentsecuritypolicy: false
    $env.device.feature.contextmenu: false
    $env.device.feature.cookies: true
    $env.device.feature.cors: true
    $env.device.feature.createelement-attrs: false
    $env.device.feature.cssanimations: true
    $env.device.feature.csscalc: true
    $env.device.feature.csscolumns: true
    $env.device.feature.cssfilters: true
    $env.device.feature.cssgradients: true
    $env.device.feature.csshyphens: false
    $env.device.feature.cssmask: true
    $env.device.feature.csspositionsticky: false
    $env.device.feature.cssreflections: true
    $env.device.feature.cssremunit: true
    $env.device.feature.cssresize: true
    $env.device.feature.cssscrollbar: true
    $env.device.feature.csstransforms: true
    $env.device.feature.csstransforms3d: true
    $env.device.feature.csstransitions: true
    $env.device.feature.cssvhunit: true
    $env.device.feature.cssvmaxunit: false
    $env.device.feature.cssvminunit: true
    $env.device.feature.cssvwunit: false
    $env.device.feature.cubicbezierrange: true
    $env.device.feature.customprotocolhandler: true
    $env.device.feature.datalistelem: true
    $env.device.feature.dataset: true
    $env.device.feature.datauri: true
    $env.device.feature.dataview: true
    $env.device.feature.dataworkers: false
    $env.device.feature.details: true
    $env.device.feature.devicemotion: true
    $env.device.feature.deviceorientation: true
    $env.device.feature.display-runin: false
    $env.device.feature.display-table: true
    $env.device.feature.draganddrop: true
    $env.device.feature.emoji: false
    $env.device.feature.eventsource: true
    $env.device.feature.exif-orientation: false
    $env.device.feature.fileinput: true
    $env.device.feature.filereader: true
    $env.device.feature.filesystem: true
    $env.device.feature.flexbox: true
    $env.device.feature.fontface: true
    $env.device.feature.formattribute: true
    $env.device.feature.formvalidation: true
    $env.device.feature.formvalidationapi: false
    $env.device.feature.formvalidationmessage: false
    $env.device.feature.framed: false
    $env.device.feature.fullscreen: true
    $env.device.feature.gamepads: true
    $env.device.feature.generatedcontent: true
    $env.device.feature.geolocation: true
    $env.device.feature.getusermedia: true
    $env.device.feature.history: true
    $env.device.feature.hsla: true
    $env.device.feature.ie8compat: false
    $env.device.feature.indexeddb: true
    $env.device.feature.inlinesvg: true
    $env.device.feature.input: Object
    $env.device.feature.inputtypes: Object
    $env.device.feature.json: true
    $env.device.feature.lastchild: true
    $env.device.feature.localstorage: true
    $env.device.feature.lowbandwidth: false
    $env.device.feature.lowbattery: false
    $env.device.feature.mathml: false
    $env.device.feature.mediaqueries: true
    $env.device.feature.meter: true
    $env.device.feature.microdata: false
    $env.device.feature.multiplebgs: true
    $env.device.feature.notification: true
    $env.device.feature.object-fit: true
    $env.device.feature.olreversed: true
    $env.device.feature.opacity: true
    $env.device.feature.outputelem: true
    $env.device.feature.overflowscrolling: false
    $env.device.feature.performance: true
    $env.device.feature.placeholder: true
    $env.device.feature.pointerevents: true
    $env.device.feature.pointerlock: false
    $env.device.feature.postmessage: true
    $env.device.feature.progressbar: true
    $env.device.feature.quotamanagement: true
    $env.device.feature.raf: true
    $env.device.feature.regions: false
    $env.device.feature.rgba: true
    $env.device.feature.ruby: true
    $env.device.feature.sandbox: true
    $env.device.feature.scriptasync: true
    $env.device.feature.scriptdefer: true
    $env.device.feature.seamless: false
    $env.device.feature.sessionstorage: true
    $env.device.feature.shapes: true
    $env.device.feature.sharedworkers: true
    $env.device.feature.smil: true
    $env.device.feature.softhyphens: true
    $env.device.feature.softhyphensfind: true
    $env.device.feature.speechinput: false
    $env.device.feature.srcdoc: true
    $env.device.feature.strictmode: true
    $env.device.feature.stylescoped: false
    $env.device.feature.subpixelfont: false
    $env.device.feature.supports: false
    $env.device.feature.svg: true
    $env.device.feature.svgclippaths: true
    $env.device.feature.svgfilters: true
    $env.device.feature.textshadow: true
    $env.device.feature.texttrackapi: true
    $env.device.feature.time: false
    $env.device.feature.todataurljpeg: true
    $env.device.feature.todataurlwebp: true
    $env.device.feature.touch: true
    $env.device.feature.track: true
    $env.device.feature.unicode: true
    $env.device.feature.userdata: false
    $env.device.feature.userselect: false
    $env.device.feature.vibrate: true
    $env.device.feature.video: Booleanweb
    $env.device.feature.audio: true
    $env.device.feature.webgl: Boolean
    $env.device.feature.webintents: false
    $env.device.feature.webp: true
    $env.device.feature.websockets: true
    $env.device.feature.websqldatabase: true
    $env.device.feature.webworkers: true
    $env.device.feature.xhr2: true

Veja como fica a tag do HTML:

    <html class="... js flexbox canvas canvastext webgl touch geolocation postmessage websqldatabase indexeddb hashchange
                 history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow
                 opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface
                 generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths
                 adownload webaudio audiodata no-battery no-lowbattery contenteditable no-contentsecuritypolicy no-contextmenu cookies
                 blobconstructor cors bgpositionshorthand bgpositionxy no-bgrepeatround no-bgrepeatspace csscalc cubicbezierrange
                 no-display-runin boxsizing display-table cssfilters no-csshyphens softhyphens softhyphensfind lastchild mediaqueries
                 object-fit cssmask no-overflowscrolling pointerevents no-csspositionsticky cssremunit cssresize cssscrollbar
                 no-regions no-subpixelfont shapes no-supports no-userselect no-cssvmaxunit cssvminunit bgsizecover no-cssvwunit
                 cssvhunit customprotocolhandler dataview classlist dataset datalistelem details no-createelement-attrs
                 no-microdata outputelem progressbar meter no-time ruby strictmode devicemotion deviceorientation filereader
                 no-emoji fileinput filesystem formattribute formvalidation fullscreen no-speechinput gamepads no-ie8compat
                 getusermedia no-seamless sandbox placeholder srcdoc no-mathml olreversed texttrackapi track no-lowbandwidth
                 eventsource json xhr2 notification no-pointerlock quotamanagement scriptasync performance raf scriptdefer
                 svgfilters no-stylescoped unicode vibrate no-webintents no-userdata no-framed sharedworkers no-dataworkers
                 todataurljpeg todataurlwebp no-exif-orientation no-apng webp datauri blobworkers">
        ...
    </html>

Veja mais informações sobre na documentação do [Modernizr](http://modernizr.com/docs/)

## $env.$data

São os valores retornados durante a requisição da URI, não é alterado durante o contexto.
