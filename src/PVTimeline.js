import React, {Component} from 'react';
import ResizeAware from 'react-resize-aware';
// import Graph from 'react-graph-vis';
// import Timeline from 'react-visjs-timeline';

// import '../node_modules/vis/dist/vis.css';
// import '../node_modules/vis/dist/vis-timeline-graph2d.min.css';
import './vis-timeline.css';

import * as Vis from 'vis';


import axios from 'axios';
import PontusComponent from "./PontusComponent";


/***************************
 * UserList Component
 ***************************/
class PVTimeline extends PontusComponent
{
  constructor(props)
  {
    super(props);
    
    this.subscription = (this.props.namespace ? this.props.namespace : "" ) + '-pvgrid-on-click-row';
  
    this.url = PontusComponent.getGraphURL(props);
  
  
    // let now = new Date().getMilliseconds();
    let groupCount = 1;
    let itemCount = 1;

    // create a data set with groups
    let names = ['CLICK ON THE GRID TO GET THE RELATED ITEMS TIME SERIES'];
    this.groups = new Vis.DataSet();

    for (let g = 0; g < groupCount; g++) {
      this.groups.add({id: g, content: names[g]});
    }
    let start = new Date (Date.now() - 3600000);
    let end = new Date(Date.now() +3600000);

    // create a dataset with items
    this.items = new Vis.DataSet();
    for (let i = 0; i < itemCount; i++) {
      let group = 0;
      this.items.add({
        id: i,
        group: group,
        content: 'item ' + i + ' ' +
        '<span style="color:#97B0F8;">(' + names[group] + ')</span>',
        start: start,
        end: end,
        type: 'box'
      });
    }

    /*
     event="rangechanged", properties={"start":"2013-05-03T05:48:43.057Z","end":"2013-05-16T22:00:20.634Z","byUser":true,"event":{"pointers":[{"isTrusted":true,"_handled":{"pan":true,"panend":true}}],"changedPointers":[{"isTrusted":true,"_handled":{"pan":true,"panend":true}}],"pointerType":"mouse","srcEvent":{"isTrusted":true,"_handled":{"pan":true,"panend":true}},"isFirst":false,"isFinal":true,"eventType":4,"center":{"x":186,"y":144},"timeStamp":1536169382064,"deltaTime":2253,"angle":177.75974264585528,"distance":818.6256775840836,"deltaX":-818,"deltaY":32,"offsetDirection":2,"overallVelocityX":-0.36307146027518866,"overallVelocityY":0.014203284509542832,"overallVelocity":-0.36307146027518866,"scale":1,"rotation":0,"maxPointers":1,"velocity":0,"velocityX":0,"velocityY":0,"direction":1,"target":"DOM Element","type":"panend","firstTarget":"DOM Element"}}
 
     */
  
    this.state = {
  
      groups : this.groups
  
      ,items: this.items
      
      ,options :{
        width: '100%',
        height: '100px',
        stack: true,
        showMajorLabels: true,
        showCurrentTime: true,
        start: start
        
        // zoomMin: 1000000
        // type: 'background'
        // format: {
        //   minorLabels: {
        //     seconds: 'h:mm:ss.MMM',
        //     hour: 'ha'
        //   }
        // }
      }
    };
    this.errorCount = 0;
  
  
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
  getQuery = (event) =>
  {
  
    return {
      bindings: {vid: (event.id || event.index)}
      ,gremlin: "def groups = g.V(vid).as('orig').both().values('Metadata.Type').dedup()\n" +
      "  \n" +
      "Set groupSet = new HashSet()\n" +
      "StringBuffer sb = new StringBuffer();\n" +
      "\n" +
      "groups.each{ item -> \n" +
      "  sb.setLength(0)\n" +
      "  sb.append('{\"id\": \"').append(item)\n" +
      "    .append('\", \"content\":\"').append(item.replaceAll('[_.]',' '))\n" +
      "    .append('\"}')\n" +
      "  groupSet.add(sb.toString()) \n" +
      "}\n" +
      "\n" +
      "groupSet.toString()\n" +
      "\n" +
      "\n" +
      "items = g.V(vid).both()\n" +
      "\n" +
      "Set itemSet = new HashSet()\n" +
      "\n" +
      "sb.setLength(0)\n" +
      "items.each{\n" +
      "  \n" +
      "  vals -> \n" +
      "    vals.each{\n" +
      "      item -> \n" +
      "        sb.setLength(0)\n" +
      "        sb.append('{\"id\":').append(item.id())\n" +
      "          .append(',\"group\":\"').append(item.values('Metadata.Type').next())\n" +
      "          .append('\",\"start\":')\n" +
      "          .append(item.values('Metadata.Update_Date').next().getTime() )\n" +
      "          .append(',\"content\":\"').append(item.values('Metadata.Type').next()).append('(').append(item.id()).append(')').append('\"')\n" +
      "          .append(',\"type\":\"box\"')\n" +
      "          .append('}')\n" +
      "        itemSet.add(sb.toString())\n" +
      "    }\n" +
      "    \n" +
      "  // it.get().each{\n" +
      "  //   key, val -> sb.length\n" +
      "  // }\n" +
      "}\n" +
      "\n" +
      "\n" +
      "sb.setLength(0)\n" +
      "sb.append('{ \"groups\":')\n" +
      "  .append(groupSet.toString())\n" +
      "  .append(',\"items\":')\n" +
      "  .append(itemSet.toString())\n" +
      "  .append('}')\n" +
      "sb.toString()"
    };
  };
  
  selectData = (event) =>
  {
  
    let url =  this.url; // = PontusComponent.getGraphURL(this.props);
    // "/gateway/sandbox/pvgdpr_server/home/graph";
    if (this.h_request !== null)
    {
      clearTimeout(this.h_request);
    }
    
    let self = this;
    
    this.h_request = setTimeout(() =>
    {
      
      let CancelToken = axios.CancelToken;
      self.req = CancelToken.source();
      
      axios.post(url, this.getQuery(event), {
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
          this.onError(event,thrown);
        }
      });
      
      
    }, 50);
    
    
  };
  
