import PVGrid from './PVGrid';

//

class PVGridAwarenessCampaign extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("PVGridAwarenessCampaign-");
  
    super.componentDidMount();
    
    let colSettings = [];
  
    colSettings[0] = {id: "Object.AwarenessCampaign.Description", name: "Description", field:"Object.AwarenessCampaign.Description", sortable:true  };
    colSettings[1] = {id: "Object.AwarenessCampaign.CampaignURL", name: "Link to Campaign", field:"Object.AwarenessCampaign.CampaignURL", sortable:true  };
    colSettings[2] = {id: "Object.AwarenessCampaign.CampaignStartDate", name: "Start Date", field:"Object.AwarenessCampaign.CampaignStartDate", sortable:true  };
    colSettings[3] = {id: "Object.AwarenessCampaign.CampaignStopDate", name: "Stop Date", field:"Object.AwarenessCampaign.CampaignStopDate", sortable:true  };
  
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Object.AwarenessCampaign"});
  
  
  }
  
  
}


export default PVGridAwarenessCampaign;
