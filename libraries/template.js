define([], function() {
   'use strict';


  	/**
  	* TEMPLATE
  	*	monta o template e joga lá na tela
  	*/
	var template = {
  		
		show: function(view, data){

            require(["mustache"], function(Mustache){
                $.get(BASE_TEMA + '/../App/views/'+view+'.html', function(viewLoaded) {
                    var output = Mustache.render(viewLoaded, data);
                    $('.wrapper').html(output);
                });

            });

		},


        compila: function(container, view, data){

            // pego o container
            var container = $(document).find("pl[val="+container+"]");

            // chamo o mustache
            require(["mustache"], function(Mustache){

                // carrego a view
                $.get(BASE_TEMA + '/../App/views/'+view+'.html', function(viewLoaded) {
                    
                    // jogo o resultado no container
                    var output = Mustache.render(viewLoaded, data);
                    $(container).html(output);

                });

            });
        }
	}

    return template;
	
});