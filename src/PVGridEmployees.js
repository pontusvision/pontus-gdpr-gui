import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";


class PVGridEmployees extends PVGrid
{
  
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
    return ({
      bindings: {
        pg_awarenessId: this.awarenessCampaignId
        , pg_from: from
        , pg_to: to + 2 // add a few extra in the request so we can check if there are more items (in onSuccess)
        , pg_orderCol: sortcol === null ? null : sortcol.id
        , pg_orderDir: sortdir
      },
      gremlin: "g.V((pg_awarenessId))" +
      ".in().as('events')" +
      ".out()" +
      ".has('Metadata.Type.Person.Employee',eq('Person.Employee'))" +
      ".order().by(pg_orderCol == null ? 'Person.Full_Name' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
      ".range(pg_from,pg_to).as('employees')" +
      ".match(__.as('events').values('Event.Training.Status').as('event_status')" +
      ", __.as('events').id().as('event_id')" +
      ", __.as('employees').values('Person.Employee.Full_Name').as('Person.Full_Name')" +
      ", __.as('employees').values('Person.Employee.Title').as('Person.Title')" +
      ", __.as('employees').values('Person.Employee.Nationality').as('Person.Nationality')" +
      ", __.as('employees').id().as('emp_id')" +
      ")" +
      ".select('Person.Title','event_status','Person.Full_Name','Person.Nationality','emp_id', 'event_id')"
      
      
    });
  };
  
  onError = (err, fromPage, toPage) =>
  {
    this.errCounter++;
    
    if (this.errCounter < 3)
    {
      this.ensureData(
        this.from, this.to
      );
    }
    
  };
  
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
            if (key.endsWith("_id"))
            {
              if (key === ("emp_id"))
              {
                itemParsed['index'] = val['@value'];
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
      
      
      // we always ask for a few more items than this.to; so we can set the data.length to
      // the this.from + the number received.  This should take care of the end of the data
      // stream plus ask for a bit more each time.
      this.data.length = itemsParsed.length + this.from;
      
      for (let i = this.to; i < this.data.length; i++)
      {
        this.data[i] = undefined;
      }
      
      //Math.min(itemsParsed.length + this.from, this.to); // limitation of the API
      
      this.req = null;
      
      this.onDataLoadedCb({from: this.from, to: this.to});
      
      
    }
    catch (e)
    {
      // e;
    }
    
    
  };
  
  
  onClickedPVGridAwarenessCampaign = (val) =>
  {
    try
    {
      
      
      this.awarenessCampaignId = val.index;
      let colSettings = [];
      
      colSettings[0] = {id: "Person.Title", name: "Title", field: "Person.Title", sortable: true};
      colSettings[1] = {id: "Person.Full_Name", name: "Full Name", field: "Person.Full_Name", sortable: true};
      colSettings[2] = {id: "Person.Nationality", name: "Nationality", field: "Person.Nationality", sortable: true};
      colSettings[3] = {id: "event_status", name: "Campaign Status", field: "event_status", sortable: false};
  
  
      this.url = PontusComponent.getGraphURL(this.props);
  
  
  
      this.setColumnSettings(colSettings);
    }
    catch (e)
    {
    
    }
    
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
