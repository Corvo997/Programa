var arquivos;
var arq;
var filter = [];
var array = [];
var file = [];
var caminho = [];

$("#pasta").change(function(event) {
  
  array.push($("#pasta")[0].files[0].path);
 
  file = array[0].split("\\");
   
   
   file.pop();
 caminho = file.join('/');

 Atualizar();
 
  salvarXMLS();
     });
 

function Atualizar(){
  fs.readdir("./database/xml", (err, paths) => {
    arquivos = paths;
    arq = paths.length; 
  })

   for(y = 0;y < arq; y++){
     filter[y] = arquivos[y].split('.')[0];
   }
  
}

function salvarXMLS() {

var nfe = [];
var idx = 0;
var indices = [];

array = $("#codigos").val().toString().split("\n");

console.log(array);

for(x = 0; x < array.length;x++){
  array[x] = "NFe"+array[x]; 
  indices[x] = filter.indexOf(array[x]);
   
} 
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
             copyFile('./database/xml/'+copias[i]+'.xml', caminho+'/'+copias[i]+'.xml', function (err) {
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
