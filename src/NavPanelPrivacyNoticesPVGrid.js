import PVGrid from './PVGrid';

//

class NavPanelPrivacyNoticesPVGrid extends PVGrid
{
  
  constructor(props)
  {
    super({
      ...props, namespace: "NavPanelPrivacyNotices", dataType: "Object.Privacy_Notice",
      colSettings: NavPanelPrivacyNoticesPVGrid.getDefaultColSettings()
    });
    
  }
  
  static getDefaultColSettings()
  {
    
    
    let colSettings = [];
    
    
    colSettings[0] = {
      id: "Object.Privacy_Notice.Description", name: "Description", field: "Object.Privacy_Notice.Description",
      sortable: false
    };
    colSettings[1] = {
      id: "Object.Privacy_Notice.URL", name: "Link", field: "Object.Privacy_Notice.URL", sortable: true
    };
    colSettings[2] = {
      id: "Object.Privacy_Notice.Delivery_Date", name: "Delivery Date", field: "Object.Privacy_Notice.Delivery_Date",
      sortable: true
    };
    colSettings[3] = {
      id: "Object.Privacy_Notice.Expiry_Date", name: "Expiry Date", field: "Object.Privacy_Notice.Expiry_Date",
      sortable: true
    };
    colSettings[4] = {
      id: "Object.Privacy_Notice.Info_Collected", name: "Info Collected", field: "Object.Privacy_Notice.Info_Collected",
      sortable: true
    };
    colSettings[5] = {
      id: "Object.Privacy_Notice.Who_Is_Collecting", name: "Who is Collecting",
      field: "Object.Privacy_Notice.Who_Is_Collecting", sortable: true
    };
    colSettings[6] = {
      id: "Object.Privacy_Notice.How_Is_It_Collected", name: "How is it Collected",
      field: "Object.Privacy_Notice.How_Is_It_Collected", sortable: true
    };
    colSettings[7] = {
      id: "Object.Privacy_Notice.Why_Is_It_Collected", name: "Why is it Collected",
      field: "Object.Privacy_Notice.Why_Is_It_Collected", sortable: true
    };
    colSettings[8] = {
      id: "Object.Privacy_Notice.How_Will_It_Be_Used", name: "How will it be Used",
      field: "Object.Privacy_Notice.How_Will_It_Be_Used", sortable: true
    };
    colSettings[9] = {
      id: "Object.Privacy_Notice.Who_Will_It_Be_Shared", name: "Who will it be Shared",
      field: "Object.Privacy_Notice.Who_Will_It_Be_Shared", sortable: true
    };
    colSettings[10] = {
      id: "Object.Privacy_Notice.Effect_On_Individuals", name: "Effect on Individuals",
      field: "Object.Privacy_Notice.Effect_On_Individuals", sortable: true
    };
    colSettings[11] = {
      id: "Object.Privacy_Notice.Likely_To_Complain", name: "Likely to Complain",
      field: "Object.Privacy_Notice.Likely_To_Complain", sortable: true
    };
    
    
    return colSettings;
    
  }
  
  
}


export default NavPanelPrivacyNoticesPVGrid;
