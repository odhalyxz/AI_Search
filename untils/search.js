/*Busquedas*/
//var lnodes,vnodes,limp;

var matrixAd;
var tamMax;
var maxIteraIN=Number.POSITIVE_INFINITY;
/*C*/
var cola,nodosV,limp;
var ruta,antecesor,auxiliar,precio;
/*C*/
function $(qs){
    return document.querySelector(qs);
}
$('#opt').addEventListener('change', filas);

function filas () {
    var str = "";
    var hola=$( "select#opt" ).val();
    var padre = document.getElementById("buu");
    var padre2 = document.getElementById("holas");
    $('.desaparecer').hide();
      while (padre.hasChildNodes())
        padre.removeChild(padre.firstChild);
    if(hola==2){
        var input = document.createElement("INPUT"); 
        input.setAttribute("class","form-control");
        input.setAttribute("type","number");
        input.id = "prof"; // 3        
        input.type = 'text';
        padre.appendChild(input);
    }
    if(hola==6 || hola==7 || hola==1 || hola==2 || hola==3 || hola==4){
        //var input = document.createElement("INPUT"); 
        $('.desaparecer').hide();
        console.log("buuu");
        //input.id = "edge_num"; // 3        
        //input.type = 'number';
        //padre2.appendChild(input);
        //<!--<input placeholder="Agrega el Costo" id='edge_num' type="number">
              -->
    }
    if(hola==5){
        //var input = document.createElement("INPUT"); 
        $('.desaparecer').show();
        console.log("buuu");
        //input.id = "edge_num"; // 3        
        //input.type = 'number';
        //padre2.appendChild(input);
        //<!--<input placeholder="Agrega el Costo" id='edge_num' type="number">
              -->
    }
    
    

}
function matrixAdyacenciaInit(data)
{
    tamMax=data.nodes.length;
    matrixAd= new Array(tamMax);

    for (i = 1; i <= tamMax; i++){
      matrixAd[i]=new Array(tamMax);
      for(j = 1; j<= tamMax ; j++)
        matrixAd[i][j]=0;
    }
    //imprimeMAX(matrixAd,tam);
    for (i = 1; i <= tamMax; i++){
        for (var id in data.edges._data) {
          if(data.edges._data[id].from == i){
            //console.log("ban1",data.edges._data[id].to);
            matrixAd[i][data.edges._data[id].to]=1;
          }
          if(data.edges._data[id].to == i){
            //console.log("ban2",data.edges._data[id].from);
            matrixAd[i][data.edges._data[id].from]=1;
          }
        }
        //console.log("\n");
    }
    //imprimeMAX(matrixAd,tam);
}

