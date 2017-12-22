
// ROUTER
//	Define current module/controller/function/params
//	based on URL segments
define(function(){
   'use strict';

	var router = {

		customRoutes: {},

		// caminho que está acessando no momento (sem a appHash)
		documentPath: {},

		init: function(callback){

			PLjs.load.config('routes', function(configRoutes){

				// Seto a rota padrão do sistema
				// APP/controller/method/params
				var uriSegments = router._read_uri_segments();
				var controller = uriSegments[0] || null;
				var method = uriSegments[1] || "index";
				var params = [];
				var paramsIndex = 2;

				// pego todas as configs de rotas personalizadas
				for( var i in configRoutes ){

					// cada rota é um objeto que
					// no índice eu tenho a rota
					var route = i,
						module = configRoutes[i];

					// verifico se o cara tá acessando a rota atual
					if( router.documentPath.indexOf(route) === 0 ){

						// primeiro pego o path - caso ele exista - e adiciono uma barra no final
						// isso aqui é pra gente conseguir usar controllers dentro de subpastas
						var modPath = typeof(module.path) != "undefined" && module.path != "" ? module.path + "/" : "";
						
						// então defino o controller com base na rota que o cara tá
						controller = modPath + module.controller;

						// agora eu tenho que saber quantos segmentos de URL (subpastas) o controller tem
						// para poder definir em qual índice os parâmetros e o método começam
						var controllerSegments = controller.split("/");

						// defino o method também
						// se existir eu pego o método da rota
						// senão eu pego o método com base na URL atual
						// senão eu pego o método padrão que setei na var lá em cima
						method = module.method || uriSegments[ controllerSegments.length ] || method;

						// o índice dos parâmetros é a quantidade de segmentos + 1 (que é o método)
						paramsIndex = controllerSegments.length + 1;

					}
				
				}


				// tudoo que existir na URL do segmento 2 pra frente, vai ser parâmetro
				for(var i in uriSegments){
					if( i < paramsIndex ) continue;

					params.push( uriSegments[i] );
				};

				callback({
					controller: controller,
					method: method,
					params: params
				});

			});


		}, // end init();


		// Separa toda a URL em segmentos para poder
		// usar cada um de forma separada
		_read_uri_segments: function(){

			var urlPath = document.location.hash;
			urlPath = urlPath.replace( PLjs.appHash , '' );
			router.documentPath = urlPath;
			var uriSegments = urlPath.split("/");
			return uriSegments;
		}

	}; // class router

	return router;

});