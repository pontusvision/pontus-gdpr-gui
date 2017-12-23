import PVGrid from './PVGrid';

//

class NavPanelLawfulBasisPVGrid extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("NavPanelLawfulBasis");
  
    super.componentDidMount();
    
    let colSettings = [];
    // colSettings[0] = {id: "Object.Lawful_Basis.Id", name: "Number", field:"Object.Lawful_Basis.Id", sortable:true  };
    colSettings[0] = {id: "Object.Lawful_Basis.Description", name: "Description", field:"Object.Lawful_Basis.Description", sortable:true  };
    
  
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Object.Lawful_Basis"});
  
  
  }
  
  
}


export default NavPanelLawfulBasisPVGrid;
