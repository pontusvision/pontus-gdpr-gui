import PVGrid from './PVGrid';

//

class NavPanelInformationYouHoldPVGridEventIngestion extends PVGrid
{
  constructor(props)
  {
    super({
      ...props, namespace: "NavPanelInformationYouHold", subNamespace:"PVGridEventIngestion", dataType: "Event.Ingestion",customFilter: "unmatchedEvents",
      colSettings: NavPanelInformationYouHoldPVGridEventIngestion.getDefaultColSettings()
    });
  }
  
  
  static getDefaultColSettings()
  {
    
    let colSettings = [];
    colSettings[0] = {
      id: "Event.Ingestion.Metadata_Create_Date", name: "Ingestion Date",
      field: "#Event.Ingestion.Metadata_Create_Date", sortable: true
    };
    colSettings[1] = {id: "Event.Ingestion.Type", name: "Type", field: "#Event.Ingestion.Type", sortable: true};
    colSettings[2] = {
      id: "Event.Ingestion.Operation", name: "Operation", field: "#Event.Ingestion.Operation", sortable: true
    };
    colSettings[3] = {
      id: "Event.Ingestion.Domain_b64", name: "Domain Data", field: "Event.Ingestion.Domain_b64", sortable: false
    };
    
    return colSettings
  }
  
  S
  
}


export default NavPanelInformationYouHoldPVGridEventIngestion;
