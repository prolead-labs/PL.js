(function(){
	"use strict";

	window.PLjs = {

	
		basePath: '',
		appHash: '#!/',

		// libraries autoload
		loadLibs: [],


		// container to provide libraries
		library: {},


		// módulo atual que está sendo acessado nesse momento
		currentModule: '',

		// tag HTML do loading com a imagem .gif
		loadingTag: '<center style="margin-top:100px"><img src="http://cdn-builder.prolead.co/images/publishLoader.gif" /><br>Loading...</center>',


		// set configs
		set: function( options ){

			PLjs.basePath = options.basePath || PLjs.basePath;
			PLjs.appHash = options.appHash || PLjs.appHash;
			PLjs.debug = options.debug || PLjs.debug;
			PLjs.loadLibs = options.loadLibs || PLjs.loadLibs;

		},



		run: function(callback){

			if( PLjs.checkConfigs() === false ) return;

			// start app			
			var docHead = document.getElementsByTagName('head').item(0);
			var RequireJS = document.createElement('script');

		    RequireJS.onload = function() {
		    	// doSomething ...
		    	console.log('requireJS is loaded');
		    	if( typeof(callback) === 'function' ) callback(); // Run callback after RequireJS is loaded
		    };

		    RequireJS.type = 'text/javascript';
		    RequireJS.src  = PLjs.basePath + '/vendor/require.js';
		    RequireJS.setAttribute('data-main', PLjs.basePath + '/core/common.js');

		    docHead.appendChild( RequireJS );

		},


		/**
		* LOAD
		*	Objeto que faz load de controllers, modules, libraries, helpers, etc
		*/
		load: {

			/**
			* load.module
			*	carrega um módulo JS
			*/
			module: function(){

				var hash = window.location.hash;

				// Verifico se é a nossa HASH padrão
				if( hash.search( PLjs.appHash ) != -1 ){
					
					// coloco o ajax loading
					var plTags = document.getElementsByTagName('pl');

					// Coloco o loading dentro do container do app
					var appWrapper = document.querySelector('[pl-app]');
					appWrapper.innerHTML = PLjs.loadingTag;

					// limpo o endereço da URL e deixo só o módulo que vai ser carregado
					var moduleToLoad = hash.replace( PLjs.appHash , '');

					require(["../core/router"], function(router){

						router.init(function( currentModule ){
							loadModule( currentModule );
						});

					});

					
					function loadModule( moduleToLoad ){

						// Verifico se o módulo já está carregado
						if( require.defined( moduleToLoad.controller ) ){

							// se já está definifo, eu só vou reiniciar o módulo

							// primeiro pego a lista dos módulos que já estão carregados
							var loadedModules = require.s.contexts._.defined;

							// e então reinicio o modulo
							// GRAÇAS A ISSO, TODOS OS MÓDULOS DEVEM TER A FUNÇÃO init()
							loadedModules[ moduleToLoad.controller ][moduleToLoad.method].apply( null, moduleToLoad.params );


						}

						else{
							// se não estiver definido,
							// faço o require desse cara :D
							require( [moduleToLoad.controller], function(_mod){
								
								if( typeof(_mod) === "undefined" ){
									PLjs.load.e_404();
									return;
								}

								_mod[moduleToLoad.method].apply(null, moduleToLoad.params);
							});
						}

						// volta para o topo da página
						window.scrollTo(0,0);

						// seto a var global que diz qual é o módulo atual
						PLjs.currentModule = moduleToLoad;


						// troco a URL do cara
						// window.history.pushState(moduleToLoad.controller, 'PRO Lead APP ' + moduleToLoad.controller , "/prolead-app/#!/" + moduleToLoad.controller);

						// coloco o título da página na aba do navegador
						document.title = (moduleToLoad.pageTitle ? moduleToLoad.pageTitle : moduleToLoad.controller) + ' - PRO Lead';

					}//loadModule();

				}
			},


			/**
			* load.library
			*	Carrega uma biblioteca
			*/
			library: function( lib ){
				require([lib], function(lib){
					return lib;
				});
			},



			/**
			* load.view
			*	Compila uma view com o MUSTACHE e mostra na tela
			*	tenho que passar qual container <pl> vou carregar a view
			*/
			view: function(container, view, data, callback){

	            // pego o container
	            // var viewContainer = $(document).find("pl[val="+container+"]");
	            var viewContainer = document.querySelector('[pl='+container+']');

	            // chamo o mustache
	            require(["mustache"], function(Mustache){

	                // carrego a view
	                var xhr = new XMLHttpRequest();
	                // faço um XHR GET pra pegar o HTML da view
					xhr.open('GET', PLjs.basePath + '/views/'+view+'.html');
					xhr.send();
					// Quando carregar o xhr carregar o HTML, lanço no Mustache
					xhr.onreadystatechange = function() {
						var viewLoaded = xhr.responseText;
	                    
	                    // jogo o resultado no container
	                    var output = Mustache.render(viewLoaded, data);
	                    viewContainer.innerHTML = output;

	                    // se tem a função de callback, rodo ela
	                    if( typeof(callback) === 'function' ) callback();
					}
					
	            });
	        },



			/**
			* load.config
			*	Carrega um arquivo de configuração JSON
			*	e retorna no callback o json já formatado
			*/
			config: function(file, callback){

                // carrego a view
                var xhr = new XMLHttpRequest();
                // faço um XHR GET pra pegar o HTML da view
				xhr.open('GET', PLjs.basePath + '/config/'+file+'.config.json');
				xhr.send();
				// Quando carregar o xhr carregar o HTML, lanço no Mustache
				xhr.onreadystatechange = function() {
					var json = xhr.responseText;

                    // se tem a função de callback, rodo ela
                    if( typeof(callback) === 'function' )
                    	callback( JSON.parse(json) );
				}
	        },



	        // Errors
	        e_404: function( str ){
	        	alert('Page not found\n\r' + (str || ""));
	        }

		},



		checkConfigs: function(){

			if( !PLjs.basePath )
			{
				console.error('PLjs Error: PLjs.basePath is not defined. Please use PLjs.set() to configure your application before load that.');
				return false;
			}

		}

	}

	

	
}());