import React from 'react';
import {Grid} from 'slickgrid-es6';


import "./slick.grid.css";
import "./slick-default-theme.css";
import ResizeAware from 'react-resize-aware';

import axios from "axios";
// import "slickgrid-es6/dist/slick-default-theme.less";
import {Flex, Box} from 'reflexbox'
import PontusComponent from "./PontusComponent";


class PVGridSelfDiscovery extends PontusComponent
{
  constructor(props)
  {
    
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    
    if (props.vid === null){
      throw new Error("Must have a vertex id (vid) property to use this widget");
    }
    
    if (props.metadataType === null){
      throw new Error("Must have a metadataType so we can query the graph ");
    }
    
    if (props.namespace === null){
      throw new Error("Must have a namespace so this grid can receive events from peer windows");
    }
    
    if (props.edgeType === null ){
      throw new Error("Must have an edgeType so we can query the graph ");
    }
  
    if (props.edgeDir === null){
      throw new Error("Must have an edgeDir so we can query the graph");
    }
  
    this.edgeDir = props.edgeDir;
    this.extraSearch = props.metadataType;
    this.edgeType = props.edgeType;
    this.vid = props.vid;
    this.setNamespace(props.namespace);
    
  
    this.errCounter = 0;
    this.errCounterAddRow = 0;
    this.errCounterChangeCell = 0;
    
    this.state = {
      columnSettings: []
      , totalRecords: 0
    };
    
    if (!this.props.settings)
    {
      this.settings = {
        multiColumnSort: true,
        defaultColumnWidth: 200,
        rowHeight: 26
        // ,forceFitColumns: false
        // ,autosizeColumns: true
      };
    }
    else
    {
      this.settings = this.props.settings;
      
    }
    
    
    this.PAGESIZE = 300;
    this.data = [];
    this.searchstr = "";
    this.searchExact = true;
    this.sortcol = null;
    this.sortdir = 1;
    this.h_request = null;
    this.req = null; // ajax request
    this.url = PontusComponent.getGraphURL(this.props);
    
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
  };
  
  onNewRowAdded = (e, args) =>
  {
    let item = args.item;
    // let column = args.column;
    
    
    
    this.grid.invalidateRow(this.data.length);
    this.data.push(item);
    this.grid.updateRowCount();
    this.grid.render();
  };
  
