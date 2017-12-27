
// default application
// responsável por ler a URL que o cara acessou e
// importar o módulo correto
define(function(){
   'use strict';


	var app = {

		init: function(){
			// ouve o evento de alteração da HASH na URL
			window.onhashchange = function() {				
				PLjs.load.module();
			}

			// quando o cara abrir uma URL com a tag já do rolê
			document.onready = function() {
				PLjs.load.module();
			};
			PLjs.load.module();


			// PL-CLICK
			// 	Listener que escuta o clique no elemento com o atributo "pl-click"
			//	o valor desse atributo é o nome da função que vai ser executada
			//	essa função deve estar lá dentro do controller atual
            /*
            $(document).on('click', '[pl-click]', function(e){
                var toRun = $(this).attr('pl-click');

                require([ PLjs.currentModule.controller ], function( elMod ){

                	if( typeof elMod[toRun] == 'function')
                		elMod[ toRun ]();

                	else
                		console.error("The function " + toRun + " trigged on pl-click don't exists at module " + PLjs.currentModule);
                });


            });
            */



		} // end init();


	}; // var app


	return app;

});