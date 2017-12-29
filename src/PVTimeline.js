import React, {Component} from 'react';
import ResizeAware from 'react-resize-aware';
// import Graph from 'react-graph-vis';
import Timeline from 'react-visjs-timeline';
import * as Vis from 'vis';



import axios from 'axios';


/***************************
 * UserList Component
 ***************************/
class PVTimeline extends Component
{
  constructor(props)
  {
    super(props);
    
    this.subscription = (this.props.namespace ? this.props.namespace : "" ) + '-pvgrid-on-click-row';
  
  
  
    var now = new Date().getMilliseconds();
    var groupCount = 3;
    var itemCount = 20;
  
    // create a data set with groups
    var names = ['John', 'Alston', 'Lee', 'Grant'];
    var groups = new Vis.DataSet();
    for (var g = 0; g < groupCount; g++) {
      groups.add({id: g, content: names[g]});
    }
  
    // create a dataset with items
    var items = new Vis.DataSet();
    for (var i = 0; i < itemCount; i++) {
      var start = new Date (now+ (Math.random() * 200* 3600));
      var group = Math.floor(Math.random() * groupCount);
      items.add({
        id: i,
        group: group,
        content: 'item ' + i +
        ' <span style="color:#97B0F8;">(' + names[group] + ')</span>',
        start: start,
        type: 'box'
      });
    }
  
  
    this.state = {
  
      groups : groups
  
      ,items: items
      
      ,options :{
        width: '100%',
        height: '100px',
        stack: true,
        showMajorLabels: true,
        showCurrentTime: true
        // zoomMin: 1000000,
        // type: 'background'
        // format: {
        //   minorLabels: {
        //     seconds: 'h:mm:ss.MMM',
        //     hour: 'ha'
        //   }
        // }
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
  
  // setNetwork = (network) =>
  // {
  //   this.network = network;
  //   this.network.setOptions(this.state.options);
  //   this.network.on("doubleClick", this.doubleClick);
  //
  // };
  
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
      
      axios.post(url, {graphId: (event.id || event.index)}, {
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
    // if (this.network)
    // {
    //   let graph = {nodes: res.data.nodes, edges: res.data.edges};
    //   this.setState({graph: graph});
    //   localStorage.setItem(this.subscription, graph);
    //
    //
    //   // this.network.setData(graph);
    // }
  };
  
  handleResize = ({width, height}) =>
  {
    if (this.timeline)
    {
      this.setState({width:width - 30, height:height -30});
      this.timeline.setOptions({width:width - 30, height:height -30});
      // this.timeline.redraw();

    }
  };
  
  componentDidMount()
  {
    // let val = localStorage.getItem(this.subscription) || null;
    //
    // if (val)
    // {
    //   if (val instanceof Object)
    //   {
    //     this.setState({graph: val});
    //   }
    // }
    this.props.glEventHub.on(this.subscription, this.selectData);
  
    this.timeline = new Vis.Timeline(this.graph, this.state.items, this.state.groups, this.state.options);
    
    
    
  }
  
  componentWillUnmount()
  {
    this.props.glEventHub.off(this.subscription, this.selectData);
    
    
  }
  
  
  render()
  {
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    // ref={this.setGraph}
    
    
    return (
      <ResizeAware
        style={{height: '100%', width: '100%'}}
        onResize={this.handleResize}
      >
        <div
           style={{padding: "15px"}}
          ref={this.setGraph} />
      </ResizeAware>
    
    );
    
    
  }
}

export default PVTimeline;