  onCellChanged = (e, args) =>
  {
    // let item = args;
    // let column = args.column;
    //
    //
    //
    // this.grid.invalidateRow(this.data.length);
    // this.data.push(item);
    // this.grid.updateRowCount();
    // this.grid.render();
  };
  
  
  componentDidMount()
  {
    /* you can pass config as prop, or use a predefined one */
    if (this.gridDiv && this.state)
    {
      this.grid = new Grid(this.gridDiv, this.data, this.state.columnSettings, this.settings);
      
      
      // this.props.glEventHub.on(this.namespace + 'pvgrid-on-data-loaded', this.onDataLoadedCb);
      this.props.glEventHub.on(this.namespace + '-pvgrid-on-search-changed', this.setSearch);
      this.props.glEventHub.on(this.namespace + '-pvgrid-on-search-exact-changed', this.setSearchExact);
      this.props.glEventHub.on(this.namespace + '-pvgrid-on-col-settings-changed', this.setColumnSettings);
      this.props.glEventHub.on(this.namespace + '-pvgrid-on-extra-search-changed', this.setExtraSearch);
      
      // this.loader.onDataLoaded.subscribe(this.onDataLoadedCb);
      this.grid.onClick.subscribe(this.onClick); //({ row: number, cell: number })
      this.grid.onViewportChanged.subscribe(this.onViewportChanged);
      this.grid.onSort.subscribe(this.onSort);
      this.grid.onAddNewRow.subscribe(this.onNewRowAdded);
      this.grid.onCellChange.subscribe(this.onCellChanged);
      
  
      
      // if (this.props.colSettings !== null){
      //   this.setColumnSettings(this.props.colSettings)
      // }
      this.grid.resizeCanvas();
      
      this.onViewportChanged();
      
      
    }
    
    
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
    this.from = from;
    this.to = to;
    
    let queryDir = (this.edgeDir === '<-')? "  .inE(pg_edgeType).outV()\n" : "  .outE(pg_edgeType).inV()";
    return ({
      bindings: {
        pg_vid: this.vid
        , pg_from: from
        , pg_to: to + 2 // add a few extra in the request so we can check if there are more items (in onSuccess)
        , pg_orderCol: sortcol === null ? null : sortcol.id
        , pg_orderDir: sortdir
        , pg_type: extraSearch
        , pg_edgeType: this.edgeType
      },
      gremlin: "HashSet headers = new HashSet<>();\n" +
      "StringBuffer sb = new StringBuffer();\n" +
      "\n" +
      "long topCounter = 0;\n" +
      "sb.append('{ \"data\":[');\n" +
      "\n" +
      "\n" +
      "gridData = g.V(pg_vid)\n" +
      queryDir+
      "  .has('Metadata.Type.'+pg_type ,eq(pg_type))\n" +
      "  .order()\n" +
      "  .by(pg_orderCol == null ? id :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)\n" +
      "  .range(pg_from,pg_to)\n" +
      "  .match(\n" +
      "       __.as('data').id().as('id')\n" +
      "     , __.as('data').valueMap().as('valueMap')\n" +
      "  )\n" +
      "  .select('id', 'valueMap')\n" +
      "  .each{ it ->\n" +
      "    if (topCounter > 0){\n" +
      "      sb.append(',');\n" +
      "    }\n" +
      "    topCounter++;\n" +
      "    sb.append ('{ \"index\":\"').append(it.get('id')).append('\"')\n" +
      "    \n" +
      "    it.get('valueMap').each{ key, val ->\n" +
      "      if (\"Event.Ingestion.Business_Rules\" != key){\n" +
      "        sb.append(', \"').append(key).append('\":');\n" +
      "        headers.add(key);\n" +
      "        if (val.size() == 1){\n" +
      "          def rawVal = val[0];\n" +
      "          if (rawVal instanceof String || rawVal instanceof Date)\n" +
      "          {\n" +
      "            sb.append('\"').append(rawVal.toString().replaceAll('[\"]',\"'\")).append('\"');\n" +
      "          }\n" +
      "          else\n" +
      "          {\n" +
      "            sb.append(rawVal);\n" +
      "          }\n" +
      "  \n" +
      "        }\n" +
      "        else{\n" +
      "          sb.append('[')\n" +
      "          int counter = 0;\n" +
      "          val.each { rawVal ->\n" +
      "            if (counter > 0){\n" +
      "              sb.append(',');\n" +
      "            }\n" +
      "            counter ++;\n" +
      "            if (rawVal instanceof String || rawVal instanceof Date)\n" +
      "            {\n" +
      "              sb.append('\"').append(rawVal.toString().replaceAll('[\"]',\"'\")).append('\"');\n" +
      "            }\n" +
      "            else\n" +
      "            {\n" +
      "              sb.append(rawVal);\n" +
      "    \n" +
      "            }\n" +
      "          \n" +
      "            \n" +
      "          }\n" +
      "          sb.append(']')\n" +
      "  \n" +
      "        }\n" +
      "        \n" +
      "        \n" +
      "        \n" +
      "      }\n" +
      "   }\n " +
      "   sb.append('}')\n" +
      "    \n" +
      "  }\n" +
      "  \n" +
      "\n" +
      "topCounter = 0;\n" +
      "sb.append('],  \"cols\":[');\n" +
      "headers.each{ it ->\n" +
      "  if (topCounter > 0){\n" +
      "    sb.append(',');\n" +
      "  }\n" +
      "  topCounter ++;\n" +
      "  sb.append('{ \"id\":\"').append(it).append ('\"')\n" +
      "    .append(', \"name\":\"')\n" +
      "    .append(it.replace('Metadata.', '').replace(pg_type +'.','').replaceAll('[_.]', ' ')   )\n" +
      "    .append ('\"')\n" +
      "    .append(', \"field\":\"').append(it).append ('\"}')\n" +
      "}\n" +
      "sb.append('] }');\n" +
      "     \n" +
      "sb.toString()"
    
    
    });
  };
  
  ensureData = (fromReq, toReq) =>
  {
    if (undefined === (fromReq) || undefined === toReq)
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
    else {
      this.props.glEventHub.emit(this.namespace + '-pvgrid-on-data-loaded', null);
    }
    
  };
  
  onSuccessProxy = (resp) =>
  {
    this.errCounter = 0;
    
    this.onSuccess(resp);
  };
  
