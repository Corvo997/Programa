//AQUI JA INICIA O BANCO QUANDO ENTRA NA ABA SCANEAR NOTAS
const sqlite3 = require('sqlite3').verbose();
 
let db = new sqlite3.Database('./database/database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

function loadXMLDoc() {

  n_files = $("#pasta_xmls")[0].files.length;

  array_infos_db = [];
  array_prods_db = [];
  //ESTE ARRAY PEGA OS ELEMENTOS DO array_db PQ ESTA COMO LOCAL E DA ERRO DE ARRAY NAO DEFINIDO, ENTAO CRIEI ESSE
  array_teste = [];

  for(i = 0; i < $("#pasta_xmls")[0].files.length; i++){
    $("#porcentagem_arquivos").html(((i + 1)/n_files)*100 + "%");

    $.ajax({
      type:'GET',
      url: $("#pasta_xmls")[0].files[i].path,
      contentType: false,
      processData: false,
      success: function(response){

        xml = $(response);
    
        array_db = [];
        array_items = [];

        //Dados de Emissão da Nota
        array_db.push(xml.find("ide cUF").text());
        array_db.push(xml.find("ide cNF").text());
        array_db.push(xml.find("ide natOp").text());
        array_db.push(xml.find("ide indPag").text());
        array_db.push(xml.find("ide mod").text());
        array_db.push(xml.find("ide serie").text());
        array_db.push(xml.find("ide nNF").text());
        array_db.push(xml.find("ide dhEmi").text());
        array_db.push(xml.find("ide dhSainEnt").text());
        array_db.push(xml.find("ide tpNF").text());
        array_db.push(xml.find("ide idDest").text());
        array_db.push(xml.find("ide cMunFG").text());
        array_db.push(xml.find("ide tpImp").text());
        array_db.push(xml.find("ide tpEmis").text());
        array_db.push(xml.find("ide cDV").text());
        array_db.push(xml.find("ide tpAmb").text());
        array_db.push(xml.find("ide finNFe").text());
        array_db.push(xml.find("ide indFinal").text());
        array_db.push(xml.find("ide indPres").text());
        array_db.push(xml.find("ide procEmi").text());
        array_db.push(xml.find("ide verProc").text());

        //Dados do Emissor
        array_db.push(xml.find("emit CNPJ").text()); //PEGA O CNPJ DA EMPRESA
        array_db.push(xml.find("emit xNome").text()); //PEGA A RAZÃO SOCIAL DA EMPRESA
        array_db.push(xml.find("emit xFant").text()); //PEGA O NOME FANTASIA DA EMPRESA
        array_db.push(xml.find("emit enderEmit xLgr").text());
        array_db.push(xml.find("emit enderEmit nro").text());
        array_db.push(xml.find("emit enderEmit xBairro").text());
        array_db.push(xml.find("emit enderEmit cMun").text());
        array_db.push(xml.find("emit enderEmit xMun").text());
        array_db.push(xml.find("emit enderEmit UF").text());
        array_db.push(xml.find("emit enderEmit CEP").text());
        array_db.push(xml.find("emit enderEmit cPais").text());
        array_db.push(xml.find("emit enderEmit xPais").text());
        array_db.push(xml.find("emit enderEmit fone").text());
        array_db.push(xml.find("emit IE").text());
        array_db.push(xml.find("emit CRT").text());

        //Dados do Destinatário
        array_db.push(xml.find("dest CPF").text());
        array_db.push(xml.find("dest xNome").text());
        array_db.push(xml.find("dest enderDest xLgr").text());
        array_db.push(xml.find("dest enderDest nro").text());
        array_db.push(xml.find("dest enderDest xBairro").text());
        array_db.push(xml.find("dest enderDest cMun").text());
        array_db.push(xml.find("dest enderDest xMun").text());
        array_db.push(xml.find("dest enderDest UF").text());
        array_db.push(xml.find("dest enderDest CEP").text());
        array_db.push(xml.find("dest enderDest cPais").text());
        array_db.push(xml.find("dest enderDest xPais").text());
        array_db.push(xml.find("dest enderDest fone").text());
        array_db.push(xml.find("dest indIEDest").text());

        //Dados de Produtos (Array Separado, Aqui tu tem que fazer um for)
        for( i = 0; i < xml.find("det").length; i++ ){
          array_items.push(xml.find("det").eq(i).find("prod cProd").text()); //CÓDIGO DO PRODUTO
          array_items.push(xml.find("det").eq(i).find("prod xProd").text()); //DESCRIÇÃO DO PRODUTO
          array_items.push(xml.find("det").eq(i).find("prod NCM").text());
          array_items.push(xml.find("det").eq(i).find("prod CFOP").text());
          array_items.push(xml.find("det").eq(i).find("prod uCom").text());
          array_items.push(xml.find("det").eq(i).find("prod qCom").text());
          array_items.push(xml.find("det").eq(i).find("prod vUnCom").text());
          array_items.push(xml.find("det").eq(i).find("prod vProd").text());
          array_items.push(xml.find("det").eq(i).find("prod uTrib").text());
          array_items.push(xml.find("det").eq(i).find("prod qTrib").text());
          array_items.push(xml.find("det").eq(i).find("prod vUnTrib").text());
          array_items.push(xml.find("det").eq(i).find("prod vOutro").text());
          array_items.push(xml.find("det").eq(i).find("prod indTot").text()); 

          //Dados de Imposto
          array_items.push(xml.find("det").eq(i).find("imposto ICMS ICMS60 orig").text());
          array_items.push(xml.find("det").eq(i).find("imposto ICMS ICMS60 CST").text());
          array_items.push(xml.find("det").eq(i).find("imposto ICMS ICMS60 vBCSTRet").text());
          array_items.push(xml.find("det").eq(i).find("imposto ICMS ICMS60 vICMSSTRet").text());
          array_items.push(xml.find("det").eq(i).find("imposto PIS PISAliq CST").text());
          array_items.push(xml.find("det").eq(i).find("imposto PIS PISAliq vBC").text());
          array_items.push(xml.find("det").eq(i).find("imposto PIS PISAliq pPIS").text());
          array_items.push(xml.find("det").eq(i).find("imposto PIS PISAliq vPIS").text());
          array_items.push(xml.find("det").eq(i).find("imposto COFINS COFINSAliq CST").text());
          array_items.push(xml.find("det").eq(i).find("imposto COFINS COFINSAliq vBC").text());
          array_items.push(xml.find("det").eq(i).find("imposto COFINS COFINSAliq pCONFINS").text());
          array_items.push(xml.find("det").eq(i).find("imposto COFINS COFINSAliq vCONFINS").text());
        }

        //Dados Total
        array_db.push(xml.find("total ICMSTot vBC").text());
        array_db.push(xml.find("total ICMSTot vICMS").text());
        array_db.push(xml.find("total ICMSTot vICMSDeson").text());
        array_db.push(xml.find("total ICMSTot vICMSUFDest").text());     
        array_db.push(xml.find("total ICMSTot vFCPUFDest").text());
        array_db.push(xml.find("total ICMSTot vICMSUFRemet").text());
        array_db.push(xml.find("total ICMSTot vBCST").text());
        array_db.push(xml.find("total ICMSTot vST").text());
        array_db.push(xml.find("total ICMSTot vProd").text());
        array_db.push(xml.find("total ICMSTot vFrete").text());
        array_db.push(xml.find("total ICMSTot vSeg").text());
        array_db.push(xml.find("total ICMSTot vDesc").text());
        array_db.push(xml.find("total ICMSTot vII").text());
        array_db.push(xml.find("total ICMSTot vIPI").text());
        array_db.push(xml.find("total ICMSTot vPIS").text());
        array_db.push(xml.find("total ICMSTot vCONFINS").text());
        array_db.push(xml.find("total ICMSTot vOutro").text());
        array_db.push(xml.find("total ICMSTot vNF").text());

        //Dados de Transporte
        array_db.push(xml.find("transp modFrete").text());
        array_db.push(xml.find("transp transporta CNPJ").text());
        array_db.push(xml.find("transp transporta xNome").text());
        array_db.push(xml.find("transp transporta IE").text());
        array_db.push(xml.find("transp transporta xEnder").text());
        array_db.push(xml.find("transp transporta xMun").text());
        array_db.push(xml.find("transp transporta UF").text());
        array_db.push(xml.find("transp veicTransp placa").text());
        array_db.push(xml.find("transp veicTransp UF").text());
        array_db.push(xml.find("transp vol qVol").text());
        array_db.push(xml.find("transp vol esp").text());
        array_db.push(xml.find("transp vol pesoL").text());
        array_db.push(xml.find("transp vol pesoB").text());

        //Dados de Cobrança
        array_db.push(xml.find("cobr fat nFat").text());
        array_db.push(xml.find("cobr fat vOrig").text());
        array_db.push(xml.find("cobr fat vLiq").text());
        array_db.push(xml.find("cobr dup nDup").text());
        array_db.push(xml.find("cobr dup dVenc").text());
        array_db.push(xml.find("cobr dup vDup").text());

        //Informações Adicionais
        array_db.push(xml.find("infAdic InfCpl").text());

        array_infos_db.push(array_db);
        array_prods_db.push(array_items);
        //AQUI ELE COPIA OS ELEMENTOS DO ARRAY
        array_teste = array_db.slice();
      }

    });

  }

  //JOGA NO BANCO - A FAZER


  hoje = new Date();
  hoje = hoje.getDay()+"_"+(hoje.getMonth() + 1)+"_"+hoje.getFullYear();

  xls = new XlsExport(array_infos_db, "Base_Dados_"+hoje);

  $("#salvar").css('display', 'block');
  



//db.run('INSERT INTO analise(cUF,cNF,natOp,indPag,mod,serie,nNF,dhEmi,dhSaiEnt,tpNF,idDest,cMunFG,tpImp,tpEmis,cDV,tpAmb,finNFe,indFinal,indPres,procEmi,verProc,emiCNPJ,emixNome,emixFant,emixLgr,eminro,emixBairro,emicMun,emixMun,emiUF,emiCEP,emicPais,emixPais,emifone,emiIE,emiCRT,destCPF,destxNome,destxLgr,destnro,destxBairro,destcMun,destxMun,destUF,destCEP,destcPais,destxPais,destfone,destindIEDest,totvBC,totvICMS,totvICMSDeson,totvFCPUFDest,totvICMSUFDest,totvICMSUFRemet,totvBCST,totvST,totvProd,totvFrete,totvSeg,totvDesc,totvII,totvIPI,totvPIS,totvCONFINS,totvOutro,totvNF,transpmodFrete, transpCNPJ,transpxNome,transpIE,transpxEnder,transpxMun,transpUF,veiculoplaca,veiculoUF,volqVol,volesp,volpesoL,volpesoB,cobrnFat,cobrvOrig,cobrvLiq,cobrnDup,cobrdVenc,cobrvDup,infInfCpl) VALUES '+array_infos_db[0]+','+array_infos_db[1]+','+array_infos_db[2]+','+array_infos_db[3]+','+array_infos_db[4]+','+array_infos_db[5]+','+array_infos_db[6]+','+array_infos_db[7]+','+array_infos_db[8]+','+array_infos_db[9]+','+array_infos_db[10]+','+array_infos_db[11]+','+array_infos_db[12]+','+array_infos_db[13]+','+array_infos_db[14]+','+array_infos_db[15]+','+array_infos_db[16]+','+array_infos_db[17]+','+array_infos_db[18]+','+array_infos_db[19]+','+array_infos_db[20]+','+array_infos_db[21]+','+array_infos_db[22]+','+array_infos_db[23]+','+array_infos_db[24]+','+array_infos_db[25]+','+array_infos_db[26]+','+array_infos_db[27]+','+array_infos_db[28]+','+array_infos_db[29]+','+array_infos_db[30]+','+array_infos_db[31]+','+array_infos_db[32]+','+array_infos_db[33]+','+array_infos_db[34]+','+array_infos_db[35]+','+array_infos_db[36]+','+array_infos_db[37]+','+array_infos_db[38]+','+array_infos_db[39]+','+array_infos_db[40]+','+array_infos_db[41]+','+array_infos_db[42]+','+array_infos_db[43]+','+array_infos_db[44]+','+array_infos_db[45]+','+array_infos_db[46]+','+array_infos_db[47]+','+array_infos_db[48]+','+array_infos_db[49]+','+array_infos_db[50]+','+array_infos_db[51]+','+array_infos_db[52]+','+array_infos_db[53]+','+array_infos_db[54]+','+array_infos_db[55]+','+array_infos_db[56]+','+array_infos_db[57]+','+array_infos_db[58]+','+array_infos_db[59]+','+array_infos_db[60]+','+array_infos_db[61]+','+array_infos_db[62]+','+array_infos_db[63]+','+array_infos_db[64]+','+array_infos_db[65]+','+array_infos_db[66]+','+array_infos_db[67]+','+array_infos_db[68]+','+array_infos_db[69]+','+array_infos_db[70]+','+array_infos_db[71]+','+array_infos_db[72]+','+array_infos_db[73]+','+array_infos_db[74]+','+array_infos_db[75]+','+array_infos_db[76]+','+array_infos_db[77]+','+array_infos_db[78]+','+array_infos_db[79]+','+array_infos_db[80]+','+array_infos_db[81]+','+array_infos_db[82]+','+array_infos_db[83]+','+array_infos_db[84]+','+array_infos_db[85]+','+array_infos_db[86]+','+array_infos_db[87]')');
//ESSE AQUI DA COMO UNDEFINIED
//db.run("INSERT INTO analise(cUF,cNF) VALUES(?,?) , ('"+array_teste[0]+"','"+array_teste[1]+"')");
  
  //COMO CANSA FICAR CRIANDO E LIMPANDO O BANCO COM TANTAS COLUNAS ENTAO PRA FICAR TESTANDO CRIEI TRES COLUNAS
  //SAO A ID, cUF E A cNF AS DUAS ESTAO COMO TEXT, O BANCO EU CRIO PELO CONSOLE QUE É MELHOR E DIMINUI A QUANTIDADE DE LINHAS
  //O PROBLEMA É QUE QAUDNO TENTO INSERIR DADOS AS COLUNAS FICAM VAZIAS MAS ELE CRIA A LINHA COM O ID, E QUANDO CONSIGO INSERIR
  //APARECE COMO UNDEFINIED, SO PRECISO CONSEGUIR INSERIR ESSES DOIS DADOS,SE CONSEGUIR O RESTO É CTRL+C CTRL+V
  //ESSE DA COM VAZIO
  db.run('INSERT INTO analise (cUF) VALUES(?)',[array_teste[0]]);

  db.close();
}
























/*  This work is licensed under Creative Commons GNU LGPL License.

  License: http://creativecommons.org/licenses/LGPL/2.1/
   Version: 0.9
  Author:  Stefan Goessner/2006
  Web:     http://goessner.net/ 
*/
function xml2json(xml, tab) {
   var X = {
      toObj: function(xml) {
         var o = {};
         if (xml.nodeType==1) {   // element node ..
            if (xml.attributes.length)   // element with attributes  ..
               for (var i=0; i<xml.attributes.length; i++)
                  o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
            if (xml.firstChild) { // element has child nodes ..
               var textChild=0, cdataChild=0, hasElementChild=false;
               for (var n=xml.firstChild; n; n=n.nextSibling) {
                  if (n.nodeType==1) hasElementChild = true;
                  else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                  else if (n.nodeType==4) cdataChild++; // cdata section node
               }
               if (hasElementChild) {
                  if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                     X.removeWhite(xml);
                     for (var n=xml.firstChild; n; n=n.nextSibling) {
                        if (n.nodeType == 3)  // text node
                           o["#text"] = X.escape(n.nodeValue);
                        else if (n.nodeType == 4)  // cdata node
                           o["#cdata"] = X.escape(n.nodeValue);
                        else if (o[n.nodeName]) {  // multiple occurence of element ..
                           if (o[n.nodeName] instanceof Array)
                              o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                           else
                              o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                        }
                        else  // first occurence of element..
                           o[n.nodeName] = X.toObj(n);
                     }
                  }
                  else { // mixed content
                     if (!xml.attributes.length)
                        o = X.escape(X.innerXml(xml));
                     else
                        o["#text"] = X.escape(X.innerXml(xml));
                  }
               }
               else if (textChild) { // pure text
                  if (!xml.attributes.length)
                     o = X.escape(X.innerXml(xml));
                  else
                     o["#text"] = X.escape(X.innerXml(xml));
               }
               else if (cdataChild) { // cdata
                  if (cdataChild > 1)
                     o = X.escape(X.innerXml(xml));
                  else
                     for (var n=xml.firstChild; n; n=n.nextSibling)
                        o["#cdata"] = X.escape(n.nodeValue);
               }
            }
            if (!xml.attributes.length && !xml.firstChild) o = null;
         }
         else if (xml.nodeType==9) { // document.node
            o = X.toObj(xml.documentElement);
         }
         else
            alert("unhandled node type: " + xml.nodeType);
         return o;
      },
      toJson: function(o, name, ind) {
         var json = name ? ("\""+name+"\"") : "";
         if (o instanceof Array) {
            for (var i=0,n=o.length; i<n; i++)
               o[i] = X.toJson(o[i], "", ind+"\t");
            json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
         }
         else if (o == null)
            json += (name&&":") + "null";
         else if (typeof(o) == "object") {
            var arr = [];
            for (var m in o)
               arr[arr.length] = X.toJson(o[m], m, ind+"\t");
            json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
         }
         else if (typeof(o) == "string")
            json += (name&&":") + "\"" + o.toString() + "\"";
         else
            json += (name&&":") + o.toString();
         return json;
      },
      innerXml: function(node) {
         var s = ""
         if ("innerHTML" in node)
            s = node.innerHTML;
         else {
            var asXml = function(n) {
               var s = "";
               if (n.nodeType == 1) {
                  s += "<" + n.nodeName;
                  for (var i=0; i<n.attributes.length;i++)
                     s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                  if (n.firstChild) {
                     s += ">";
                     for (var c=n.firstChild; c; c=c.nextSibling)
                        s += asXml(c);
                     s += "</"+n.nodeName+">";
                  }
                  else
                     s += "/>";
               }
               else if (n.nodeType == 3)
                  s += n.nodeValue;
               else if (n.nodeType == 4)
                  s += "<![CDATA[" + n.nodeValue + "]]>";
               return s;
            };
            for (var c=node.firstChild; c; c=c.nextSibling)
               s += asXml(c);
         }
         return s;
      },
      escape: function(txt) {
         return txt.replace(/[\\]/g, "\\\\")
                   .replace(/[\"]/g, '\\"')
                   .replace(/[\n]/g, '\\n')
                   .replace(/[\r]/g, '\\r');
      },
      removeWhite: function(e) {
         e.normalize();
         for (var n = e.firstChild; n; ) {
            if (n.nodeType == 3) {  // text node
               if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                  var nxt = n.nextSibling;
                  e.removeChild(n);
                  n = nxt;
               }
               else
                  n = n.nextSibling;
            }
            else if (n.nodeType == 1) {  // element node
               X.removeWhite(n);
               n = n.nextSibling;
            }
            else                      // any other node
               n = n.nextSibling;
         }
         return e;
      }
   };
   if (xml.nodeType == 9) // document node
      xml = xml.documentElement;
   var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
   return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
}