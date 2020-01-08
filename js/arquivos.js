var readdirp = require('readdirp');
var fs = require('fs');
 
 
/*var settings = {
  //pasta que vai ser listada os arquivos
    root: 'C:/Users/vidal/Documents/web/js',
    entryType: 'files',
    //filtrando apenas arquivos de extensão jsp
    fileFilter: [ '*.jsp' ],
};*/
 
var allFilePaths = [];
file:
 
// Iterate recursively through a folder
readdirp('.',{type: 'files'})
    .on('data', function (entry) {
        // executa toda que vez um arquivo e encontrado no diretório e adiciona ao array
        allFilePaths.push(        	
          //pega o caminho do arquivo
            entry.path 
        );
    })
    .on('warn', function(warn){
        console.log("Aviso: ", warn);
    })
    .on('error', function(err){
        console.log("Erro: ", err);
    })
    .on('end', function(){
        console.log(allFilePaths);
        fs.writeFile('arquivos.csv', allFilePaths ,function(err) {
			    if(err) {
			        return console.log(err);
			    }
		   		 console.log("O arquivo foi salvo!");
			});
		         
    });


