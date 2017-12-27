console.log('core/common will start');

require.config({
    baseUrl: PLjs.basePath + "/controllers",
    paths: {
        "app" : "../core/app",
        "mustache" : "../vendor/mustache.js/mustache.min"
    }
});


require( ["app"],
    function(app) {

        /**
        * Carrega as libraries padrão
        */
        PLjs.loadLibs.forEach(function(lib, idx){
            require(['../libraries/' + lib], function( library ){
                
                // coloca a biblioteca no escopo global do PLjs
                PLjs.library[lib] = library;
                console.group('PLjs: Library "' +lib+ '" is loaded');
	                console.log('See the library scope bellow:');
	                console.log(library);
	                console.log('You can access this lib at PLjs.library.' + lib + '');
	                console.log('Enjoy!');
	            console.groupEnd('Library Loaded');

            });
        });
    

        // por fim, inicia o app!
        app.init();
    }
);




