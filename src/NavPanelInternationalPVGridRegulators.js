import PVGrid from './PVGrid';

//

class NavPanelInternationalPVGridRegulators extends PVGrid
{
  constructor(props)
  {
    super({
      ...props, namespace: "NavPanelInternational", dataType: "Person.Organisation",
      colSettings: NavPanelInternationalPVGridRegulators.getDefaultColSettings()
    });
    
  }
  
  static getDefaultColSettings()
  {
    
    
    let colSettings = [];
    
    colSettings[0] = {
      id: "Person.Organisation.Short_Name", name: "Short Name", field: "#Person.Organisation.Short_Name", sortable: true
    };
    
    colSettings[1] = {
      id: "Person.Organisation.Name", name: "Long Name", field: "#Person.Organisation.Name", sortable: true
    };
    colSettings[2] = {
      id: "Person.Organisation.orgCountrySet", name: "Countries", field: "#Person.Organisation.orgCountrySet",
      sortable: true
    };
    
    return colSettings;
  }
  
}


export default NavPanelInternationalPVGridRegulators;
