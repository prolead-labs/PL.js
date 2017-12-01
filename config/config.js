console.log('common.js is running');

/**
* Bibliotecas que estarão disponíveis dentro dessa bagaça
*/
var libraries = ['http'];


require.config({
    baseUrl: PLjs.basePath + "/controllers",
    paths: {
        "common" : "../pl-global",
        "app" : "../app",
        "mustache" : "../vendor/mustache.js/mustache.min",
        "http.conf" : "../config/http.conf"
    }
});


require( ["app"],
    function(app) {
        
        // seta o id da conta
        pl.account  = account_id; //'6592ecd96dd26012a26a392db12d1fa5';
        pl.token    = '2393c74ed8d6f3ec33850e28801fd352';

        /**
        * Carrega as libraries padrão
        */
        libraries.forEach(function(lib, idx){
            require(['../libraries/' + lib], function( library ){
                app[lib] = library;
            });
        });
    

        // por fim, inicia o app!
        app.init();
    }
);




