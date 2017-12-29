import PVGrid from './PVGrid';

//

class NavPanelInformationYouHoldPVGrid extends PVGrid
{
  
  
  componentDidMount()
  {
    this.setNamespace("NavPanelInformationYouHold");
    
    super.componentDidMount();
    
    let colSettings = [];
  
    colSettings[0] = {id: "Person.Title", name: "Title", field: "Person.Title", sortable: true};
    colSettings[1] = {id: "Person.Full_Name", name: "Full Name", field: "Person.Full_Name", sortable: true};
    colSettings[2] = {id: "Person.Date_Of_Birth", name: "Age", field: "Person.Date_Of_Birth", sortable: true};
    colSettings[3] = {id: "Person.Gender", name: "Gender", field: "Person.Gender", sortable: true};
    colSettings[4] = {id: "Person.Nationality", name: "Nationality", field: "Person.Nationality", sortable: true};
    
    this.url = "/gateway/sandbox/pvgdpr_graph";
    
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value: "Person"});
    
    
  }
  
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
  
    let sortcolId = sortcol === null ? null : sortcol.id;
  
  
    let selectBody =
      "  .select('Person.Title'," +
      "        ,'Person.Full_Name'       " +
      "        ,'Person.Date_Of_Birth'" +
      "        ,'Person.Gender'" +
      "        ,'Person.Nationality'" +
      "        ,'event_id'" +
      "        )";
  
  
    return {
      gremlin: "g.V()" +
      ".has('Metadata.Type','Person')" +
      ".order().by(pg_orderCol == null ? 'Person.Full_Name' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
      ".range(pg_from,pg_to).as('people')" +
      ".match(" +
      "    __.as('people').values('Person.Title').as('Person.Title')" +
      "  , __.as('people').values('Person.Full_Name').as('Person.Full_Name')" +
      "  , __.as('people').values('Person.Date_Of_Birth').as('Person.Date_Of_Birth')" +
      "  , __.as('people').values('Person.Gender').as('Person.Gender')" +
      "  , __.as('people').values('Person.Nationality').as('Person.Nationality')" +
      "  , __.as('people').id().as('event_id')" +
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


export default NavPanelInformationYouHoldPVGrid;
