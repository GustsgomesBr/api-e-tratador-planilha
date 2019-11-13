const express = require ('express');

app = express();

app.listen(8080, function(){console.log('o servidor está rodando na porta 8080')})

var tiposPeticao = {
arquivo: ["contestacao", "recurso", "impugnacao", "peticao", "execucao", "procuracao", "documento", "comprovante", "anexo", "guia", "pagamento", "contrato"],
equivalenciaTIPO: ["Contestação", "Recurso Inominado", "Impugnação de calculo", "Petição", "Solicitação de Execução de Sentença"],
equivalenciaTIPO_ARQUIVO: ["Contestação", "Petição", "Petição", "Petição", "Petição", "Procuração", "Outros", "Outros", "Outros", "Outros", "Outros"],
arquivoDescricao: ["", "", "", "", "", "", "Documentos", "Comprovante", "Anexo", "Guias", "Comprovante de Pagamento", "Contrato"]
}
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,");
    next();
  });

function Tratar(plan){
	const planilha = plan
	var i = 0;
	var ultimoanexo = {ultimoTipo: "", ultimoId:""};

	while (i < planilha.length){
		let int = 0
		while(int < tiposPeticao.arquivo.length){
			if (planilha[i].ARQUIVO.search(tiposPeticao.arquivo[int]) != '-1'){
				planilha[i].TIPO = tiposPeticao.equivalenciaTIPO[int]
				planilha[i].TIPO_ARQUIVO = tiposPeticao.equivalenciaTIPO_ARQUIVO[int];
				
				if (int > 5){
					planilha[i].DESCRICAO = tiposPeticao.arquivoDescricao[int];
				}else{
					planilha[i].DESCRICAO = ""
				}
				if (ultimoanexo.ultimoId === planilha[i].NOME.replace(/ .*/,'')){
					planilha[i].TIPO = ultimoanexo.ultimoTipo;
				}else{
				ultimoanexo.ultimoTipo = planilha[i].TIPO
				ultimoanexo.ultimoId = planilha[i].NOME.replace(/ .*/,'');
				}
			}
			console.log(planilha[i])
			int++	
		}


		i++;

	}

if(typeof XLSX == 'undefined') XLSX = require('xlsx');

var ws = XLSX.utils.json_to_sheet(planilha);

var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Planilha");

XLSX.writeFile(wb, "planilharesposta.xlsx");
}



app.get('/planilha', function(req, resp)
{
	var jsonfile = req.query.json;
	Tratar(JSON.parse(jsonfile))
	resp.send("ok")

})