var docs;
var qnt;
var filtragem = [];
var caminho = [];
var vt = []; 
var array = [];

$("#pasta2").change(function(event) {
  
  array.push($("#pasta2")[0].files[0].path);
 
  file = array[0].split("\\");
   
   
   file.pop();
 caminho = file.join('/');
 console.log(caminho);
  salvarPdf();
     });


function PDF(){
    const fs = require("fs")
    fs.readdir("./database/xml", (err, paths) => {
      docs = paths;
      qnt = paths.length;

      for(y = 0;y < qnt; y++){
        filtragem[y] = docs[y].split('.')[0];
      }

    })
     console.log(filtragem); 
}



function salvarPdf(){

var esc = [];
var idy = 0;
var indi = [];

 vt = $("#codigos").val().toString().split("\n");
console.log(vt);

for(x = 0; x < vt.length;x++){
  vt[x] = "NFe"+vt[x];
  indi[x] = filtragem.indexOf(vt[x]);
   
}
 
for(p = 0; p < indi.length; p++){
  idy = indi[p];
  esc[p] = filtragem[idy];
}
console.log(esc);

var xml = [];
var danfe = [];
var html = [];
var output = [];

  for(j = 0;j < esc.length;j++){

      xml[j] = fs.readFileSync('./database/xml/'+esc[j]+'.xml').toString()

      danfe[j] = Danfe.fromXML(xml[j]);
      html[j] = danfe[j].toHtml();
      
      conversion({ html: html[j] }, function(err, pdf) {
        output[j] = fs.createWriteStream(caminho+'/'+esc[j]+'.pdf')
          
        pdf.stream.pipe(output[j]);
      });  

  }
  

  docs;
  qnt;
  vt = []; 
  array = [];

  
   
}




