import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";

//

class NavPanelPrivacyNoticesPVGrid extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("NavPanelPrivacyNotices");
  
    super.componentDidMount();
    
    let colSettings = [];
  
    colSettings[0] = {id: "Object.Privacy_Notice.Description", name: "Description", field:"Object.Privacy_Notice.Description", sortable:false  };
    colSettings[1] = {id: "Object.Privacy_Notice.URL", name: "Link", field:"Object.Privacy_Notice.URL", sortable:true  };
    colSettings[2] = {id: "Object.Privacy_Notice.Delivery_Date", name: "Delivery Date", field:"Object.Privacy_Notice.Delivery_Date", sortable:true  };
    colSettings[3] = {id: "Object.Privacy_Notice.Expiry_Date", name: "Expiry Date", field:"Object.Privacy_Notice.Expiry_Date", sortable:true  };
    colSettings[4] = {id: "Object.Privacy_Notice.Info_Collected", name: "Info Collected", field:"Object.Privacy_Notice.Info_Collected", sortable:true  };
    colSettings[5] = {id: "Object.Privacy_Notice.Who_Is_Collecting", name: "Who is Collecting", field:"Object.Privacy_Notice.Who_Is_Collecting", sortable:true  };
    colSettings[6] = {id: "Object.Privacy_Notice.How_Is_It_Collected", name: "How is it Collected", field:"Object.Privacy_Notice.How_Is_It_Collected", sortable:true  };
    colSettings[7] = {id: "Object.Privacy_Notice.Why_Is_It_Collected", name: "Why is it Collected", field:"Object.Privacy_Notice.Why_Is_It_Collected", sortable:true  };
    colSettings[8] = {id: "Object.Privacy_Notice.How_Will_It_Be_Used", name: "How will it be Used", field:"Object.Privacy_Notice.How_Will_It_Be_Used", sortable:true  };
    colSettings[9] = {id: "Object.Privacy_Notice.Who_Will_It_Be_Shared", name: "Who will it be Shared", field:"Object.Privacy_Notice.Who_Will_It_Be_Shared", sortable:true  };
    colSettings[10] = {id: "Object.Privacy_Notice.Effect_On_Individuals", name: "Effect on Individuals", field:"Object.Privacy_Notice.Effect_On_Individuals", sortable:true  };
    colSettings[11] = {id: "Object.Privacy_Notice.Likely_To_Complain", name: "Likely to Complain", field:"Object.Privacy_Notice.Likely_To_Complain", sortable:true  };
  
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Object.Privacy_Notice"});
    this.url = PontusComponent.getGraphURL(this.props);
  
  
  }
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
    
    let sortcolId = sortcol === null ? null : sortcol.id;
    
    
    let selectBody =
      "  .select('Object.Privacy_Notice.Description' " +
      "         ,'Object.Privacy_Notice.URL' " +
      "         ,'Object.Privacy_Notice.Delivery_Date' " +
      "         ,'Object.Privacy_Notice.Expiry_Date' " +
      "         ,'Object.Privacy_Notice.Info_Collected' " +
      "         ,'Object.Privacy_Notice.Who_Is_Collecting' " +
      "         ,'Object.Privacy_Notice.How_Is_It_Collected' " +
      "         ,'Object.Privacy_Notice.Why_Is_It_Collected' " +
      "         ,'Object.Privacy_Notice.How_Will_It_Be_Used' " +
      "         ,'Object.Privacy_Notice.Who_Will_It_Be_Shared' " +
      "         ,'Object.Privacy_Notice.Effect_On_Individuals' " +
      "         ,'Object.Privacy_Notice.Likely_To_Complain' " +
      "         ,'event_id' " +
      "         )";
    
    
    return {
      gremlin: "g.V().has('Metadata.Type.Object.Privacy_Impact_Assessment',eq('Object.Privacy_Impact_Assessment'))\n" +
        " .order()\n" +
        " .by(pg_orderCol == null ? 'Object.Privacy_Notice.Description' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)\n" +
        " .range(pg_from,pg_to)\n" +
        " .as('people')\n" +
        " .match(\n" +
        "   __.as('people').values('Object.Privacy_Notice.Description').as('Object.Privacy_Notice.Description')\n" +
        "   __.as('people').values('Object.Privacy_Notice.URL').as('Object.Privacy_Notice.URL')\n" +
        "   __.as('people').values('Object.Privacy_Notice.Delivery_Date').as('Object.Privacy_Notice.Delivery_Date')\n" +
        "   __.as('people').values('Object.Privacy_Notice.Expiry_Date').as('Object.Privacy_Notice.Expiry_Date')\n" +
        "   __.as('people').values('Object.Privacy_Notice.Info_Collected').as('Object.Privacy_Notice.Info_Collected')\n" +
        "   __.as('people').values('Object.Privacy_Notice.Who_Is_Collecting').as('Object.Privacy_Notice.Who_Is_Collecting')\n" +
        "   __.as('people').values('Object.Privacy_Notice.How_Is_It_Collected').as('Object.Privacy_Notice.How_Is_It_Collected')\n" +
        "   __.as('people').values('Object.Privacy_Notice.Why_Is_It_Collected').as('Object.Privacy_Notice.Why_Is_It_Collected')\n" +
        "   __.as('people').values('Object.Privacy_Notice.How_Will_It_Be_Used').as('Object.Privacy_Notice.How_Will_It_Be_Used')\n" +
        "   __.as('people').values('Object.Privacy_Notice.Who_Will_It_Be_Shared').as('Object.Privacy_Notice.Who_Will_It_Be_Shared')\n" +
        "   __.as('people').values('Object.Privacy_Notice.Effect_On_Individuals').as('Object.Privacy_Notice.Effect_On_Individuals')\n" +
        "   __.as('people').values('Object.Privacy_Notice.Likely_To_Complain').as('Object.Privacy_Notice.Likely_To_Complain')\n" +
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


export default NavPanelPrivacyNoticesPVGrid;
