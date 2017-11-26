import PVGrid from './PVGrid';

//

class PVGridAwarenessCampaign extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("PVGridAwarenessCampaign");
  
    super.componentDidMount();
    
    let colSettings = [];
  
    colSettings[0] = {id: "Object.AwarenessCampaign.Description", name: "Description", field:"Object.AwarenessCampaign.Description", sortable:true  };
    colSettings[1] = {id: "CampaignURL", name: "Link to Campaign", field:"CampaignURL", sortable:true  };
    colSettings[2] = {id: "CampaignStartDate", name: "Start Date", field:"CampaignStartDate", sortable:true  };
    colSettings[3] = {id: "CampaignStopDate", name: "Stop Date", field:"CampaignStopDate", sortable:true  };
  
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Object.AwarenessCampaign"});
  
  
  }
  
  
}


export default PVGridAwarenessCampaign;
