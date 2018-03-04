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
    groups:{init:{color:{background:'aqua'}},
            end:{color:{background:'blue'}}
    },
    manipulation: {
      enabled: false,
      addNode: function(nodeData,callback) {
        nodeData.label = document.getElementById('nnode').value;
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




/**************/
function draw() {
            //destroy();
            // randomly create some nodes and edges
            var nodeCount = document.getElementById('nodeCount').value;
            var data = getScaleFreeNetwork(nodeCount)

            // create a network
            var container = document.getElementById('tree');
           // var directionInput = document.getElementById("direction").value;
            var options = {
                layout: {randomSeed:seed
                    //hierarchical: {
                        //direction: directionInput
                    //}
                }
                //layout: {randomSeed:seed}
                 
                  
            };
            network = new vis.Network(container, data, options);

            // add event listeners
            /*network.on('select', function (params) {
                document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
            });*/
        }



/**************************/
  var nodes = null;
    var edges = null;
    var network = null;
    // randomly create some nodes and edges
    var data = getScaleFreeNetwork(25);
    var seed = 2;

    
    
    function draw() {
      destroy();
      nodes = [];
      edges = [];

      // create a network
      var container = document.getElementById('mynetwork');
      var options = {
        layout: {randomSeed:seed}, // just to make sure the layout is the same when the locale is changed
        locale: document.getElementById('locale').value,
        manipulation: {
          addNode: function (data, callback) {
            // filling in the popup DOM elements
            document.getElementById('node-operation').innerHTML = "Add Node";
            editNode(data, callback);
          },
          editNode: function (data, callback) {
            // filling in the popup DOM elements
            document.getElementById('node-operation').innerHTML = "Edit Node";
            editNode(data, callback);
          },
          addEdge: function (data, callback) {
            if (data.from == data.to) {
              var r = confirm("Do you want to connect the node to itself?");
              if (r != true) {
                callback(null);
                return;
              }
            }
            document.getElementById('edge-operation').innerHTML = "Add Edge";
            editEdgeWithoutDrag(data, callback);
          },
          editEdge: {
            editWithoutDrag: function(data, callback) {
              document.getElementById('edge-operation').innerHTML = "Edit Edge";
              editEdgeWithoutDrag(data,callback);
            }
          }
        }
      };
      network = new vis.Network(container, data, options);
    }

    function editNode(data, callback) {
      document.getElementById('node-label').value = data.label;
      document.getElementById('node-saveButton').onclick = saveNodeData.bind(this, data, callback);
      document.getElementById('node-cancelButton').onclick = clearNodePopUp.bind();
      document.getElementById('node-popUp').style.display = 'block';
    }

    function clearNodePopUp() {
      document.getElementById('node-saveButton').onclick = null;
      document.getElementById('node-cancelButton').onclick = null;
      document.getElementById('node-popUp').style.display = 'none';
    }

    function cancelNodeEdit(callback) {
      clearNodePopUp();
      callback(null);
    }

    function saveNodeData(data, callback) {
      data.label = document.getElementById('node-label').value;
      clearNodePopUp();
      callback(data);
    }

    function editEdgeWithoutDrag(data, callback) {
      // filling in the popup DOM elements
      document.getElementById('edge-label').value = data.label;
      document.getElementById('edge-saveButton').onclick = saveEdgeData.bind(this, data, callback);
      document.getElementById('edge-cancelButton').onclick = cancelEdgeEdit.bind(this,callback);
      document.getElementById('edge-popUp').style.display = 'block';
    }

    function clearEdgePopUp() {
      document.getElementById('edge-saveButton').onclick = null;
      document.getElementById('edge-cancelButton').onclick = null;
      document.getElementById('edge-popUp').style.display = 'none';
    }

    function cancelEdgeEdit(callback) {
      clearEdgePopUp();
      callback(null);
    }

    function saveEdgeData(data, callback) {
      if (typeof data.to === 'object')
        data.to = data.to.id
      if (typeof data.from === 'object')
        data.from = data.from.id
      data.label = document.getElementById('edge-label').value;
      clearEdgePopUp();
      callback(data);
    }

    function init() {
      setDefaultLocale();
      draw();
    }
