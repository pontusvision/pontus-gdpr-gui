import PVGrid from './PVGrid';

//

class NavPanelSubjectAccessRequestPVGrid extends PVGrid
{
  
  constructor(props)
  {
    super({
      ...props, namespace: "NavPanelSubjectAccessRequest", dataType: "Event.Subject_Access_Request",
      colSettings: NavPanelSubjectAccessRequestPVGrid.getDefaultColSettings()
    });
    
  }
  
  static getDefaultColSettings()
  {
    
    
    let colSettings = [];
    
    
    colSettings[0] = {
      id: "Event.Subject_Access_Request.Status", name: "SAR Status", field: "#Event.Subject_Access_Request.Status",
      sortable: true
    };
    colSettings[1] = {
      id: "Event.Subject_Access_Request.Request_Type", name: "SAR Type",
      field: "#Event.Subject_Access_Request.Request_Type", sortable: true
    };
    colSettings[2] = {
      id: "Event.Subject_Access_Request.Metadata.Create_Date", name: "Request Date",
      field: "Event.Subject_Access_Request.Metadata.Create_Date",
      sortable: true
    };
    colSettings[3] = {
      id: "Event.Subject_Access_Request.Metadata.Update_Date", name: "Update Date",
      field: "Event.Subject_Access_Request.Metadata.Update_Date", sortable: true
    };
    
    return colSettings;
    
    
  }
  
  
}


export default NavPanelSubjectAccessRequestPVGrid;
