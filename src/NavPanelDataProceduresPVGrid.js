import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";

//

class NavPanelDataProceduresPVGrid extends PVGrid
{
  
  
  componentDidMount()
  {
    this.setNamespace("NavPanelInformationYouHold");
    
    super.componentDidMount();
    
    let colSettings = [];
  
    colSettings[0] = {id: "Object.Data_Procedures.Type", name: "Data Type", field: "Object.Data_Procedures.Type", sortable: true};
    colSettings[1] = {id: "Object.Data_Procedures.Property", name: "Property", field: "Object.Data_Procedures.Property", sortable: true};
    colSettings[2] = {id: "Object.Data_Procedures.Delete_URL", name: "Delete Link", field: "Object.Data_Procedures.Delete_URL", sortable: true};
    colSettings[3] = {id: "Object.Data_Procedures.Delete_Mechanism", name: "Delete Mechanism", field: "Object.Data_Procedures.Delete_Mechanism", sortable: true};
    colSettings[4] = {id: "Object.Data_Procedures.Update_URL", name: "Update Link", field: "Object.Data_Procedures.Update_URL", sortable: true};
    colSettings[5] = {id: "Object.Data_Procedures.Update_Mechanism", name: "Update Mechanism", field: "Object.Data_Procedures.Update_Mechanism", sortable: true};

    
    this.url = PontusComponent.getGraphURL(this.props);
    
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value: "Person"});
    /*
     property("Object.Data_Procedures.Type", typeStr.replaceAll('[_.]',' ')).
     property("Object.Data_Procedures.Property", propStr.replaceAll('[_.]',' ')).
     property("Object.Data_Procedures.Delete_URL", 'https://api-gateway/delete-'+propStr.toLowerCase()).
     property("Object.Data_Procedures.Delete_Mechanism", distributionRequestType.sample()).
     property("Object.Data_Procedures.Update_URL", 'https://api-gateway/update-'+propStr.toLowerCase()).
     property("Object.Data_Procedures.Update_Mechanism", distributionRequestType.sample()).
 
     */
    
  }
  
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
  
    let sortcolId = sortcol === null ? null : sortcol.id;
  
  
    let selectBody =
      "  .select('Object.Data_Procedures.Type'" +
      "         ,'Object.Data_Procedures.Property'" +
      "         ,'Object.Data_Procedures.Delete_URL'" +
      "         ,'Object.Data_Procedures.Delete_Mechanism'" +
      "         ,'Object.Data_Procedures.Update_URL'" +
      "         ,'Object.Data_Procedures.Update_Mechanism'" +
      "         ,'event_id'" +
      "         )";
  
  
    return {
      gremlin: "g.V()" +
      ".has('Metadata.Type','Object.Data_Procedures')" +
      ".order().by(pg_orderCol == null ? 'Object.Data_Procedures.Type' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
      ".range(pg_from,pg_to).as('dataProcs')" +
      ".match(" +
      "    __.as('dataProcs').values('Object.Data_Procedures.Type')              .as('Object.Data_Procedures.Type')" +
      "  , __.as('dataProcs').values('Object.Data_Procedures.Property')          .as('Object.Data_Procedures.Property')" +
      "  , __.as('dataProcs').values('Object.Data_Procedures.Delete_URL')        .as('Object.Data_Procedures.Delete_URL')" +
      "  , __.as('dataProcs').values('Object.Data_Procedures.Delete_Mechanism')  .as('Object.Data_Procedures.Delete_Mechanism')" +
      "  , __.as('dataProcs').values('Object.Data_Procedures.Update_URL')        .as('Object.Data_Procedures.Update_URL')" +
      "  , __.as('dataProcs').values('Object.Data_Procedures.Update_Mechanism')  .as('Object.Data_Procedures.Update_Mechanism')" +
      "  , __.as('dataProcs').id().as('event_id')" +
      "  )" +
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


export default NavPanelDataProceduresPVGrid;
