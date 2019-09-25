import PVGrid from './PVGrid';

class NavPanelDataProtnOfficerPVGrid extends PVGrid
{
  constructor(props)
  {
    super({
      ...props, namespace: "NavPanelDataProtnOfficerPVGrid", dataType: "Person.Employee",
      colSettings: NavPanelDataProtnOfficerPVGrid.getDefaultColSettings()
    });
    
  }
  
  static getDefaultColSettings()
  {
    
    let colSettings = [];
  
  
    colSettings[0] = {id: "Person.Employee.Role", name: "Role", field: "#Person.Employee.Role", sortable: true};
    colSettings[1] = {id: "Person.Employee.Title", name: "Title", field: "#Person.Employee.Title", sortable: true};
    colSettings[2] = {id: "Person.Employee.Full_Name", name: "Full Name", field: "#Person.Employee.Full_Name", sortable: true};
    colSettings[3] = {id: "Person.Employee.Date_Of_Birth", name: "Age", field: "#Person.Employee.Date_Of_Birth", sortable: true};
    colSettings[4] = {id: "Person.Employee.Gender", name: "Gender", field: "#Person.Employee.Gender", sortable: true};
    colSettings[5] = {id: "Person.Employee.Nationality", name: "Nationality", field: "#Person.Employee.Nationality", sortable: true};
    

    return colSettings;
    
  }
  
  
}


export default NavPanelDataProtnOfficerPVGrid;
