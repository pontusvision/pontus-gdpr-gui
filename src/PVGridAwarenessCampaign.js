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
    colSettings[1] = {id: "Object.Awareness_Campaign.Campaign_URL", name: "Link to Campaign", field:"Object.Awareness_Campaign.Campaign_URL", sortable:true  };
    colSettings[2] = {id: "Object.Awareness_Campaign.Campaign_Start_Date", name: "Start Date", field:"Object.Awareness_Campaign.Campaign_Start_Date", sortable:true  };
    colSettings[3] = {id: "Object.Awareness_Campaign.Campaign_Stop_Date", name: "Stop Date", field:"Object.Awareness_Campaign.Campaign_Stop_Date", sortable:true  };
  
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Object.AwarenessCampaign"});
  
  
  }
  
  
}


export default PVGridAwarenessCampaign;
