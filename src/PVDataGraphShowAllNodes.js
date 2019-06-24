import PVDataGraph from './PVDataGraph';


/***************************
 * UserList Component
 ***************************/
class PVDataGraphShowAllNodes extends PVDataGraph
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
        "edges": {
          "smooth": {
            "forceDirection": "none"
          }
          , color: "#FFFFFF"
          
        }
        , "physics": {
          "repulsion": {
            "centralGravity": 0.2,
            "springLength": 1010,
            "nodeDistance": 6450
          },
          "maxVelocity": 187,
          "minVelocity": 0.75,
          "solver": "repulsion"
        }
        
      }
      , events: {
        // select: this.selectUser
        doubleClick: this.doubleClick
      }
    };
    
    this.errorCount = 0;
    this.underscoreOrDot = new RegExp("[_.]", 'g');
    
  }
  
  doubleClick = (param) =>
  {
    // let event = {id: param.nodes[0]};
    // this.selectData(event);
  };
  
  getQuery = (eventId) =>
  {
    
    let startOfQuery = eventId <=0 ?
      "g.V()\n" :
      "g.V(pg_vid).repeat(__.inE().subgraph('subGraph').outV()).times(4).cap('subGraph')\n" +
      ".next().traversal()\n" +
      ".V()";
  
  
    return {
      bindings: {
        pg_vid: eventId
      }
      , gremlin: "StringBuffer sb = new StringBuffer();\n" +
      "int counter = 0;\n" +
      "\n" +
      "try {\n" +
      "  \n" +
      "sb.append('{ \"nodes\":[' )\n" +
      "  \n" +
      startOfQuery +
      "  .or(\n" +
      "    __.has('Metadata.Type.Object.AWS_VPC',eq('Object.AWS_VPC'))\n" +
      "  , __.has('Metadata.Type.Object.AWS_Security_Group',eq('Object.AWS_Security_Group'))\n" +
      "  , __.has('Metadata.Type.Object.AWS_Instance',eq('Object.AWS_Instance'))\n" +
      "  )" +
      "  .dedup()\n" +
      "  .each{ \n" +
      "  String groupStr = it.values('Metadata.Type').next();\n" +
      "  String labelStr = it.values(groupStr+'.Id').next();\n" +
      "  Long vid = it.id();\n" +
      "  sb.append(counter == 0? '{':',{')\n" +
      "    .append('\"id\":').append(vid)\n" +
      "    .append(',\"group\":\"').append(groupStr)\n" +
      "    .append('\",\"label\":\"').append(labelStr)\n" +
      "    .append('\",\"shape\":\"').append('image')\n" +
      "    .append('\",\"image\":\"').append(getPropsNonMetadataAsHTMLTableRows(g,vid,labelStr).toString())\n" +
      "    .append('\"}')\n" +
      "    \n" +
      "  counter++;\n" +
      "  \n" +
      "}\n" +
      "\n" +
      "sb.append('], \"edges\":[' )\n" +
      "\n" +
      "\n" +
      "counter = 0;\n" +
      startOfQuery +
      "  .or(\n" +
      "    __.has('Metadata.Type.Object.AWS_VPC',eq('Object.AWS_VPC'))\n" +
      "  , __.has('Metadata.Type.Object.AWS_Security_Group',eq('Object.AWS_Security_Group'))\n" +
      "  , __.has('Metadata.Type.Object.AWS_Instance',eq('Object.AWS_Instance'))\n" +
      "  )\n" +
      "  .bothE()\n" +
      "  .dedup()" +
      "  .each{ \n" +
      "  sb.append(counter == 0? '{':',{')\n" +
      "    .append('\"from\": ').append(it.inVertex().id())\n" +
      "    .append(' ,\"to\": \"').append(it.outVertex().id())\n" +
      "    .append('\",\"label\": \"').append(it.label().toString().replaceAll('[_.]',' '))\n" +
      "    .append('\"}')\n" +
      "    \n" +
      "  counter++;\n" +
      "  \n" +
      "}\n" +
      "\n" +
      "sb.append(']}' );\n" +
      "\n" +
      "\n" +
      "}catch (Throwable t){\n" +
      "  sb.append(t.toString());\n" +
      "}\n" +
      "  \n" +
      "sb.toString()"
      
    };
  };
  
  
  // createSVGHTMLTableWithProps = (propsInHTMLTableRows, vLabel) =>
  // {
  //
  //
  //   let tableBodySb =
  //     "<div xmlns=\"http://www.w3.org/1999/xhtml\" style=\"font-size:20px;color:#FFFFFF;height:100%;width:100%;\">"
  //     + "<style>"
  //     + ".tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:visible;word-break:normal;}"
  //     + ".tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:visible;word-break:normal;color:#ffffff;}"
  //     + ".tg .tg-ygl1{font-weight:bold;background-color:#9b9b9b}"
  //     + ".tg .tg-x9s4{font-weight:bold;background-color:#9b9b9b;vertical-align:top}"
  //     + ".tg .tg-yw4l{vertical-align:top; color:#ffffff;}"
  //     + "</style>"
  //     // + "<h3 style=\"color: white;\">"
  //     // + vLabel.replace(this.underscoreOrDot, " ")
  //     // + "</h3>"
  //     + "<table class=\"tg\" style=\" overflow: visible; background: #595959; height: auto; width: 600px; padding: 5px;\">"
  //     + "<colgroup> <col style=\"width: 30%\"/><col style=\"width: 70%\"/></colgroup>"
  //     + "<tr><th class=\"tg-ygl1\">Property</th><th class=\"tg-x9s4\">Value</th></tr>"
  //     + propsInHTMLTableRows
  //     + "</table></div>";
  //
  //   let measuredSize = this.measureElement(tableBodySb);
  //
  //   let svgHeadSb =
  //     '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" height="' + measuredSize.height + '" width="600" >'
  //     + '<foreignObject height="100%" width="100%"  fill="#797979" stroke-width="20" stroke="#ffffff"  >';
  //
  //
  //   let svgFootSb = ("</foreignObject></svg>");
  //
  //   let imageSb = ("data:image/svg+xml;charset=utf-8,");
  //
  //   let svgSb = svgHeadSb + tableBodySb + svgFootSb;
  //
  //
  //   return imageSb + encodeURIComponent(svgSb);
  //   // imageSb.append(percentEscaper.escape(svgSb.toString()));
  //   //
  //   // this.image = imageSb.toString().replaceAll(Pattern.quote("nbsp"),
  //   //   "#160"); //percentEscaper.escape(tableBodySb.toString()).replaceAll("&nbsp;","&#160;");
  //
  //
  // };
  //
  componentDidMount()
  {
    // super.componentDidMount();
    this.selectData(null);
  }
  
}

export default PVDataGraphShowAllNodes;