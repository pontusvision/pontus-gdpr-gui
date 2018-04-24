import React from 'react';


import "./slick.grid.css";
import "./slick-default-theme.css";
import ResizeAware from 'react-resize-aware';

import axios from "axios";
// import "slickgrid-es6/dist/slick-default-theme.less";
import {Flex, Box} from 'reflexbox'
import PVGrid from "./PVGrid";
import PontusComponent from "./PontusComponent";


class PVGridEditable extends PVGrid
{
  constructor(props)
  {
    
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    this.errCounter = 0;
  
    this.state = {
      columnSettings: []
      , totalRecords: 0
    }
    
    if (!this.props.settings)
    {
      this.settings = {
        multiColumnSort: true,
        defaultColumnWidth: 125,
        rowHeight: 26,
        editable: true,
        enableAddRow: true,
        enableCellNavigation: true,
        asyncEditorLoading: false,
        autoEdit: false,
        forceFitColumns: true
  
  
      };
    }
    else
    {
      this.settings = this.props.settings;
      
    }
    
    this.PAGESIZE = 300;
    this.data = {length: 0};
    this.searchstr = "";
    this.searchExact = true;
    this.sortcol = null;
    this.sortdir = 1;
    this.h_request = null;
    this.req = null; // ajax request
    this.url = PontusComponent.getRestURL(this.props);
    this.namespace = "";
    
    // if (!this.props.url){
    //   let err = "Must set the url property control where this component sends its requests";
    //   throw (err);
    // }
    
    // this.props.columnSettings = [
    //   {id: "name", name: "Name", field: "name", sortable: true},
    //
    //   {id: "street", name: "Street", field: "street", sortable: true}
    // ];
    // this.loader = new RemoteModel(this.props);
    this.extraSearch = [];
    this.setNamespace("");
    
  }
  
  
  handleResize = () =>
  {
    if (this.grid)
    {
      this.grid.resizeCanvas();
      this.onViewportChanged();
      
    }
  };
  
  setGridDiv = (gridDiv) =>
  {
    this.gridDiv = gridDiv;
  };
  
  setNamespace = (namespace) =>
  {
    this.namespace = namespace;
  }
  
