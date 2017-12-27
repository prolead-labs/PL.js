# PL.js
Um framework Javascript criado para o desenvolvimento front-end de aplicações SaaS baseadas em API

## Como funciona
O PL.js funciona com uma estrutura modular com carregamentos assíncronos de arquivos Javascript. Baseado em Require.js 

## Primeiros passos
Para iniciar o PL.js, você só precisa inserir o código abaixo no seu arquivo `index`
```html
<script src="pl.js"></script>
<script>
  PLjs.set({
    basePath: 'HTTP ADDRESS TO PL.js PATH',
    appHash: '#!/',
    loadLibs: ['api']
  });
  PLjs.run();
</script>
```

Para entender cada linha acima:

`<script src="pl.js"></script>` Carrega o PL.js

A função `set()` permite personalizar alguns parâmetros do PL.js

`basePath` Caminho http para a pasta onde os arquivos do PL.js estão localizados **obrigatório** 

> *Queremos criar um modo mais inteligente de utilizar o `basePath`, inclusive com caminho relativo ou simplesmente remover a obrigatoriedade quando tudo está na mesma pasta. Sinta-se à vontade para colaborar =)*

`appHash` Hash de identificação na URL para carregar os módulos PL.js. Por padrão é `#!/`

`loadLibs` Autoload de bibliotecas, localizadas na pasta `libraries`. Você pode carregar bibliotecas que utilizará constantemente em seu projeto. Todas as bibliotecas ficarão disponíveis no escopo `window.PLjs.library`;


### appHash
Baseado em um link "cego" no endereço URL, o PL.js identifica o módulo, método e parâmetros para carregar o controller.

`http://site.com/#!/`

*Você pode alterar a hash padrão utilizando `PLjs.set()`*

### Estrutura da URL (Rotas)
O PLjs lê todo o caminho depois da `appHash` e determina qual controller deve ser carregado. A estrutura de um URL fica parecida com o endereço abaixo:
`http://site.com/#!/class/method/params`

#### Classe
No primeiro segmento da URL `class`, está o nome do **controller** que será carregado.
Cada controller é um arquivo `.js` localizado dentro da pasta `/controllers` na raiz do projeto.

#### Método
Dentro do seu controller, deve existir um método com o mesmo nome definido na URL.
Exemplo:
`site.com/products/list`

O PL.js vai carregar o controller `controllers/products.js` e invocará o método `list()`

Se um método não aparece na URL, ou seja, se a URL contém apenas 1 segmento após a `appHash`, o PL.js carregará o controller e invocará o método `index()`.
Exemplo:
`site.com/#!/products`

No exemplo acima o controller `controllers/products.js` será carregado e o método `index()` invocado.

#### Parâmetros
Também é possível passar parâmetros para um método através da URL. O PL.js identifica cada segmento após o método na URL, e passa como parâmetro para o método invocado.

Exemplo:
`http://site.com/product/see/123/off`

O exemplo acima carrega o controller `controllers/product.js`
E executa o método `see(product_id, status);`

Perceba que os valores para os parâmetros `product_id` e `status` são passados na URL na mesma ordem que estão declarados.

### Rotas personalizadas
É possível criar uma rota personalizada no arquivo `config/routes.config.json`

Basta adicionar um índice no arquivo JSON, seguindo a estrutura abaixo:
```json
"list-products": {
  "controller": "products",
  "method": "list"
}
```

Quando acessar a URL `site.com/#!/list-product`, o PL.js carregará `controllers/products.js` e o método `list()`

Também é possível armazenar os `controllers` em subpastas. Basta utilizar `path` para informar qual pasta (ou caminho) o controller está localizado:

```json
"setting-products": {
  "path": "settings",
  "controller": "products"
}
```

No exemplo acima, o endereço URL `site.com/#!/setting-products`, carregará `controllers/settings/products.js` e - como o método não foi declarado - invocará o método `index()`


### Declarando uma classe
Existem várias formas de declarar classes (ou módulos) no PL.js.

Nós gostamos de utilizar a seguinte sintaxe:
```javascript
define(function(){
  return {
    index: function(){
      // something here
    },
    list: function(param1, param2){
      // list your products here
    }
  }
}
```

Repare que `return` é um objeto com os índices `index` e `list`, que armazenam as respectivas funções que serão executadas.

> Você pode ver outras formas de fazer isso na [documentação do Require.js](http://requirejs.org/docs/api.html#define)


## Views
 Utilizamos o *Mustache.js* para compilar e entregar views. Todas as views estão localizadas na pasta `/views` dentro da raiz da instalação.
 
 Para carregar uma view utilize a estrutura abaixo:
 ```javascript
 PLjs.load.view( [CONTAINER], [VIEW FILE], [VARIABLES] );
 ```
 
 `CONTAINER` é o local onde a view será carregada
 
 `FILE` arquivo  *.html* com o template da view
 
 `VARIABLES` Um objeto JSON com variáveis
 
 ##### Exemplo:
 Arquivo **controllers/welcome.js**
 ```javascript
 var varsData = {
    title: "PL.js"
}
PLjs.load.view('view-container', 'welcome_message', varsData);
 ```
 
Arquivo **views/welcome_message.html**
 ```html
...
<body>
  <h1>Welcome to {{title}}!</h1>
</body>
...
```
 
> Obtenha mais informações sobre o uso de variáveis na [documentação do Mustache.js](https://github.com/janl/mustache.js/#variables)


## Estrutura de Pastas e Arquivos
A árvore de pastas do PL.js está organizada da seguinte maneira:
```
/ROOT/
  config/
  controllers/
  core/
  libraries/
  vendor/
  views/
  index.html
  pl.js
```

`config/` Armazena os arquivos `.json` de configuração da aplicação

`controllers/` Controllers da aplicação. Para mais detalhes veja a sessão controllers

`core/` Os arquivos internos para executar o PL.js

`libraries/` Bibliotecas utilizadas na aplicação. Você também pode criar novas bibliotecas nesta pasta e carregá-las utilizando `PLjs.load.library('YOUR_LIB_NAME');`

`vendor/` Você pode armazenar bibliotecas e plugins externos nesta pasta, como jQuery, por exemplo

`views/` Aqui estão os arquivos `.html` com o template das suas views