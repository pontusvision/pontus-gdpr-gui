import React from 'react';


import axios from "axios";
import {Doughnut} from 'react-chartjs-2';




class PVDoughnutChart extends React.Component
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
        labels: ['Red', 'Green', 'Yellow'],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    };
    
  }
  
  
  
  
  setObj = (obj) =>
  {
    this.obj = obj;
  };
  
  setQuery = (queryStr) =>{
  
  
  
  
  
  
  };
  
  
  componentDidMount()
  {
  
  
  }
  
  
  ensureData = (from, to) =>
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
      axios.post(url, {
      
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
          this.onError(thrown);
        }
      });
  
    }, 50);
  };
  onError = (err) =>
  {
    alert("error loading data:" + err);
  };
  
  onSuccess = (resp) =>
  {
    
    
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
    // let eventHub = this.props.glEventHub;
    //
  
 // <ResizeAware
 //   style={{width: '100%', height: 'calc(100% - 20px)', flex: 1}}
 //   onResize={this.handleResize}
 // >
 // </ResizeAware>
  
    return (
      
        <Doughnut
          style={{flex: 1 }}
           /* , maxHeight: this.state.maxHeight, width: this.state.width, height: this.state.height}}*/
          ref={this.setObj}
          data={this.state.data}
          redraw={true}
        
        />
      
      
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


export default PVDoughnutChart;