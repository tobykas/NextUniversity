
document.getElementById('boton-receta1').addEventListener('click', function(){
	var ingredientes= ['claras de huevo', 'Azucar Blanca', 'Leche Condensada', 'Limon', 'Gelatina'];
	var unidadesClaradehuevo = 0;
	var unidadesAzucarBlanca = 150;
	var GramosdeLecheCondesada = 200;
	var GramosGelatina = 200;
	var SobreLimones = 1;

	console.log( "Primero debes adicionar" + unidadesClaradehuevo + "de" + ingredientes[0]);

	console.log( "en un bol" + unidadesAzucarBlanca + " gramos de" + ingredientes[1]);

	console.log(" y batir" + "Adicionar" + GramosdeLecheCondesada + "gramos de" + ingredientes[2] + "y batir bien.");

	console.log("Una vez terminado esto adicionar" + SobreLimones + ingredientes[3]
		+ "y " + GramosGelatina "gramos de" + ingredientes[4] + "hidratada en agua tinia."
		"En 30 minutos estara listo");
})

document.getElementById('boton-receta2').addEventListener('click', function(){
	var ingredientes= ['claras de huevo', 'Azucar Blanca', 'Leche Condensada', 'Limon'
	'Gelatina'];
	var unidadesClaradehuevo = 0;
	var unidadesAzucarBlanca = 150;
	var GramosdeLecheCondesada = 200;
	var GramosGelatina = 200;
	var SobreLimones = 1;

	console.log( "Primero debes adicionar" + unidadesClaradehuevo + "de" + ingredientes[0]);

	console.log( "en un bol" + unidadesAzucarBlanca + " gramos de" + ingredientes[1]);

	console.log(" y batir" + "Adicionar" + GramosdeLecheCondesada + "gramos de" + ingredientes[2] + "y batir bien.");

	console.log("Una vez terminado esto adicionar" + SobreLimones + ingredientes[3]
		+ "y " + GramosGelatina "gramos de" + ingredientes[4] + "hidratada en agua tinia."
		"En 30 minutos estara listo");
})
