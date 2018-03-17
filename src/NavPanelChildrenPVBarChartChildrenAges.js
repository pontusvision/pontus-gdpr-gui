import React from 'react';


import axios from "axios";
import {Bar} from 'react-chartjs-2';

import PVDatamaps from './PVDatamaps';


class NavPanelChildrenPVBarChartChildrenAges extends React.Component
{
  constructor(props)
  {
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    this.state = {
      maxHeight: 500
      , width: 500
      , height: 500
      , data: {
        labels: []
        , datasets: [
          {
            data: []
            // ,backgroundColor: []
            // ,hoverBackgroundColor: []
          }
        ]
      }
    };
    
    this.errorCounter = 0;
    
    this.datamaps = new PVDatamaps(props);
    
    this.url = props.url || "/gateway/sandbox/pvgdpr_graph";
    
  }
  
  
  setObj = (obj) =>
  {
    this.obj = obj;
  };
  
  setQuery = (queryStr) =>
  {
  
  
  };
  
  componentDidMount()
  {
    // super.componentDidMount();
    // this.props.glEventHub.on('PVGridAwarenessCampaign-pvgrid-on-click-row', this.onClickedPVGridAwarenessCampaign);
    this.ensureData(null);
    
  }
  
  componentWillUnmount()
  {
    // this.props.glEventHub.off('PVGridAwarenessCampaign-pvgrid-on-click-row', this.onClickedPVGridAwarenessCampaign);
    
    // super.componentWillUnmount();
  }
  
  
  getQuery = (id) =>
  {
    
    return {
      gremlin: "long counter = 0L;\n" +
      "StringBuffer sbLabels = new StringBuffer();\n" +
      "StringBuffer sbDataSets = new StringBuffer();\n" +
      "long ageThresholdMs = (long)(System.currentTimeMillis() - (3600000L * 24L *365L  * 18L));\n" +
      "  def dateThreshold = new java.util.Date (ageThresholdMs);\n" +
      "  g.V().has('Metadata.Type','Person')\n" +
      "   .where(__.values('Person.Date_Of_Birth').is(gte(dateThreshold)))\n" +
      "   .match(\n" +
      "     __.as('people').values('Person.Date_Of_Birth').map{ (long) (((long) System.currentTimeMillis() - (long)it.get().getTime()) /(long)(3600000L*24L*365L) ) }.as('Person.Age')\n" +
      "   ).select('Person.Age').groupCount().each{  it ->\n" +
      "      it.each{ key, val -> \n" +
      "        if (counter > 0L){\n" +
      "          sbLabels.append(',');\n" +
      "          sbDataSets.append(',');\n" +
      "        }\n" +
      "        if (counter == 1L){\n" +
      "          sbLabels.append('\"').append(key).append(' yr\"')\n" +
      "        }\n" +
      "        else{\n" +
      "          sbLabels.append('\"').append(key).append(' yrs\"')\n" +
      "\n" +
      "        }\n" +
      "        sbDataSets.append(val)\n" +
      "        counter ++\n" +
      "      }   \n" +
      "   }\n" +
      "   \n" +
      "   \n" +
      "StringBuffer sb = new StringBuffer ();\n" +
      "sb.append('{ \"labels\": [').append(sbLabels).append('],')\n" +
      "  .append('  \"data\": [').append(sbDataSets).append(']}')\n" +
      "  \n" +
      "  \n" +
      "sb.toString()"
      , bindings: {
        pg_awarenessId: id
      }
      
      
    };
  };
  
  
  ensureData = (id) =>
  {
    if (this.req)
    {
      this.req.cancel();
    }
    
    
    let url = this.url;
    if (this.h_request !== null)
    {
      clearTimeout(this.h_request);
    }
    
    
    let self = this;
    
    this.h_request = setTimeout(() =>
    {
      
      
      let CancelToken = axios.CancelToken;
      self.req = CancelToken.source();
      let reqHeaders = window.keycloakInstance ?
        {
          'Content-Type': 'application/json'
          , 'Accept': 'application/json'
          , 'Authorization': "JWT " + window.keycloakInstance.token
        }
        :
        {
          'Content-Type': 'application/json'
          , 'Accept': 'application/json'
        };
  
  
      // http.post(url)
      axios.post(url,
        self.getQuery(id)
        , {
          headers: reqHeaders
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
  onError = (err) =>
  {
    if (this.errorCounter > 5)
    {
      alert("error loading data:" + err);
    }
    else
    {
      this.ensureData(0);
    }
    this.errorCounter++;
  };
  
  onSuccess = (resp) =>
  {
    this.errorCounter = 0;
    
    // resp =
    //   {
    //     "data": {
    //       "requestId": "73d21b6a-bc7c-4806-8fcd-75dddf4441e7",
    //       "status": {
    //         "message": "",
    //         "code": 200,
    //         "attributes": {
    //           "@type": "g:Map",
    //           "@value": []
    //         }
    //       },
    //       "result": {
    //         "data": {
    //           "@type": "g:List",
    //           "@value": [
    //             "{ labels: [\"0 yrs\",\"1 yr\",\"2 yrs\",\"3 yrs\",\"4 yrs\",\"5 yrs\",\"6 yrs\",\"7 yrs\",\"8 yrs\",\"9 yrs\",\"10 yrs\",\"11 yrs\",\"12 yrs\",\"13 yrs\",\"14 yrs\",\"15 yrs\",\"16 yrs\",\"17 yrs\"],  data: [423,101,132,116,138,130,111,135,112,151,143,127,140,107,129,127,106,118]}"
    //           ]
    //         },
    //         "meta": {
    //           "@type": "g:Map",
    //           "@value": []
    //         }
    //       }
    //     },
    //   };
    
    
    try
    {
      
      if (resp.status === 200)
      {
        
        let respParsed = JSON.parse(resp.data.result.data['@value'][0]);
        
        let data = {
          labels: respParsed.labels
          , datasets: [
            {
              data: respParsed.data
              ,backgroundColor: []
              ,hoverBackgroundColor: []
              ,label: "Chidren's ages"
  
            }
          ]
        };
        
        
        
        let colorScale =  this.datamaps.getColorScale(0, respParsed.data.length - 1);

        let datasetData = data.datasets[0].data;
        for (let i = 0, ilen = datasetData.length; i < ilen; i++){
          data.datasets[0].backgroundColor[i] = colorScale(i);
          data.datasets[0].hoverBackgroundColor[i] = colorScale(i);

        }
        this.setState({data: data})
  
      }
      
      
    }
    catch (e)
    {
      // e;
    }
    
    /*
     
     var data = {
     labels: ['Red', 'Green', 'Yellow'],
     datasets: [{
     data: [300, 50, 100],
     backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
     hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
     }]
     };
     */
    
    
    // this.onDataLoaded.notify({from: from, to: to});
  };
  
  
  render()
  {
    
    let {data} = this.state;
    
    
    // var data = {
    //   labels: ['Children (5-10)', 'Pre-Teens (11-12)', 'Mid Teens (13-15)', 'Late Teens (16-18)'],
    //   datasets: [{
    //     data: [22, 33, 244, 758],
    //     backgroundColor: ['#FF0000',
    //       '#FF8800',
    //       '#0000FF',
    //       '#00FF00'],
    //     hoverBackgroundColor: ['#FF0000', '#FF8800','#0000FF', '#00FF00']
    //   }]
    // };
    
    return (
      
      <Bar
        style={{flex: 1}}
        /* , maxHeight: this.state.maxHeight, width: this.state.width, height: this.state.height}}*/
        ref={this.setObj}
        data={data}
        redraw={true}
      
      />
    
    
    );
    
    
  }
}


export default NavPanelChildrenPVBarChartChildrenAges;