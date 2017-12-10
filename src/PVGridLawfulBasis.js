import PVGrid from './PVGrid';

//

class PVGridLawfulBasis extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("PVGridPrivacyImpactAssessments-");
  
    super.componentDidMount();
    
    let colSettings = [];
    colSettings[0] = {id: "Object.Lawful_Basis.Id", name: "Id", field:"Object.Lawful_Basis.Id", sortable:true  };
    colSettings[1] = {id: "Object.Lawful_Basis.Description", name: "Description", field:"Object.Lawful_Basis.Description", sortable:true  };
    
  
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Object.Lawful_Basis"});
  
  
  }
  
  
}


export default PVGridLawfulBasis;
