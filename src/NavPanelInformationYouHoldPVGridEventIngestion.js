import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";

//

class NavPanelInformationYouHoldPVGridEventIngestion extends PVGrid
{
  
  
  componentDidMount()
  {
    this.setNamespace("NavPanelInformationYouHold");
    
    super.componentDidMount();
    
    let colSettings = [];
  /*
   eventIngestionProp01 = createProp(mgmt, "Event.Ingestion.Metadata_Create_Date", String.class, org.janusgraph.core.Cardinality.SINGLE);
   eventIngestionProp02 = createProp(mgmt, "Event.Ingestion.Metadata_GUID", String.class, org.janusgraph.core.Cardinality.SINGLE);
   eventIngestionProp03 = createProp(mgmt, "Event.Ingestion.Type", String.class, org.janusgraph.core.Cardinality.SINGLE);
   eventIngestionProp04 = createProp(mgmt, "Event.Ingestion.Operation", String.class, org.janusgraph.core.Cardinality.SINGLE);
   eventIngestionProp05 = createProp(mgmt, "Event.Ingestion.Domain_b64", String.class, org.janusgraph.core.Cardinality.SINGLE);
   eventIngestionProp06 = createProp(mgmt, "Event.Ingestion.Domain_Unstructured_Data_b64", String.class, org.janusgraph.core.Cardinality.SINGLE);
 
   */
    colSettings[0] = {id: "Event.Ingestion.Metadata_Create_Date", name: "Ingestion Date", field: "Event.Ingestion.Metadata_Create_Date", sortable: true};
    colSettings[1] = {id: "Event.Ingestion.Type", name: "Type", field: "Event.Ingestion.Type", sortable: true};
    colSettings[2] = {id: "Event.Ingestion.Operation", name: "Operation", field: "Event.Ingestion.Operation", sortable: true};
    colSettings[3] = {id: "Event.Ingestion.Domain_b64", name: "Domain Data", field: "Event.Ingestion.Domain_b64", sortable: false};
    
    this.url = PontusComponent.getGraphURL(this.props);
    
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value: "Event.Ingestion"});
    
    
  }
  
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
  
    let sortcolId = sortcol === null ? null : sortcol.id;
  
  
    let selectBody =
      "  .select('Event.Ingestion.Metadata_Create_Date' " +
      "         ,'Event.Ingestion.Type' " +
      "         ,'Event.Ingestion.Operation' " +
      "         ,'Event.Ingestion.Domain_b64' " +
      "         ,'event_id' " +
      "         )";
  
  
    return {
      gremlin: "" +
        "g.V()\n" +
        " .has('Metadata.Type.Event.Ingestion',eq('Event.Ingestion')) \n" +
        " .where(__.inE().count().is(eq(1)) )\n" +
        " .order()\n" +
      " .by(pg_orderCol == null ? id :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)\n" +
      " .range(pg_from,pg_to)\n" +
      " .as('ingestion')\n" +
      " .match(\n" +
      "   __.as('ingestion').values('Event.Ingestion.Metadata_Create_Date').as('Event.Ingestion.Metadata_Create_Date')\n" +
      " , __.as('ingestion').values('Event.Ingestion.Type').as('Event.Ingestion.Type')\n" +
      " , __.as('ingestion').values('Event.Ingestion.Operation').as('Event.Ingestion.Operation')\n" +
      " , __.as('ingestion').values('Event.Ingestion.Domain_b64').as('Event.Ingestion.Domain_b64')\n" +
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
  
  // onError = (err, fromPage, toPage) =>
  // {
  //   // ignore.
  // };
  
  onSuccess = (resp) =>
  {
    
    let respParsed = {};
    let itemsParsed = [];
    
    
    try
    {
      if (typeof resp !== 'object')
      {
        respParsed = JSON.parse(resp);
      }
      else
      {
        respParsed = resp;
      }
      if (respParsed.status === 200)
      {
        let items = respParsed.data.result.data['@value'];
        
        
        for (let i = 0, ilen = items.length; i < ilen; i++)
        {
          let vals = items[i]['@value'];
          let itemParsed = {};
          
          for (let j = 0, jlen = vals.length; j < jlen; j += 2)
          {
            let key = vals[j];
            let val = vals[j + 1];
            if (val instanceof Object)
            {
              if (key === ("event_id"))
              {
                itemParsed['index'] = val['@value'];
              }
              else
              {
                if (val['@type'] === 'g:Date')
                {
                  itemParsed[key] = new Date(val['@value']);
                  
                }
                else
                {
                  itemParsed[key] = val['@value'];
                  
                }
              }
            }
            else
            {
              itemParsed[key] = val;
            }
          }
          itemsParsed[i] = (itemParsed);
          this.data[this.from + i] = itemsParsed[i];
          
        }
      }
      
      this.data.length = Math.min(itemsParsed.length + this.from, this.to); // limitation of the API
      
      if (this.data.length === this.to)
      {
        this.data.length++;
      }
      // if (this.data.length == this.to)
      
      this.req = null;
      
      this.onDataLoadedCb({from: this.from, to: this.to});
      
      
    }
    catch (e)
    {
      // e;
    }
    
    
  };
  
  
}


export default NavPanelInformationYouHoldPVGridEventIngestion;
