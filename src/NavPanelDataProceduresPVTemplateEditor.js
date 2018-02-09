import PVEmailEditor from "./PVEmailEditor";

//

class NavPanelDataProceduresPVTemplateEditor extends PVEmailEditor
{
  
  componentDidMount()
  {
    this.namespace = ("NavPanelInformationYouHold");
    
    super.componentDidMount();
    
    this.lastData = null;
  
    this.props.glEventHub.on(this.namespace + '-pvgrid-on-click-row', this.onClickedRow);
  
    /*
     property("Object.Data_Procedures.Type", typeStr.replaceAll('[_.]',' ')).
     property("Object.Data_Procedures.Property", propStr.replaceAll('[_.]',' ')).
     property("Object.Data_Procedures.Delete_URL", 'https://api-gateway/delete-'+propStr.toLowerCase()).
     property("Object.Data_Procedures.Delete_Mechanism", distributionRequestType.sample()).
     property("Object.Data_Procedures.Update_URL", 'https://api-gateway/update-'+propStr.toLowerCase()).
     property("Object.Data_Procedures.Update_Mechanism", distributionRequestType.sample()).
 
     */
    
  }
  componentWillUnmount(){
    this.props.glEventHub.off(this.namespace + '-pvgrid-on-click-row', this.onClickedRow);
  
  }
  
  
  
  onClickedRow = (data) => {
    this.setState({value: data['Object.Notification_Templates.Text']});
    this.lastData = data;
    
  };
  
  getQuery = (newVal, lastData)=>{
    return {
      gremlin: "" +
      "def trans = graph.tx()\n" +
      "    try {\n" +
      "        if (!trans.isOpen()) {\n" +
      "            trans.open();\n" +
      "        }\n" +
      "        g.V(pg_id)\n" +
      "                .property(\"Object.Notification_Templates.Text\", pg_newValStr)\n" +
      "                .next();\n" +
      "        trans.commit();\n" +
      "    }\n" +
      "    catch (t) {\n" +
      "        trans.rollback();\n" +
      "        throw t;\n" +
      "    } finally {\n" +
      "        trans.close();\n" +
      "    }" +
      "" +
      ""
      , bindings: {
        pg_newValStr: newVal
       ,pg_id: lastData.index
      }
      
    };
  };
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
  
    let sortcolId = sortcol === null ? null : sortcol.id;
  
  
    let selectBody =
      "  .select('Object.Notification_Templates.Id'" +
      "         ,'Object.Notification_Templates.Text'" +
      "         ,'Object.Notification_Templates.Types'" +
      "         ,'event_id'" +
      "         )";
  
  
    return {
      gremlin: "g.V()" +
      ".has('Metadata.Type','Object.Notification_Templates')" +
      ".order().by(pg_orderCol == null ? 'Object.Notification_Templates.Id' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
      ".range(pg_from,pg_to).as('dataProcs')" +
      ".match(" +
      "    __.as('dataProcs').values('Object.Notification_Templates.Id')  .as('Object.Notification_Templates.Id')" +
      "  , __.as('dataProcs').values('Object.Notification_Templates.Text').as('Object.Notification_Templates.Text')" +
      "  , __.as('dataProcs').values('Object.Notification_Templates.Types').as('Object.Notification_Templates.Types')" +
      "  , __.as('dataProcs').id().as('event_id')" +
      "  )" +
      selectBody
      , bindings: {
        pg_from: from
        , pg_to: to
        , pg_orderCol: sortcolId
        , pg_orderDir: sortdir
      }
    
    
    };
  };
  
  // onError = (err, fromPage, toPage) =>
  // {
  //   // ignore.
  // };
  
  
  
}


export default NavPanelDataProceduresPVTemplateEditor;
