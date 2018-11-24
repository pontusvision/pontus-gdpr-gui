import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";

//

class NavPanelDataBreachPVGridDataBreachEvents extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("NavPanelDataBreach");
    
    super.componentDidMount();
    
    let colSettings = [];
    
  
    colSettings[0] = {
      id: "Event.Data_Breach.Id", name: "ID", field: "Event.Data_Breach.Id", sortable: true
    };
    colSettings[1] = {
      id: "Event.Data_Breach.Description", name: "Description", field: "Event.Data_Breach.Description",
      sortable: true
    };
    colSettings[2] = {
      id: "Event.Data_Breach.Status", name: "Status", field: "Event.Data_Breach.Status",
      sortable: true
    };
    colSettings[3] = {
      id: "Event.Data_Breach.Source", name: "Source", field: "Event.Data_Breach.Source",
      sortable: true
    };
    colSettings[3] = {
      id: "Event.Data_Breach.Impact", name: "Impact", field: "Event.Data_Breach.Impact",
      sortable: true
    };
    colSettings[4] = {
      id: "Event.Data_Breach.Metadata.Create_Date", name: "Start Date", field: "Event.Data_Breach.Metadata.Create_Date",
      sortable: true
    };
    colSettings[5] = {
      id: "Event.Data_Breach.Metadata.Update_Date", name: "Update Date", field: "Event.Data_Breach.Metadata.Update_Date",
      sortable: true
    };
  
    this.url = PontusComponent.getGraphURL(this.props);
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value: "Event.Data_Breach"});
    
    
  }
  
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
    
    let sortcolId = sortcol === null ? null : sortcol.id;
    
    return {
      gremlin: "g.V()" +
      ".has('Metadata.Type.Event.Data_Breach',eq('Event.Data_Breach'))" +
      ".order().by(pg_orderCol == null ? 'Event.Data_Breach.Metadata.Create_Date' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
      ".range(pg_from,pg_to).as('data_breaches')" +
      ".match(" +
      "    __.as('data_breaches').values('Event.Data_Breach.Id').as('Event.Data_Breach.Id')" +
      "  , __.as('data_breaches').values('Event.Data_Breach.Description').as('Event.Data_Breach.Description')" +
      "  , __.as('data_breaches').values('Event.Data_Breach.Status').as('Event.Data_Breach.Status')" +
      "  , __.as('data_breaches').values('Event.Data_Breach.Source').as('Event.Data_Breach.Source')" +
      "  , __.as('data_breaches').values('Event.Data_Breach.Impact').as('Event.Data_Breach.Impact')" +
      "  , __.as('data_breaches').values('Event.Data_Breach.Metadata.Create_Date').as('Event.Data_Breach.Metadata.Create_Date')" +
      "  , __.as('data_breaches').values('Event.Data_Breach.Metadata.Update_Date').as('Event.Data_Breach.Metadata.Update_Date')" +
      "  , __.as('data_breaches').id().as('event_id')" +
      "  )" +
      ".select (" +
      "  'Event.Data_Breach.Id'" +
      " ,'Event.Data_Breach.Description'" +
      " ,'Event.Data_Breach.Status'" +
      " ,'Event.Data_Breach.Source'" +
      " ,'Event.Data_Breach.Impact'" +
      " ,'Event.Data_Breach.Metadata.Create_Date'" +
      " ,'Event.Data_Breach.Metadata.Update_Date'" +
      " ,'event_id'" +
      ")"
      , bindings: {
        pg_from: from
        , pg_to: to
        , pg_orderCol: sortcolId
        , pg_orderDir: sortdir
      }
      
    };
    
    
  };
  
  
  
}


export default NavPanelDataBreachPVGridDataBreachEvents;
