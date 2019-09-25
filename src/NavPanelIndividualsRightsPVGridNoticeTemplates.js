import PVGrid from "./PVGrid";

//

class NavPanelIndividualsRightsPVGridNoticeTemplates extends PVGrid
{
  constructor(props)
  {
    super({
      ...props, namespace: "NavPanelIndividualsRights_noticeTemplates", dataType: "Object.Notification_Templates",
      colSettings: NavPanelIndividualsRightsPVGridNoticeTemplates.getDefaultColSettings(),
      hideMenu: true
    });
    
  }
  
  static getDefaultColSettings()
  {
    
    let colSettings = [];
    
    colSettings[0] = {
      id: "Object.Notification_Templates.Id", name: "Id", field: "Object.Notification_Templates.Id", sortable: true
    };
    colSettings[1] = {
      id: "Object.Notification_Templates.Types", name: "Types", field: "Object.Notification_Templates.Types",
      sortable: true
    };
    colSettings[2] = {
      id: "Object.Notification_Templates.Label", name: "Label", field: "Object.Notification_Templates.Label",
      sortable: true
    };
    colSettings[3] = {
      id: "Object.Notification_Templates.Text", name: "Label", field: "Object.Notification_Templates.Text",
      sortable: true
    };
  
    return colSettings;
    
    
  }
  
  
}


export default NavPanelIndividualsRightsPVGridNoticeTemplates;
