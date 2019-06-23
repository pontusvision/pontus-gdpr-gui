// import React from 'react';
import PVTimeline from './PVTimeline';

// import PontusComponent from "./PontusComponent";


/***************************
 * UserList Component
 ***************************/
class NavPanelInformationYouHoldIngestionTimeline extends PVTimeline
{
  constructor(props)
  {
    
    super(props);
    
    // this.subscription =  + '-pvgrid-on-click-row';
    this.namespace = "NavPanelInformationYouHold";
    
    
  }
  
  
  onSelect = (event) =>
  {
    /*
     {"items":[1],"event":{"pointers":[{"isTrusted":true,"_handled":{"tap":true}}],"changedPointers":[{"isTrusted":true,"_handled":{"tap":true}}],"pointerType":"mouse","srcEvent":
     */
    let val = {id: event.items[0]};
    this.props.glEventHub.emit(this.namespace + '-pvgrid-on-click-row', val);
    
  };
  
  
  doubleClick = (param) =>
  {
    // let event = {id: param.nodes[0]};
    // this.selectData(event);
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
      bindings: {pg_start: event.start, pg_end: event.end}
      , gremlin: "import groovy.json.JsonOutput;\n" +
        "\n" +
        "def startDate = pg_start as java.util.Date;\n" +
        "def stopDate = pg_end as java.util.Date;\n" +
        "Long startTime = startDate.getTime();\n" +
        "Long stopTime = stopDate.getTime();\n" +
        "\n" +
        "StringBuffer sb = new StringBuffer('{ \"groups\": [{ \"id\":1, \"content\": \"Structured Data Insertion\" },{ \"id\":2, \"content\":\"Unstructured Data Insertion\"} ]');\n" +
        "\n" +
        "sb.append(',\"items\": [')\n" +
        "JsonOutput jo = new JsonOutput();\n" +
        "boolean firstTime = true;\n" +
        "\n" +
        "g.V()\n" +
        " .has('Metadata.Type.Event.Group_Ingestion',eq('Event.Group_Ingestion'))\n" +
        ".has('Event.Group_Ingestion.Metadata_Start_Date', gt(startTime))\n" +
        ".has('Event.Group_Ingestion.Metadata_End_Date', lt (stopTime))\n" +
        ".as('events')\n" +
        ".order().by(__.as('events').out().count(),decr)\n" +
        ".range(0,50)\n" +
        "\n" +
        ".match(\n" +
        "   __.as('events').out().count().as('numEvents')\n" +
        "  ,__.as('events').out().in().hasNot('Metadata.Type.Event.Group_Ingestion').count().as(\"numMatches\")\n" +
        "  ,__.as('events').values('Event.Group_Ingestion.Metadata_Start_Date').as('start')\n" +
        "  ,__.as('events').values('Event.Group_Ingestion.Metadata_End_Date').as('stop')\n" +
        "  ,__.as('events').values('Event.Group_Ingestion.Operation').as('operation')\n" +
        "  ,__.as('events').values('Event.Group_Ingestion.Type').as('type')\n" +
        "  ,__.as('events').id().as('id')\n" +
        "      \n" +
        "  )\n" +
        ".select('numMatches', 'numEvents', 'start', 'stop','type','operation','id')\n" +
        ".each{ it ->\n" +
        "\n" +
        "  if (firstTime)\n" +
        "  {\n" +
        "    firstTime = false;\n" +
        "  }\n" +
        "  else\n" +
        "  {\n" +
        "    sb.append('\\n,')\n" +
        "\n" +
        "  }\n" +
        "  def numMatches = it.remove('numMatches')\n" +
        "  def numEvents = it.remove('numEvents')\n" +
        "  def numOrphans = numEvents - numMatches;\n" +
        "  def type = it.remove('type')\n" +
        "  def operation = it.remove('operation')\n" +
        "  it.put('type','box')\n" +
        "  it.put('group', operation == 'Structured Data Insertion' ? 1 : 2)\n" +
        "  it.put('content', \"${type} - num events: ${numEvents} ${numOrphans > 0? ' - unmatched: ' + numOrphans :''}\")\n" +
        "\n" +
        "  sb.append(jo.toJson(it))\n" +
        "\n" +
        "  \n" +
        "}\n" +
        "\n" +
        "sb.append('] }')\n" +
        "\n" +
        "sb.toString()"
    };
  };
  
  
}

export default NavPanelInformationYouHoldIngestionTimeline;