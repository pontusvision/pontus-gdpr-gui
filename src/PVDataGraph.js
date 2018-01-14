import React, {Component} from 'react';
import ResizeAware from 'react-resize-aware';
import Graph from 'react-graph-vis';
import axios from 'axios';
import PVGridSelfDiscovery from './PVGridSelfDiscovery';
import {Segment, Portal} from 'semantic-ui-react';
// import {Flex, Box} from 'reflexbox';


// import {Menu, Button, Segment, Portal, Sidebar, Header, Icon, Image} from 'semantic-ui-react';

// import "http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css";
// import "http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css";
//


/***************************
 * UserList Component
 ***************************/
class PVDataGraph extends Component
{
  constructor(props)
  {
    super(props);
    this.enableClose = false;
  
    this.subscription = (this.props.namespace ? this.props.namespace : "" ) + '-pvgrid-on-click-row';
    this.selfDiscoveryGridLoadedSubscription = (this.props.namespace ? this.props.namespace : "" ) + '-pvgrid-on-data-loaded';
    this.state = {
      vid: -1,
      metadataType: '',
      edgeType: '',
      edgeDir: '<-',
      open: false,
      
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
          // "Object Privacy Notice": {
          //   shape: 'icon',
          //   icon: {
          //     face: 'FontAwesome',
          //     code: '\uf0c0',
          //     size: 50,
          //     color: '#57169a'
          //   }
          // },
          // "Object Lawful Basis": {
          //   shape: 'icon',
          //   icon: {
          //     face: 'FontAwesome',
          //     code: '\uf007',
          //     size: 50,
          //     color: '#aa00ff'
          //   }
          // }
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
        "physics": {
          "barnesHut": {
            "gravitationalConstant": -35950,
            "springLength": 720,
            "springConstant": 0.055,
            "damping": 0.34,
            "avoidOverlap": 1
          },
          "minVelocity": 0.75,
          "timestep": 0.11
        },
        edges: {
          color: "#FFFFFF"
        }
        
        
      }
      , events: {
        // select: this.selectUser
        // doubleClick: this.doubleClick
      }
    };
    
