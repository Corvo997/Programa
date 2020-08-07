var docs;
var qnt;
var filtragem = [];

function PDF(){
    const fs = require("fs")
    fs.readdir("./xmls", (err, paths) => {
      docs = paths;
      qnt = paths.length;
     
    })
    for(y = 0;y < qnt; y++){
        filtragem[y] = docs[y].split('.')[0];
      }
      
}



function salvarPdf(){

var documento = document.getElementById("save").value;

var esc = [];
var idy = 0;
var indi = [];

var vt = ['13161010189079000102550010010430151000825713-procNFe', '13171210189079000102550010011761161000853643-procNFe', '13171210189079000102550010011761441000271932-procNFe']; //ARRAY DO TEXTAREA
for(x = 0; x< vt.length;x++){
  indi[x] = filtragem.indexOf(vt[x]);
   
}
 
for(p = 0; p < indi.length; p++){
  idy = indi[p];
  esc[p] = filtragem[idy];
}

console.log(esc);

  
for(j = 0;j<3;j++){
      xml = fs.readFileSync('C:/Users/Corvo997/Documents/Programa/xmls/'+esc[j]+'.xml').toString()

      var danfe = Danfe.fromXML(xml)
          html = danfe.toHtml();
      // $("#pdf").html(html)



conversion({ html: html }, function(err, pdf) {
  var output = fs.createWriteStream('C:/Users/Corvo997/Documents/Programa/xmls/'+esc[j]+'.pdf')
  console.log(pdf.logs);
  console.log(pdf.numberOfPages);
    
  pdf.stream.pipe(output);
});  
}
  
}