  onError = (event, thrown) =>
  {
    this.errorCount++;
    if (this.errorCount > 5){
      alert("Failed to get graph data:" + thrown);
    
    }
  
    else{
      this.selectData(event);
    }
  };
  
  onSuccess = (resp) =>
  {
    
    this.errorCount = 0;
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
        
        // let graph = {nodes: items.nodes, edges: items.edges};
        //
        // this.setState({graph: graph});
        // localStorage.setItem(this.subscription, graph);
        
        this.items.clear();
        this.items.add(items.items)
        this.groups.clear();
        this.groups.add(items.groups);
        
        this.timeline.setGroups(this.groups);
        this.timeline.setItems(this.items);
        this.timeline.fit();
  
        this.setState({groups: this.groups, items: this.items});
        
      }
      
      
    }
    catch (e)
    {
      // e;
    }
    
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
  
  onRangeChange = (event) => {
    /*
     event={"start":"2013-05-03T05:48:43.057Z","end":"2013-05-16T22:00:20.634Z","byUser":true,"event":{"pointers":[{"isTrusted":true,"_handled":{"pan":true,"panend":true}}],"changedPointers":[{"isTrusted":true,"_handled":{"pan":true,"panend":true}}],"pointerType":"mouse","srcEvent":{"isTrusted":true,"_handled":{"pan":true,"panend":true}},"isFirst":false,"isFinal":true,"eventType":4,"center":{"x":186,"y":144},"timeStamp":1536169382064,"deltaTime":2253,"angle":177.75974264585528,"distance":818.6256775840836,"deltaX":-818,"deltaY":32,"offsetDirection":2,"overallVelocityX":-0.36307146027518866,"overallVelocityY":0.014203284509542832,"overallVelocity":-0.36307146027518866,"scale":1,"rotation":0,"maxPointers":1,"velocity":0,"velocityX":0,"velocityY":0,"direction":1,"target":"DOM Element","type":"panend","firstTarget":"DOM Element"}}
 
     */
    this.selectData(event);
    
    
  };
  
  onSelect = (event) => {
    /*
     {"items":[1],"event":{"pointers":[{"isTrusted":true,"_handled":{"tap":true}}],"changedPointers":[{"isTrusted":true,"_handled":{"tap":true}}],"pointerType":"mouse","srcEvent":
     */
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
    this.timeline.on('rangechange', this.onRangeChange);
    this.timeline.on('select', this.onSelect);
  
  
  }
  
  componentWillUnmount()
  {
    this.props.glEventHub.off(this.subscription, this.selectData);
  
    this.timeline.off('rangechange', this.onRangeChange);
  
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