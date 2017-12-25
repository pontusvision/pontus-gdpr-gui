import PVGrid from './PVGrid';

//

class NavPanelSubjectAccessRequestPVGrid extends PVGrid
{
  

  
  componentDidMount()
  {
    this.setNamespace("NavPanelSubjectAccessRequest");
    
    super.componentDidMount();
    
    let colSettings = [];
    
    colSettings[0] = {id: "Event.Subject_Access_Request.Status", name: "SAR Status", field:"Event.Subject_Access_Request.Status", sortable:true  };
    colSettings[1] = {id: "Event.Subject_Access_Request.Request_Type", name: "SAR Type",  field:"Event.Subject_Access_Request.Request_Type", sortable:true  };
    colSettings[2] = {id: "Metadata.Create_Date", name: "Request Date", field:"Metadata.Create_Date", sortable:true  };
    colSettings[3] = {id: "Metadata.Update_Date", name: "Update Date",   field:"Metadata.Update_Date", sortable:true  };
    colSettings[4] = {id: "Person.Full_Name", name: "Requester",   field:"Person.Full_Name", sortable:true  };
    colSettings[4] = {id: "Person.Employee.Full_Name", name: "Handler",   field:"Person.Employee.Full_Name", sortable:true  };
    
    this.url = "/gateway/sandbox/pvgdpr_graph";
    
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Event.Subject_Access_Request"});
    
    
  }
  
  
  
  
  
  
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
    
    
    
    
    return {
      gremlin: "g.V()" +
      ".has('Metadata.Type','Event.Subject_Access_Request')" +
      ".order().by(pg_orderCol == null ? 'Metadata.Create_Date' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
      ".range(pg_from,pg_to).as('sars')" +
      ".local(in().hasLabel('Made_SAR_Request').as('people'))" +
      ".local(in().hasLabel('Assigned_SAR_Request').as('employees'))" +
      ".match(" +
      "  __.as('sars').values('Event.Subject_Access_Request.Status').as('Event.Subject_Access_Request.Status')" +
      ", __.as('sars').id().as('event_id')" +
      ", __.as('sars').values('Event.Subject_Access_Request.Request_Type').as('Event.Subject_Access_Request.Request_Type')" +
      ", __.as('sars').values('Metadata.Create_Date').as('Metadata.Create_Date')" +
      ", __.as('sars').values('Metadata.Update_Date').as('Metadata.Update_Date')" +
      ", __.as('people').values('Person.Full_Name').as('Person.Full_Name')" +
      ", __.as('employees').values('Person.Full_Name').as('Person.Employee.Full_Name')" +
      ")" +
      ".select('Event.Subject_Access_Request.Status','Event.Subject_Access_Request.Request_Type'" +
      "       ,'Metadata.Create_Date','Metadata.Update_Date','Person.Full_Name', 'Person.Employee.Full_Name', 'event_id')"
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


export default NavPanelSubjectAccessRequestPVGrid;
