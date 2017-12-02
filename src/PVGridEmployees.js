import PVGrid from './PVGrid';



class PVGridEmployees extends PVGrid
{
  
  constructor(props){
    super(props);
    this.props.glEventHub.on('PVGridEmployees-pvgrid-on-click-row', this.onClickedPVGridAwarenessCampaign);
  
  }
  
  onClickedPVGridAwarenessCampaign = (val) =>{
  
  
  
  }
  componentDidMount()
  {
    this.setNamespace("PVGridEmployees-");
  
    super.componentDidMount();
  
    let colSettings = [];
  
    colSettings[0] = {id: "Person.Employee.Title", name: "Title", field:"Person.Employee.Title", sortable:true  };
    colSettings[1] = {id: "Person.Employee.Full.Name", name: "Full Name", field:"Person.Employee.Full.Name", sortable:true  };
    colSettings[2] = {id: "Person.Employee.Nationality", name: "Nationality", field:"Person.Employee.Nationality", sortable:true  };
    colSettings[3] = {id: "Metadata.UpdateDate", name: "Update Time", field:"Metadata.UpdateDate", sortable:true  };
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Person.Employee"});
  
  
   
    
  }
}


export default PVGridEmployees;
