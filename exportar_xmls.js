var copyFile = require('./copy-file');
//const { y } = require('pdfkit');

var arquivos;
var arq;
var filter = [];



function Atualizar(){
  const fs = require("fs")
fs.readdir("./database/xml", (err, paths) => {
  arquivos = paths;
  arq = paths.length;
 
})

   for(y = 0;y < arq; y++){
     filter[y] = arquivos[y].split('.')[0];
   }
  
}

function salvarXMLS() {
var adc;
var adc2;
var varios = document.getElementById("codigos").value; 
adc= varios.split('/n');
//adc2 = adc.split('↵'); 


console.log(adc);

var nfe = [];
var idx = 0;
var indices = [];

var array = ['NFe13161010189079000102550010010430151000825713', 'NFe13171210189079000102550010011761131000867138', 'NFe13171210189079000102550010011761161000853643']; //ARRAY DO TEXTAREA
for(x = 0; x< array.length;x++){
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
