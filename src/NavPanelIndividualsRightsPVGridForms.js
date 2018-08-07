import PVGridEditable  from "./PVGridEditable";
import PontusComponent from "./PontusComponent";

//

class NavPanelIndividualsRightsPVGridForms extends PVGridEditable
{
  
  
  componentDidMount()
  {
    this.setNamespace("NavPanelIndividualsRights_forms");
    
    super.componentDidMount();
    
    let colSettings = [];
  
    colSettings[0] = {id: "Object.Form.URL", name: "URL", field: "Object.Form.URL",  sortable: true};
    colSettings[1] = {id: "Object.Form.Vertex_Label", name: "Types", field: "Object.Form.Vertex_Label",   sortable: true};
    colSettings[2] = {id: "Object.Form.Metadata_Owner", name: "Owner", field: "Object.Form.Metadata_Owner",   sortable: true};
    colSettings[3] = {id: "Object.Form.Metadata_Create_Date", name: "Create Date", field: "Object.Form.Metadata_Create_Date",   sortable: true};
    // colSettings[3] = {id: "Object.Notification_Templates.Text", visible: false, name: "Text", field: "Object.Notification_Templates.Text",   sortable: true};
  
    
    this.props.glEventHub.on(this.namespace + '-pvform-on-save-form', this.onPVFormSaveForm);
  
    
    this.url = PontusComponent.getGraphURL(this.props);
    
    this.setColumnSettings(colSettings);
    
    
    
  }
  
  componentWillUnmount()
  {
    super.componentWillUnmount();
  
    this.props.glEventHub.off(this.namespace + '-pvform-on-save-form', this.onPVFormSaveForm);
    
  }
  
  onPVFormSaveForm = (savedData) => {
  
    this.reloadData(this.from,this.to);
  };
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
  
    let sortcolId = sortcol === null ? null : sortcol.id;
  
  
    let selectBody =
      "  .select('Object.Form.URL'" +
      "         ,'Object.Form.Vertex_Label'" +
      "         ,'Object.Form.Metadata_Owner'" +
      "         ,'Object.Form.Metadata_Create_Date'" +
      "         ,'Object.Form.Text'" +
      "         ,'event_id'" +
      "         )";
  
  
    return {
      gremlin: "g.V()" +
      ".has('Metadata.Type.Object.Form',eq('Object.Form'))" +
      ".order().by(pg_orderCol == null ? 'Object.Form.URL' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
      ".range(pg_from,pg_to).as('dataProcs')" +
      ".match(" +
      "    __.as('dataProcs').values('Object.Form.URL')  .as('Object.Form.URL')" +
      "  , __.as('dataProcs').values('Object.Form.Vertex_Label').as('Object.Form.Vertex_Label')" +
      "  , __.as('dataProcs').values('Object.Form.Metadata_Owner').as('Object.Form.Metadata_Owner')" +
      "  , __.as('dataProcs').values('Object.Form.Metadata_Create_Date').as('Object.Form.Metadata_Create_Date')" +
      "  , __.as('dataProcs').values('Object.Form.Text').as('Object.Form.Text')" +
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


export default NavPanelIndividualsRightsPVGridForms;
