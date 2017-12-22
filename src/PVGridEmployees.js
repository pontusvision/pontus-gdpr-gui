import PVGrid from './PVGrid';


class PVGridEmployees extends PVGrid
{
  
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
    
    return {
      gremlin: "g.V(Long.parseLong(pg_awarenessId))" +
      // ".has('Object.Awareness_Campaign.Campaign_URL','https://trainingcourses.com')" +
      ".in().as('events')" +
      ".out()" +
      ".has('Metadata.Type','Person.Employee')" +
      ".order().by(pg_orderCol == null ? 'Person.Full_Name' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
      ".range(pg_from,pg_to).as('employees')" +
      ".match(__.as('events').values('Event.Training.Status').as('event_status')" +
      ", __.as('events').id().as('event_id')" +
      ", __.as('employees').values('Person.Full_Name').as('Person.Full_Name')" +
      ", __.as('employees').values('Person.Title').as('Person.Title')" +
      ", __.as('employees').values('Person.Nationality').as('Person.Nationality')" +
      ", __.as('employees').id().as('emp_id')" +
      ")" +
      ".select('Person.Title','event_status','Person.Full_Name','Person.Nationality','emp_id', 'event_id')"
      , bindings: {
        pg_awarenessId: this.awarenessCampaignId
        , pg_from: from
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
            if (key.endsWith("_id"))
            {
              if (key === ("emp_id")){
                itemParsed['index'] = val['@value'];
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
  
      this.data.length = Math.max(itemsParsed.length + this.from, this.to + 10); // limitation of the API
  
      this.req = null;
  
      this.onDataLoadedCb({from: this.from, to: this.to});
  
  
    }
    catch (e){
      // e;
    }
    
    
  };
  
  
  
  
  onClickedPVGridAwarenessCampaign = (val) =>
  {
    this.awarenessCampaignId = val.id;
    let colSettings = [];
    
    colSettings[0] = {id: "Person.Title", name: "Title", field: "Person.Title", sortable: true};
    colSettings[1] = {id: "Person.Full_Name", name: "Full Name", field: "Person.Full_Name", sortable: true};
    colSettings[2] = {id: "Person.Nationality", name: "Nationality", field: "Person.Nationality", sortable: true};
    colSettings[3] = {id: "event_status", name: "Campaign Status", field: "event_status", sortable: false};
    
    
    this.url = "/gateway/sandbox/pvgdpr_graph";
    
    
    this.setColumnSettings(colSettings);
    
    
  };
  
  componentDidMount()
  {
    this.setNamespace("PVGridEmployees-");
    
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
