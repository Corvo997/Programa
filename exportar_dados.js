var y = 1;
teste = [];
opt = [];

function comboCaixa(){
 adicionar = true;
 

 var escModelo = document.getElementById("escolhido");
 
  let selt = `SELECT nome FROM filtro`;
 
db.all(selt, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    teste.push(row.nome);
  });
});
  
  for (var i = 0; i < teste.length; i++) {
  		if (teste[i] == escModelo.options[i].value) {
  			console.log('ja existe');
  			adicionar = false;
  		}
    
   	 if (adicionar == true) {
    opt[i] = document.createElement("option");
    opt[i].text = teste[i];
    escModelo.add(opt[i], escModelo.options[i]);
    }
  }
}

comboCaixa();


function EscolhaCombo(){
  result= [];
  var escModelo = document.getElementById("escolhido");
  indic = escModelo.selectedIndex;
  escolha = escModelo.options[escModelo.selectedIndex].text;
  console.log(escolha);

  let valt = `SELECT itens FROM filtro WHERE nome = ?`;
 
  db.all(valt, [escolha], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      $("#list-1").append($("#list-2").html());
      $("#list-2").empty();
      for(i = 0; i < row.itens.split("@;,").length; i++)  
        $(`.opcao[campo="${row.itens.split("@;,")[i]}"]`).detach().appendTo('#list-2');
    });
  });
}




function FiltrarColunas(){

        colunas = $("#list-2 li");

        label_colunas = [];
        titulo_colunas = [];
        id_colunas = [];

        for(i = 0; i < colunas.length; i++){

            label_colunas.push(colunas.eq(i).attr("campo"));
            titulo_colunas.push(colunas.eq(i).html());

        }
        
        colunas_sql = label_colunas.join();
        

        exportarParaExcel(colunas_sql, titulo_colunas);
        
}

    

function exportarParaExcel(sql, header) {
    
    array_teste = 'SELECT '+sql+' FROM nota_fiscal INNER JOIN produto ON id_nota_fiscal = id';
	dados = [];

	dados.push(header);

	db.all(array_teste, [], (err, rows) => {
	  if (err) {
	    throw err;
	  }
	  rows.forEach((row) => {
	  	dados.push(Object.keys(row).map(function(_) { return row[_]; }));
	  });
		var universalBOM = "\uFEFF";
		csvContent = "data:text/csv;charset=utf-8," + universalBOM + dados.map(e => e.join(";")).join("\n");
		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "my_data.csv");
		document.body.appendChild(link); // Required for FF

		link.click(); // This will download the data file named "my_data.csv".

		// var a = window.document.createElement('a');
		// a.setAttribute('href', 'data:text/csv; charset=utf-8,' + encodeURIComponent(universalBOM+dados));
		// a.setAttribute('download', 'my_data.csv');
		// window.document.body.appendChild(a);
		// a.click();


	});

}

function salvarFiltro(){
      adicionar = true;
      verific = [];

      let ver = `SELECT nome FROM filtro`;
 
db.all(ver, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    verific.push(row.nome);
  });
});

      dialogs.prompt('Digite um nome para o filtro:','Filtro'+y,filt => {
      nomeFiltro = filt; 
        
        if ( nomeFiltro == "") {
            dialogs.alert("Precisa de um nome");
            adicionar = false;
        }
        else if(nomeFiltro == null){
            adicionar = false;
        }
        
        if (verific.indexOf(nomeFiltro) > -1){
              dialogs.alert('Já existe um filtro com este nome');
              adicionar = false;
        }

            
        if (adicionar == true) {   
                   colunas = $("#list-2 li");
                   id_colunas = [];
                   for(j = 0; j < colunas.length; j++){
                       id_colunas.push(colunas.eq(j).attr("campo"));
                    }
                   id_filtro = id_colunas.join("@;,");
                   db.run(`INSERT INTO filtro(itens,nome) VALUES(?,?)`,
                   [
                   id_filtro,
                   nomeFiltro
                   ], function(err){
                   console.log(err);
                   salvarLista(nomeFiltro);
                   });
                   
                   
        }
          
      })

         
     y++;
      
      	
}
    
function salvarLista(name){
	adicionar = true;

var escModelo = document.getElementById("escolhido");
  opt = document.createElement("option");
    opt.text = name;
    escModelo.appendChild(opt);
}