function search(ei,ef,tsearch,data){
  //console.log("hola",network.);
  console.log("aqui ne search",data.nodes);
 // console.log("ids de los nodos",data.nodes._data[1].id);
 // var coorde=[];
  //for(var i=1;i<=3 ;i++){
    //coorde[i]=data.nodes._data[i].id;
  //}
  //console.log("ids de los nodos en Array",coorde);
  console.log("Coordenadas",network.getPositions());
 // console.log("Coordenadas",network.getPositions(1));

  //ei=3;
  //ef=4;
  document.getElementById('data').innerHTML = "";

  /*if(ei==null || ef==null){
    alert("NO");
    return false;
  }*/
  //var limite = document.getElementById('opt').options[document.getElementById('opt').selectedIndex].innerHTML;
  
  console.log("limite x", limite);
  matrixAdyacenciaInit(data);
  if(tsearch==4){
    
    console.log("Amplitud\n");
    busquedasI(ei,ef,tsearch);
  }
  if(tsearch==1){
    
    console.log("Profundidad\n");
    busquedasI(ei,ef,tsearch);
  }
  if(tsearch==2)
  {
    
    var limite= parseInt(document.getElementById('prof').value);
    console.log("Este es el limite finamico",limite)
    console.log("Profundidad Limitada :P");
    profundidadLimitada(ei,ef,limite);
  }
  if(tsearch==3)
  {

    console.log("profundidadIterativa");
    profundidadIterativa(ei,ef);
  }
  if(tsearch==5)
  {
    matrixAdyacenciaInit2(data);
    console.log("costo uniforme");
    costo(ei,ef);
  }
  if(tsearch==6)
  {
    matrixAdyacenciaInit2(data);
    avara(ei,ef);
  }
  if(tsearch==7)
  {
      matrixAdyacenciaInit2(data);
      asterisco(ei,ef);
      console.log("Estoy en A*",tsearch);
  }
}
function asterisco(ei,ef)
{
  console.log("Coor",data.nodes);
  var distancias=new Array();
  distancias=calculaDistan(ef);
  //console.log(distancias);


  /****************/
 // var matrixEDP=new Array(3);
  var nodos=new Array();
  var costo=new Array();
  var u;
  txt="";
  //tam=matrixAd.length;
  var tam=data.nodes.length;
  matrixEDP= new Array(tam);
  for(i=1; i<=tam; i++){
    matrixEDP[i]=new Array(4);
    for(j=1; j<=4; j++){
      matrixEDP[i][1]=-1;
      matrixEDP[i][2]=Number.POSITIVE_INFINITY;
      matrixEDP[i][3]=null;
      matrixEDP[i][4]=0; //Suma de costos
    }
  }
  imprimeMAX(matrixAd,tam,tam);

  matrixEDP[ei][2]=0;
  nodos.push(ei);
  costo.push(distancias[ei]);
  txt=txt+""; 
  band = 0;
  while(nodos.length>0 && band != 1 ){

    txt=txt+"[ ";
      for(var j=0; j<nodos.length; j++)
        txt=txt+" "+data.nodes._data[nodos[j]].label+"("+(costo[j].toFixed(2))+")";  
    txt=txt+" ]<br>";
    
    u=costo.shift();
    u=nodos.shift();    
    if(u==ef)
      band=1;
    matrixEDP[u][1]=1;
    for(i=1; i<=matrixAd.length; i++){
      if(matrixAd[u][i]>(-1))
        if(matrixEDP[i][1]==-1 && matrixEDP[i][2]>(matrixEDP[u][4]+matrixAd[u][i]+distancias[i])){
          matrixEDP[i][4]=matrixEDP[u][4]+matrixAd[u][i];
          matrixEDP[i][2]=matrixEDP[i][4]+distancias[i];
          matrixEDP[i][3]=u;
           
          //f(matrixEDP[i][1]==-1 && matrixEDP[i][2]>(matrixEDP[u][2]+matrixAd[u][i])){
          //matrixEDP[i][2]=matrixEDP[u][2]+matrixAd[u][i];
           nodos.push(i);
           costo.push(matrixEDP[i][2]);
           console.log(" f(n)     matrixEDP[i][4]",matrixEDP[i][4]);
           console.log("(f(n)+g(n))  matrixEDP[i][2]",matrixEDP[i][2]);
           console.log(" padre matrixEDP[i][3]",matrixEDP[i][3]);
           console.log("-----------------------");
        }
    }
    console.log(nodos);
    for(i=1; i<costo.length; i++)
      for(j=0; j<costo.length-i; j++){
        if(costo[j]>costo[j+1]){
          aux=costo[j];
          costo[j]=costo[j+1];
          costo[j+1]=aux;

          aux=nodos[j];
          nodos[j]=nodos[j+1];
          nodos[j+1]=aux;
        }
      }
    console.log(nodos);
  }
  var meta=returnRutaSol(matrixEDP,ei,ef);
  //console.log("Ruta Solucion",meta);
  //console.log("Costo",matrixEDP[ef][2]);
  //console.log("Matriz de EDP",matrixEDP);

  txt+="<br>Ruta Solucion: ";
  txt+="<br>{ "
  for(var i=0;i<meta.length;i++){
    txt+=data.nodes._data[meta[i]].label+",";
  }
  txt+="}"
  txt+="<br>Costo Ruta: "+matrixEDP[ef][4];

  document.getElementById('data').innerHTML = txt;
  //imprime(matrixEDP,ei,ef,txt);*/
 // console.log("costo total "+matrixEDP[ef][2]);
  //imprimeMAX(matrixEDP,tam,3);
  
  printHeu(distancias,ef);
  imprimeDOM();
}
function imprimeDOM()
{
  console.log("matrixAd",matrixAd);
  var gDis="";
  for (i = 1; i <= matrixAd[1].length; i++){
        for (var id in data.edges._data) {
          if(data.edges._data[id].from == i){
            
            var uno = data.edges._data[id].to;
            if(opt == 6 || opt ==7 ){
              gDis+="d("+i +","+data.nodes._data[uno].id+")=";
              gDis+= getDistancias(data.nodes._data[uno].x,data.nodes._data[uno].y,data.nodes._data[i].x,data.nodes._data[i].y).toFixed(2);
              gDis+="<br>";
            }
          }
          
        }
    }
    console.log("aui concatenado",gDis);
    document.getElementById('gDis').innerHTML = gDis;

}
function avara(ei,ef)
{
  console.log("Coor",data.nodes);
  var distancias=new Array();
  distancias=calculaDistan(ef);
  console.log(distancias);


  /****************/
 // var matrixEDP=new Array(3);
  var nodos=new Array();
  var costo=new Array();
  var u;
  txt="";
  //tam=matrixAd.length;
  var tam=data.nodes.length;
  matrixEDP= new Array(tam);
  for(i=1; i<=tam; i++){
    matrixEDP[i]=new Array(4);
    for(j=1; j<=4; j++){
      matrixEDP[i][1]=-1;
      matrixEDP[i][2]=Number.POSITIVE_INFINITY;
      matrixEDP[i][3]=null;
      matrixEDP[i][4]=0; //Suma de costos
    }
  }
  imprimeMAX(matrixAd,tam,tam);

  matrixEDP[ei][2]=0;
  nodos.push(ei);
  costo.push(distancias[ei]);
  txt=txt+""; 
  band = 0;
  while(nodos.length>0 && band!=1){

    txt=txt+"[ ";
      for(var j=0; j<nodos.length; j++)
        txt=txt+" "+data.nodes._data[nodos[j]].label+"("+distancias[nodos[j]].toFixed(2)+")";  
    txt=txt+" ]<br>";
    
    u=costo.shift();
    u=nodos.shift();    
    if(u==ef)
      band=1;
    matrixEDP[u][1]=1;
    for(i=1; i<=matrixAd.length; i++){
      if(matrixAd[u][i]>(-1))
        if(matrixEDP[i][1]==-1 && matrixEDP[i][2]>(distancias[i])){
          matrixEDP[i][4]=matrixEDP[u][4]+matrixAd[u][i];
          matrixEDP[i][2]=distancias[i];
          matrixEDP[i][3]=u;
           

           nodos.push(i);
           costo.push(distancias[i]);
        }
    }
    for(i=1; i<costo.length; i++)
      for(j=0; j<costo.length-i; j++){
        if(costo[j]>costo[j+1]){
          aux=costo[j];
          costo[j]=costo[j+1];
          costo[j+1]=aux;

          aux=nodos[j];
          nodos[j]=nodos[j+1];
          nodos[j+1]=aux;
        }
      }
    console.log(nodos);
  }
  var meta=returnRutaSol(matrixEDP,ei,ef);
  console.log("Ruta Solucion",meta);
  //console.log("Costo",matrixEDP[ef][2]);
  console.log("Matriz de EDP",matrixEDP);

  txt+="<br>Ruta Solucion: ";
  txt+="<br>{ "
  for(var i=0;i<meta.length;i++){
    txt+=data.nodes._data[meta[i]].label+",";
  }
  txt+="}"
  txt+="<br>Costo Ruta: "+matrixEDP[ef][4];

  document.getElementById('data').innerHTML = txt;
  //imprime(matrixEDP,ei,ef,txt);*/
  console.log("costo total "+matrixEDP[ef][2]);
  //imprimeMAX(matrixEDP,tam,3);
  /*################*/
  printHeu(distancias,ef);
  
  imprimeDOM();

}
function calculaDistan(ef)
{
  var d=new Array();
  for(var i=1; i<=data.nodes.length ;i++)
    d[i]=Math.sqrt(cua(data.nodes._data[i].x-data.nodes._data[ef].x)+cua(data.nodes._data[i].y-data.nodes._data[ef].y));
  console.log("DSITANCAIS",d);
  return d;

}
function cua(a)
{
  return a*a;
}
function getDistancias(x1,y1,x2,y2){
  return Math.sqrt(cua(x1-x2)+cua(y1-y2));
}
function printHeu(distancias,ef)
{
  var txt="";
  txt+="<br>Distancias al nodo "+data.nodes._data[ef].label;
  txt+="<br>"
  for(var i=1;i<distancias.length;i++){
      txt+="d("+data.nodes._data[i].label+","+data.nodes._data[ef].label+")"+"="+distancias[i].toFixed(2)+"<br>";
      //console.log(distancias);
      //console.log(distancias.length);


  }
  document.getElementById('heuristica').innerHTML = txt;
}
function busquedasI(nodeIni,nodeMeta,tipo)
{
  var cola;
  var auxOr;
  var txt="";
  txt+="<br>";
  var tam=data.nodes.length;
  matrixEDP= new Array(tam);

  console.log("data",data.nodes._data[1].label);
  for (i = 1; i <= tam; i++){
    matrixEDP[i]=new Array(3);
    for(j = 1; j<= 3 ; j++){
        matrixEDP[i][1]=-1;
        matrixEDP[i][2]=Number.POSITIVE_INFINITY;
        matrixEDP[i][3]=null;
    }
  }

  matrixEDP[nodeIni][1] = 1;
  matrixEDP[nodeIni][2] = 0;
  matrixEDP[nodeIni][3] = null;

   cola=[];///* nos aseguramos que la cola está vacía */
   labelNew=data.nodes._data[nodeIni].label;
  if(tipo==4){
    cola.push(nodeIni); //Encolar(Q, s); push al final

    txt+="["+labelNew+"]<br>";
  }
  if(tipo==1){
    cola.unshift(nodeIni); //shif al inicio
    console.log("inicial Profundidad",cola);
    //txt+="["+cola+"]<br>";
    txt+="["+labelNew+"]<br>";
  }
  //console.log("inicial",cola);
  while(cola.length>0)
  {
    // extraemos el nodo u de la cola Q y exploramos todos sus nodos adyacentes
    
    u = cola.shift();
    //console.log("u=",u);
    if(u==nodeMeta){
        break;
    }
    // matrixEDP[u][1]=1;
    auxOr=[];
    cont=0;
    for(j = 1; j<= tamMax; j++){
      if(matrixAd[u][j]==1){
        //console.log("Encontro algo :P ",j);
        //console.log("Selecciona",matrixEDP[j][1]);
        if(matrixEDP[j][1]==(-1)){
          //console.log("Volvia encontrar algo :P", u);
          //estado[v] = VISITADO;
          //distancia[v] = distancia[u] + 1;
          //padre[v] = u;

          matrixEDP[j][1] = 1;
          matrixEDP[j][2] = matrixEDP[u][2]+1 ;
          matrixEDP[j][3] = u;
          auxOr[cont]=j;
          cont++;
          if(tipo==4){
            cola.push(j);
          }
        }
      }
    }
    auxOr.sort();
    for(i=auxOr.length-1;i>=0 ; i--){
      if(tipo==1){
        cola.unshift(auxOr[i]);
      }
    }
    txt+="[ "
    for(var i=0;i<cola.length;i++){
      txt+=data.nodes._data[cola[i]].label+"  ";
    }
    txt+="]<br>"
    console.log("Cola:",cola);
  }

  var meta=returnRutaSol(matrixEDP,nodeIni,nodeMeta);
  console.log("Ruta Solucion",meta);
  console.log("Costo",matrixEDP[nodeMeta][2]);

  txt+="<br>Ruta Solucion: ";
  txt+="{ "
  for(var i=0;i<meta.length;i++){
    txt+=data.nodes._data[meta[i]].label+",";
  }
  txt+="}"
  txt+="<br>Costo Ruta: "+matrixEDP[nodeMeta][2];

  document.getElementById('data').innerHTML = txt;
}
function profundidadLimitada(nodeIni,nodeMeta,limite)
{
  var cola;
  var auxOr;
  var txt="";
  txt+="<br>";
  txt+="<br>Limite="+parseInt(document.getElementById('prof').value);+"<br>";
  var tam=data.nodes.length;
  matrixEDP= new Array(tam);

  console.log("function Profundidad Limitada",limite);
  for (i = 1; i <= tam; i++){
    matrixEDP[i]=new Array(3);
    for(j = 1; j<= 3 ; j++){
        matrixEDP[i][1]=-1;
        matrixEDP[i][2]=Number.POSITIVE_INFINITY;
        matrixEDP[i][3]=null;
    }
  }

  matrixEDP[nodeIni][1] = 1;
  matrixEDP[nodeIni][2] = 0;
  matrixEDP[nodeIni][3] = null;

   cola=[];///* nos aseguramos que la cola está vacía */
   labelNew=data.nodes._data[nodeIni].label;
  
    cola.unshift(nodeIni); //shif al inicio
    console.log("inicial Profundidad",cola);
    txt+="<br>["+labelNew+"]<br>";
  
  while(cola.length>0)
  {
    // extraemos el nodo u de la cola Q y exploramos todos sus nodos adyacentes
    
    
    u = cola.shift();
    if(u==nodeMeta){
          break;
          console.log("Solucion Encontrada");
    }
    console.log("costo :P",matrixEDP[u][2]);
    auxOr=[];
    cont=0;
    for(j = 1; j<= tamMax; j++){
      if(matrixAd[u][j]==1){
        //console.log("Encontro algo :P ",j);
        //console.log("Selecciona",matrixEDP[j][1]);
        if(matrixEDP[j][1]==(-1)){
          matrixEDP[j][2] = matrixEDP[u][2]+1 ;
          if(matrixEDP[j][2] <=limite){

            matrixEDP[j][1] = 1;
            matrixEDP[j][3] = u;
            auxOr[cont]=j;
            cont++;
            
          }
        }
      }
    }
    auxOr.sort();
    for(i=auxOr.length-1;i>=0 ; i--){
      cola.unshift(auxOr[i]);
    }
    txt+="[ "
    for(var i=0;i<cola.length;i++){
      txt+=data.nodes._data[cola[i]].label+"  ";
    }
    txt+="]<br>"
    console.log("Cola:",cola);
  }
  
      
  

  var meta=returnRutaSol(matrixEDP,nodeIni,nodeMeta);
  if(matrixEDP[nodeMeta][1]!=-1){
    console.log("Ruta Solucion",meta);
    console.log("Costo",matrixEDP[nodeMeta][2]);
    txt+="<br>Ruta Solucion: ";
    txt+="{ "
    for(var i=0;i<meta.length;i++){
      txt+=data.nodes._data[meta[i]].label+",";
    }
    txt+="}"
    txt+="<br>Costo Ruta: "+matrixEDP[nodeMeta][2];
  }
  else{
    txt+="Solucion no Encontrada";
  }

  document.getElementById('data').innerHTML = txt;
}
function profundidadIterativa(nodeIni,nodeMeta)
{
  var cola;
  var auxOr;
  var txt="";
  txt+="<br><br>";
  

   //cola=[];///* nos aseguramos que la cola está vacía */
   labelNew=data.nodes._data[nodeIni].label;
   limite=0;
   bandera=0;
   while(bandera==0 || limite==maxIteraIN){

    var tam=data.nodes.length;
    matrixEDP= new Array(tam);
    
    for (i = 1; i <= tam; i++){
      matrixEDP[i]=new Array(3);
      for(j = 1; j<= 3 ; j++){
          matrixEDP[i][1]=-1;
          matrixEDP[i][2]=Number.POSITIVE_INFINITY;
          matrixEDP[i][3]=null;
      }
    }

    matrixEDP[nodeIni][1] = 1;
    matrixEDP[nodeIni][2] = 0;
    matrixEDP[nodeIni][3] = null;

    txt+="<br>Limite="+limite+"<br>";
    cola=[];
    cola.unshift(nodeIni); //shif al inicio
    //console.log("inicial Profundidad",cola);
    txt+="["+labelNew+"]<br>";
  
  while(cola.length>0)
  {
    // extraemos el nodo u de la cola Q y exploramos todos sus nodos adyacentes
    u = cola.shift();
    if(u==nodeMeta){
          bandera=1;
          console.log("Solucion Encontrada");
    }

    //console.log("costo :P",matrixEDP[u][2]);
    else{
    auxOr=[];
    cont=0;
    for(j = 1; j<= tamMax; j++){
      if(matrixAd[u][j]==1){
        //console.log("Encontro algo :P ",j);
        //console.log("Selecciona",matrixEDP[j][1]);
        if(matrixEDP[j][1]==(-1)){
          matrixEDP[j][2] = matrixEDP[u][2]+1 ;
          if(matrixEDP[j][2] <=limite){

            matrixEDP[j][1] = 1;
            matrixEDP[j][3] = u;
            auxOr[cont]=j;
            cont++;
            
          }
        }
      }
    }
    auxOr.sort();
    for(i=auxOr.length-1;i>=0 ; i--){
      cola.unshift(auxOr[i]);
    }
    txt+="[ "
    for(var i=0;i<cola.length;i++){
      txt+=data.nodes._data[cola[i]].label+"  ";
    }
    txt+="]<br>"
    console.log("Cola:",cola);
  }
  }
  var meta=returnRutaSol(matrixEDP,nodeIni,nodeMeta);
    if(matrixEDP[nodeMeta][1]!=-1){
      console.log("Ruta Solucion",meta);
      console.log("Costo",matrixEDP[nodeMeta][2]);
      txt+="<br>Ruta Solucion : {";
      //txt+="{ "
      for(var i=0;i<meta.length;i++){
        txt+=data.nodes._data[meta[i]].label+",";
      }
      txt+="}"
      txt+="<br>Costo Ruta: "+matrixEDP[nodeMeta][2];
    }
    else{
      txt+="Solucion no Encontrada<br>";
    }
    //console.log("Limite", limite,"txt",txt);
  limite++;
}
  
  document.getElementById('data').innerHTML = txt;

}

