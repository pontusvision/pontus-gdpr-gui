import React, {Component} from 'react';
import ResizeAware from 'react-resize-aware';
import Graph from 'react-graph-vis';
import axios from 'axios';
// import "http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css";
// import "http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css";
//



/***************************
 * UserList Component
 ***************************/
class DataGraph extends Component
{
  constructor(props)
  {
    super(props);
    
    this.subscription = (this.props.namespace ? this.props.namespace : "" ) + '-pvgrid-on-click-row';
    
    this.state = {
      graph: {
        nodes: [
          // {id: 1, label: 'Jackson Turner', title:"asdfasfdasfd",  color: '#e04141'}
          // {id: 2, label: 'Megan Perry', color: '#e09c41'},
          // {id: 3, label: 'Ryan Harris', color: '#e0df41'},
          // {id: 4, label: 'Jennifer Edwards', color: '#7be041'},
          // {id: 5, label: 'Noah Jenkins', color: '#41e0c9'}
        ],
        edges: [
          // {from: 1, to: 2},
          // {from: 1, to: 3},
          // {from: 2, to: 4},
          // {from: 2, to: 5}
        ]
      }
      , options: {
        nodes: {
          font: {
            align: 'left',
            color: '#FFFFFF'
          },
          shapeProperties: {
            useImageSize: true
            , interpolation: false
            
          }
          
        }
        , groups: {
          "Object Privacy Notice": {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              code: '\uf0c0',
              size: 50,
              color: '#57169a'
            }
          },
          "Object Lawful Basis": {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              code: '\uf007',
              size: 50,
              color: '#aa00ff'
            }
          }
        },
        // layout: {
        //   hierarchical: {
        //     direction: "UD",
        //     sortMethod: "directed",
        //     levelSeparation: 500,
        //     nodeSpacing: 500,
        //     treeSpacing: 500
        //   }
        // },
        interaction: {dragNodes: true},
        physics: {enabled: false},
        
        edges: {
          color: "#FFFFFF"
        }
        
        
      }
      , events: {
        // select: this.selectUser
        doubleClick: this.doubleClick
      }
    };
    
    
  }
  
  doubleClick = (param) =>
  {
    let event = {id: param.nodes[0]};
    this.selectData(event);
  };
  // This is called from the render() ref={} area to give us a reference to the
  // value that was created by the render() function.
  setGraph = (graph) =>
  {
    this.graph = graph;// new Graph({graph:this.state.graph, options: this.state.options, events:this.state.events});
    
  };
  
  setNetwork = (network) =>
  {
    this.network = network;
    this.network.setOptions(this.state.options);
    this.network.on("doubleClick", this.doubleClick);
    
  };
  
  // selectUser = (event) =>
  // {
  //   var {nodes, edges} = event;
  //   console.log("Selected nodes:");
  //   console.log(nodes);
  //   console.log("Selected edges:");
  //   console.log(edges);
  //   this.props.glEventHub.emit('user-select', this.state.users[nodes[0] - 1])
  // };
  
  getQuery = (eventId) =>
  {
    return {
      bindings: {
        vid: eventId
      }
      , gremlin: " g.V(vid).as('orig').bothE().match(\n" +
      "   __.as('e').inV().label().as('outVLabel')\n" +
      ",  __.as('e').outV().label().as('inVLabel')\n" +
      ",  __.as('e').label().as('edgeLabel')\n" +
      "   ).select( 'edgeLabel','inVLabel','outVLabel').groupCount().map{\n" +
      "\n" +
      "    HashSet nodesSet = new HashSet()\n" +
      "    HashSet edgesSet = new HashSet()\n" +
      "     \n" +
      "     it.get().forEach(\n" +
      "       \n" +
      "       {  key,val -> outerLoop:{\n" +
      "            if (key instanceof Map){\n" +
      "              String fromNodeId = key.get('inVLabel').replaceAll('[_.]',' ');\n" +
      "\n" +
      "              StringBuffer sb = new StringBuffer('{ \"id\":\"');\n" +
      "              sb.append(fromNodeId).append('\",\"label\":\"')\n" +
      "                .append(fromNodeId).append('\",\"group\":\"')\n" +
      "                .append(fromNodeId).append('\"}')\n" +
      "                \n" +
      "              nodesSet.add( sb.toString() );\n" +
      "              \n" +
      "              sb.setLength(0);\n" +
      "              \n" +
      "              String toNodeId = key.get('outVLabel').replaceAll('[_.]',' ');\n" +
      "\n" +
      "              sb.append('{ \"id\":\"') \n" +
      "                .append(toNodeId).append('\",\"label\":\"')\n" +
      "                .append(toNodeId).append('\",\"group\":\"')\n" +
      "                .append(toNodeId).append('\"}')\n" +
      "                \n" +
      "              nodesSet.add( sb.toString() );\n" +
      "              \n" +
      "              sb.setLength(0);\n" +
      "\n" +
      "              String edgeLabel = key.get('edgeLabel').replaceAll('[_.]',' ');\n" +
      "              sb.append('{ \"from\":\"')\n" +
      "                .append(fromNodeId).append('\",\"to\":\"')\n" +
      "                .append(toNodeId).append('\",\"label\":\"')\n" +
      "                .append(edgeLabel).append(' (')\n" +
      "                .append(val).append(')\",\"value\":')\n" +
      "                .append(val).append('}')\n" +
      "                \n" +
      "              edgesSet.add (sb.toString());\n" +
      "                \n" +
      "\n" +
      "            }\n" +
      "         } \n" +
      "      \n" +
      "       })\n" +
      "\n" +
      "     StringBuffer sb2 = new StringBuffer('{ \"nodes\":' );\n" +
      "     \n" +
      "     sb2.append(nodesSet).append(', \"edges\":').append(edgesSet)\n" +
      "      .append('}')\n" +
      "      \n" +
      "     sb2.toString()\n" +
      "\n" +
      "   }\n"
      
    };
  };
  
  
  selectData = (event) =>
  {
    
    let url = "/gateway/sandbox/pvgdpr_graph"; // "/gateway/sandbox/pvgdpr_server/home/graph";
    if (this.h_request !== null)
    {
      clearTimeout(this.h_request);
    }
    
    let self = this;
    
    this.h_request = setTimeout(() =>
    {
      
      let CancelToken = axios.CancelToken;
      self.req = CancelToken.source();
      
      axios.post(url, this.getQuery(event.id || event.index), {
        headers: {
          'Content-Type': 'application/json'
          , 'Accept': 'application/json'
        }
        , cancelToken: self.req.token
      }).then(this.onSuccess).catch((thrown) =>
      {
        if (axios.isCancel(thrown))
        {
          console.log('Request canceled', thrown.message);
        }
        else
        {
          this.onError(thrown);
        }
      });
      
      
    }, 50);
    
    
  };
  
  onError = (thrown) =>
  {
    alert("Failed to get graph data:" + thrown);
  }
  
  
  onSuccess = (resp) =>
  {
    
    let respParsed = {};
    
    
    try
    {
      if (typeof resp !== 'object')
      {
        respParsed = JSON.parse(resp);
      }
      else
      {
        respParsed = resp;
      }
      if (respParsed.status === 200)
      {
        let items = respParsed.data.result.data['@value'][0];
        
        
        if (typeof items !== 'object')
        {
          items = JSON.parse(items);
        }
        
        let graph = {nodes: items.nodes, edges: items.edges};
        
        this.setState({graph: graph});
        localStorage.setItem(this.subscription, graph);
        
      }
      
      
    }
    catch (e)
    {
      // e;
    }
    
  };
  
  
  onSuccessOld = (res) =>
  {
    if (this.network)
    {
      
      /*
       .data.result.data["@value"]
       */
      
      
      let graph = {nodes: res.data.nodes, edges: res.data.edges};
      this.setState({graph: graph});
      localStorage.setItem(this.subscription, graph);
      
      
      // this.network.setData(graph);
    }
  };
  
  handleResize = ({width, height}) =>
  {
    if (this.graph)
    {
      this.graph.updateGraph();
      
    }
  };
  
  componentWillMount()
  {
    let val = localStorage.getItem(this.subscription) || null;
    
    if (val)
    {
      if (val instanceof Object)
      {
        this.setState({graph: val});
      }
    }
    this.props.glEventHub.on(this.subscription, this.selectData);
    
  }
  
  componentWillUnmount()
  {
    this.props.glEventHub.off(this.subscription, this.selectData);
    
    
  }
  
  
  render()
  {
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    
    return (
      <ResizeAware
        style={{height: '100%', width: '100%'}}
        onResize={this.handleResize}
      >
        <Graph style={{height: '100%', width: '100%'}} graph={this.state.graph} options={this.state.options}
               events={this.state.events} ref={this.setGraph} getNetwork={this.setNetwork}/>
      </ResizeAware>
    
    );
    
    
  }
}

export default DataGraph;