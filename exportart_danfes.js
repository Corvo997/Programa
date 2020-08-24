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
  salvarPdf(caminho);
     });


function PDF(){
    const fs = require("fs")
    fs.readdir("./database/xml/", (err, paths) => {
      docs = paths;
      qnt = paths.length;

      for(y = 0;y < qnt; y++){
        filtragem[y] = docs[y].split('.')[0];
      }

    })
}



function salvarPdf(caminho){

esc = [];
idy = 0;
indi = [];

vt = $("#codigos").val().toString().split("\n");


for(x = 0; x < vt.length;x++){
  vt[x] ="NFe"+vt[x];
  indi[x] = filtragem.indexOf(vt[x]);
   
}
 
for(p = 0; p < indi.length; p++){
  idy = indi[p];
  esc[p] = filtragem[idy];
}


  for(j = 0; j < esc.length; j++){

      let xml = fs.readFileSync('./database/xml/'+esc[j]+'.xml').toString()

      let danfe = Danfe.fromXML(xml);

      let html = danfe.toHtml();
      
      let arquivo = caminho+'/'+esc[j]+'.pdf';

      //ALTEREI AQUI CORVO
      /*$("#pdf").html(html);*/

      conversion({  html: html }, function(err, pdf) {

        let output = fs.createWriteStream(arquivo);

        output.on('error', function(err) {
            console.log("Error");
            console.log(err);
            file.end();
            console.log(arquivo);
        });
          
        pdf.stream.pipe(output);

      });  

  }
  

  docs;
  qnt;
  vt = []; 
  array = [];

  
   
}