function returnRutaSol(matrixEDP,nodeIni,nodeMeta,tsearch)
{
  //console.log("Ruta Solucion: ");
  var ruta=[];
  ni=nodeMeta;
  ruta.push(nodeMeta);
  while(ruta.length>0)
  {
    ni=matrixEDP[ni][3];
    if(ni==null)
      break;
    ruta.push(ni);
  }
  if(tsearch=1){
    return ruta.reverse();
  }
  else{
    return ruta;
  }
  
  //

  
}


function imprimeMAX(max,tam)
{
  for (i = 1; i <= tam; i++){
    for(j= 1; j<= tam ; j++)
      console.log(max[i][j],", ");
    console.log("\n");
  }
}

/********/

function matrixAdyacenciaInit2(data)
{
    tamMax=data.nodes.length;
    matrixAd= new Array(tamMax);
    for (i = 1; i <= tamMax; i++){
      matrixAd[i]=new Array(tamMax);
      for(j = 1; j<= tamMax ; j++)
        matrixAd[i][j]=-1;
    }
    for (i = 1; i <= tamMax; i++){
        for (var id in data.edges._data) {
          if(data.edges._data[id].from == i){
            var uno = data.edges._data[id].to;
            if(opt == 6 || opt ==7 )
              matrixAd[i][data.edges._data[id].to] = getDistancias(data.nodes._data[uno].x,data.nodes._data[uno].y,data.nodes._data[i].x,data.nodes._data[i].y);
            else
              matrixAd[i][data.edges._data[id].to] = parseInt(data.edges._data[id].label);
          }
          if(data.edges._data[id].to == i){
            var uno = data.edges._data[id].from;
            //matrixAd[i][data.edges._data[id].from] = parseInt(data.edges._data[id].label)
            if(opt == 6 || opt ==7 )
              matrixAd[i][data.edges._data[id].from] = getDistancias(data.nodes._data[uno].x,data.nodes._data[uno].y,data.nodes._data[i].x,data.nodes._data[i].y);
            else
              matrixAd[i][data.edges._data[id].from] = parseInt(data.edges._data[id].label)
          }
        }
    }
}

