import React from 'react';
import {Grid} from 'slickgrid-es6';


import "./slick.grid.css";
import "./slick-default-theme.css";
import ResizeAware from 'react-resize-aware';

import axios from "axios";
// import "slickgrid-es6/dist/slick-default-theme.less";
import {Flex, Box} from 'reflexbox'

// import { options, columns } from './grid-config';
class RemoteModel extends React.Component
{
  /***
   * A sample AJAX data store implementation.
   * Right now, it's hooked up to load Hackernews stories, but can
   * easily be extended to support any JSONP-compatible backend that accepts paging parameters.
   */
  // private
  
  constructor(props)
  {
    super(props);
    this.PAGESIZE = 50;
    this.data = {length: 0};
    this.searchstr = "";
    this.searchExact = true;
    this.sortcol = null;
    this.sortdir = 1;
    this.h_request = null;
    this.req = null; // ajax request
    this.url = props.url || "/gateway/sandbox/pvgdpr_server/home/records";
    this.namespace = "";
    
    // events
    // this.onDataLoading = new Event();
    // this.onDataLoaded = new Event();
    
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
  
  
  ensureData = (from, to) =>
  {
    if (this.req)
    {
      this.req.cancel();
      for (let i = this.req.fromPage; i <= this.req.toPage; i++)
        this.data[i * this.PAGESIZE] = undefined;
    }
    
    if (from < 0)
    {
      from = 0;
    }
    
    if (this.data.length > 0)
    {
      to = Math.min(to, this.data.length - 1);
    }
    
    let fromPage = Math.floor(from / this.PAGESIZE);
    let toPage = Math.floor(to / this.PAGESIZE);
    
    while (this.data[fromPage * this.PAGESIZE] !== undefined && fromPage < toPage)
      fromPage++;
    
    while (this.data[toPage * this.PAGESIZE] !== undefined && fromPage < toPage)
      toPage--;
    
    if (fromPage > toPage || ((fromPage === toPage) && this.data[fromPage * this.PAGESIZE] !== undefined && this.data[fromPage * this.PAGESIZE] !== null))
    {
      // TODO:  look-ahead
      
      this.props.glEventHub.emit(this.namespace + 'pvgrid-on-data-loaded', {from: from, to: to});
      //  this.onDataLoaded.notify({from: from, to: to});
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
      
      let from = (fromPage * self.PAGESIZE);
      let to = from + (((toPage - fromPage) * self.PAGESIZE) + self.PAGESIZE);
      
      
      // http.post(url)
      axios.post(url, {
        
        search: {
          searchStr: self.searchstr, searchExact: self.searchExact, cols: this.cols, extraSearch: this.extraSearch
        },
        from: from,
        to: to,
        sortBy: self.sortcol,
        sortDir: ((self.sortdir > 0) ? "+asc" : "+desc")
      }, {
        headers: {
          'Content-Type': 'application/json'
          , 'Accept': 'application/json'
        }
        , cancelToken: self.req.token
      }).then(this.onSuccess).catch((thrown) =>
      {
        if (axios.isCancel(thrown))
        {
          console.log('Request canceled', thrown.message);
        }
        else
        {
          this.onError(thrown, fromPage, toPage);
        }
      });


      this.req.fromPage = fromPage;
      this.req.toPage = toPage;
    }, 50);
  };
  onError = (err, fromPage, toPage) =>
  {
    alert("error loading pages " + fromPage + " to " + toPage + ":" + err);
  };
  
  onSuccess = (resp) =>
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
    this.props.glEventHub.emit(this.namespace +'pvgrid-on-data-loaded', {from: from, to: to});
    
    // this.onDataLoaded.notify({from: from, to: to});
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
  
}

class PVGrid extends React.Component
{
  constructor(props)
  {
    
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    
    this.state = {
      columnSettings: []
      , totalRecords: 0
    }
    
    if (!this.props.settings)
    {
      this.settings = {
        multiColumnSort: true,
        defaultColumnWidth: 125,
        rowHeight: 26
      };
    }
    else
    {
      this.settings = this.props.settings;
      
    }
    
    
    // if (!this.props.url){
    //   let err = "Must set the url property control where this component sends its requests";
    //   throw (err);
    // }
    
    // this.props.columnSettings = [
    //   {id: "name", name: "Name", field: "name", sortable: true},
    //
    //   {id: "street", name: "Street", field: "street", sortable: true}
    // ];
    this.loader = new RemoteModel(this.props);
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
    /* you can pass config as prop, or use a predefined one */
    if (this.gridDiv && this.state)
    {
      this.grid = new Grid(this.gridDiv, this.loader.data, this.state.columnSettings, this.settings);
      
      this.grid.onClick.subscribe(this.onClick); //({ row: number, cell: number })
      
      this.grid.onViewportChanged.subscribe(this.onViewportChanged);
      this.grid.onSort.subscribe(this.onSort);
      this.props.glEventHub.on(this.namespace +'pvgrid-on-data-loaded', this.onDataLoadedCb);
      this.props.glEventHub.on(this.namespace +'pvgrid-on-search-changed', this.setSearch);
      this.props.glEventHub.on(this.namespace +'pvgrid-on-search-exact-changed', this.setSearchExact);
      this.props.glEventHub.on(this.namespace +'pvgrid-on-col-settings-changed', this.setColumnSettings);
      this.props.glEventHub.on(this.namespace +'pvgrid-on-extra-search-changed', this.setExtraSearch);
      
      // this.loader.onDataLoaded.subscribe(this.onDataLoadedCb);
  
  
      // if (this.props.colSettings !== null){
      //   this.setColumnSettings(this.props.colSettings)
      // }
      this.grid.resizeCanvas();
      
      this.onViewportChanged();
      
      
  
    }
  
  
  
  }
  
  onClick = (e, clickInfo) =>
  {
    
    // { row: number, cell: number }
    
    if (clickInfo)
    {
      var val = this.grid.getDataItem(clickInfo.row);
      // alert (val);
      this.props.glEventHub.emit(this.namespace + 'pvgrid-on-click-row', val);
  
    }
  }
  
  setColumnSettings = (colSettings) =>
  {
    
    this.grid.setColumns(colSettings);
    this.loader.setColumns(colSettings);
  }
  
  setSearch = (search) =>
  {
    this.loader.setSearch(search);
    
  }
  setSearchExact = (search) =>
  {
    this.loader.setSearchExact(search);
    
  }
  setExtraSearch = (extraSearch) =>
  {
    this.loader.setExtraSearch(extraSearch);
  }
  
  componentWillUnmount()
  {
    this.props.glEventHub.off(this.namespace +'pvgrid-on-data-loaded', this.onDataLoadedCb);
    this.props.glEventHub.off(this.namespace +'pvgrid-on-search-changed', this.setSearch);
    this.props.glEventHub.off(this.namespace +'pvgrid-on-col-settings-changed', this.setColumnSettings);
    this.props.glEventHub.off(this.namespace +'pvgrid-on-extra-search-changed', this.setExtraSearch);
    
  }
  
  
  onViewportChanged = (/*e, args*/) =>
  {
    let vp = this.grid.getViewport();
    this.loader.ensureData(vp.top, vp.bottom);
    
  };
  onSort = (e, args) =>
  {
    this.loader.setSort(args.sortCols[0].sortCol, args.sortCols[0].sortAsc ? 1 : -1);
    let vp = this.grid.getViewport();
    this.loader.ensureData(vp.top, vp.bottom);
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


export default PVGrid;
