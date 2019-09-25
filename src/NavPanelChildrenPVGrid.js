import PVGrid from './PVGrid';

//

class NavPanelChildrenPVGrid extends PVGrid
{
  constructor(props)
  {
    super({
      ...props, namespace: "NavPanelChildren", dataType: "Person.Natural", customFilter: "children",
      colSettings: NavPanelChildrenPVGrid.getDefaultColSettings()
    });
  }
  
  static getDefaultColSettings()
  {
    
    let colSettings = [];
    
    // colSettings[0] = {id: "Person.Natural.Title", name: "Title", field: "Person.Natural.Title", sortable: true};
    colSettings[0] = {
      id: "Person.Natural.Date_Of_Birth", name: "Date Of Birth", field: "#Person.Natural.Date_of_Birth", sortable: true
    };
    
    colSettings[1] = {
      id: "Person.Natural.Full_Name", name: "Full Name", field: "#Person.Natural.Full_Name", sortable: true
    };
    colSettings[2] = {id: "Person.Natural.Gender", name: "Gender", field: "#Person.Natural.Gender", sortable: true};
    colSettings[3] = {
      id: "Person.Natural.Nationality", name: "Nationality", field: "#Person.Natural.Nationality", sortable: true
    };
    
    return colSettings;
    
  }
  
  //
  // getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  // {
  //   this.from = from;
  //   this.to = to;
  //
  //   let sortcolId = sortcol === null ? null : sortcol.id;
  //
  //   if (sortcolId === 'Person.Natural.Age'){
  //     sortcolId = 'Person.Natural.Date_Of_Birth';
  //     sortdir = (-1)* sortdir;
  //   }
  //
  //   let selectBody =
  //     "  .select( " +
  //     "          'Person.Natural.Full_Name' " +
  //     "         ,'Person.Natural.Age' " +
  //     "         ,'Person.Natural.Gender' " +
  //     "         ,'Person.Natural.Nationality' " +
  //     "         ,'event_id' " +
  //     "         )";
  //
  //
  //   return {
  //     gremlin: "long ageThresholdMs = (long)(System.currentTimeMillis() - (3600000L * 24L *365L  * 18L)); \n" +
  //     "def dateThreshold = new java.util.Date (ageThresholdMs); \n" +
  //     "\n" +
  //     "g.V().has('Metadata.Type.Person.Natural',eq('Person.Natural'))\n" +
  //     "\n" +
  //     " .where(__.values('Person.Natural.Date_Of_Birth').is(gte(dateThreshold)))\n" +
  //     " .order()\n" +
  //     " .by(pg_orderCol == null ? 'Person.Natural.Full_Name' :pg_orderCol.toString() ,pg_orderDir == (1)? incr:
  // decr)\n" + " .range(pg_from,pg_to)\n" + " .as('people')\n" + " .match(\n" + // "
  // __.as('people').values('Person.Natural.Title').as('Person.Natural.Title')\n" + "
  // __.as('people').values('Person.Natural.Full_Name').as('Person.Natural.Full_Name')\n" + " ,
  // __.as('people').values('Person.Natural.Date_Of_Birth').map{ (long) (((long) System.currentTimeMillis() -
  // (long)it.get().getTime()) /(long)(3600000L*24L*365L) ) }.as('Person.Natural.Age')\n" + " ,
  // __.as('people').values('Person.Natural.Gender').as('Person.Natural.Gender')\n" + " ,
  // __.as('people').values('Person.Natural.Nationality').as('Person.Natural.Nationality')\n" + " ,
  // __.as('people').id().as('event_id')\n" + " )" + selectBody , bindings: { pg_from: from , pg_to: to , pg_orderCol:
  // sortcolId , pg_orderDir: sortdir }   }; };  // onError = (err, fromPage, toPage) => // { //   // ignore. // };
  // onSuccess = (resp) => {  let respParsed = {}; let itemsParsed = [];   try { if (typeof resp !== 'object') { respParsed = JSON.parse(resp); } else { respParsed = resp; } if (respParsed.status === 200) { let items = respParsed.data.result.data['@value'];   for (let i = 0, ilen = items.length; i < ilen; i++) { let vals = items[i]['@value']; let itemParsed = {};  for (let j = 0, jlen = vals.length; j < jlen; j += 2) { let key = vals[j]; let val = vals[j + 1]; if (val instanceof Object) { if (key === ("event_id")) { itemParsed['index'] = val['@value']; } else { if (val['@type'] === 'g:Date') { itemParsed[key] = new Date(val['@value']);  } else { itemParsed[key] = val['@value'];  } } } else { itemParsed[key] = val; } } itemsParsed[i] = (itemParsed); this.data[this.from + i] = itemsParsed[i];  } }  this.data.length = Math.min(itemsParsed.length + this.from, this.to); // limitation of the API  if (this.data.length === this.to) { this.data.length++; } // if (this.data.length == this.to)  this.req = null;  this.onDataLoadedCb({from: this.from, to: this.to});   } catch (e) { // e; }   };
  
}


export default NavPanelChildrenPVGrid;
