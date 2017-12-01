
// default application
// responsável por ler a URL que o cara acessou e
// importar o módulo correto
define(function(){
   'use strict';


	var app = {

		init: function(){
			// ouve o evento de alteração da HASH na URL
			$(window).on('hashchange',  function() {
				PLjs.load.module();
			});

			// quando o cara abrir uma URL com a tag já do rolê
			$(document).ready(function() {
				PLjs.load.module();
			});


			// PL-CLICK
			// 	Listener que escuta o clique no elemento com o atributo "pl-click"
			//	o valor desse atributo é o nome da função que vai ser executada
			//	essa função deve estar lá dentro do controller atual
            $(document).on('click', '[pl-click]', function(e){
                var toRun = $(this).attr('pl-click');

                var requireThat = 'app.' + PLjs.currentModule + '.' + toRun;

                require([ PLjs.currentModule ], function( elMod ){

                	if( typeof elMod[toRun] == 'function')
                		eval(elMod[toRun])();

                	else
                		console.error("The function " + toRun + " trigged on pl-click don't exists at module " + PLjs.currentModule);
                });


            });



		}, // end init();



		// aqui é onde eu trabalho as variáveis do template
		// são as tags
		// <pl val="variable" />
		vars:{
			set: function(variable, value){
				$(document).find("pl[val="+variable+"]").html(value);
			}
		}

	}; // var app


	return app;

});