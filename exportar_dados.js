    function FiltrarColunas(){

        colunas = $("#list-2 li");

        label_colunas = [];
        titulo_colunas = [];

        for(i = 0; i < colunas.length; i++){

            label_colunas.push(colunas.eq(i).attr("campo"));
            titulo_colunas.push(colunas.eq(i).html());

        }

        console.log(label_colunas); //ISSO AQUI SÃO TODAS AS COLUNAS QUE ELA SELECIONOU

        colunas_sql = label_colunas.join();

        console.log(colunas_sql); //TU VAI JOGAR ISSO NO SQL
        
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

	// exportarParaExcel();
    
   