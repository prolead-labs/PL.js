define(['app', '../config/api.config'], function(app, apiConfig) {
   'use strict';


  	/**
  	* HTTP LIB
  	*	 Executa os HTTP REQUESTS na API
  	*	 GET, POST, PUT, DELETE
  	*/
	var http = {
  		
		get: function( endPoint, params, callback, async ){

            if( async == undefined ) async = true;
            
            $.ajax({
                url: apiConfig.apiURI + endPoint,
                type: 'GET',
                method: 'GET',
                dataType: 'json',
                data: params,
                async: async, // se passar true no parametro sync, então não é assincrono 
                headers:{
                    "Authorization": "Basic " + btoa( apiConfig.authUser + ':' + apiConfig.authPass )
                }
            })
            .always(function( response ) {
                callback(response);
            });

        }, // end get()



        post: function(endPoint, params, callback, async){

            if( async == undefined ) async = true;

            $.ajax({
                url: apiConfig.apiURI + endPoint,
                type: 'POST',
                contentType:"application/json",
                dataType: 'json',
                data: params,
                async: async, // se passar true no parametro sync, então não é assincrono 
                headers:{
                "Authorization": "Basic " + btoa( apiConfig.authUser + ':' + apiConfig.authPass )
                }
            })
            .always(function(response) {
                callback(response);
            });
        }
    }


    return http;
    
});