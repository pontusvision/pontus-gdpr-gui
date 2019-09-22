import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";

//

class NavPanelConsentPVGridPrivacyNotices extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("NavPanelConsent");
    
    super.componentDidMount();
    
    let colSettings = [];
    
    colSettings[0] = {
      id: "Object.Privacy_Notice.URL", name: "Link", field: "Object.Privacy_Notice.URL", sortable: true
    };
    colSettings[1] = {
      id: "Object.Privacy_Notice.Description", name: "Description", field: "Object.Privacy_Notice.Description",
      sortable: true
    };
    colSettings[2] = {
      id: "Object.Privacy_Notice.Delivery_Date", name: "Delivery Date", field: "Object.Privacy_Notice.Delivery_Date",
      sortable: true
    };
    colSettings[3] = {
      id: "Object.Privacy_Notice.Expiry_Date", name: "Expiry Date", field: "Object.Privacy_Notice.Expiry_Date",
      sortable: true
    };
  
    this.url = PontusComponent.getRestUrlAg(this.props);
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value: "Object.Privacy_Notice"});
    this.setDataType( "Object.Privacy_Notice");
    
    
  }
  
  //
  // getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  // {
  //   this.from = from;
  //   this.to = to;
  //
  //   let sortcolId = sortcol == null ? null : sortcol.id;
  //
  //   return {
  //     gremlin: "g.V()" +
  //     ".has('Metadata.Type.Object.Privacy_Notice',eq('Object.Privacy_Notice'))" +
  //     ".order().by(pg_orderCol == null ? 'Object.Privacy_Notice.Delivery_Date' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)" +
  //     ".range(pg_from,pg_to).as('priv_notices')" +
  //     ".match(" +
  //     "    __.as('priv_notices').values('Object.Privacy_Notice.URL').as('Object.Privacy_Notice.URL')" +
  //     "  , __.as('priv_notices').values('Object.Privacy_Notice.Description').as('Object.Privacy_Notice.Description')" +
  //     "  , __.as('priv_notices').values('Object.Privacy_Notice.Delivery_Date').as('Object.Privacy_Notice.Delivery_Date')" +
  //     "  , __.as('priv_notices').values('Object.Privacy_Notice.Expiry_Date').as('Object.Privacy_Notice.Expiry_Date')" +
  //     "  , __.as('priv_notices').id().as('event_id')" +
  //     "  )" +
  //     ".select ('Object.Privacy_Notice.URL','Object.Privacy_Notice.Description','Object.Privacy_Notice.Delivery_Date','Object.Privacy_Notice.Expiry_Date','event_id')"
  //     , bindings: {
  //       pg_from: from
  //       , pg_to: to
  //       , pg_orderCol: sortcolId
  //       , pg_orderDir: sortdir
  //     }
  //
  //   };
  //
  //
  // };
  //
  //
  // onSuccess = (resp) =>
  // {
  //
  //   let respParsed = {};
  //   let itemsParsed = [];
  //
  //
  //   try
  //   {
  //     if (typeof resp !== 'object')
  //     {
  //       respParsed = JSON.parse(resp);
  //     }
  //     else
  //     {
  //       respParsed = resp;
  //     }
  //     if (respParsed.status === 200)
  //     {
  //       let items = respParsed.data.result.data['@value'];
  //
  //
  //       for (let i = 0, ilen = items.length; i < ilen; i++)
  //       {
  //         let vals = items[i]['@value'];
  //         let itemParsed = {};
  //
  //         for (let j = 0, jlen = vals.length; j < jlen; j += 2)
  //         {
  //           let key = vals[j];
  //           let val = vals[j + 1];
  //           if (val instanceof Object)
  //           {
  //             if (key === ("event_id"))
  //             {
  //               itemParsed['index'] = val['@value'];
  //             }
  //             else
  //             {
  //               if (val['@type'] === 'g:Date')
  //               {
  //                 itemParsed[key] = new Date(val['@value']);
  //
  //               }
  //               else
  //               {
  //                 itemParsed[key] = val['@value'];
  //
  //               }
  //             }
  //           }
  //           else
  //           {
  //             itemParsed[key] = val;
  //           }
  //         }
  //         itemsParsed[i] = (itemParsed);
  //         this.data[this.from + i] = itemsParsed[i];
  //
  //       }
  //     }
  //
  //     this.data.length = Math.min(itemsParsed.length + this.from, this.to); // limitation of the API
  //
  //     if (this.data.length === this.to)
  //     {
  //       this.data.length++;
  //     }
  //     // if (this.data.length == this.to)
  //
  //     this.req = null;
  //
  //     this.onDataLoadedCb({from: this.from, to: this.to});
  //
  //
  //   }
  //   catch (e)
  //   {
  //     // e;
  //   }
  //
  //
  // };
  
  
}


export default NavPanelConsentPVGridPrivacyNotices;
