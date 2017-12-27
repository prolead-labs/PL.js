
define(["app"], function(app) {
   'use strict';

   var csv = {

   		//Transformar o arquivo CSV em JSON
        csvJSON: function(csv, progressElement){

            var lines=csv.split("\r\n");

            // verifica se o ultimo elemento não esta vazio
            var last_element = lines[lines.length - 1]; // pega o ultimo elemento do array    
            //se está vazio, então apaga
            if( last_element.length === 0 ){
                delete lines[lines.length - 1];
                lines.length--; // diminui o tamanho na raça. pq o delete elimina o índice, mas o length não é recomputado (bug do javascript, nõa tenho culpa)
            }

            // conta o total de linhas pra mostrar o progresso
            var totalLinhas = lines.length - 1; // -1 pra ignorar o cabeçalho

            var result = [];

            var headers=lines[0].split(";");

              Headers:
              for(var i=1; i < lines.length; i++){

                // se tem um segundo parâmetro com o elemento que vai mostrar o progresso, fico atualizando o progresso
                if( progressElement !== undefined ) $(document).find(progressElement).text(i + ' de ' + totalLinhas);

                var obj = {};
                var currentline = lines[i].split(";");
            
                Linhas:
                for(var j=0;j<headers.length;j++){

                    // if(currentline[j] === undefined) currentline[j] = "";
                    currentline[j] = currentline[j].replace(/(\r\n|\n|\r)/gm,"");

                    if (!currentline[j].length){
                        continue;
                    }else{
                        obj[ headers[j] ] = currentline[j];
                    }
                }
                result.push(obj);

            }

            return result;

            //retorna o JSON; 
            // return JSON.stringify(result); //JSON saiu quentinho
        },



        // transformar json em csv
        JSONtoCsv: function(arrData){

        //Transforma o array em json
        // essa linha não faz nada. Pq ela existe?
        // var myJsonString = JSON.stringify(arrData);


            var CSV = '';
            //define o titulo da primeira linha

            //Aqui gera o cabeçalho

            // tirei esse if do jogo pq nunca entrava nesse if, pq não passava um true como parâmetro lá na linha 20
            // então nunca ia entrar aqui
            // if (ShowLabel) {
            var row = "";

                //Loop para pegar cada index de dentro do array
                for (var index in arrData) {

                    //separa com "," na linha
                    // row += index + ',';
                    // coloquei pra separar com ; só pra funcionar no meu excel
                    row += index + ';';
                }

                row = row.slice(0);

                CSV += row + '\r\n';
            // }

            console.log(CSV);


            //extrai cada linha
            for (var i = 0; i < arrData.length; i++) {
                var row = "";

                    //Extrai cada coluna e conver e a separa com ","
                    for (var index in arrData[i]) {
                        row += '"' + arrData[i][index] + '",';
                    }

                row.slice(0);

                //adiciona um quebra de linha após cada linha
            CSV += row + '\r\n';
            }


            if (CSV == '') {        
                alert("Invalid data");
            return;
            }   

            //Gera o nome do arquivo
            var fileName = "ModeloCsv";


            //determina o formato de arquivo que deseja
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);


            //link gerado
            var link = document.createElement("a");    
            link.href = uri;

            //layout do dowlod para nao dar erro na web
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";


            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

   };

   return csv;

});

