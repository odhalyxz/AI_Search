var network;
var e_init,e_end;
var on_sim = false;
var data;
var nn = 0;
var opt;
var seed = 2;
window.onload = function(){ 
    console.log("cargando load, paso uno");
    load();
    $('.desaparecer').hide();
};
function load(){
  console.log("aqui en load paso dos");

  data ={
    nodes:[],
    edges:[]
  };
  data.nodes = new vis.DataSet(data.nodes);
  data.edges = new vis.DataSet(data.edges);
  network = tree(data,document.getElementById('tree'));
  console.log(network);
}

function load_file(arg) {
  var file = arg[0];
  var reader = new FileReader();
  reader.onload = function(){
    data = JSON.parse(reader.result);
    console.log("Aqui en JSON");
    data.nodes = new vis.DataSet(data.nodes);
    data.edges = new vis.DataSet(data.edges);
    network = tree(data,document.getElementById('tree'));
  };
  reader.readAsText(file);
}

function tree(data,container){
  //console.log("buu",data);
  if(e_init!=null || e_end!=null && e_init!=e_end){
    for (var id in data.nodes._data) {
      if (data.nodes._data.hasOwnProperty(id)) {
        if(data.nodes._data[id].id==e_init){
          data.nodes._data[id].group = "init";
        }
        else if(data.nodes._data[id].id==e_end && !on_sim){
          data.nodes._data[id].group = "end";
        }
        else {
          if(!on_sim)
            data.nodes._data[id].group = null;
        }
      }
    }
  }
  var dat = {
    nodes: data.nodes,
    edges: data.edges
  };


    
    
  var options = {
    layout: {randomSeed:seed}, // just to make sure the layout is the same when the locale is changed
    locale: "es",
    groups:{init:{color:{background:'blue'}},
            end:{color:{background:'aqua'}}
    },
    //nodes: {
     //smooth: false
    //},
    //edges: {
      //smooth: false
    //},
    physics: false,
    //interaction: {
      //dragNodes: false,// do not allow dragging nodes
     // zoomView: false, // do not allow zooming
      //dragView: false  // do not allow dragging
    //},
    manipulation: {
      enabled: false,
      addNode: function(nodeData,callback) {
        //nodeData.label = document.getElementById('nnode').value;
        nodeData.label = String(nn);
        nodeData.id = nn;
        nn++;
        data.nodes.add(nodeData);
        callback(nodeData);
      },
      addEdge: function(edgeData,callback) {
        //if(opt=="costo"){
          edgeData.label = document.getElementById('edge_num').value;
        //}
        data.edges.add(edgeData);
        callback(edgeData);
      }
    }
  };
  nn = data.nodes.length+1;
  var nw = new vis.Network(container, dat, options);
  return nw;
}

function e_set(t){
  //storePositions
  network.storePositions();
  console.log("Coordenadas GUARDAAS",network.storePositions());
  var node = network.getSelectedNodes()[0];
  if(t=="init"){
    e_init = node;
  }
  else{
    e_end = node;
  }
  network = tree(data,document.getElementById('tree'));
}

function init(){
  opt = document.getElementById('opt').options[document.getElementById('opt').selectedIndex].value;
  //console.log("hola",data);
  console.log("Estoy en init y opt vale",opt );
  search(e_init,e_end,opt,data);


}

function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

function save_file(){
  var a = {
    'nodes':[data.nodes._data],
    'edges':[data.edges._data]
  }
  var edges=[];
  for (var id in data.edges._data) {
    var e = {};
    e.to = data.edges._data[id].to;
    e.from = data.edges._data[id].from;
    e.label = parseInt(data.edges._data[id].label);
    edges.push(e);
  }
  var nodes=[];
  for (var id in data.nodes._data) {
    var n = {};
    n.id = data.nodes._data[id].id;
    n.label = data.nodes._data[id].label;
    nodes.push(n);
  }
  var d = {
    nodes:nodes,
    edges:edges
  };
  var j = JSON.stringify(d);
  var b = new Blob([j], {
        type: 'application/json'
    });
  descargarArchivo(b,document.getElementById('fname').value+".json");
}

/**************/
function create_tree()
{

  var nodeCount = document.getElementById('nodeCount').value;
  var contadorL=0;
  network.addNodeMode();
  $("#tree").click(function(){
      if(contadorL<nodeCount-1){
          if (event.x != undefined && event.y != undefined)
          {
              network.addNodeMode();
              console.log("Buuu");
          }
          contadorL++;
      }
  });
}


