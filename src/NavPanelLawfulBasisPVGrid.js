import PVGrid from './PVGrid';

//

class NavPanelLawfulBasisPVGrid extends PVGrid
{
  
  constructor(props)
  {
    super({
      ...props, namespace: "NavPanelLawfulBasis", dataType: "Object.Lawful_Basis",
      colSettings: NavPanelLawfulBasisPVGrid.getDefaultColSettings()
    });
    
  }
  
  static getDefaultColSettings()
  {
    
    
    let colSettings = [];
    
    
    // colSettings[0] = {id: "Object.Lawful_Basis.Id", name: "Number", field:"Object.Lawful_Basis.Id", sortable:true  };
    colSettings[0] = {
      id: "Object.Lawful_Basis.Description", name: "Description", field: "#Object.Lawful_Basis.Description",
      sortable: true
    };
    
    
    return colSettings;
    
  }
  
  
}


export default NavPanelLawfulBasisPVGrid;
