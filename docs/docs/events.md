# Eventos

Com o MIRA é possível manipular e interagir com os dados carregados dinamicamente na interface em tempo de execução,
por exemplo, quando o usuário entra com dados em algum widget de captura de dados (input).

Se durante o tratamento de algum evento houver modificação nos dados previamente utilizados na avaliação das condições,
ou em informações exibidas na interface, o MIRA reavalia os Widgets Abstratos e Concretos que foram utilizados
para montar a interface, atualizando a tela exibida com as possíveis alterações nas informações e/ou 
Widgets exibidos para o usuário.

Os eventos tratados são registrados como parte do mapeamento de Widgets Concretos.

    {name:'status', value:'Aguardando', events:{click:'marcar_feito'}}, 
    {name:'status', value:'Feito', when:'isDone'}

Registrando um evento:

    conf = {
        events: { 
            marcar_feito: function(options) {
                    options.$dataObj.set('feito', true);
            }
        }
    }

Todas as funções que tratam eventos, recebem um parâmetro chamado `options`, este parâmetro é composto pelos seguintes
 atributos:

* `$env`: Informações sobre o contexto da aplicação, como request, device e dado carregado pelo request da URI.
* `$bind`: Informações sobre o contexto da aplicação, como request, device e dado carregado pelo request da URI.
* `$data`: Dados de leitura do objeto carregado da URI ou do contexto de um datasource de um Widget Abstrato
* `$dataObj`: Objeto para manipular informações dos dados que foram carregados da URI ou do contesto de um datasource de um Widget Abstrato
* `$element`: Elemento HTML do contexto do evento
* `$event`: Informações do evento disparado
* `$map`: Widget Concreto utilizado no mapeamento.