function costo(ei,ef){
  console.log("Se selecciona el costo uniforme");
 // var matrixEDP=new Array(3);
  var nodos=new Array();
  var costo=new Array();
  var u;
  txt="";
  //tam=matrixAd.length;
  var tam=data.nodes.length;
  matrixEDP= new Array(tam);
  for(i=1; i<=tam; i++){
    matrixEDP[i]=new Array(3);
    for(j=1; j<=3; j++){
      matrixEDP[i][1]=-1;
      matrixEDP[i][2]=Number.POSITIVE_INFINITY;
      matrixEDP[i][3]=null;
    }
  }
  imprimeMAX(matrixAd,tam,tam);

  matrixEDP[ei][2]=0;
  nodos.push(ei);
  costo.push(0);
  txt=txt+"<br>"; 
  while(nodos.length>0){

    txt=txt+"[ ";
      for(var j=0; j<nodos.length; j++)
        txt=txt+" "+data.nodes._data[nodos[j]].label;  
    txt=txt+" ]<br>";
    
    u=costo.shift();
    u=nodos.shift();    

    matrixEDP[u][1]=1;
    for(i=1; i<=matrixAd.length; i++){
      if(matrixAd[u][i]>(-1))
        if(matrixEDP[i][1]==-1 && matrixEDP[i][2]>(matrixEDP[u][2]+matrixAd[u][i])){
          matrixEDP[i][2]=matrixEDP[u][2]+matrixAd[u][i];
          matrixEDP[i][3]=u;
           nodos.push(i);
           costo.push(matrixAd[u][i]);
        }
    }
    for(i=1; i<costo.length; i++)
      for(j=0; j<costo.length-i; j++){
        if(costo[j]>costo[j+1]){
          aux=costo[j];
          costo[j]=costo[j+1];
          costo[j+1]=aux;

          aux=nodos[j];
          nodos[j]=nodos[j+1];
          nodos[j+1]=aux;
        }
      }
    console.log(nodos);
  }
  var meta=returnRutaSol(matrixEDP,ei,ef);
  console.log("Ruta Solucion",meta);
  console.log("Costo",matrixEDP[ef][2]);

  txt+="<br>Ruta Solucion: ";
  txt+="<br>{ "
  for(var i=0;i<meta.length;i++){
    txt+=data.nodes._data[meta[i]].label+",";
  }
  txt+="}"
  txt+="<br>Costo Ruta: "+matrixEDP[ef][2];

  document.getElementById('data').innerHTML = txt;
  //imprime(matrixEDP,ei,ef,txt);*/
  console.log("costo total "+matrixEDP[ef][2]);
  //imprimeMAX(matrixEDP,tam,3);
}

function imprimeMAX(max,tamc,tamf)
{
 for (i = 1; i <= tamf; i++){
   for(j= 1; j<= tamc ; j++)
     console.log(max[i][j],", ");
   console.log("\n");
 }
}