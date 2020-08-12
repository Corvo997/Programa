var docs;
var qnt;
var filtragem = [];

$("#pasta2").change(function(event) {
  
  array.push($("#pasta2")[0].files[0].path);
 
  file = array[0].split("\\");
   
   
   file.pop();
 caminho = file.join('/');
 
  salvarPdf();
     });


function PDF(){
    const fs = require("fs")
    fs.readdir("./xmls", (err, paths) => {
      docs = paths;
      qnt = paths.length;
     
    })
    for(y = 0;y < qnt; y++){
        filtragem[y] = docs[y].split('.')[0];
        filtragem[y] = filtragem[y].split('-')[0];
      }
      
}



function salvarPdf(){

var esc = [];
var idy = 0;
var indi = [];

var vt = $("#codigos").val().toString().split("\n");

for(x = 0; x< vt.length;x++){
  vt[x] = vt[x];
  indi[x] = filtragem.indexOf(vt[x]);
   
}
 
for(p = 0; p < indi.length; p++){
  idy = indi[p];
  esc[p] = filtragem[idy];
}

var xml = [];
var danfe = [];
var html = [];
var output = [];
for(j = 0;j < esc.length;j++){
      xml[j] = fs.readFileSync('C:/Users/Corvo997/Documents/Programa/xmls/'+esc[j]+'-procNFe.xml').toString()

       danfe[j] = Danfe.fromXML(xml[j])
          html[j] = danfe[j].toHtml();
      // $("#pdf").html(html)


conversion({ html: html }, function(err, pdf) {
   output[j] = fs.createWriteStream(caminho+'/'+j+'.pdf')
  console.log(pdf.logs);
  console.log(pdf.numberOfPages);
    
  pdf.stream.pipe(output[j]);
});  

 } 
}




