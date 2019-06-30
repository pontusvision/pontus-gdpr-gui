import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";

//

class PVGridAwarenessCampaign extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("PVGridAwarenessCampaign");
  
    super.componentDidMount();
    
    let colSettings = [];
  
    colSettings[0] = {id: "Object.Awareness_Campaign.Description", name: "Description", field:"Object.Awareness_Campaign.Description", sortable:true  };
    colSettings[1] = {id: "Object.Awareness_Campaign.URL", name: "Link to Campaign",  field:"Object.Awareness_Campaign.URL", sortable:true  };
    colSettings[2] = {id: "Object.Awareness_Campaign.Start_Date", name: "Start Date", field:"Object.Awareness_Campaign.Start_Date", sortable:true  };
    colSettings[3] = {id: "Object.Awareness_Campaign.Stop_Date", name: "Stop Date",   field:"Object.Awareness_Campaign.Stop_Date", sortable:true  };
  
    this.url = PontusComponent.getGraphURL(this.props);
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Object.Awareness_Campaign"});
  
  
  }
  
 
  
  
  
  
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
    
    return {
      gremlin: "g.V()" +
      ".has('Metadata.Type.Object.Awareness_Campaign',eq('Object.Awareness_Campaign'))" +
      ".order().by(pg_orderCol == null ? 'Object.Awareness_Campaign.Description' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
      ".range(pg_from,pg_to)" +
      ".  match(\n" +
      "        __.as('data').id().as('event_id')\n" +
      "      , __.as('data').values('Object.Awareness_Campaign.Description').as('Object.Awareness_Campaign.Description')\n" +
      "      , __.as('data').values('Object.Awareness_Campaign.URL').as('Object.Awareness_Campaign.URL')\n" +
      "      , __.as('data').values('Object.Awareness_Campaign.Start_Date').as('Object.Awareness_Campaign.Start_Date')\n" +
      "      , __.as('data').values('Object.Awareness_Campaign.Stop_Date').as('Object.Awareness_Campaign.Stop_Date')\n" +
      "      )\n" +
      ".  select('Object.Awareness_Campaign.Description'\n" +
      "      , 'Object.Awareness_Campaign.URL'\n" +
      "      , 'Object.Awareness_Campaign.Start_Date'\n" +
      "      , 'Object.Awareness_Campaign.Stop_Date'\n" +
      "      , 'event_id')\n"
      , bindings: {
          pg_from: from
        , pg_to: to
        , pg_orderCol: sortcol === null ? null : sortcol.id
        , pg_orderDir: sortdir
      }
      
    }
  };
  
  onError = (err, fromPage, toPage) =>{
    // ignore.
  };
  
  onSuccess = (resp) =>
  {
    
    let respParsed =  {};
    let itemsParsed =  [];
    
    
    
    try{
      if (typeof resp !== 'object'){
        respParsed = JSON.parse(resp);
      }
      else{
        respParsed = resp;
      }
      if (respParsed.status === 200)
      {
        let items = respParsed.data.result.data['@value'];
        
        
        for (let i = 0, ilen = items.length; i < ilen; i++){
          let vals = items[i]['@value'];
          let itemParsed = {};
          
          for (let j = 0, jlen = vals.length; j < jlen; j+=2){
            let key = vals[j];
            let val = vals[j+1];
            if (val instanceof Object )
            {
              if (key === ("event_id")){
                itemParsed['index'] = val['@value'];
              }
              else{
                if (val['@type'] === 'g:Date'){
                  itemParsed[key] = new Date(val['@value']);
  
                }
                else {
                  itemParsed[key] = val['@value'];
  
                }
              }
            }
            else{
              itemParsed[key] = val;
            }
          }
          itemsParsed[i] = (itemParsed);
          this.data[this.from + i] = itemsParsed[i];
          
        }
      }
      
      this.data.length =  Math.min(itemsParsed.length + this.from, this.to); // limitation of the API
      
      if (this.data.length === this.to){
        this.data.length++;
      }
      // if (this.data.length == this.to)
      
      this.req = null;
      
      this.onDataLoadedCb({from: this.from, to: this.to});
      
      
    }
    catch (e){
      // e;
    }
    
    
  };
  
  
  
  
  
  
}


export default PVGridAwarenessCampaign;
