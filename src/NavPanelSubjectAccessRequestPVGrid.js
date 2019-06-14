import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";

//

class NavPanelSubjectAccessRequestPVGrid extends PVGrid
{
  
  
  componentDidMount()
  {
    this.setNamespace("NavPanelSubjectAccessRequest");
    
    super.componentDidMount();
    
    let colSettings = [];
    
    colSettings[0] = {
      id: "Event.Subject_Access_Request.Status", name: "SAR Status", field: "sar_status", sortable: true
    };
    colSettings[1] = {
      id: "Event.Subject_Access_Request.Request_Type", name: "SAR Type", field: "sar_req_type", sortable: true
    };
    colSettings[2] = {
      id: "Event.Subject_Access_Request.Metadata.Create_Date", name: "Request Date", field: "sar_creation",
      sortable: true
    };
    colSettings[3] = {
      id: "Event.Subject_Access_Request.Metadata.Update_Date", name: "Update Date", field: "sar_update", sortable: true
    };
    // colSettings[4] = {id: "Person.Natural.Full_Name", name: "Requester", field: "person_full_name", sortable: true};
    // colSettings[5] = {id: "Person.Employee.Full_Name", name: "Handler", field: "employee_full_name", sortable: true};
    
    this.url = PontusComponent.getGraphURL(this.props);
    
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value: "Event.Subject_Access_Request"});
    
    
  }
  
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
    
    let sortcolId = sortcol == null ? null : sortcol.id;
    
    
    let selectBody =
      "  .select('event_id',\n" +
      "        ,'sar_req_type'       \n" +
      "        ,'sar_creation'\n" +
      "        ,'sar_update'\n" +
      // "        ,'person_full_name'\n" +
      // "        ,'employee_full_name'\n" +
      "        ,'sar_status'\n" +
      "        )";
    
    
    // if (
    //   sortcolId === null
    //   || sortcolId === 'Event.Subject_Access_Request.Status'
    //   || sortcolId === 'Event.Subject_Access_Request.Request_Type'
    //   || sortcolId === 'Event.Subject_Access_Request.Metadata.Create_Date'
    //   || sortcolId === 'Event.Subject_Access_Request.Metadata.Update_Date'
    // )
    // {
    return {
      gremlin: "g.V()" +
        ".has('Metadata.Type.Event.Subject_Access_Request',eq('Event.Subject_Access_Request'))" +
        ".order().by(pg_orderCol == null ? 'Event.Subject_Access_Request.Metadata.Create_Date' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
        ".range(pg_from,pg_to).as('sars')" +
        ".match(" +
        "    __.as('sars').values('Event.Subject_Access_Request.Status').as('sar_status')\n" +
        "  , __.as('sars').values('Event.Subject_Access_Request.Request_Type').as('sar_req_type')\n" +
        "  , __.as('sars').values('Event.Subject_Access_Request.Metadata.Create_Date').as('sar_creation')\n" +
        "  , __.as('sars').values('Event.Subject_Access_Request.Metadata.Update_Date').as('sar_update')\n" +
        // "  ,
        // __.as('sars').in().has('Metadata.Type.Person.Natural',eq('Person.Natural')).values('Person.Natural.Full_Name').as('person_full_name')\n"
        // + "  ,
        // __.as('sars').in().has('Metadata.Type.Person.Employee',eq('Person.Employee')).values('Person.Employee.Full_Name').as('employee_full_name')\n"
        // +
        "  , __.as('sars').id().as('event_id')\n" +
        "  )\n" +
        selectBody
      , bindings: {
        pg_from: from
        , pg_to: to
        , pg_orderCol: sortcolId
        , pg_orderDir: sortdir
      }
      
    };
    // }
    // else if (sortcolId === 'Person.Natural.Full_Name'){
    //   return {
    //     gremlin: "g.V()" +
    //     ".has('Metadata.Type.Person.Natural',eq('Person.Natural'))" +
    //     ".order().by('Person.Natural.Full_Name' ,pg_orderDir == (1)? incr: decr)" +
    //     ".as('people')" +
    //     ".match(" +
    //     "
    // __.as('people').out().has('Metadata.Type.Event.Subject_Access_Request',eq('Event.Subject_Access_Request')).range(pg_from,pg_to).as('sars')
    // " + "  , __.as('sars').in().has('Metadata.Type.Person.Employee',eq('Person.Employee')).as('employees') " + "  ,
    // __.as('sars').values('Event.Subject_Access_Request.Status').as('sar_status')\n" + "  ,
    // __.as('sars').values('Event.Subject_Access_Request.Request_Type').as('sar_req_type')\n" + "  ,
    // __.as('sars').values('Event.Subject_Access_Request.Metadata.Create_Date').as('sar_creation')\n" + "  ,
    // __.as('sars').values('Event.Subject_Access_Request.Metadata.Update_Date').as('sar_update')\n" + "  ,
    // __.as('people').values('Person.Natural.Full_Name').as('person_full_name')\n" + "  ,
    // __.as('employees').values('Person.Employee.Full_Name').as('employee_full_name')\n" + "  ,
    // __.as('sars').id().as('event_id')\n" + "  )\n"+ selectBody , bindings: { pg_from: from , pg_to: to ,
    // pg_orderDir: sortdir }  }; } else if (sortcolId === 'Person.Employee.Full_Name'){ return { gremlin: "g.V()" + ".has('Metadata.Type.Person.Employee',eq('Person.Employee'))" + ".order().by('Person.Natural.Full_Name' ,pg_orderDir == (1)? incr: decr)" + ".as('employees')" + ".match(" + "    __.as('employees').out().has('Metadata.Type.Event.Subject_Access_Request',eq('Event.Subject_Access_Request')).as('sars') " + "  , __.as('sars').in().has('Metadata.Type.Person.Natural',eq('Person.Natural')).as('people') " + "  , __.as('sars').values('Event.Subject_Access_Request.Status').as('sar_status')\n" + "  , __.as('sars').values('Event.Subject_Access_Request.Request_Type').as('sar_req_type')\n" + "  , __.as('sars').values('Event.Subject_Access_Request.Metadata.Create_Date').as('sar_creation')\n" + "  , __.as('sars').values('Event.Subject_Access_Request.Metadata.Update_Date').as('sar_update')\n" + "  , __.as('people').values('Person.Natural.Full_Name').as('person_full_name')\n" + "  , __.as('employees').values('Person.Natural.Full_Name').as('employee_full_name')\n" + "  , __.as('sars').id().as('event_id')\n" + "  )\n"+ selectBody , bindings: { pg_from: from , pg_to: to , pg_orderDir: sortdir }  }; }
    
    
  };
  
  
}


export default NavPanelSubjectAccessRequestPVGrid;
