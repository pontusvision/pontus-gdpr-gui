import PVGrid from './PVGrid';

//

class NavPanelInformationYouHoldPVGrid extends PVGrid
{
  constructor(props)
  {
    super({
      ...props, namespace: "NavPanelInformationYouHold",subNamespace:"PVGrid", dataType: "Person.Natural",
      colSettings: NavPanelInformationYouHoldPVGrid.getDefaultColSettings()
    });
  }
  
  static getDefaultColSettings()
  {
    let colSettings = [];
    
    colSettings[0] = {id: "Person.Natural.Title", name: "Title", field: "#Person.Natural.Title", sortable: true};
    colSettings[1] = {
      id: "Person.Natural.Full_Name", name: "Full Name", field: "#Person.Natural.Full_Name", sortable: true
    };
    colSettings[2] = {
      id: "Person.Natural.Age", name: "Date Of Birth", field: "#Person.Natural.Date_Of_Birth", sortable: true
    };
    colSettings[3] = {id: "Person.Natural.Gender", name: "Gender", field: "Person.Natural.Gender", sortable: true};
    colSettings[4] = {
      id: "Person.Natural.Nationality", name: "Nationality", field: "Person.Natural.Nationality", sortable: true
    };
    
    return colSettings;
    
  }
  
  
}


export default NavPanelInformationYouHoldPVGrid;
