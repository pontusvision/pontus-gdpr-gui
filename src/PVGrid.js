import React from 'react';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import ResizeAware from 'react-resize-aware';
import axios from "axios";
import {Box, Flex} from 'reflexbox'
import PontusComponent from "./PontusComponent";
import {scaleDown2 as Menu} from './PVBurgerMenu';
import PVGridColSelector from "./PVGridColSelector";


class PVGrid extends PontusComponent
{
  constructor(props)
  {
    
    super(props);
    this.namespace = this.props.namespace || "";
    this.subNamespace = this.props.subNamespace || "";
    this.mountedSuccess = false;
    
    this.customFilter = this.props.customFilter;
    
    
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    this.errCounter = 0;
    this.errCounterAddRow = 0;
    this.errCounterChangeCell = 0;
    this.PAGESIZE = 300;
    this.data = [];
    this.searchstr = "";
    this.searchExact = true;
    this.sortcol = null;
    this.sortdir = "+desc";
    this.h_request = null;
    this.req = null; // ajax request
    this.url = PontusComponent.getRestUrlAg(props);
    
    this.extraSearch = [];
    
    
    this.dataType = this.getDataType(props);
    
    this.settings = {...this.props.settings};
    this.colFieldTranslation = {};
    
    
    // this.setColumnSettings(this.getColSettings(props));
    
    this.state = {
      ...this.props,
      totalRecords: 0,
      columnDefs: this.getColSettings(props),
      defaultColDef: {
        editable: false,
        enableRowGroup: false,
        enablePivot: false,
        // enableValue: false,
        sortable: false,
        resizable: true,
        filter: false
      },
      // components: {
      //   loadingRenderer: function(params) {
      //     if (params.value !== undefined) {
      //       return params.value;
      //     } else {
      //       return '<img src="/images/loading.gif">';
      //     }
      //   }
      // },
      // rowBuffer: 100,
      rowModelType: "infinite",
      // fetch 100 rows per at a time
      // cacheBlockSize: 100,
      
      // only keep 10 blocks of rows
      // maxBlocksInCache: 10,
      
      paginationPageSize: 50,
      // cacheOverflowSize: 2,
      maxConcurrentDatasourceRequests: 1,
      // infiniteInitialRowCount: 1000,
      // maxBlocksInCache: 100,
      rowSelection: "single",
      // rowGroupPanelShow: "always",
      // pivotPanelShow: "always",
      
      paginationNumberFormatter: function (params)
      {
        return "[" + params.value.toLocaleString() + "]";
      },
      
      localeTextFunc: function (key, defaultValue)
      {
        
        // to avoid key clash with external keys, we add 'grid' to the start of each key.
        let gridKey = 'grid_' + key;
        
        // look the value up. here we use the AngularJS 1.x $filter service, however you
        // can use whatever service you want, AngularJS 1.x or otherwise.
        let value = PontusComponent.t(gridKey);
        return value === gridKey ? defaultValue : value;
      }
      
      
    };
    
    
  }
  
