import PVGrid from './PVGrid';

//

class PVGridAwarenessCampaign extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("PVGridAwarenessCampaign-");
  
    super.componentDidMount();
    
    let colSettings = [];
  
    colSettings[0] = {id: "Object.Awareness_Campaign.Description", name: "Description", field:"Object.Awareness_Campaign.Description", sortable:true  };
    colSettings[1] = {id: "Object.Awareness_Campaign.URL", name: "Link to Campaign",  field:"Object.Awareness_Campaign.URL", sortable:true  };
    colSettings[2] = {id: "Object.Awareness_Campaign.Start_Date", name: "Start Date", field:"Object.Awareness_Campaign.Start_Date", sortable:true  };
    colSettings[3] = {id: "Object.Awareness_Campaign.Stop_Date", name: "Stop Date",   field:"Object.Awareness_Campaign.Stop_Date", sortable:true  };
  
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Object.Awareness_Campaign"});
  
  
  }
  
  
}


export default PVGridAwarenessCampaign;
