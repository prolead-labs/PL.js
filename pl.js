(function(){
	"use strict";

	window.PLjs = {

	
		basePath: null,
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


					// ------------- VAI ADR RUIM AQUI -------------------
					// document.querySelector não é suportado por muitos navegadores
					//--
					//--
					//--
					//--
					//--
					//--
					//--
					//--
					//--
					var appWrapper = document.querySelector('pl[val="app-wrapper"]');
					appWrapper.innerHTML = PLjs.loadingTag;
					//--
					//--
					//--
					//--
					//--
					//--
					//--
					//--
					//--
					//--
					//--
					// ------------- VAI ADR RUIM AQUI -------------------

					//$('pl[val="app-wrapper"]').html( PLjs.loadingTag );

					// limpo o endereço da URL e deixo só o módulo que vai ser carregado
					var moduleToLoad = hash.replace( PLjs.appHash , '');

					// Verifico se o módulo já está carregado
					if( require.defined( moduleToLoad ) ){

						// se já está definifo, eu só vou reiniciar o módulo

						// primeiro pego a lista dos módulos que já estão carregados
						var loadedModules = require.s.contexts._.defined;

						// e então reinicio o modulo
						// GRAÇAS A ISSO, TODOS OS MÓDULOS DEVEM TER A FUNÇÃO init()
						loadedModules[moduleToLoad].init();


					}

					else{
						// se não estiver definido,
						// faço o require desse cara :D
						require([moduleToLoad]);
					}

					// seto a var global que diz qual é o módulo atual
					PLjs.currentModule = moduleToLoad;


					// troco a URL do cara
					// window.history.pushState(moduleToLoad, 'PRO Lead APP ' + moduleToLoad , "/prolead-app/#!/" + moduleToLoad);

					// coloco o título da página na aba do navegador
					document.title = (moduleToLoad.pageTitle ? moduleToLoad.pageTitle : moduleToLoad) + ' - PRO Lead';

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
	            var viewContainer = $(document).find("pl[val="+container+"]");

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
	                    $(viewContainer).html(output);

	                    // se tem a função de callback, rodo ela
	                    if( typeof(callback) === 'function' ) callback();
					}
					
	            });
	        }

		},



		checkConfigs: function(){

			if( !PLjs.basePath )
			{
				console.error('PLjs Error: PLjs.basePath is not defined. Please use PLjs.set() to configure your application before load that.');
				return false;
			}


			if( ! window.$ )
			{
				console.error('PLjs Error: JQuery is required to run PLjs.');
				return false;
			}

		}

	}

	

	
}());