  onSuccess = (resp) =>
  {
    if (this.url === PontusComponent.getGraphURL(this.props))
    {
      this.onSuccessRawQuery(resp);
    }
    else
    {
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
        let items = JSON.parse(respParsed.data.result.data['@value']);
        this.setColumnSettings(items.cols);
  
  
        for (let i = 0, ilen = items.data.length; i < ilen; i++)
        {
          // let vals = items[i]['@value'];
          // let itemParsed = {};
          //
          // for (let j = 0, jlen = vals.length; j < jlen; j += 2)
          // {
          //   let key = vals[j];
          //   let val = vals[j + 1];
          //   if (val instanceof Object)
          //   {
          //     if (key === ("event_id"))
          //     {
          //       itemParsed['index'] = val['@value'];
          //     }
          //     else
          //     {
          //       if (val['@type'] === 'g:Date')
          //       {
          //         itemParsed[key] = new Date(val['@value']);
          //
          //       }
          //       else
          //       {
          //         itemParsed[key] = val['@value'];
          //
          //       }
          //     }
          //   }
          //   else
          //   {
          //     itemParsed[key] = val;
          //   }
          // }
          // itemsParsed[i] = (itemParsed);
          this.data[this.from + i] = items.data[i];
          
        }
        this.data.length = Math.min(items.data.length + this.from, this.to); // limitation of the API
  
      }
      
      
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
      this.props.glEventHub.emit(this.namespace + '-pvgrid-on-data-loaded', null);
    }
    
    
  };
  
  addNewRow = (req) =>
  {
    if (undefined === (req))
    {
      return;
    }
    
    
    let url = this.url;
    if (this.h_request_save !== null)
    {
      clearTimeout(this.h_request_save);
    }
    
    
    let self = this;
    
    this.h_request_save = setTimeout(() =>
    {
      
      let CancelToken = axios.CancelToken;
      self.req = CancelToken.source();
      
      
      // http.post(url)
      axios.post(url
        , self.getAddRowQuery(req)
        , {
          headers: {
            'Content-Type': 'application/json'
            , 'Accept': 'application/json'
          }
          , cancelToken: self.req.token
        }).then(self.onSuccessAddRowProxy).catch((thrown) =>
      {
        if (axios.isCancel(thrown))
        {
          console.log('Request canceled', thrown.message);
        }
        else
        {
          self.onErrorAddRow(thrown, req);
        }
      });
      
    }, 50);
  };
  
  onSuccessAddRowProxy = (req) =>{

  };
  onErrorAddRow = (thrown, req) =>{

  };
  
  getAddRowQuery = (req) => {
  
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
  };
  
  setColumns = (cols) =>
  {
    this.cols = cols;
    this.clear();
    // this.ensureData(0, this.PAGESIZE);
    
  };
  
  
  onClick = (e, clickInfo) =>
  {
    
    // { row: number, cell: number }
    
    if (clickInfo)
    {
      let val = this.grid.getDataItem(clickInfo.row);
      // alert (val);
      this.props.glEventHub.emit(this.namespace + '-pvgrid-on-click-row', val);
      
    }
  };
  
  setColumnSettings = (colSettings) =>
  {

    if (this.cols !== colSettings){
      this.grid.setColumns(colSettings);
      this.setColumns(colSettings);
    }

  };
  
  
  componentWillUnmount()
  {
    // // this.props.glEventHub.off(this.namespace + 'pvgrid-on-data-loaded', this.onDataLoadedCb);
    // this.props.glEventHub.off(this.namespace + '-pvgrid-on-search-changed', this.setSearch);
    // this.props.glEventHub.off(this.namespace + '-pvgrid-on-col-settings-changed', this.setColumnSettings);
    // this.props.glEventHub.off(this.namespace + '-pvgrid-on-extra-search-changed', this.setExtraSearch);
  
    this.props.glEventHub.off(this.namespace + '-pvgrid-on-search-changed', this.setSearch);
    this.props.glEventHub.off(this.namespace + '-pvgrid-on-search-exact-changed', this.setSearchExact);
    this.props.glEventHub.off(this.namespace + '-pvgrid-on-col-settings-changed', this.setColumnSettings);
    this.props.glEventHub.off(this.namespace + '-pvgrid-on-extra-search-changed', this.setExtraSearch);
  
    // this.loader.onDataLoaded.subscribe(this.onDataLoadedCb);
    this.grid.onClick.unsubscribe(this.onClick); //({ row: number, cell: number })
    this.grid.onViewportChanged.unsubscribe(this.onViewportChanged);
    this.grid.onSort.unsubscribe(this.onSort);
    this.grid.onAddNewRow.unsubscribe(this.onNewRowAdded);
    this.grid.onCellChange.unsubscribe(this.onCellChanged);
  
  
  
  
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
    this.props.glEventHub.emit(this.namespace + '-pvgrid-on-data-loaded', args);
  
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


export default PVGridSelfDiscovery;
