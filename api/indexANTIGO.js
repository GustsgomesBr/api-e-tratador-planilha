const express = require ('express');

app = express();

app.listen(8080, function(){console.log('o servidor está rodando na porta 8080')})

var tiposPeticao = {
contestacao: ["Contestação", "contestacao"], 
recurso: ["Recurso Inominado", "recurso"], 
outros: ["Outros", "guia", "anexo", "documento", "comprovante"], 
impugnacao: ["Impugnação", "impugnacao"] 
}
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,");
    next();
  });

function Tratar(plan){
	const planilha = plan
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

if(typeof XLSX == 'undefined') XLSX = require('xlsx');

/* make the worksheet */
var ws = XLSX.utils.json_to_sheet(planilha);

/* add to workbook */
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "People");

/* generate an XLSX file */
XLSX.writeFile(wb, "planilharesposta.xlsx");
//	document.getElementById('textareaid').value = JSON.stringify(planilha)
}









app.get('/planilha', function(req, resp)
{
	var jsonfile = req.query.json;
	Tratar(JSON.parse(jsonfile))
	resp.send("ok")

})