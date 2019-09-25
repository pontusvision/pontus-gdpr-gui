import PVGrid from './PVGrid';

//

class NavPanelConsentPVGridPrivacyNotices extends PVGrid
{
  
  constructor(props)
  {
    super({
      ...props, namespace: "NavPanelConsent", dataType: "Object.Privacy_Notice",
      colSettings: NavPanelConsentPVGridPrivacyNotices.getDefaultColSettings()
    });
  }
  
  static getDefaultColSettings()
  {
    let colSettings = [];
    
    colSettings[0] = {
      id: "Object.Privacy_Notice.URL", name: "Link", field: "Object.Privacy_Notice.URL", sortable: true
    };
    colSettings[1] = {
      id: "Object.Privacy_Notice.Description", name: "Description", field: "Object.Privacy_Notice.Description",
      sortable: true
    };
    colSettings[2] = {
      id: "Object.Privacy_Notice.Delivery_Date", name: "Delivery Date", field: "Object.Privacy_Notice.Delivery_Date",
      sortable: true
    };
    colSettings[3] = {
      id: "Object.Privacy_Notice.Expiry_Date", name: "Expiry Date", field: "Object.Privacy_Notice.Expiry_Date",
      sortable: true
    };
    
    return colSettings;
    
  }
  
  
}


export default NavPanelConsentPVGridPrivacyNotices;
