var arquivos;
var arq;
var filter = [];

function Atualizar(){
  fs.readdir("./database/xml", (err, paths) => {
    arquivos = paths;
    arq = paths.length; 
  })

   for(y = 0;y < arq; y++){
  //   filter[y] = arquivos[y].split('.')[0].replace(/NFe/gi);
     filter[y] = arquivos[y].split('.')[0];
   }
  console.log(filter);
}

function salvarXMLS() {

var nfe = [];
var idx = 0;
var indices = [];

array = $("#codigos").val().toString().split("\n");

for(x = 0; x < array.length;x++){
  array[x] = "NFe"+array[x]; //Tira as letras da chave aqui e faz a busca
  indices[x] = filter.indexOf(array[x]);
   
}
 console.log(array);
for(p = 0; p < indices.length; p++){
  idx = indices[p];
  nfe[p] = filter[idx];
}
 
    CopiarXml(nfe);
 }

 function CopiarXml(copias){
  
  var async = require('async');

  
   async.series([ 
         function (callback) {
              for(i = 0; i < copias.length; i++){
             copyFile('./database/xml/'+copias[i]+'.xml', './datatable/'+copias[i]+'.xml', function (err) {
                 if (err) callback(err);
 
                 callback(null, 'Copied dahora/sample.txt to dahora/sample2.txt');
             });}
        }
     ], function (err, results) {
         if (err) {
             console.log(err);
 
             return;
         }
         console.log('Done!');
         
     });

 }
