import React from 'react';

import Datamap from './PVDatamaps';

import ResizeAware from 'react-resize-aware';

import * as Countries from  'i18n-iso-countries' ;

import axios from "axios";
// import "slickgrid-es6/dist/slick-default-theme.less";
import {Flex, Box} from 'reflexbox'


class PVWorldMap extends React.Component
{
  // constructor(props)
  // {
  //   super(props);
  //
  //
  //
  // }
  
  
  
  
  handleResize = () =>
  {
    if (this.obj)
    {
      this.obj.resizeMap();
    }
  };
  
  
  componentDidMount()
  {
    // this.props.glEventHub.on('pvgrid-on-data-loaded', this.onDataLoadedCb);
    this.props.glEventHub.on('pvgrid-on-search-changed', this.searchDataByCountry);
    // this.props.glEventHub.on('pvgrid-on-search-exact-changed', this.setSearchExact);
    // this.props.glEventHub.on('pvgrid-on-col-settings-changed', this.setColumnSettings);
    // this.props.glEventHub.on('pvgrid-on-extra-search-changed', this.setExtraSearch);
  
  }
  
  
  componentWillUnmount()
  {
    // this.props.glEventHub.off('pvgrid-on-data-loaded', this.onDataLoadedCb);
    this.props.glEventHub.off('pvgrid-on-search-changed', this.searchDataByCountry);
    // this.props.glEventHub.off('pvgrid-on-col-settings-changed', this.setColumnSettings);
    // this.props.glEventHub.off('pvgrid-on-extra-search-changed', this.setExtraSearch);
    
  }
  
  setObj = (obj) =>
  {
    this.obj = obj;
  }
  
  
  searchDataByCountry = (searchStr) =>{
    
    let url = "/gateway/sandbox/pvgdpr_server/home/country_data_count";
  
    let self = this;
  
    this.h_request = setTimeout(() =>
    {
      let CancelToken = axios.CancelToken;
      self.req = CancelToken.source();
      axios.post(url,
        searchStr
        // {
        //   searchStr: searchStr
        // }
      
      , {
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
          this.onError(thrown);
        }
      });
    }, 50);
  }
  
  onError = (thrown) => {
    alert("Failed to get data by country" + thrown);
    
  }
  onSuccess = (resp) =>{
  
    var  colParam = {};

    var rawList = resp.data.countryData.entry;
    
    var max = 0;
    var min = 9999999999999999999999;
    
    for (var i = 0, ilen = rawList.length; i < ilen; i ++){
      var entry = rawList[i];
      var iso3country = Countries.alpha2ToAlpha3(entry.key);
      if (iso3country){
        colParam[iso3country] = entry.value;
        if (max < entry.value){
          max = entry.value;
        }
        if (min > entry.value){
          min = entry.value;
        }
  
      }
    }
  
    var colors = this.obj.getColorScale(min,max);
  
    this.popupData = {};
    
    for (var prop in colParam) {
      this.popupData[prop] = colParam[prop];
  
      colParam[prop] = colors(this.popupData[prop]);
    }
    
    
    this.obj.updateColours(colParam);
  
    
    
    
  
  
  
  }
  popupTemplate = (geography, data) =>
  {
    var val = this.popupData[geography.id];
    var label = geography.properties.name;
    return val == null?
      "<div style='background-color:lightblue' >"+label+"</div>":
      "<div style='background-color:lightblue' >"+label+" "+val +"</div>";
  }
  
  
  
  
  
  render()
  {
    // let eventHub = this.props.glEventHub;
    //
    this.popupData = {};
    
    
    let fills = {
      'Republican': '#cc4731',
      'Democrat': '#306596',
      'Heavy Democrat': '#667faf',
      'Light Democrat': '#a9c0de',
      'Heavy Republican': '#ca5e5b',
      'Light Republican': '#eaa9a8',
      'defaultFill': '#eddc4e'
    };
    let geographyConfig = {
      highlightBorderColor: '#bada55',
      popupTemplate: this.popupTemplate,
      highlightBorderWidth: 3
    };
    
  
  
    return (
      <ResizeAware
        style={{width: '100%', height: '100%'}}
        onResize={this.handleResize}>
        <Flex p={1} align='center' style={{width: '100%', height: '100%'}}
        >
          <Box px={1} w={1} style={{width: '100%', height: '100%'}}>
            <Datamap
              scope="world"
              geographyConfig={geographyConfig}
              fills={fills}
              // data={data}
              responsive={true}
              ref={this.setObj}
              labels={false}
              graticule={false}
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


export default PVWorldMap;