    this.errorCount = 0;
    this.underscoreOrDot = new RegExp("[_.]", 'g');
    
  }
  
  doubleClick = (param) =>
  {
    try
    {
      
      param.event.stopPropagation();
      this.enableClose = false;
      let event = {id: param.nodes[0]};
      let isString = typeof(event.id) === 'string' || event.id instanceof String;
  
      if ( isString){
        let edgeDir = event.id.indexOf('<-') !== -1? '<-': '->';
  
        let  metadataType = event.id.replace(/ ->.*/g,'').replace(/ <-.*/g,'').replace(' ', '.').replace(/ /g, '_');
        let  edgeType = event.id.replace(/.*-> /g,'').replace(/.*<- /g,'').replace(/ /g, '_').replace(/[()]/g,'');
  
        this.setState({
          metadataType: metadataType,
          vid: this.eventId,
          edgeType: edgeType,
          edgeDir: edgeDir,
          open: true
        })
  
  
      }
      else if (event.id) {
        this.selectData(event);
      }
    
      
      
    }
    catch (e)
    {
      e;
    }
    // this.selectData(event);
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
    this.eventId = eventId;
    
    return {
      bindings: {
        pg_vid: eventId
      }
      , gremlin: "StringBuffer sb = new StringBuffer()\n" +
      "StringBuffer sb2 = new StringBuffer()\n" +
      "\n" +
      "Long numEdges = g.V(pg_vid).bothE().count().next();\n" +
      "\n" +
      "if (numEdges > 15){\n" +
      "\n" +
      "  String origLabel = g.V(pg_vid).label().next().replaceAll('[_.]',' ');\n" +
      "        HashSet nodesSet = new HashSet()\n" +
      "      HashSet edgesSet = new HashSet()\n" +
      "\n" +
      "  \n" +
      "  g.V(pg_vid).as('orig')\n" +
      "    .outE().match(\n" +
      "       __.as('e').inV().label().as('vLabel')\n" +
      "    // ,  __.as('e').outV().label().as('inVLabel')\n" +
      "    ,  __.as('e').label().as('edgeLabel')\n" +
      "    )\n" +
      "    .select( 'edgeLabel','vLabel')\n" +
      "    .groupCount().each{\n" +
      "      def entry = it;\n" +
      "      \n" +
      "      \n" +
      "      \n" +
      "      entry.each{\n" +
      "        key,val ->\n" +
      "        \n" +
      "\n" +
      "          if (key instanceof Map){\n" +
      "            \n" +
      "            String edgeLabel = key.get('edgeLabel').replaceAll('[_.]',' ');\n" +
      "            String toNodeLabel = key.get('vLabel').replaceAll('[_.]',' ') +\n" +
      "              ' -> (' + edgeLabel +')';\n" +
      "\n" +
      "            String edgeId = key.get('edgeLabel');\n" +
      "            String toNodeId = key.get('vLabel') +\n" +
      "              ' -> (' + edgeId +')';\n" +
      "\n" +
      "            sb.setLength(0);\n" +
      "  \n" +
      "            sb.append('{ \\\"id\\\":\\\"').append(toNodeId)\n" +
      "              .append('\\\",\\\"label\\\":\\\"').append(toNodeLabel)\n" +
      "              .append('\\\",\\\"group\\\":\\\"').append(toNodeLabel)\n" +
      "              .append('\\\",\\\"shape\\\":\\\"').append('box')\n" +
      "              .append('\\\"}\\n')\n" +
      "  \n" +
      "\n" +
      "            nodesSet.add( sb.toString() );\n" +
      "\n" +
      "            \n" +
      "            sb.setLength(0);\n" +
      "            \n" +
      "            sb.append('{ \\\"from\\\":\\\"')\n" +
      "              .append(pg_vid).append('\\\",\\\"to\\\":\\\"')\n" +
      "              .append(toNodeId).append('\\\",\\\"label\\\":\\\"')\n" +
      "              .append(edgeLabel).append(' (')\n" +
      "              .append(val).append(')\\\",\\\"value\\\":')\n" +
      "              .append(val).append('}\\n') \n" +
      "            \n" +
      "            edgesSet.add (sb.toString());\n" +
      "            sb.setLength(0);\n" +
      "  \n" +
      "          }         \n" +
      "          \n" +
      "                     \n" +
      "      \n" +
      "    }\n" +
      "      \n" +
      "      \n" +
      "        \n" +
      "  } \n" +
      "  \n" +
      "  \n" +
      "    \n" +
      "  g.V(pg_vid).as('orig')\n" +
      "    .inE().match(\n" +
      "       __.as('e').outV().label().as('vLabel')\n" +
      "    // ,  __.as('e').outV().label().as('inVLabel')\n" +
      "    ,  __.as('e').label().as('edgeLabel')\n" +
      "    )\n" +
      "    .select( 'edgeLabel','vLabel')\n" +
      "    .groupCount().each{\n" +
      "      it.each{\n" +
      "        key,val -> \n" +
      "          if (key instanceof Map){\n" +
      "            \n" +
      "            String edgeLabel = key.get('edgeLabel').replaceAll('[_.]',' ');\n" +
      "\n" +
      "            String fromNodeLabel = key.get('vLabel').replaceAll('[_.]',' ') +\n" +
      "             ' <- ('+edgeLabel+')';\n" +
      "            String edgeId = key.get('edgeLabel');\n" +
      "\n" +
      "            String fromNodeId = key.get('vLabel')+\n" +
      "             ' <- ('+edgeId+')';\n" +
      "            sb.setLength(0);\n" +
      "  \n" +
      "            sb.append('{ \\\"id\\\":\\\"').append(fromNodeId)\n" +
      "              .append('\\\",\\\"label\\\":\\\"').append(fromNodeLabel)\n" +
      "              .append('\\\",\\\"group\\\":\\\"').append(fromNodeLabel)\n" +
      "              .append('\\\",\\\"shape\\\":\\\"').append('box')\n" +
      "              .append('\\\"}')\n" +
      "  \n" +
      "            nodesSet.add( sb.toString() );\n" +
      "\n" +
      "            \n" +
      "            sb.setLength(0);\n" +
      "            \n" +
      "            sb.append('{ \\\"from\\\":\\\"')\n" +
      "              .append(fromNodeId).append('\\\",\\\"to\\\":\\\"')\n" +
      "              .append(pg_vid).append('\\\",\\\"label\\\":\\\"')\n" +
      "              .append(edgeLabel).append(' (')\n" +
      "              .append(val).append(')\\\",\\\"value\\\":')\n" +
      "              .append(val).append('}') \n" +
      "            edgesSet.add (sb.toString());\n" +
      "            sb.setLength(0);\n" +
      "          }         \n" +
      "          \n" +
      "         \n" +
      "      \n" +
      "    }\n" +
      "      \n" +
      "      \n" +
      "        \n" +
      "  } \n" +
      "  sb.setLength(0)\n" +
      "  sb.append('{ \\\"id\\\":\\\"').append(pg_vid)\n" +
      "    .append('\\\",\\\"label\\\":\\\"').append(origLabel)\n" +
      "    .append('\\\",\\\"group\\\":\\\"').append(origLabel)\n" +
      "    .append('\\\",\\\"fixed\\\":').append(true)\n" +
      "    .append(',\\\"shape\\\":\\\"').append('image')\n" +
      "    .append('\\\",\\\"image\\\":\\\"').append(getPropsNonMetadataAsHTMLTableRows(g,pg_vid,origLabel).toString())\n" +
      "    .append('\\\"}')\n" +
      "    \n" +
      "  nodesSet.add( sb.toString() )  \n" +
      "  sb.setLength(0)\n" +
      "\n" +
      "  sb.append('{ \\\"nodes\\\":' )\n" +
      "     .append(nodesSet.toString()).append(', \\\"edges\\\":').append(edgesSet.toString())\n" +
      "     .append('}')         \n" +
      "}\n" +
      "else{\n" +
      "  int counter = 0;\n" +
      "\n" +
      "\ttry {\n" +
      "\t  \n" +
      "\tsb.append('{ \\\"nodes\\\":[' );\n" +
      "\t  \n" +
      "\tg.V(pg_vid)\n" +
      "\t  .both()\n" +
      "\t  .dedup()\n" +
      "\t\t.each{ \n" +
      "\t\tString groupStr = it.values('Metadata.Type').next();\n" +
      "\t\tString labelStr = it.label().toString().replaceAll('[_.]',' ');\n" +
      "\t\tLong vid = it.id();\n" +
      "\t\tsb.append(counter == 0? '{':',{')\n" +
      "\t\t  .append('\\\"id\\\":').append(vid)\n" +
      "\t\t  .append(',\\\"group\\\":\\\"').append(groupStr)\n" +
      "\t\t  .append('\\\",\\\"label\\\":\\\"').append(labelStr)\n" +
      "\t\t  .append('\\\",\\\"shape\\\":\\\"').append('image')\n" +
      "\t\t  .append('\\\",\\\"image\\\":\\\"').append(getPropsNonMetadataAsHTMLTableRows(g,vid,labelStr).toString())\n" +
      "\t\t  .append('\\\"');\n" +
      "\t\tif (vid.equals( pg_vid)){  \n" +
      "\t\t  sb.append(',\\\"fixed\\\":true');\n" +
      "\t\t} \n" +
      "\t\tsb.append('}')\n" +
      "\t\t  \n" +
      "\t\tcounter++;\n" +
      "\t\t\n" +
      "\t  };\n" +
      "\tg.V(pg_vid)  // Also get the original node\n" +
      "\t .each{ \n" +
      "\t\tString groupStr = it.values('Metadata.Type').next();\n" +
      "\t\tString labelStr = it.label().toString().replaceAll('[_.]',' ');\n" +
      "\t\tLong vid = it.id();\n" +
      "\t\tsb.append(counter == 0? '{':',{')\n" +
      "\t\t  .append('\\\"id\\\":').append(vid)\n" +
      "\t\t  .append(',\\\"group\\\":\\\"').append(groupStr)\n" +
      "\t\t  .append('\\\",\\\"label\\\":\\\"').append(labelStr)\n" +
      "\t\t  .append('\\\",\\\"shape\\\":\\\"').append('image')\n" +
      "\t\t  .append('\\\",\\\"image\\\":\\\"').append(getPropsNonMetadataAsHTMLTableRows(g,vid,labelStr).toString())\n" +
      "\t\t  .append('\\\"');\n" +
      "\t\tif (vid.equals( pg_vid)){  \n" +
      "\t\t  sb.append(',\\\"fixed\\\":true');\n" +
      "\t\t} \n" +
      "\t\tsb.append('}')\n" +
      "\t\t  \n" +
      "\t\tcounter++;\n" +
      "\t\t\n" +
      "\t  };\n" +
      "\tsb.append('], \\\"edges\\\":[' )\n" +
      "\n" +
      "\n" +
      "\tcounter = 0;\n" +
      "\tg.V(pg_vid)\n" +
      "\t  .bothE()\n" +
      "\t  .dedup()\n" +
      "\t  .each{ \n" +
      "\t  sb.append(counter == 0? '{':',{')\n" +
      "\t\t.append('\\\"from\\\": ').append(it.inVertex().id())\n" +
      "\t\t.append(' ,\\\"to\\\": \\\"').append(it.outVertex().id())\n" +
      "\t\t.append('\\\",\\\"label\\\": \\\"').append(it.label().toString().replaceAll('[_.]',' '))\n" +
      "\t\t.append('\\\"}')\n" +
      "\t\t\n" +
      "\t  counter++;\n" +
      "\t  \n" +
      "\t}\n" +
      "\n" +
      "\tsb.append(']}' );\n" +
      "\n" +
      "\n" +
      "\t}catch (Throwable t){\n" +
      "\t  sb.append(t.toString());\n" +
      "\t}\n" +
      "\t  \n" +
      "\tsb.toString() \n" +
      "}\n" +
      "   \n" +
      " sb.toString() \n"
      
    };
  };
  
  measureElement = (htmlToMeasure) =>
  {
    const element = document.createElement('div');
    element.innerHTML = htmlToMeasure;
    document.body.appendChild(element);
    
    let retVal = {width: element.offsetWidth, height: element.offsetHeight};
    
    element.parentNode.removeChild(element);
    
    
    return retVal;
  };
  
  
  createSVGHTMLTableWithProps = (propsInHTMLTableRows, vLabel) =>
  {
    
    
    let tableBodySb =
      "<div xmlns=\"http://www.w3.org/1999/xhtml\" style=\"font-size:20px;color:#FFFFFF;height:100%;width:100%;\">"
      + "<style>"
      + ".tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:visible;word-break:normal;}"
      + ".tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:visible;word-break:normal;color:#ffffff;}"
      + ".tg .tg-ygl1{font-weight:bold;background-color:#9b9b9b}"
      + ".tg .tg-x9s4{font-weight:bold;background-color:#9b9b9b;vertical-align:top}"
      + ".tg .tg-yw4l{vertical-align:top; color:#ffffff;}"
      + "</style>"
      // + "<h3 style=\"color: white;\">"
      // + vLabel.replace(this.underscoreOrDot, " ")
      // + "</h3>"
      + "<table class=\"tg\" style=\" overflow: visible; background: #595959; height: auto; width: 600px; padding: 5px;\">"
      + "<colgroup> <col style=\"width: 30%\"/><col style=\"width: 70%\"/></colgroup>"
      + "<tr><th class=\"tg-ygl1\">Property</th><th class=\"tg-x9s4\">Value</th></tr>"
      + propsInHTMLTableRows
      + "</table></div>";
    
    let measuredSize = this.measureElement(tableBodySb);
    
    let svgHeadSb =
      '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" height="' + measuredSize.height + '" width="600" >'
      + '<foreignObject height="100%" width="100%"  fill="#797979" stroke-width="20" stroke="#ffffff"  >';
    
    
    let svgFootSb = ("</foreignObject></svg>");
    
    let imageSb = ("data:image/svg+xml;charset=utf-8,");
    
    let svgSb = svgHeadSb + tableBodySb + svgFootSb;
    
    
    return imageSb + encodeURIComponent(svgSb);
    // imageSb.append(percentEscaper.escape(svgSb.toString()));
    //
    // this.image = imageSb.toString().replaceAll(Pattern.quote("nbsp"),
    //   "#160"); //percentEscaper.escape(tableBodySb.toString()).replaceAll("&nbsp;","&#160;");
    
    
  };
  
  selectData = (event) =>
  {
    this.origNodeId = event != null ? (+(event.id || event.index)) : -1;// the + converts to number just in case
    // this.origNodeId = (+(this.origNodeId));
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
      
      axios.post(url, this.getQuery(this.origNodeId), {
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
          this.onError(event, thrown);
        }
      });
      
      
    }, 50);
    
    
  };
  
  onError = (event, thrown) =>
  {
    this.errorCount++;
    if (this.errorCount > 5)
    {
      alert("Failed to get graph data:" + thrown);
      
    }
    
    else
    {
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
        
        let nodes = this.addMainNodeProperties(items.nodes);
        
        
        let graph = {nodes: nodes, edges: items.edges};
        
        this.setState({graph: graph});
        localStorage.setItem(this.subscription, graph);
        
      }
      
      
    }
    catch (e)
    {
      console.log(e);
    }
    
  };
  
  addMainNodeProperties = (nodes) =>
  {
    for (let i = 0, ilen = nodes.length; i < ilen; i++)
    {
      let node = nodes[i];
      if (node.image)
      {
        // node.shape='box';
        node.image = this.createSVGHTMLTableWithProps(node.image, node.label);
        
      }
    }
    return nodes;
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
    this.props.glEventHub.on(this.selfDiscoveryGridLoadedSubscription , this.enableCloseCb);
  }
  
  componentWillUnmount()
  {
    this.props.glEventHub.off(this.subscription, this.selectData);
    
    
  }
  
  enableCloseCb = () => {
    this.enableClose = true;
  };
  
  
  handleClose = (event, data) =>
  {
    // event;
    // data;
    if (this.enableClose){
      this.setState({ open: false });
    }
    
    
  };
  
  selfDiscoveryGrid = (sdg) =>{
    this.sdg = sdg;
    
    
  };
  render()
  {
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    
    const {open, visible} = this.state;
    
    return (
      <ResizeAware
        style={{height: '100%', width: '100%' , flex: 1}}
        onResize={this.handleResize}
      >
        
        
        <Graph style={{height: '100%', width: '100%'}} graph={this.state.graph} options={this.state.options}
               events={this.state.events} ref={this.setGraph} getNetwork={this.setNetwork}/>
        
        <Portal
          onClose={this.handleClose}
          open={open}
          transition={{
          animation: 'scale',
          duration: 1400,
         }} >
          <Segment
            style={{
              height: '50%', width: '50%', overflowX: 'auto', overflowY: 'auto', left: '30%', position: 'fixed',
              top: '20%', zIndex: 100000, backgroundColor: '#696969'
            }}>
            {/*<Flex column w={1} wrap={true}>*/}
              {/*/!*<Box px={2} w={1}>*!/*/}
                {/*/!**!/*/}
                {/*/!*<Menu>*!/*/}
                  {/*/!*<Button*!/*/}
                    {/*/!*className={'compact'}*!/*/}
                    {/*/!*onClick={() => this.setState({ open: false })}*!/*/}
                    {/*/!*style={{border: 0, background: 'rgb(69,69,69)', margin: 4}}*!/*/}
                    {/*/!*size={'small'}*!/*/}
                  {/*/!*>*!/*/}
                    {/*/!*Close*!/*/}
                  {/*/!*</Button>*!/*/}
                  {/*/!*<span>{this.state.metadataType.replace(this.underscoreOrDot, ' ')}</span>*!/*/}
                  {/*/!**!/*/}
                  {/*/!**!/*/}
                {/*/!*</Menu>*!/*/}
              {/**/}
              {/**/}
              {/*/!*</Box>*!/*/}
              {/*<Box px={2} w={1} style = {{height: '100%'}}>*/}
                {/**/}
                <PVGridSelfDiscovery
                  ref = {this.selfDiscoveryGrid}
                  style = {{height: '100%'}}
                  namespace={this.props.namespace}
                  vid={this.state.vid}
                  edgeType={this.state.edgeType}
                  edgeDir={this.state.edgeDir}
                  metadataType={this.state.metadataType}
                  glEventHub={this.props.glEventHub}
                />
              {/*</Box>*/}
            {/*</Flex>*/}
          </Segment>
        </Portal>
      
      </ResizeAware>
    
    );
    
    
  }
}

export default PVDataGraph;