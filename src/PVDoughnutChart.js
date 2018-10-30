import React from 'react';


import axios from "axios";
import {Doughnut} from 'react-chartjs-2';
import PontusComponent from "./PontusComponent";
// import PVDatamaps from './PVDatamaps';


class PVDoughnutChart extends PontusComponent
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
       ,datasets: [
          {
            data: []
            // ,backgroundColor: []
            // ,hoverBackgroundColor: []
          }
        ]
      }
    };
  
    this.errorCounter = 0;
    this.index = -1;
    // this.datamaps = new PVDatamaps(props);
  
    // this.url = props.url || "/gateway/sandbox/pvgdpr_graph";
    this.url = PontusComponent.getGraphURL(this.props);
  
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
    this.props.glEventHub.on('PVGridAwarenessCampaign-pvgrid-on-click-row', this.onClickedPVGridAwarenessCampaign);
    
    
  }
  componentWillUnmount()
  {
    this.props.glEventHub.off('PVGridAwarenessCampaign-pvgrid-on-click-row', this.onClickedPVGridAwarenessCampaign);
    
    // super.componentWillUnmount();
  }
  
  
  onClickedPVGridAwarenessCampaign = (val) =>
  {
    this.index = val.index;
    
    this.ensureData(val.index)
  }
  
  
  
  
  getQuery = (id) =>
  {
    
    return {
      gremlin: "g.V((pg_awarenessId))" +
      ".in().as('events').groupCount().by('Event.Training.Status')"
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
      
      
      // http.post(url)
      axios.post(url,
        self.getQuery(id)
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
  onError = (err) =>
  {
    if (this.errorCounter > 5){
      console.error("error loading data:" + err);
  
    }
    else{
      this.ensureData(this.index);
    }
    this.errorCounter ++;
  };
  
  onSuccess = (resp) =>
  {
  
    this.errorCounter = 0;
    // sampleRet = {
    //   "requestId": "57b7d203-67be-4698-9382-c98640711a3a"
    //   ,"status": {"message": "", "code": 200, "attributes": {"@type": "g:Map", "@value": []}}
    //   ,"result": {
    //     "data": {
    //       "@type": "g:List"
    //       ,"@value": [
    //         {
    //           "@type": "g:Map",
    //           "@value": [
    //             "Passed", {"@type": "g:Int64", "@value": 1659}
    //            ,"Link Sent", { "@type": "g:Int64", "@value": 676 }
    //            ,"Reminder Sent", {"@type": "g:Int64", "@value": 823 }
    //            ,"Failed", { "@type": "g:Int64", "@value": 75 }
    //            ,"Second  Reminder", {"@type": "g:Int64", "@value": 1217}
    //           ]
    //         }
    //       ]
    //     }, "meta": {"@type": "g:Map", "@value": []}
    //   }
    // };
  
  
  
    try{
     
      var data = {
        labels: []
       ,datasets: [
          {
            data: []
            ,backgroundColor: []
            ,hoverBackgroundColor: []
          }
        ]
      }
      
      if (resp.status === 200)
      {
        var items = resp.data.result.data['@value'][0]['@value'];
      
        
      
        
        var counter = 0;
        for (var i = 0, ilen = items.length; i < ilen; i+=2){
            let label = items[i];
            let datasetData = items[i+1]['@value'];
            data.labels[counter] = label;
            data.datasets[0].data[counter] = datasetData;
            
            switch (label) {
              case "Passed":
                data.datasets[0].backgroundColor[counter] = '#00ff00'
                data.datasets[0].hoverBackgroundColor[counter] = '#00ff00'
                break;
              case "Link Sent":
                data.datasets[0].backgroundColor[counter] = '#ffff00'
                data.datasets[0].hoverBackgroundColor[counter] = '#ffff00'
  
                break;
              case "Reminder Sent":
                data.datasets[0].backgroundColor[counter] = '#ff8800'
                data.datasets[0].hoverBackgroundColor[counter] = '#ff8800'
  
                break;
              case "Failed":
                data.datasets[0].backgroundColor[counter] = '#ff0000'
                data.datasets[0].hoverBackgroundColor[counter] = '#ff0000'
  
                break;
                
              case "Second  Reminder":
                data.datasets[0].backgroundColor[counter] = '#ff4400'
                data.datasets[0].hoverBackgroundColor[counter] = '#ff4400'
  
                break;
                
              default:
                data.datasets[0].backgroundColor[counter] = '#0000ff'
                data.datasets[0].hoverBackgroundColor[counter] = '#0000ff'
  
  
  
            }
            counter ++;
        
        }
  
        // let colorScale =  this.datamaps.getColorScale(0, items.length - 1);
        //
        // let datasetData = data.datasets[0].data;
        // for (var i = 0, ilen = datasetData.length; i < ilen; i++){
        //   data.datasets[0].backgroundColor[i] = colorScale(i);
        //   data.datasets[0].hoverBackgroundColor[i] = colorScale(i);
        //
        // }
  
      }
  
  
    
      this.setState({data: data})
      
    
    }
    catch (e){
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
   
    
    return (
      
      <Doughnut
        style={{flex: 1}}
        /* , maxHeight: this.state.maxHeight, width: this.state.width, height: this.state.height}}*/
        ref={this.setObj}
        data={this.state.data}
        redraw={true}
      
      />
    
    
    );
    
 
  }
}


export default PVDoughnutChart;