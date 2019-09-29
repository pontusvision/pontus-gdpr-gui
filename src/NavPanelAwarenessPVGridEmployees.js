import PVGrid from './PVGrid';


class NavPanelAwarenessPVGridEmployees extends PVGrid
{
  constructor(props)
  {
    super({
      ...props, namespace: "NavPanelAwarenessPVGridEmployees", dataType: "Person.Employee",
      colSettings: NavPanelAwarenessPVGridEmployees.getDefaultColSettings()
    });
    
  }
  
  static getDefaultColSettings()
  {
    let colSettings = [];
    
    colSettings[0] = {id: "Person.Employee.Title", name: "Title", field: "#Person.Employee.Title", sortable: true};
    colSettings[1] = {
      id: "Person.Employee.Full_Name", name: "Full Name", field: "#Person.Employee.Full_Name", sortable: true
    };
    colSettings[2] = {
      id: "Person.Employee.Nationality", name: "Nationality", field: "#Person.Employee.Nationality", sortable: true
    };
    
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
    // this.setNamespace("NavPanelAwarenessPVGridEmployees-");
    
    super.componentDidMount();
    this.props.glEventHub.on('NavPanelAwarenessPVGrid-pvgrid-on-click-row', this.onClickedPVGridAwarenessCampaign);
    
    // this.setExtraSearch({value:"Person.Employee"});
    
    
  }
  
  componentWillUnmount()
  {
    this.props.glEventHub.off('NavPanelAwarenessPVGrid-pvgrid-on-click-row', this.onClickedPVGridAwarenessCampaign);
    
    super.componentWillUnmount();
  }
}


export default NavPanelAwarenessPVGridEmployees;
