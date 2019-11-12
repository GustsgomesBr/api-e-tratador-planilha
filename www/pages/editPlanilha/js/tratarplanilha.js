var tiposPeticao = {
contestacao: ["Contestação", "contestacao"], 
recurso: ["Recurso Inominado", "recurso"], 
outros: ["Outros", "guia", "anexo", "documento", "comprovante"], 
impugnacao: ["Impugnação", "impugnacao"] 
}



function Tratar(){
	const planilha = JSON.parse(jsonconvertido);
	console.log(planilha.length)
	var i = 0;
	var ultimoanexo = {ultimoTipo: "", ultimoId:""};

	while (i < planilha.length){
		if (planilha[i].NOME.search(tiposPeticao.contestacao[1]) != '-1' || planilha[i].NOME.search(tiposPeticao.contestacao[0]) != '-1' && planilha[i].NOME.search(tiposPeticao.impugnacao[1]) ==  '-1'){
			planilha[i].TIPO = tiposPeticao.contestacao[0]
			planilha[i].TIPO_ARQUIVO = tiposPeticao.contestacao[0]
			planilha[i].DESCRICAO = ""
			ultimoanexo.ultimoTipo = planilha[i].TIPO
			ultimoanexo.ultimoId = planilha[i].NOME.replace(/ .*/,'');
		}else if(planilha[i].NOME.search(tiposPeticao.recurso[1]) != '-1'){
			planilha[i].TIPO = tiposPeticao.recurso[0]
			planilha[i].TIPO_ARQUIVO = "Petição"
			planilha[i].DESCRICAO = ""
			ultimoanexo.ultimoTipo = planilha[i].TIPO
			ultimoanexo.ultimoId = planilha[i].NOME.replace(/ .*/,'');
		}else if (
			planilha[i].NOME.search(tiposPeticao.outros[1]) != '-1' || 
			planilha[i].NOME.search(tiposPeticao.outros[2]) != '-1' ||
			planilha[i].NOME.search(tiposPeticao.outros[3]) != '-1' ||
			planilha[i].NOME.search(tiposPeticao.outros[4]) != '-1'
			){
			
			if (ultimoanexo.ultimoId === planilha[i].NOME.replace(/ .*/, '')){
			planilha[i].TIPO = ultimoanexo.ultimoTipo;	
			}
			
			planilha[i].TIPO_ARQUIVO = tiposPeticao.outros[0]
			planilha[i].DESCRICAO = planilha[i].NOME;
		}
		console.log(planilha[i])
		console.log(ultimoanexo)

	i++;

	}

//	document.getElementById('textareaid').value = JSON.stringify(planilha)

}