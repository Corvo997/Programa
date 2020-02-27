function loadXMLDoc() {
 
  n_files = $("#pasta_xmls")[0].files.length;
  
  const filtro = [];// array do filtro

  let sql = `SELECT id FROM nota_fiscal`; 
        
  db.all(sql, [], (err, consult) => {
    if (err) {
      throw err;
    }
    consult.forEach((row) => {
      filtro.push(row.id);
    }); 
  });
        
  array_infos_db = [];
  array_prods_db = [];
  //ESTE ARRAY PEGA OS ELEMENTOS DO array_db PQ ESTA COMO LOCAL E DA ERRO DE ARRAY NAO DEFINIDO, ENTAO CRIEI ESSE
  array_teste = [];
  arrray_teste2 = [];
  
  let ja_inseridos = 0;

  for(i = 0; i < $("#pasta_xmls")[0].files.length; i++){
    $("#porcentagem_arquivos").html(((i + 1)/n_files)*100 + "%");

    $.ajax({
      type:'GET',
      url: $("#pasta_xmls")[0].files[i].path,
      contentType: false,
      processData: false,
      success: function(response){

        xml = $(response);

        var array_db = {};
        var array_items = {};
        
        //Chave da Nota
        array_db.id = (xml.find("infNFe").attr('Id'));       
        array_db.versao = (xml.find("infNFe").attr('versao'));

        teste = xml.find("infNFe").attr('Id');

        if (filtro.indexOf(teste) === -1){
          //Dados de Emissão da Nota
          array_db.cuf = (xml.find("ide cUF").text());
          array_db.cnf = (xml.find("ide cNF").text());
          array_db.natop = (xml.find("ide natOp").text());
          array_db.indPag = (xml.find("ide indPag").text());
          array_db.mod = (xml.find("ide mod").text());
          array_db.serie = (xml.find("ide serie").text());
          array_db.nNF = (xml.find("ide nNF").text());
          array_db.dhEmi = (xml.find("ide dhEmi").text());
          array_db.dhSainEnt = (xml.find("ide dhSainEnt").text());
          array_db.tpNF = (xml.find("ide tpNF").text());
          array_db.idDest = (xml.find("ide idDest").text());
          array_db.cMunFG = (xml.find("ide cMunFG").text());
          array_db.tpImp = (xml.find("ide tpImp").text());
          array_db.tpEmis = (xml.find("ide tpEmis").text());
          array_db.cDV = (xml.find("ide cDV").text());
          array_db.tpAmb = (xml.find("ide tpAmb").text());
          array_db.finNFe = (xml.find("ide finNFe").text());
          array_db.indFinal = (xml.find("ide indFinal").text());
          array_db.indPres = (xml.find("ide indPres").text());
          array_db.procEmi = (xml.find("ide procEmi").text());
          array_db.verProc = (xml.find("ide verProc").text());

          //Dados do Emissor
          array_db.emitCNPJ = (xml.find("emit CNPJ").text()); 
          array_db.emitCPF = (xml.find("emit CPF").text()); 
          array_db.emitNome = (xml.find("emit xNome").text()); 
          array_db.emitFant = (xml.find("emit xFant").text()); 
          array_db.emitLgr = (xml.find("emit enderEmit xLgr").text());
          array_db.emitnro = (xml.find("emit enderEmit nro").text());
          array_db.emitBairro = (xml.find("emit enderEmit xBairro").text());
          array_db.emitcMun = (xml.find("emit enderEmit cMun").text());
          array_db.emitxMun= (xml.find("emit enderEmit xMun").text());
          array_db.emitUF = (xml.find("emit enderEmit UF").text());
          array_db.emitCEP = (xml.find("emit enderEmit CEP").text());
          array_db.emitcPais = (xml.find("emit enderEmit cPais").text());
          array_db.emitxPais = (xml.find("emit enderEmit xPais").text());
          array_db.emitfone = (xml.find("emit enderEmit fone").text());
          array_db.emitIE = (xml.find("emit IE").text());
          array_db.emitCRT = (xml.find("emit CRT").text());
          array_db.emitComplemento = (xml.find("emit xCpl")) 

          // //Dados do Destinatário
          array_db.destCNPJ = (xml.find("dest CNPJ").text());
          array_db.destCPF = (xml.find("dest CPF").text());
          array_db.destNome = (xml.find("dest xNome").text());
          array_db.destFant = (xml.find("dest xFant").text());
          array_db.destLgr = (xml.find("dest enderDest xLgr").text());
          array_db.destnro = (xml.find("dest enderDest nro").text());
          array_db.destBairro = (xml.find("dest enderDest xBairro").text());
          array_db.destcMun = (xml.find("dest enderDest cMun").text());
          array_db.destxMun = (xml.find("dest enderDest xMun").text());
          array_db.destUF = (xml.find("dest enderDest UF").text());
          array_db.destCEP = (xml.find("dest enderDest CEP").text());
          array_db.destcPais = (xml.find("dest enderDest cPais").text());
          array_db.destxPais = (xml.find("dest enderDest xPais").text());
          array_db.destfone = (xml.find("dest enderDest fone").text());
          array_db.destindIEDest = (xml.find("dest indIEDest").text());
          array_db.destComplemento = (xml.find("dest xCpl").text());

          // Dados de Produtos (Array Separado, Aqui tu tem que fazer um for)
          for( i = 0; i < xml.find("det").length; i++ ){
            array_items.prodcProd = (xml.find("det").eq(i).find("prod cProd").text()); //CÓDIGO DO PRODUTO
            array_items.prodxProd = (xml.find("det").eq(i).find("prod xProd").text()); //DESCRIÇÃO DO PRODUTO
            array_items.prodNCM = (xml.find("det").eq(i).find("prod NCM").text());
            array_items.prodCFOP = (xml.find("det").eq(i).find("prod CFOP").text());
            array_items.produCom = (xml.find("det").eq(i).find("prod uCom").text());
            array_items.prodqCom = (xml.find("det").eq(i).find("prod qCom").text());
            array_items.prodvUnCom = (xml.find("det").eq(i).find("prod vUnCom").text());
            array_items.prodvProd = (xml.find("det").eq(i).find("prod vProd").text());
            array_items.produTrib = (xml.find("det").eq(i).find("prod uTrib").text());
            array_items.prodqTrib = (xml.find("det").eq(i).find("prod qTrib").text());
            array_items.prodvUnTrib = (xml.find("det").eq(i).find("prod vUnTrib").text());
            array_items.prodvOutro = (xml.find("det").eq(i).find("prod vOutro").text());
            array_items.prodindTot = (xml.find("det").eq(i).find("prod indTot").text()); 

            //   Dados de Imposto
            array_items.impostoorig = (xml.find("det").eq(i).find("imposto ICMS orig").text());
            array_items.impostoICMSCST = (xml.find("det").eq(i).find("imposto ICMS CST").text());
            array_items.impostomodBC = (xml.find("det").eq(i).find("imposto ICMS  modBC").text());
            array_items.impostovBC = (xml.find("det").eq(i).find("imposto ICMS  vBC").text());
            array_items.impostopICMS = (xml.find("det").eq(i).find("imposto ICMS  pICMS").text());
            array_items.impostovICMS = (xml.find("det").eq(i).find("imposto ICMS  vICMS").text());
            array_items.impostovBCSTRet = (xml.find("det").eq(i).find("imposto ICMS vBCSTRet").text());
            array_items.impostovICMSSTRet = (xml.find("det").eq(i).find("imposto ICMS vICMSSTRet").text());
            array_items.impostoPISCST = (xml.find("det").eq(i).find("imposto PIS PISAliq CST").text());
            array_items.impostoPISvBC = (xml.find("det").eq(i).find("imposto PIS PISAliq vBC").text());
            array_items.impostoPISpPIS = (xml.find("det").eq(i).find("imposto PIS PISAliq pPIS").text());
            array_items.impostoPISvPIS = (xml.find("det").eq(i).find("imposto PIS PISAliq vPIS").text());
            array_items.impostoPISqBCProd = (xml.find("det").eq(i).find("imposto PIS qBCProd").text());
            array_items.impostoPISvAliqProd = (xml.find("det").eq(i).find("imposto PIS vAliqProd").text());
            array_items.impostoCOFINSCST = (xml.find("det").eq(i).find("imposto COFINS COFINSAliq CST").text());
            array_items.impostoCOFINSvBC = (xml.find("det").eq(i).find("imposto COFINS COFINSAliq vBC").text());
            array_items.impostoCOFINSpCOFINS = (xml.find("det").eq(i).find("imposto COFINS COFINSAliq pCONFINS").text());
            array_items.impostoCOFINSvCOFINS = (xml.find("det").eq(i).find("imposto COFINS COFINSAliq vCONFINS").text());
            array_items.impostoCOFINSqBCProd = (xml.find("det").eq(i).find("imposto COFINS qBCProd").text());
            array_items.impostoCOFINSvAliqProd = (xml.find("det").eq(i).find("imposto COFINS vAliqProd").text());

            db.run(`INSERT INTO produto(id_nota_fiscal, codigo_produto, descricao_produto, codigo_ncm, codigo_fiscal_operacoes_prestacoes,
                        unidade_comercial, quantidade_comercial, valor_unitario_comercial, valor_total_produtos_e_servicos, 
                        unidade_tributavel, quantidade_tributavel, valor_unitario_tributacao, outras_despesas, valor_item_entra_no_total_nf, 
                        ICMS_origem_mercadoria, ICMS_tributaçao, modalidade_determinaçao_BC, valor_BC_ICMS, aliquota_imposto_ICMS, valor_ICMS, valor_BC_ICMSST_retido, 
                        valor_ICMSST_retido, codigo_situação_tributaria_PIS, valor_base_calculo_PIS, aliquota_PIS_percentual, valor_PIS,quantidade_vendida_PIS, 
                        aliquota_PIS_reais, codigo_situaçao_tributaria_COFINS, valor_base_calculo_COFINS, aliquota_COFINS_percentual, valor_COFINS, quantidade_vendida_COFINS, 
                        aliquota_COFINS_reais) VALUES
                        (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
            array_db.id,
            array_items.prodcProd,
            array_items.prodxProd,
            array_items.prodNCM,
            array_items.prodCFOP, 
            array_items.produCom,
            array_items.prodqCom, 
            array_items.prodvUnCom, 
            array_items.prodvProd, 
            array_items.produTrib, 
            array_items.prodqTrib, 
            array_items.prodvUnTrib, 
            array_items.prodvOutro, 
            array_items.prodindTot,


            array_items.impostoorig, 
            array_items.impostoICMSCST,
            array_items.impostomodBC,
            array_items.impostovBC,
            array_items.impostopICMS,
            array_items.impostovICMS, 
            array_items.impostovBCSTRet, 
            array_items.impostovICMSSTRet, 
            array_items.impostoPISCST, 
            array_items.impostoPISvBC, 
            array_items.impostoPISpPIS, 
            array_items.impostoPISvPIS,
            array_items.impostoPISqBCProd,
            array_items.impostoPISvAliqProd, 
            array_items.impostoCOFINSCST, 
            array_items.impostoCOFINSvBC, 
            array_items.impostoCOFINSpCOFINS, 
            array_items.impostoCOFINSvCOFINS,
            array_items.impostoCOFINSqBCProd,
            array_items.impostoCOFINSvAliqProd
            ], function(err){
              console.log(err);
            });

          }

          // Dados Total
          array_db.totalvBC = (xml.find("total ICMSTot vBC").text());
          array_db.totalvICMS = (xml.find("total ICMSTot vICMS").text());
          array_db.totalvICMSDeson = (xml.find("total ICMSTot vICMSDeson").text());
          array_db.totalvICMSUFDest = (xml.find("total ICMSTot vICMSUFDest").text());     
          array_db.totalvFCPUFDest = (xml.find("total ICMSTot vFCPUFDest").text());
          array_db.totalvICMSUFRemet = (xml.find("total ICMSTot vICMSUFRemet").text());
          array_db.totalvBCST = (xml.find("total ICMSTot vBCST").text());
          array_db.totalvST = (xml.find("total ICMSTot vST").text());
          array_db.totalvProd = (xml.find("total ICMSTot vProd").text());
          array_db.totalvFrete = (xml.find("total ICMSTot vFrete").text());
          array_db.totalvSeg = (xml.find("total ICMSTot vSeg").text());
          array_db.totalvDesc = (xml.find("total ICMSTot vDesc").text());
          array_db.totalvII = (xml.find("total ICMSTot vII").text());
          array_db.totalvIPI = (xml.find("total ICMSTot vIPI").text());
          array_db.totaalvPIS = (xml.find("total ICMSTot vPIS").text());
          array_db.totalvCOFINS = (xml.find("total ICMSTot vCONFINS").text());
          array_db.totalvOutro = (xml.find("total ICMSTot vOutro").text());
          array_db.totalvNF = (xml.find("total ICMSTot vNF").text());

          // //Dados de Transporte
          array_db.transpmodFrete = (xml.find("transp modFrete").text());
          array_db.transpCNPJ = (xml.find("transp transporta CNPJ").text());
          array_db.transpxNome = (xml.find("transp transporta xNome").text());
          array_db.transpIE = (xml.find("transp transporta IE").text());
          array_db.transpxEnder = (xml.find("transp transporta xEnder").text());
          array_db.transpxMun = (xml.find("transp transporta xMun").text());
          array_db.transpUF = (xml.find("transp transporta UF").text());
          array_db.transpplaca = (xml.find("transp veicTransp placa").text());
          array_db.transpveicUF = (xml.find("transp veicTransp UF").text());
          array_db.transpqVol = (xml.find("transp vol qVol").text());
          array_db.transpesp = (xml.find("transp vol esp").text());
          array_db.transppesoL = (xml.find("transp vol pesoL").text());
          array_db.transppesoB = (xml.find("transp vol pesoB").text());
          array_db.transpCPF = (xml.find("transp transporta CPF").text());

          // Dados de Cobrança
          array_db.cobrnFat = (xml.find("cobr fat nFat").text());
          array_db.cobrvOrig = (xml.find("cobr fat vOrig").text());
          array_db.cobrvLiq = (xml.find("cobr fat vLiq").text());
          array_db.cobrnDup = (xml.find("cobr dup nDup").text());
          array_db.cobrdVenc = (xml.find("cobr dup dVenc").text());
          array_db.vDup = (xml.find("cobr dup vDup").text());

          // Informações Adicionais
          array_db.InfCpl = (xml.find("infAdic InfCpl").text());

          array_infos_db.push(array_db);
          array_prods_db.push(array_items);

          db.run('INSERT INTO nota_fiscal(id, versao, codigo_uf_emitente, codigo_chave_acesso, natureza_operacao, forma_pagamento, modelo_documento_fiscal, serie_documento_fiscal, numero_documento_fiscal, data_hora_emissao, data_hora_saida_entrada, tipo_operacao, codigo_municipio_fato_gerador, formato_impressao, tipo_emissao, digito_verificador_chave_acesso, tipo_ambiente, finalidade_emissao_nf, indFinal, indPres, processo_emissao_nfe, versao_processo_emissao_nfe, cnpj_emitente, cpf_emitente, razao_social_nome_emitente, nome_fantasia_emitente, logradouro_emitente, numero_emitente, complemento_emitente, bairro_emitente, codigo_municipio_emitente, municipio_emitente, uf_sigla_emitente, codigo_cep_emitente, codigo_pais_emitente, pais_emitente, telefone_emitente, codigo_regime_tributario_emitente, cnpj_destinatario, cpf_destinatario, razao_social_nome_destinatario, nome_fantasia_destinatario, logradouro_destinatario, numero_destinatario, complemento_destinatario, bairro_destinatario, codigo_municipio_destinatario, municipio_destinatario, uf_sigla_destinatario, codigo_cep_destinatario, codigo_pais_destinatario, pais_destinatario, telefone_destinatario, codigo_regime_tributario_destinatario, quantidade_itens, base_calculo_icms, valor_total_icms, vICMSDeson, vFCPUFDest, vICMSUFDest, vICMSUFRemet, base_calculo_icmsst, valor_total_icmsst, valor_total_produtos_e_servicos, valor_total_frete, valor_total_seguro, valor_total_desconto, valor_total_ii, valor_total_ipi, valor_total_pis, valor_total_cofins, valor_total_outros, valor_total_nf, modalidade_frete, cnpj_transportador, cpf_transportador, razao_social_nome_transportador, inscricao_estadual_transportador, endereco_completo_transportador, nome_municipio_transportador, uf_sigla_transportador, placa_veiculo_transportador, sigla_veiculo_transportador, quantidade_volumes_transportados, especie_volumes, peso_liquido, peso_bruto, numero_fatura, valor_original, valor_liquido, numero_duplicata, data_vencimento, valor_duplicata, informacoes_adicionais) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            array_db.id, 
            array_db.versao,
            array_db.cuf,
            array_db.cnf,
            array_db.natop,
            array_db.indPag,
            array_db.mod,
            array_db.serie,
            array_db.nNF,
            array_db.dhEmi,
            array_db.dhSainEnt,
            array_db.tpNF,
            array_db.cMunFG,
            array_db.tpImp,
            array_db.tpEmis,
            array_db.cDV,
            array_db.tpAmb,
            array_db.finNFe,
            array_db.indFinal,
            array_db.indPres,
            array_db.procEmi,
            array_db.verProc,
            array_db.emitCNPJ,
            array_db.emitCPF, 
            array_db.emitNome, 
            array_db.emitFant, 
            array_db.emitLgr,
            array_db.emitnro,
            array_db.emitComplemento,
            array_db.emitBairro,
            array_db.emitcMun,
            array_db.emitxMun,
            array_db.emitUF,
            array_db.emitCEP,
            array_db.emitcPais,
            array_db.emitxPais,
            array_db.emitfone,
            array_db.emitIE,
            array_db.emitCRT,
            array_db.destCNPJ,
            array_db.destCPF,
            array_db.destNome,
            array_db.destFant,
            array_db.destLgr,
            array_db.destnro,
            array_db.destComplemento,
            array_db.destBairro,
            array_db.destcMun,
            array_db.destxMun,
            array_db.destUF,
            array_db.destCEP,
            array_db.destcPais,
            array_db.destxPais,
            array_db.destfone,
            array_db.destindIEDest,
            array_db.totalvBC,
            array_db.totalvICMS,
            array_db.totalvICMSDeson,
            array_db.totalvICMSUFDest,
            array_db.totalvFCPUFDest,
            array_db.totalvICMSUFRemet,
            array_db.totalvBCST,
            array_db.totalvST,
            array_db.totalvProd,
            array_db.totalvFrete,
            array_db.totalvSeg,
            array_db.totalvDesc,
            array_db.totalvII,
            array_db.totalvIPI,
            array_db.totaalvPIS,
            array_db.totalvCOFINS,
            array_db.totalvOutro,
            array_db.totalvNF,
            array_db.transpmodFrete,
            array_db.transpCNPJ,
            array_db.transpCPF,
            array_db.transpxNome,
            array_db.transpIE,
            array_db.transpxEnder,
            array_db.transpxMun,
            array_db.transpUF,
            array_db.transpplaca,
            array_db.transpveicUF,
            array_db.transpqVol,
            array_db.transpesp,
            array_db.transppesoL,
            array_db.transppesoB,
            array_db.cobrnFat,
            array_db.cobrvOrig,
            array_db.cobrvLiq,
            array_db.cobrnDup,
            array_db.cobrdVenc,
            array_db.vDup,
            array_db.InfCpl
          ], function(err){
            console.log(err);
          });
          
          console.log(teste+ ' foi inserido');
        
        }else if (filtro.indexOf(teste) >= 0){
          
          console.log(teste+ ' ja foi inserido');

          ja_inseridos = ja_inseridos + 1;
          $("#n_arquivos_duplicados").html(ja_inseridos);
        
        }
            
   
      }

    });

  }

  


  hoje = new Date();
  hoje = hoje.getDay()+"_"+(hoje.getMonth() + 1)+"_"+hoje.getFullYear();

  xls = new XlsExport(array_infos_db, "Base_Dados_"+hoje);

  $("#salvar").css('display', 'block');

  $("#informacoes_importacao").html(`
  <div class="col alert alert-warning" role="alert">
    <span id="n_arquivos_duplicados">0</span> arquivos pulados por já terem sido adicionados ao banco.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`);

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