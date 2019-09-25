import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";


class PVGridEmployees extends PVGrid
{
  constructor(props){
    super({...props, namespace: "PVGridEmployees-", dataType:"Person.Employee", colSettings:PVGridEmployees.getDefaultColSettings()});
  }
  
  static getDefaultColSettings()
  {
    let colSettings = [];
  
    colSettings[0] = {id: "Person.Natural.Title", name: "Title", field: "Person.Natural.Title", sortable: true};
    colSettings[1] = {id: "Person.Natural.Full_Name", name: "Full Name", field: "Person.Natural.Full_Name", sortable: true};
    colSettings[2] = {id: "Person.Natural.Nationality", name: "Nationality", field: "Person.Natural.Nationality", sortable: true};
    colSettings[3] = {id: "event_status", name: "Campaign Status", field: "event_status", sortable: false};
  
    return colSettings;
  }
  
  onClickedPVGridAwarenessCampaign = (val) =>
  {
    try
    {
      
      
      this.awarenessCampaignId = val.id;
  
  
      this.url = PontusComponent.getRestUrlAg(this.props);
  
  
  
      // this.setColumnSettings(colSettings);
    }
    catch (e)
    {
    
    }
    
  };
  
  componentDidMount()
  {
    this.setNamespace("PVGridEmployees-");
    
    super.componentDidMount();
    this.props.glEventHub.on('PVGridAwarenessCampaign-pvgrid-on-click-row', this.onClickedPVGridAwarenessCampaign);
    
    // this.setExtraSearch({value:"Person.Employee"});
    
    
  }
  
  componentWillUnmount()
  {
    this.props.glEventHub.off('PVGridAwarenessCampaign-pvgrid-on-click-row', this.onClickedPVGridAwarenessCampaign);
    
    super.componentWillUnmount();
  }
}


export default PVGridEmployees;
