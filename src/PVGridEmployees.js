import PVGrid from './PVGrid';



class PVGridEmployees extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("PVGridEmployees");
  
    super.componentDidMount();
  
    let colSettings = [];
  
    colSettings[0] = {id: "Title", name: "Title", field:"Title", sortable:true  };
    colSettings[1] = {id: "PersonFullName", name: "Full Name", field:"PersonFullName", sortable:true  };
    colSettings[2] = {id: "Nationality", name: "Nationality", field:"Nationality", sortable:true  };
    colSettings[3] = {id: "MetadataUpdateTime", name: "Update Time", field:"MetadataUpdateTime", sortable:true  };
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Person.Employee"});
  
  
   
    
  }
}


export default PVGridEmployees;
