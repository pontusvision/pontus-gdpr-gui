import PVGrid from './PVGrid';

//

class NavPanelInformationYouHoldPVGridAllEventsIngestion extends PVGrid
{
  constructor(props)
  {
    super({
      ...props, namespace: "NavPanelInformationYouHold", dataType: "Object.Sensitive_Data",
      colSettings: NavPanelInformationYouHoldPVGridAllEventsIngestion.getDefaultColSettings()
    });
  }
  
  static getDefaultColSettings()
  {
    let colSettings = [];
    
    colSettings[0] = {id: "Object.Sensitive_Data.Ethnicity", name: "Ethnicity", field: "#Object.Sensitive_Data.Ethnicity", sortable: true};
    colSettings[1] = {
      id: "Object.Sensitive_Data.Religion", name: "Religion", field: "#Object.Sensitive_Data.Religion", sortable: true
    };
    colSettings[2] = {
      id: "Object.Sensitive_Data.Political_View", name: "Political View", field: "#Object.Sensitive_Data.Political_View", sortable: true
    };
    colSettings[3] = {id: "Object.Sensitive_Data.Union_Membership", name: "Union Membership", field: "Object.Sensitive_Data.Union_Membership", sortable: true};
    colSettings[4] = {
      id: "Object.Sensitive_Data.Church_Membership", name: "Church Membership", field: "#Object.Sensitive_Data.Church_Membership", sortable: true
    };
    
    return colSettings;
    
  }
  
  
}


export default NavPanelInformationYouHoldPVGridAllEventsIngestion;
