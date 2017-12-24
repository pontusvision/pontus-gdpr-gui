import React, {Component} from 'react';
import ResizeAware from 'react-resize-aware';
import Graph from 'react-graph-vis';
import axios from 'axios';


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
            align: 'left'
          },
          shapeProperties: {useImageSize: true}
  
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
  
  
  selectData = (event) =>
  {
    
    let url = "/gateway/sandbox/pvgdpr_server/home/graph";
    if (this.h_request !== null)
    {
      clearTimeout(this.h_request);
    }
    
    let self = this;
    
    this.h_request = setTimeout(() =>
    {
      
      let CancelToken = axios.CancelToken;
      self.req = CancelToken.source();
      
      axios.post(url, {graphId: event.id}, {
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
  onSuccess = (res) =>
  {
    if (this.network)
    {
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