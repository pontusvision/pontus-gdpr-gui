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
  
    colSettings[0] = {id: "Person.Employee.Title", name: "Title", field: "#Person.Employee.Title", sortable: true};
    colSettings[1] = {id: "Person.Employee.Full_Name", name: "Full Name", field: "#Person.Employee.Full_Name", sortable: true};
    colSettings[2] = {id: "Person.Employee.Nationality", name: "Nationality", field: "#Person.Employee.Nationality", sortable: true};
  
    return colSettings;
  }
  
  onClickedPVGridAwarenessCampaign = (obj) =>
  {
    try
    {
  
      this.setCustomFilter(`hasNeighbourId:${obj.id}`);
  
  
  
      // this.setColumnSettings(colSettings);
    }
    catch (e)
    {
    
    }
    
  };
  
  componentDidMount()
  {
    // this.setNamespace("PVGridEmployees-");
    
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
