import PVGrid  from "./PVGrid";
import PontusComponent from "./PontusComponent";

//

class NavPanelDataProceduresPVGridNoticeTemplates extends PVGrid
{
  
  
  componentDidMount()
  {
    this.setNamespace("NavPanelInformationYouHold");
    
    super.componentDidMount();
    
    let colSettings = [];
  
    colSettings[0] = {id: "Object.Notification_Templates.Id", name: "Id", field: "Object.Notification_Templates.Id",  sortable: true};
    colSettings[1] = {id: "Object.Notification_Templates.Types", name: "Types", field: "Object.Notification_Templates.Types",   sortable: true};
    colSettings[2] = {id: "Object.Notification_Templates.Label", name: "Label", field: "Object.Notification_Templates.Label",   sortable: true};
    // colSettings[3] = {id: "Object.Notification_Templates.Text", visible: false, name: "Text", field: "Object.Notification_Templates.Text",   sortable: true};

    
    this.url = PontusComponent.getGraphURL(this.props);
    
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value: "Object.Notification_Templates"});
    
    
    
    /*
     property("Object.Data_Procedures.Type", typeStr.replaceAll('[_.]',' ')).
     property("Object.Data_Procedures.Property", propStr.replaceAll('[_.]',' ')).
     property("Object.Data_Procedures.Delete_URL", 'https://api-gateway/delete-'+propStr.toLowerCase()).
     property("Object.Data_Procedures.Delete_Mechanism", distributionRequestType.sample()).
     property("Object.Data_Procedures.Update_URL", 'https://api-gateway/update-'+propStr.toLowerCase()).
     property("Object.Data_Procedures.Update_Mechanism", distributionRequestType.sample()).
 
     */
    
  }
  
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
  
    let sortcolId = sortcol === null ? null : sortcol.id;
  
  
    let selectBody =
      "  .select('Object.Notification_Templates.Id'" +
      "         ,'Object.Notification_Templates.Text'" +
      "         ,'Object.Notification_Templates.Types'" +
      "         ,'Object.Notification_Templates.Label'" +
      "         ,'event_id'" +
      "         )";
  
  
    return {
      gremlin: "g.V()" +
      ".has('Metadata.Type',eq('Object.Notification_Templates'))" +
      ".order().by(pg_orderCol == null ? 'Object.Notification_Templates.Id' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
      ".range(pg_from,pg_to).as('dataProcs')" +
      ".match(" +
      "    __.as('dataProcs').values('Object.Notification_Templates.Id')  .as('Object.Notification_Templates.Id')" +
      "  , __.as('dataProcs').values('Object.Notification_Templates.Text').as('Object.Notification_Templates.Text')" +
      "  , __.as('dataProcs').values('Object.Notification_Templates.Types').as('Object.Notification_Templates.Types')" +
      "  , __.as('dataProcs').values('Object.Notification_Templates.Label').as('Object.Notification_Templates.Label')" +
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


export default NavPanelDataProceduresPVGridNoticeTemplates;