  componentDidMount()
  {
    super.componentDidMount();
    
  }
  
  
  isDataLoaded = (from, to) =>
  {
    for (let i = from; i <= to; i++)
    {
      if (this.data[i] === undefined || this.data[i] === null)
      {
        return false;
      }
    }
    
    return true;
  };
  
  
  clear = () =>
  {
    for (let key in this.data)
    {
      delete this.data[key];
    }
    this.data.length = 0;
  };
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    return {
      
      search: {
        searchStr: searchstr, searchExact: searchExact, cols: cols, extraSearch: extraSearch
      },
      from: from,
      to: to,
      sortBy: sortcol,
      sortDir: ((sortdir > 0) ? "+asc" : "+desc")
    }
  }
  
  ensureData = (fromReq, toReq) =>
  {
    if (undefined === (fromReq) || undefined  === toReq )
    {
      return;
    }
    if (this.req)
    {
      this.req.cancel();
      for (let i = this.req.fromPage; i <= this.req.toPage; i++)
        this.data[i * this.PAGESIZE] = undefined;
    }
    
    if (fromReq < 0)
    {
      fromReq = 0;
    }
    
    if (this.data.length > 0)
    {
      toReq = Math.min(toReq, this.data.length - 1);
    }
    
    let fromPage = Math.floor(fromReq / this.PAGESIZE);
    let toPage = Math.floor(toReq / this.PAGESIZE);
    
    while (this.data[fromPage * this.PAGESIZE] !== undefined && fromPage < toPage)
      fromPage++;
    
    while (this.data[toPage * this.PAGESIZE] !== undefined && fromPage < toPage)
      toPage--;
  
    let from = (fromPage * this.PAGESIZE);
    let to = from + (((toPage - fromPage) * this.PAGESIZE) + this.PAGESIZE);
  
  
    if (fromPage > toPage || ((fromPage === toPage) && this.data[fromPage * this.PAGESIZE] !== undefined && this.data[fromPage * this.PAGESIZE] !== null))
    {
      // TODO:  look-ahead
      
  
      this.onDataLoadedCb({from: from, to: to});
      // this.props.glEventHub.emit(this.namespace + 'pvgrid-on-data-loaded', {from: from, to: to});
      //  this.onDataLoaded.notify({from: from, to: to});
      
      
      // let delta = (to - from );
      // if ( to + 2 * delta < this.data.length){
      //   return;
      //
      // }
      //
      // to += delta;
      // from += delta;
      return;
    }
    
    let url = this.url;
    if (this.h_request !== null)
    {
      clearTimeout(this.h_request);
    }
    
    
    let self = this;
    
    this.h_request = setTimeout(() =>
    {
      for (let i = fromPage; i <= toPage; i++)
        self.data[i * self.PAGESIZE] = null; // null indicates a 'requested but not available yet'
      
      // this.onDataLoading.notify({from: from, to: to});
      
      
      let CancelToken = axios.CancelToken;
      self.req = CancelToken.source();
      
      
      
      // http.post(url)
      axios.post(url
        , self.getSearchObj(from, to, self.searchstr, self.searchExact, self.cols, self.extraSearch,
            self.sortcol, self.sortdir)
        , {
        headers: {
          'Content-Type': 'application/json'
          , 'Accept': 'application/json'
        }
        , cancelToken: self.req.token
      }).then(self.onSuccessProxy).catch((thrown) =>
      {
        if (axios.isCancel(thrown))
        {
          console.log('Request canceled', thrown.message);
        }
        else
        {
          self.onError(thrown, fromPage, toPage);
        }
      });
  
  
      self.req.fromPage = fromPage;
      self.req.toPage = toPage;
    }, 50);
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
  
  onSuccessProxy = (resp) =>
  {
    this.errCounter = 0;
  
    this.onSuccess(resp);
  };
  
  onSuccess = (resp) =>
  {
    if (this.url === "/gateway/sandbox/pvgdpr_graph"){
      this.onSuccessRawQuery(resp);
    }
    else{
      this.onSuccessPVRestQuery(resp);
    }
    
  };
  
  onSuccessPVRestQuery = (resp) =>
  {
    // var from = resp.data.from, to = from + resp.results.length;
    // data.length = Math.min(parseInt(resp.hits),1000); // limitation of the API
    
    
    let from = resp.data.from, to = from + resp.data.records.length;
    this.data.length = Math.min(parseInt(resp.data.totalAvailable, 10), 1000000); // limitation of the API
    
    for (let i = 0; i < resp.data.records.length; i++)
    {
      let item = JSON.parse(resp.data.records[i]);
      
      // Old IE versions can't parse ISO dates, so change to universally-supported format.
      // item.create_ts = item.create_ts.replace(/^(\d+)-(\d+)-(\d+)T(\d+:\d+:\d+)Z$/, "$2/$3/$1 $4 UTC");
      // item.create_ts = new Date(item.create_ts);
      
      this.data[from + i] = item;
      this.data[from + i].index = item.id;
    }
    
    this.req = null;
  
    this.onDataLoadedCb({from: from, to: to});
  
    // this.props.glEventHub.emit(this.namespace + 'pvgrid-on-data-loaded', {from: from, to: to});
    
    // this.onDataLoaded.notify({from: from, to: to});
  };
  
  
  onSuccessRawQuery = (resp) =>
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
  
  
  
  reloadData = (from, to) =>
  {
    for (let i = from; i <= to; i++)
      delete this.data[i];
    
    this.ensureData(from, to);
  };
  
  setSort = (column, dir) =>
  {
    this.sortcol = column;
    this.sortdir = dir;
    this.clear();
  };
  setSearch = (str) =>
  {
    this.searchstr = str;
    this.clear();
    this.ensureData(0, this.PAGESIZE);
  };
  setSearchExact = (exact) =>
  {
    this.searchExact = exact;
    this.clear();
    this.ensureData(0, this.PAGESIZE);
  };
  
  setExtraSearch = (str) =>
  {
    this.extraSearch = str;
  }
  
  setColumns = (cols) =>
  {
    this.cols = cols;
    this.clear();
    this.ensureData(0, this.PAGESIZE);
    
  }
  
  
  onClick = (e, clickInfo) =>
  {
    
    // { row: number, cell: number }
    
    if (clickInfo)
    {
      var val = this.grid.getDataItem(clickInfo.row);
      // alert (val);
      this.props.glEventHub.emit(this.namespace + '-pvgrid-on-click-row', val);
      
    }
  }
  
  setColumnSettings = (colSettings) =>
  {
    
    this.grid.setColumns(colSettings);
    this.setColumns(colSettings);
  }
  
  
  componentWillUnmount()
  {
    // this.props.glEventHub.off(this.namespace + 'pvgrid-on-data-loaded', this.onDataLoadedCb);
    this.props.glEventHub.off(this.namespace + '-pvgrid-on-search-changed', this.setSearch);
    this.props.glEventHub.off(this.namespace + '-pvgrid-on-col-settings-changed', this.setColumnSettings);
    this.props.glEventHub.off(this.namespace + '-pvgrid-on-extra-search-changed', this.setExtraSearch);
    
  }
  
  
  onViewportChanged = (/*e, args*/) =>
  {
    let vp = this.grid.getViewport();
    this.ensureData(vp.top, vp.bottom);
    
  };
  onSort = (e, args) =>
  {
    this.setSort(args.sortCols[0].sortCol, args.sortCols[0].sortAsc ? 1 : -1);
    let vp = this.grid.getViewport();
    this.ensureData(vp.top, vp.bottom);
  };
  onDataLoadedCb = (args) =>
  {
    for (let i = args.from; i <= args.to; i++)
    {
      this.grid.invalidateRow(i);
    }
    this.grid.updateRowCount();
    this.grid.render();
  };
  
  setTotalRecords(totalRecords)
  {
    this.setState({totalRecords: totalRecords})
  }
  
  render()
  {
    // let eventHub = this.props.glEventHub;
    //
    
    
    return (
      <ResizeAware
        style={{width: '100%', height: 'calc(100% - 20px)'}}
        onResize={this.handleResize}
      >
        <Flex p={1} align='center' style={{width: '100%', height: '100%'}}
        >
          <Box px={1} w={1} style={{width: '100%', height: '100%'}}>
            
            
            <div
              style={{width: '100%', height: '100%'}}
              charSet="utf-8"
              className={"slickgrid-container"}
              ref={this.setGridDiv}
            />
          </Box>
        </Flex>
      </ResizeAware>
    );
    
    /*       return (
     <ul className="userlist">
     {this.state.users.map(function (user) {
     return <User
     key={user.name}
     userData={user}
     glEventHub={eventHub}/>
     })}
     </ul>
     )
     */
  }
}


export default PVGridEditable;
