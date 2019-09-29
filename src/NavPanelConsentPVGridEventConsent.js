import PVGrid from './PVGrid';

//

class NavPanelConsentPVGridEventConsent extends PVGrid
{
  
  constructor(props)
  {
    super({
      ...props, namespace: "NavPanelConsent_EventConsent", dataType: "Event.Consent",
      colSettings: NavPanelConsentPVGridEventConsent.getDefaultColSettings()
    });
    this.props.glEventHub.on('NavPanelConsent-pvgrid-on-click-row', this.onClickPrivNotice);
    
  }
  
  onClickPrivNotice = (obj) =>
  {
    this.setCustomFilter(`hasNeighbourId:${obj.id}`);
  };
  
  static getDefaultColSettings()
  {
    let colSettings = [];
    
    colSettings[0] = {
      id: "Event.Consent.Status", name: "Consent Status", field: "Event.Consent.Status", sortable: true
    };
    colSettings[1] = {
      id: "Event.Consent.Date", name: "Date", field: "Event.Consent.Date",
      sortable: true
    };
    
    return colSettings;
    
  }
  
  
}


export default NavPanelConsentPVGridEventConsent;
