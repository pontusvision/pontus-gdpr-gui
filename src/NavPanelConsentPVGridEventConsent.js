import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";

//

class NavPanelConsentPVGridEventConsent extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("NavPanelConsent_EventConsent");
    
    super.componentDidMount();
    
    let colSettings = [];
    
    colSettings[0] = {
      id: "Event.Consent.Status", name: "Consent Status", field: "Event.Consent.Status", sortable: true
    };
    colSettings[1] = {
      id: "Event.Consent.Date", name: "Date", field: "Event.Consent.Date",
      sortable: true
    };
    colSettings[2] = {
      id: "Person.Natural.Full_Name", name: "Person Name", field: "Person.Natural.Full_Name",
      sortable: false
    };
    colSettings[3] = {
      id: "Person.Natural.Age", name: "Person Age", field: "Person.Natural.Age",
      sortable: false
    };
  
    this.url = PontusComponent.getGraphURL(this.props);
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value: "Object.Consent"});
    
    
    this.props.glEventHub.on('NavPanelConsent-pvgrid-on-click-row', this.onClickedPVGrid);
    
    
  }
  componentWillUnmount()
  {
    this.props.glEventHub.off('NavPanelConsent-pvgrid-on-click-row', this.onClickedPVGrid);
    
    // super.componentWillUnmount();
  }
  
  onClickedPVGrid = (event) =>
  {
    this.setSearch(event.id || event.index)
  };
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
    
    let sortcolId = sortcol === null ? null : sortcol.id;
    
    return {
      bindings: {
        pg_privNoticeId: 0 + searchstr
        , pg_from: from
        , pg_to: to
        , pg_orderCol: sortcolId
        , pg_orderDir: sortdir
      }
    ,  gremlin:
      "g.V(pg_privNoticeId).in().has('Metadata.Type.Event.Consent', eq('Event.Consent'))" +
      ".order().by(pg_orderCol == null ? 'Event.Consent.Date' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
      ".range(pg_from,pg_to).as('consent_events')" +
      ".match(" +
      "  __.as('consent_events').values('Event.Consent.Date').as('Event.Consent.Date')" +
      ", __.as('consent_events').values('Event.Consent.Status').as('Event.Consent.Status')" +
      ", __.as('consent_events').in().has('Metadata.Type.Person.Natural',eq('Person.Natural')).as('people')" +
      ", __.as('consent_events').id().as('event_id')" +
      ", __.as('people').values('Person.Natural.Full_Name').as('Person.Natural.Full_Name')" +
      ", __.as('people').values('Person.Natural.Date_Of_Birth').map{ it.get().getTime() }.as('Person.Natural.Date_Of_Birth')" +
      ", __.as('Person.Natural.Date_Of_Birth').math('(' +System.currentTimeMillis() + '- _)/(3600000*24*365)').as('Person.Natural.Age')" +
      ")" +
      ".select(" +
      "  'Event.Consent.Date'" +
      ", 'Event.Consent.Status'" +
      ", 'Person.Natural.Full_Name'" +
      ", 'Person.Natural.Age'" +
      ", 'event_id'" +
      
      "  )"
      
      
    };
    
    
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


export default NavPanelConsentPVGridEventConsent;
