import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";

//

class NavPanelPrivacyImpactAssessmentPVGrid extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("NavPanelPrivacyImpactAssessment");
  
    super.componentDidMount();
    
    let colSettings = [];
  
    colSettings[0] = {id: "Object.Privacy_Impact_Assessment.Description", name: "Description", field:"Object.Privacy_Impact_Assessment.Description", sortable:true  };
    colSettings[1] = {id: "Object.Privacy_Impact_Assessment.Start_Date", name: "Start Date", field:"Object.Privacy_Impact_Assessment.Start_Date", sortable:true  };
    colSettings[2] = {id: "Object.Privacy_Impact_Assessment.Delivery_Date", name: "Delivery Date", field:"Object.Privacy_Impact_Assessment.Delivery_Date", sortable:true  };
    colSettings[3] = {id: "Object.Privacy_Impact_Assessment.Risk_To_Individuals", name: "Risk To Individuals", field:"Object.Privacy_Impact_Assessment.Risk_To_Individuals", sortable:true  };
    colSettings[4] = {id: "Object.Privacy_Impact_Assessment.Intrusion_On_Privacy", name: "Intrusion on Privacy", field:"Object.Privacy_Impact_Assessment.Intrusion_On_Privacy", sortable:true  };
    colSettings[5] = {id: "Object.Privacy_Impact_Assessment.Risk_To_Corporation", name: "Risk To Business", field:"Object.Privacy_Impact_Assessment.Risk_To_Corporation", sortable:true  };
    colSettings[6] = {id: "Object.Privacy_Impact_Assessment.Risk_Of_Reputational_Damage", name: "Reputational Damage", field:"Object.Privacy_Impact_Assessment.Risk_Of_Reputational_Damage", sortable:true  };
    colSettings[7] = {id: "Object.Privacy_Impact_Assessment.Compliance_Check_Passed", name: "Checks Passed", field:"Object.Privacy_Impact_Assessment.Compliance_Check_Passed", sortable:true  };
  
    this.url = PontusComponent.getGraphURL(this.props);
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Object.Privacy_Impact_Assessment"});
  
  
  }
  
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
    
    let sortcolId = sortcol === null ? null : sortcol.id;
    
    
    let selectBody =
      "  .select('Object.Privacy_Impact_Assessment.Description' " +
      "         ,'Object.Privacy_Impact_Assessment.Start_Date' " +
      "         ,'Object.Privacy_Impact_Assessment.Delivery_Date' " +
      "         ,'Object.Privacy_Impact_Assessment.Risk_To_Individuals' " +
      "         ,'Object.Privacy_Impact_Assessment.Intrusion_On_Privacy' " +
      "         ,'Object.Privacy_Impact_Assessment.Risk_To_Corporation' " +
      "         ,'Object.Privacy_Impact_Assessment.Risk_Of_Reputational_Damage' " +
      "         ,'Object.Privacy_Impact_Assessment.Compliance_Check_Passed' " +
      "         ,'event_id' " +
      "         )";
    
    
    return {
      gremlin: "g.V().has('Metadata.Type.Object.Privacy_Impact_Assessment',eq('Object.Privacy_Impact_Assessment'))\n" +
        " .order()\n" +
        " .by(pg_orderCol == null ? 'Object.Privacy_Impact_Assessment.Description' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)\n" +
        " .range(pg_from,pg_to)\n" +
        " .as('people')\n" +
        " .match(\n" +
        "   __.as('people').values('Object.Privacy_Impact_Assessment.Description').as('Object.Privacy_Impact_Assessment.Description')\n" +
        " , __.as('people').values('Object.Privacy_Impact_Assessment.Start_Date').as('Object.Privacy_Impact_Assessment.Start_Date')\n" +
        " , __.as('people').values('Object.Privacy_Impact_Assessment.Delivery_Date').as('Object.Privacy_Impact_Assessment.Delivery_Date')\n" +
        " , __.as('people').values('Object.Privacy_Impact_Assessment.Risk_To_Individuals').as('Object.Privacy_Impact_Assessment.Risk_To_Individuals')\n" +
        " , __.as('people').values('Object.Privacy_Impact_Assessment.Intrusion_On_Privacy').as('Object.Privacy_Impact_Assessment.Intrusion_On_Privacy')\n" +
        " , __.as('people').values('Object.Privacy_Impact_Assessment.Risk_To_Corporation').as('Object.Privacy_Impact_Assessment.Risk_To_Corporation')\n" +
        " , __.as('people').values('Object.Privacy_Impact_Assessment.Risk_Of_Reputational_Damage').as('Object.Privacy_Impact_Assessment.Risk_Of_Reputational_Damage')\n" +
        " , __.as('people').values('Object.Privacy_Impact_Assessment.Compliance_Check_Passed').as('Object.Privacy_Impact_Assessment.Compliance_Check_Passed')\n" +
        " , __.as('people').id().as('event_id')\n" +
        " )\n" +
        selectBody
      , bindings: {
        pg_from: from
        , pg_to: to
        , pg_orderCol: sortcolId
        , pg_orderDir: sortdir
      }
      
      
    };
  };
  
}


export default NavPanelPrivacyImpactAssessmentPVGrid;
