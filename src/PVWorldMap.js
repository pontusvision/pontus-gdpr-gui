import React from 'react';

import Datamap from './PVDatamaps';

import ResizeAware from 'react-resize-aware';

import * as Countries from  'i18n-iso-countries' ;

import axios from "axios";
// import "slickgrid-es6/dist/slick-default-theme.less";
import {Flex, Box} from 'reflexbox'
import PontusComponent from "./PontusComponent";


class PVWorldMap extends React.Component
{
  constructor(props)
  {
    super(props);
 
    this.namespace = this.props.namespace || "";


  }
  
  
  
  
  handleResize = () =>
  {
    if (this.obj)
    {
      this.obj.resizeMap();
    }
  };
  
  
  componentDidMount()
  {
    this.props.glEventHub.on(this.namespace + '-pvgrid-on-search-changed', this.searchDataByCountry);
    this.searchDataByCountry(null);
  
  }
  
  
  componentWillUnmount()
  {
    this.props.glEventHub.off(this.namespace + '-pvgrid-on-search-changed', this.searchDataByCountry);
    
  }
  
  setObj = (obj) =>
  {
    this.obj = obj;
  };
  
  
  getQuery = (searchStr) => {
    return {
      gremlin: "StringBuffer sb = new StringBuffer('{ \"countryData\": { \"entry\": [');\n" +
      "int counter = 0;\n" +
      "g.V().has('Metadata.Type.Person.Natural', eq('Person.Natural')).groupCount().by('Person.Natural.Nationality').each{ it ->\n" +
      "  // def val = it.get();\n" +
      "  it.each{ key, val ->\n" +
      "  \n" +
      "  if (key.length() == 2){\n" +
      "    if (counter > 0){\n" +
      "      sb.append(',')\n" +
      "    }\n" +
      "    counter ++;\n" +
      "    sb.append('{ \"key\": \"').append(key).append('\", \"value\": ').append(val).append('}\\n')\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "}\n" +
      "sb.append('] }}')\n" +
      "sb.toString()\n"
      
    };
  };
  
  
  searchDataByCountry = (searchStr) =>{
    
    let url = this.url = PontusComponent.getGraphURL(this.props);
  
  
    let self = this;
  
    this.h_request = setTimeout(() =>
    {
      let CancelToken = axios.CancelToken;
      self.req = CancelToken.source();
      axios.post(url,
        self.getQuery(searchStr)
        
        
        
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
  };
  
  onError = (thrown) => {
    console.error("Failed to get data by country" + thrown);
    
  };
  onSuccess = (resp) =>{
  
    let  colParam = {};

    let rawList = JSON.parse(resp.data.result.data['@value'][0]).countryData.entry;
    
    let max = 0;
    let min = 9999999999999999999999;
    
    for (let i = 0, ilen = rawList.length; i < ilen; i ++){
      let entry = rawList[i];
      let iso3country = Countries.alpha2ToAlpha3(entry.key);
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
  
    let colors = Datamap.getColorScale(min,max);
  
    this.popupData = {};
    
    for (let prop in colParam) {
      this.popupData[prop] = colParam[prop];
  
      colParam[prop] = colors(this.popupData[prop]);
    }
    
    
    this.obj.updateColours(colParam);
  
    
    
    
  
  
  
  };
  popupTemplate = (geography, data) =>
  {
    let val = this.popupData[geography.id];
    let label = geography.properties.name;
    return val == null?
      "<div style='background-color:lightblue' >"+label+"</div>":
      "<div style='background-color:lightblue' >"+label+" "+val +"</div>";
  };
  
  
  
  
  
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