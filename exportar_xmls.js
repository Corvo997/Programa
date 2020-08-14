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
console.log(caminho);
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
var verificacao = [];
var alerta = [];
array = $("#codigos").val().toString().split("\n");

for(a = 0;a<array.length;a++){
  if(filter.indexOf('NFe'+array[a]) === -1){
    alerta[a] = 'NFe'+array[a];            
  }
  else if (filter.indexOf('NFe'+array[a]) > -1){
    verificacao[a] = array[a];  
  }
}

dialogs.alert('As seguintes notas não foram encontradas:'+alerta);


for(x = 0; x < verificacao.length;x++){
  verificacao[x] = "NFe"+verificacao[x]; 
  indices[x] = filter.indexOf(verificacao[x]);
   
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
      arquivos;
      arq;
      filter = [];
      array = [];
     file = [];
     caminho = [];
 }