  getColSettings = (props) =>
  {
    let colSettings = localStorage.getItem(`${this.namespace}${this.subNamespace ? this.subNamespace : ""}.PVGrid.colSettings`);
    
    if (colSettings)
    {
      if (typeof colSettings === "string")
      {
        colSettings = JSON.parse(colSettings);
      }
    }
    else
    {
      colSettings = (props.colSettings ? props.colSettings : []);
    }
    this.setColumnSettings(colSettings);
    
    return colSettings;
  }
  
  
  getDataType = (props) =>
  {
    let dataType = localStorage.getItem(`${this.namespace}${this.subNamespace ? this.subNamespace : ""}.PVGrid.dataType`);
    // let dataType = JSON.parse();
    if (!dataType)
    {
      dataType = (props.dataType ? props.dataType : "");
    }
    this.setDataType(dataType);
    
    return dataType;
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
  
  
  componentDidMount = () =>
  {
    this.mountedSuccess = true;
    this.props.glEventHub.on(`${this.namespace}${this.subNamespace ? this.subNamespace : ""}-pvgrid-on-search-changed`, this.setSearch);
    this.props.glEventHub.on(`${this.namespace}${this.subNamespace ? this.subNamespace : ""}-pvgrid-on-search-exact-changed`, this.setSearchExact);
    this.props.glEventHub.on(`${this.namespace}${this.subNamespace ? this.subNamespace : ""}-pvgrid-on-col-settings-changed`, this.setColumnSettings);
    this.props.glEventHub.on(`${this.namespace}${this.subNamespace ? this.subNamespace : ""}-pvgrid-on-extra-search-changed`, this.setExtraSearch);
    
    
  }
  
  
  getSearchObj = (from, to, searchstr, searchExact, cols, dataType, sortcol, sortdir, filters, customFilter) =>
  {
    return {
      search: {
        searchStr: searchstr, searchExact: searchExact, cols: cols, extraSearch: {label: dataType, value: dataType}
      },
      customFilter: customFilter,
      cols: cols,
      filters: filters,
      dataType: dataType,
      from: from,
      to: to,
      sortCol: sortcol,
      sortDir: sortdir // ((sortdir > 0) ? "+asc" : "+desc")
    }
  };
  getColsFromDataType = () =>
  {
    if (this.req2)
    {
      this.req2.cancel();
      
    }
    
    let url = PontusComponent.getRestNodePropertyNamesURL(this.props);
    if (this.h_request2 !== null)
    {
      clearTimeout(this.h_request2);
    }
    
    let self = this;
    let jsonRequest = {labels: this.dataType};
    
    this.h_request2 = setTimeout(() =>
    {
      self.req2 = axios.CancelToken.source();
      axios.post(url, jsonRequest,
        {
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
          , cancelToken: self.req2.token
        }).then(
        (response) =>
        {
          // this.reactSelect.options = response.data.labels || [];
          if (response.data && response.data.labels)
          {
            for (let i = 0; i < response.data.labels.length; i++)
            {
              let lbl = response.data.labels[i];
              lbl.label = PontusComponent.t(lbl.label);
            }
            this.setState({
              options: response.data.labels
            });
            
            
          }
          
          // callback(null, {
          //   options: response.data.labels || [],
          //   complete: true
          //
          // });
        }
      ).catch((thrown) =>
      {
        if (axios.isCancel(thrown))
        {
          console.log('Request canceled', thrown.message);
        }
        else
        {
          this.onError(thrown);
        }
      });
    }, 50);
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
    let fromPage = Math.floor(fromReq / this.PAGESIZE);
    let toPage = Math.floor(toReq / this.PAGESIZE);
    
    let url = this.url;
    if (this.h_request !== null)
    {
      clearTimeout(this.h_request);
    }
    
    
    let self = this;
    
    this.h_request = setTimeout(() =>
    {
      self.req = axios.CancelToken.source();
      axios.post(url
        , self.getSearchObj(fromReq, toReq, self.searchstr, self.searchExact, self.cols, self.dataType,
          self.sortcol, self.sortdir, self.filters, self.customFilter)
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
    
    this.onSuccessPVRestQuery(resp);
  };
  
  
  onSuccessPVRestQuery = (resp) =>
  {
    
    let from = resp.data.from, to = from + resp.data.records.length;
    let items = [];
    
    for (let i = 0; i < resp.data.records.length; i++)
    {
      let item = JSON.parse(resp.data.records[i]);
      for (let itemKey of Object.keys(item))
      {
        let val = item[itemKey];
        // LPPM - need to get rid of any dots in the value.
        let itemKeyClean = itemKey.replace(/\./g, '_');
        item[itemKeyClean] = val;
      }
      items[i] = item;
    }
    
    this.req = null;
    if (this.getRowsParams)
    {

      if (to > from){
        this.getRowsParams.successCallback(items, resp.data.totalAvailable);
  
      }
      else if (to == 0){
        this.getRowsParams.successCallback(items, 0);
  
      }
      else{
        this.getRowsParams.successCallback(items);
  
      }
    }
    
  };
  
  
  setSearch = (str) =>
  {
    this.searchstr = str;
    this.ensureData(0, this.PAGESIZE);
  };
  setSearchExact = (exact) =>
  {
    this.searchExact = exact;
    this.ensureData(0, this.PAGESIZE);
  };
  
  setDataType = (str) =>
  {
    this.dataType = str;
    localStorage.setItem(`${this.namespace}${this.subNamespace ? this.subNamespace : ""}.PVGrid.dataType`, (this.dataType));
  };
  
  setExtraSearch = (str) =>
  {
    this.extraSearch = str;
    if (str && str.value)
    {
      this.setDataType(str.value);
    }
  };
  
  setColumns = (cols) =>
  {
    // this.state.columnDefs = cols;
    if (this.mountedSuccess)
    {
      this.setState({columnDefs: cols});
      this.cols = cols;
      this.ensureData(0, this.PAGESIZE);
    }
  };
  
  setCustomFilter = (customFilter) =>
  {
    this.customFilter = customFilter;
    this.ensureData(0, this.PAGESIZE);
    
  };
  
  onClick = (
    {
      node, // the RowNode for the row in question
      data, // the user provided data for the row in question
      rowIndex, // the visible row index for the row in question
      rowPinned, // either 'top', 'bottom' or undefined / null (if not pinned)
      context, // bag of attributes, provided by user, see Context
      event // if even was due to browser event (eg click), then this is browser event
    }
  ) =>
  {
    
    // { row: number, cell: number }
    
    if (data)
    {
      // let val = this.grid.getDataItem(clickInfo.row);
      // alert (val);
      this.props.glEventHub.emit(this.namespace + '-pvgrid-on-click-row', data);
    }
  };
  
  setColumnSettings = (colSettings) =>
  {
    this.colFieldTranslation = {};
    
    if (colSettings)
    {
      localStorage.setItem(`${this.namespace}${this.subNamespace ? this.subNamespace : ""}.PVGrid.colSettings`, JSON.stringify(colSettings));
      
      
      for (let i = 0; i < colSettings.length; i++)
      {
        let colSetting = colSettings[i];
        colSetting.headerName = PontusComponent.t(colSetting.name);
        let origField = colSetting.field;
        // If the column starts with a #, it's indexed, and we can sort/filter;
        // otherwise, we can't.
        if (origField.startsWith('#'))
        {
          colSetting.sortable = true;
          const isDate = (origField.toLowerCase().search(/date/) >= 0);
          if (isDate)
          {
            colSetting.filter = "agDateColumnFilter";
            colSetting.valueFormatter = (param) =>
            {
            
            }
            
          }
          else
          {
            colSetting.filter = true;
          }
          origField = origField.toString().substring(1);
        }
        else
        {
          colSetting.sortable = false;
          colSetting.filter = false;
          
        }
        colSetting.field = origField.replace(/\./g, '_');
        colSetting.id = origField;
        
        this.colFieldTranslation[colSetting.field] = origField;
      }
      
      this.setColumns(colSettings);
      this.cols = colSettings;
      
    }
    
  };
  
  
  componentWillUnmount = () =>
  {
    
    // this.props.glEventHub.off(this.namespace + '-pvgrid-on-search-changed', this.setSearch);
    // this.props.glEventHub.off(this.namespace + '-pvgrid-on-col-settings-changed', this.setColumnSettings);
    // this.props.glEventHub.off(this.namespace + '-pvgrid-on-extra-search-changed', this.setExtraSearch);
    
    this.props.glEventHub.off(`${this.namespace}${this.subNamespace ? this.subNamespace : ""}-pvgrid-on-search-changed`, this.setSearch);
    this.props.glEventHub.off(`${this.namespace}${this.subNamespace ? this.subNamespace : ""}-pvgrid-on-search-exact-changed`, this.setSearchExact);
    this.props.glEventHub.off(`${this.namespace}${this.subNamespace ? this.subNamespace : ""}-pvgrid-on-col-settings-changed`, this.setColumnSettings);
    this.props.glEventHub.off(`${this.namespace}${this.subNamespace ? this.subNamespace : ""}-pvgrid-on-extra-search-changed`, this.setExtraSearch);
    
  };
  
  
  onViewportChanged = (/*e, args*/) =>
  {
    // let vp = this.grid.getViewport();
    // this.ensureData(vp.top, vp.bottom);
    
  };
  
  
  // onDataLoadedCb = (args) =>
  // {
  //   if (this.getRowsParams)
  //   {
  //     this.getRowsParams.successCallback(args.data, args.to);
  //   }
  //
  // };
  
  setTotalRecords(totalRecords)
  {
    this.setState({totalRecords: totalRecords})
  }
  
  dataSource = {
    rowCount: null,
    getRows: (params) =>
    {
      console.log("asking for " + params.startRow + " to " + params.endRow);
      this.getRowsParams = params;
      
      //  {colId: "Object_Notification_Templates_Types_1", sort: "desc"}
      // params.sortModel
      if (params.sortModel && params.sortModel.length > 0)
      {
        this.sortcol = params.sortModel[0].colId.replace(/_1$/, '');
        this.sortcol = this.colFieldTranslation[this.sortcol];
        this.sortdir = `+${params.sortModel[0].sort}`;
        
      }
      
      if (params.filterModel)
      {
        
        this.filters = [];
        
        for (let fm of Object.keys(params.filterModel))
        {
          
          let colId = fm.replace(/_1$/g, '');
          colId = this.colFieldTranslation[colId];
          
          let csJson = params.filterModel[fm];
          
          let colSearch = {
            colId: colId,
            ...csJson
          };
          
          this.filters.push(colSearch);
          
          
          /* when we have simple filters, the following format is used:
           [
           { colId: "Object_Notification_Templates_Label", filterType: "text", type: "contains", filter: "adfasdf"},
           { colId: "Object_Notification_Templates_Types", filterType: "text", type: "contains", filter: "aaa"}
           ]
           */
          
          //            OR
          /*
           When we have complex filters, the following format is used:
           [
           {
           colId: "Object_Notification_Templates_Label",
           condition1: {filterType: "text", type: "notContains", filter: "ddd"},
           condition2: {filterType: "text", type: "endsWith", filter: "aaaa"},
           filterType: "text",
           operator: "OR"
           },
           {
           colId: "Object_Notification_Templates_Types:{
           condition1: {filterType: "text", type: "notContains", filter: "aaaa"},
           condition2: {filterType: "text", type: "startsWith", filter: "bbbb"},
           filterType: "text",
           operator: "AND"
           }
           ]
           */
          
          
        }
      }
      // (sortdir > 0) ? "+asc" : "+desc"
      // this.ensureData(params.startRow, params.endRow);
      this.ensureData(params.startRow, params.endRow);
      
    }
  };
  
  
  onGridReady = (params) =>
  {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
  };
  
  
  render = () =>
  {
    // let eventHub = this.props.glEventHub;
    //
    let menu = null;
    if(!this.state.hideMenu){
      menu = <Menu noOverlay style={{position: "absolute", right: "10px"}} pageWrapId={"outer-wrap"} right
                   outerContainerId={"outer-wrap"}>
        <PVGridColSelector glEventHub={this.props.glEventHub} style={{height: '100%', width: '100%'}}
                           namespace={`${this.namespace}${this.subNamespace ? this.subNamespace : ""}`}
                           colSettings={this.state.columnDefs}
                           dataType={this.dataType}/>

      </Menu>;
      
    }
    else
    {
      menu = <div/>;
    }
    
    
    return (
      <ResizeAware
        style={{width: '100%', height: 'calc(100% - 20px)'}}
        onResize={this.handleResize}
      >
        <Flex p={1} align='center' style={{width: '100%', height: '100%'}}
        >
          <Box px={1} w={1} style={{width: '100%', height: '100%'}}>
            
            {menu}
            
            
            <div
              style={{width: '100%', height: '100%'}}
              charSet="utf-8"
              className={"ag-theme-balham-dark"}
              id={"outer-wrap"}
              // ref={this.setGridDiv}>
            >
              <AgGridReact
                columnDefs={this.state.columnDefs}
                autoGroupColumnDef={this.state.autoGroupColumnDef}
                defaultColDef={this.state.defaultColDef}
                suppressRowClickSelection={true}
                groupSelectsChildren={true}
                debug={true}
                rowSelection={this.state.rowSelection}
                rowGroupPanelShow={this.state.rowGroupPanelShow}
                pivotPanelShow={this.state.pivotPanelShow}
                enableRangeSelection={false}
                // pagination={true}
                // paginationPageSize={this.state.paginationPageSize}
                paginationNumberFormatter={this.state.paginationNumberFormatter}
                localeTextFunc={this.state.localeTextFunc}
                onGridReady={this.onGridReady}
                rowData={this.state.rowData}
                datasource={this.dataSource}
                onRowClicked={this.onClick}
                
                components={this.state.components}
                // rowBuffer={this.state.rowBuffer}
                rowDeselection={true}
                rowModelType={this.state.rowModelType}
                // cacheOverflowSize={this.state.cacheOverflowSize}
                // maxConcurrentDatasourceRequests={this.state.maxConcurrentDatasourceRequests}
                // infiniteInitialRowCount={this.state.infiniteInitialRowCount}
                // maxBlocksInCache={this.state.maxBlocksInCache}
                
                // paginationPageSize={100}
                cacheOverflowSize={2}
                maxConcurrentDatasourceRequests={2}
                infiniteInitialRowCount={1}
                maxBlocksInCache={2}
                pagination={true}
                paginationAutoPageSize={true}
                getRowNodeId={(item) =>
                {
                  return item.id;
                }}
              
              
              >
              
              </AgGridReact>
            
            </div>
          
          
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
