import React  from 'react';
// import ResizeAware from 'react-resize-aware';
import axios from "axios";
import {Doughnut} from 'react-chartjs-2';
import PontusComponent from "./PontusComponent";
// import axios from 'axios';


/***************************
 * UserList Component
 ***************************/
class NavPanelSubjectAccessRequestPVDoughnutChartReqType extends PontusComponent
{
  constructor(props)
  {
    super(props);

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
    
    // this.datamaps = new PVDatamaps(props);
    
    // this.url = props.url || "/gateway/sandbox/pvgdpr_graph";
    this.url = PontusComponent.getGraphURL(props)
    this.errorCounter = 0;
  
  }
  
  
  setObj = (obj) =>
  {
    this.obj = obj;
  };
  
 
  
  
  
  
  
  
  getQuery = () =>
  {
    
    return {
      gremlin: "g.V().has('Metadata.Type.Event.Subject_Access_Request',eq('Event.Subject_Access_Request'))" +
      ".groupCount().by('Event.Subject_Access_Request.Request_Type')"
      , bindings: {
      }
      
      
    };
  }
  
  
  ensureData = () =>
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
        self.getQuery()
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
    if (this.errorCounter < 5){
      this.ensureData();
      this.errorCounter ++;
    }
    else {
      console.error("error loading data:" + err);
    }
  };
  
  onSuccess = (resp) =>
  {
  
    this.errorCounter = 0;
  
  
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
            case "Read":
              data.datasets[0].backgroundColor[counter] = '#00ff00'
              data.datasets[0].hoverBackgroundColor[counter] = '#00ff00'
              break;
            // case "Update":
            //   data.datasets[0].backgroundColor[counter] = '#ffff00'
            //   data.datasets[0].hoverBackgroundColor[counter] = '#ffff00'
            //
            //   break;
            case "Update":
              data.datasets[0].backgroundColor[counter] = '#ff8800'
              data.datasets[0].hoverBackgroundColor[counter] = '#ff8800'
              
              break;
            case "Delete":
              data.datasets[0].backgroundColor[counter] = '#ff0000'
              data.datasets[0].hoverBackgroundColor[counter] = '#ff0000'
              
              break;
            
            // case "Second  Reminder":
            //   data.datasets[0].backgroundColor[counter] = '#ff4400'
            //   data.datasets[0].hoverBackgroundColor[counter] = '#ff4400'
            //
            //   break;
            
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
  
  componentDidMount(){
    this.ensureData()
  }
  
  render()
  {
    
    
    return (
      
      <Doughnut
        style={{flex: 1}}
        /* , maxHeight: this.state.maxHeight, width: this.state.width, height: this.state.height}}*/
        ref={this.setObj}
        data={this.state.data}
        redraw={true}
        options={{
  
          responsive: true,
          legend: {
            position: "right",
            labels: {
              fontColor: 'white'
            }
          }
  
        }}
      />
    
    
    );
    
    
  }
}

export default NavPanelSubjectAccessRequestPVDoughnutChartReqType;