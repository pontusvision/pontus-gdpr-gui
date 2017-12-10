import PVGrid from './PVGrid';

//

class PVGridPrivacyImpactAssessments extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("PVGridPrivacyImpactAssessments-");
  
    super.componentDidMount();
    
    let colSettings = [];
  
    colSettings[0] = {id: "Object.Privacy_Impact_Assessment.Description", name: "Description", field:"Object.Privacy_Impact_Assessment.Description", sortable:true  };
    colSettings[1] = {id: "Object.Privacy_Impact_Assessment.Start_Date", name: "Start Date", field:"Object.Privacy_Impact_Assessment.Start_Date", sortable:true  };
    colSettings[2] = {id: "Object.Privacy_Impact_Assessment.Delivery_Date", name: "Delivery Date", field:"Object.Privacy_Impact_Assessment.Delivery_Date", sortable:true  };
    colSettings[3] = {id: "Object.Privacy_Impact_Assessment.Risk_To_Individuals", name: "Risk To Individuals", field:"Object.Privacy_Impact_Assessment.Risk_To_Individuals", sortable:true  };
    colSettings[4] = {id: "Object.Privacy_Impact_Assessment.Intrusion_On_Privacy", name: "Intrusion on Privacy", field:"Object.Privacy_Impact_Assessment.Intrusion_On_Privacy", sortable:true  };
    colSettings[5] = {id: "Object.Privacy_Impact_Assessment.Risk_To_Corporation", name: "Risk To Business", field:"Object.Privacy_Impact_Assessment.Risk_To_Corporation", sortable:true  };
    colSettings[6] = {id: "Object.Privacy_Impact_Assessment.Risk_Of_Reputational_Damage", name: "Reputational Damage", field:"Object.Privacy_Impact_Assessment.Risk_Of_Reputational_Damage", sortable:true  };
    colSettings[7] = {id: "Object.Privacy_Impact_Assessment.Compliance_Check_Passed", name: "Checks Passed", field:"Object.Privacy_Impact_Assessment.Compliance_Check_Passed", sortable:true  };
  
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Object.Privacy_Impact_Assessment"});
  
  
  }
  
  
}


export default PVGridPrivacyImpactAssessments;
