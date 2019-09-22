import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";

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
    this.setDataType("Object.Lawful_Basis");
    this.setExtraSearch({value:"Object.Lawful_Basis"});
  
    this.url = PontusComponent.getRestUrlAg(this.props);
  
  }
  
  
}


export default NavPanelLawfulBasisPVGrid;
