function xmlLoaderAsync(url,callback){
   var Loader = new XMLHttpRequest();
   Loader.onload = callback;
   Loader.open("GET", url, true);
   Loader.send();
} 

function xmlCarregada(){
  var xmlC  = this.responseXML;
  function xmlMontarArvore(xmlNode){
   
 var arvore = new Array();
       
 
 for(var i=0;i<xmlNode.childNodes.length;i++){   
    if(xmlNode.childNodes[i].nodeType == 1){
       if(xmlNode.childNodes[i].childNodes.length==0){
         var atri="";
         for(var z=0;z<xmlNode.childNodes[i].attributes.length;z++){
           var atrib = xmlNode.childNodes[i].attributes[z];
           atri = atri + "(" + atrib.nodeName + " = " + atrib.nodeValue + ")";
         }
       
         arvore.push({value:xmlNode.childNodes[i].nodeValue, atr:atri, child:null});
       }else if(xmlNode.childNodes[i].childNodes.length>0){
        
         var atri = "";
         for(var z=0;z<xmlNode.childNodes[i].attributes.length;z++){
            var atrib = xmlNode.childNodes[i].attributes[z];
            atri = atri + "(" + atrib.nodeName + " = " + atrib.nodeValue + ")";
         }
        
         arvore.push( { value:xmlNode.childNodes[i].firstChild.nodeValue, atr:atri, child:xmlMontarArvore(xmlNode.childNodes[i])});
      }
    }
  }
  return arvore;
}
}
xmlLoaderAsync("13161010189079000102550010010430151000825713-procNFe.xml",xmlCarregada);

