var xmlt= new XMLHttpRequest();
function projudimt(login, password){
    xmlt.open('GET', "http://localhost:8080/projudiMT?login="+ login +"&senha="+ password);
    xmlt.send("http://localhost:8080/projudiMT?login="+ login +"&senha="+ password)
    xmlt.onreadystatechange = function(){
        if(xmlt.readyState === 4){
            if(xmlt.status === 200){
                if(xmlt.responseText = "OK"){
                console.log("RESPOSTA OK!")
                projudimtloged(xmlt.responseText)
                }
            }
        }
    }

}
function projudimtloged(resposta){
    if (resposta = "OK"){
        document.location.href = "ProjudiLoged.html";
    }

}


var resposta = {}

function getTheText(nomeuser, responsenumber){
    xmlt.open('GET', "http://localhost:8080/atribuicao?nome="+nomeuser);
    xmlt.send("http://localhost:8080/atribuicao?nome="+nomeuser);
    console.log("loading")
        xmlt.onreadystatechange = function(){
        if(xmlt.readyState === 4){
            if(xmlt.status === 200){
            resposta = JSON.parse(xmlt.responseText);
            console.log(resposta)
        }
        }
    }

}
var innnt = 0;
var mudartotal = document.getElementById("totall"+0);
 function update(){
        
        
        getTheText(controladores[innnt]);
        var timer = setTimeout(function(){
            if(innnt < 11){
                mudartotal.innerHTML = resposta.total;
                update();
            }else{
                innnt = 0;
            }
    }, 200)
    
    console.log(resposta.total)
    mudartotal = document.getElementById("totall"+innnt);
    console.log('valor de int: '+innnt)
    innnt++
 }
 
