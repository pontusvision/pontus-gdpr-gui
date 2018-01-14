import * as Slick from 'slickgrid-es6';
import PVGridEditable from "./PVGridEditable";

//

class NavPanelDataProceduresPVGridNoticeTemplates extends PVGridEditable
{
  
  
  componentDidMount()
  {
    this.setNamespace("NavPanelInformationYouHold");
    
    super.componentDidMount();
    
    let colSettings = [];
  
    colSettings[0] = {id: "Object.Notification_Templates.Id", name: "Id", field: "Object.Notification_Templates.Id", editor: Slick.Editors.Text, sortable: true};
    colSettings[1] = {id: "Object.Notification_Templates.URL", name: "Link", field: "Object.Notification_Templates.URL",  editor: Slick.Editors.Text,sortable: true};
    colSettings[2] = {id: "Object.Notification_Templates.Text", name: "Text", field: "Object.Notification_Templates.Text",   sortable: false};

    
    this.url = "/gateway/sandbox/pvgdpr_graph";
    
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value: "Object.Notification_Templates"});
    
    
    
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
      "  .select('Object.Notification_Templates.Id'" +
      "         ,'Object.Notification_Templates.URL'" +
      "         ,'Object.Notification_Templates.Text'" +
      "         ,'event_id'" +
      "         )";
  
  
    return {
      gremlin: "g.V()" +
      ".has('Metadata.Type','Object.Data_Procedures')" +
      ".order().by(pg_orderCol == null ? 'Object.Data_Procedures.Type' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
      ".range(pg_from,pg_to).as('dataProcs')" +
      ".match(" +
      "    __.as('dataProcs').values('Object.Notification_Templates.Id')           .as('Object.Notification_Templates.Id')" +
      "  , __.as('dataProcs').values('Object.Notification_Templates.URL')          .as('Object.Notification_Templates.URL')" +
      "  , __.as('dataProcs').values('Object.Notification_Templates.Text')         .as('Object.Notification_Templates.Text')" +
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


export default NavPanelDataProceduresPVGridNoticeTemplates;
