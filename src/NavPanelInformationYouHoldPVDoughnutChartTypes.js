import React from 'react';
// import ResizeAware from 'react-resize-aware';
import axios from "axios";
import {Doughnut} from 'react-chartjs-2';
import PontusComponent from "./PontusComponent";

// import axios from 'axios';

/***************************
 * UserList Component
 ***************************/
class NavPanelInformationYouHoldPVDoughnutChartTypes extends PontusComponent
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
        , datasets: [
          {
            data: []
            // ,backgroundColor: []
            // ,hoverBackgroundColor: []
          }
        ]
      }
      
    };
    
    this.namespace = 'NavPanelInformationYouHold';
    
    // this.datamaps = new PVDatamaps(props);
    
    // this.url = props.url || "/gateway/sandbox/pvgdpr_graph";
    this.url = PontusComponent.getGraphURL(props);
    
  }
  
  
  setObj = (obj) =>
  {
    this.obj = obj;
    if (this.obj && this.obj.chartInstance && this.obj.chartInstance.canvas)
    {
      this.obj.chartInstance.canvas.ondblclick = this.ensureData;
      
    }
  };
  
  
  getQuery = () =>
  {
    return {
      "gremlin": "List<String> vertexLabels = [\n" +
        " \"Event.Consent\"\n" +
        ",\"Event.Data_Breach\"\n" +
        ",\"Event.Form_Ingestion\"\n" +
        ",\"Event.Ingestion\"\n" +
        ",\"Event.Subject_Access_Request\"\n" +
        ",\"Event.Training\"\n" +
        ",\"Location.Address\"\n" +
        ",\"Object.AWS_Instance\"\n" +
        ",\"Object.AWS_Network_Interface\"\n" +
        ",\"Object.AWS_Security_Group\"\n" +
        ",\"Object.AWS_VPC\"\n" +
        ",\"Object.Awareness_Campaign\"\n" +
        ",\"Object.Credential\"\n" +
        ",\"Object.Data_Procedures\"\n" +
        ",\"Object.Email_Address\"\n" +
        ",\"Object.Form\"\n" +
        ",\"Object.Identity_Card\"\n" +
        ",\"Object.Insurance_Policy\"\n" +
        ",\"Object.Lawful_Basis\"\n" +
        ",\"Object.Contract\"\n" +
        ",\"Object.Notification_Templates\"\n" +
        ",\"Object.Privacy_Impact_Assessment\"\n" +
        ",\"Object.Privacy_Notice\"\n" +
        ",\"Person.Natural\"\n" +
        ",\"Person.Employee\"\n" +
        ",\"Person.Organisation\"\n" +
        "\n" +
        "] \n" +
        " \n" +
        "Map<String, Long> sizes = [:]\n" +
        "\n" +
        "long totalCount = 0\n" +
        "vertexLabels.reverse().each { key ->\n" +
        "\n" +
        // eslint-disable-next-line
        "  Long size =  g.V().has(\"Metadata.Type.${key}\",key).count().next() as Long\n" +
        "  \n" +
        "  if (size > 0){\n" +
        "    sizes[key.replaceAll('[_.]',' ')] = size;\n" +
        "  }\n" +
        "\n" +
        "}\n" +
        "\n" +
        "\n" +
        " groovy.json.JsonOutput.toJson(sizes) \n" +
        " .toString()\n" +
        " "
    };
  };
  
  
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
    console.error("error loading data:" + err);
  };
  
  onSuccess = (resp) =>
  {
    
    
    try
    {
      
      let data = {
        labels: []
        , datasets: [
          {
            data: []
            , backgroundColor: []
            , hoverBackgroundColor: []
          }
        ]
      };
      
      if (resp.status === 200)
      {
        let items = resp.data.result.data['@value'][0];
        
        if (typeof items === "string")
        {
          items = JSON.parse(items);
        }
        
        let counter = 0;
        
        for (let prop in items)
        {
          
          data.labels[counter] = PontusComponent.t(prop);
          data.datasets[0].data[counter] = items[prop];
          
          data.datasets[0].backgroundColor[counter] = this.getColorBasedOnLabel(prop);
          data.datasets[0].hoverBackgroundColor[counter] = data.datasets[0].backgroundColor[counter];
          
          counter++;
          
          
        }
        
        
        // var counter = 0;
        // for (var i = 0, ilen = items.length; i < ilen; i+=2){
        //   let label = items[i];
        //   let datasetData = items[i+1]['@value'];
        //   data.labels[counter] = label;
        //   data.datasets[0].data[counter] = datasetData;
        //
        //   switch (label) {
        //     case "Consent":
        //       data.datasets[0].backgroundColor[counter] = '#00ff00'
        //       data.datasets[0].hoverBackgroundColor[counter] = '#00ff00'
        //       break;
        //     // case "Update":
        //     //   data.datasets[0].backgroundColor[counter] = '#ffff00'
        //     //   data.datasets[0].hoverBackgroundColor[counter] = '#ffff00'
        //     //
        //     //   break;
        //     case "Consent Pending":
        //       data.datasets[0].backgroundColor[counter] = '#ff8800'
        //       data.datasets[0].hoverBackgroundColor[counter] = '#ff8800'
        //
        //       break;
        //     case "No Consent":
        //       data.datasets[0].backgroundColor[counter] = '#ff0000'
        //       data.datasets[0].hoverBackgroundColor[counter] = '#ff0000'
        //
        //       break;
        //
        //     // case "Second  Reminder":
        //     //   data.datasets[0].backgroundColor[counter] = '#ff4400'
        //     //   data.datasets[0].hoverBackgroundColor[counter] = '#ff4400'
        //     //
        //     //   break;
        //
        //     default:
        //       data.datasets[0].backgroundColor[counter] = '#0000ff'
        //       data.datasets[0].hoverBackgroundColor[counter] = '#0000ff'
        //
        //
        //
        //   }
        //   counter ++;
        //
        // }
        
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
  
  
  // onClickedPVGrid = (val) => {
  //   this.ensureData(val.index || val.id);
  // };
  
  componentDidMount()
  {
    // super.componentDidMount();
    // this.props.glEventHub.on(this.namespace + '-pvgrid-on-click-row', this.onClickedPVGrid);
    this.ensureData();
    
  }
  
  componentWillUnmount()
  {
    // this.props.glEventHub.off(this.namespace + '-pvgrid-on-click-row', this.onClickedPVGrid);
    
    // super.componentWillUnmount();
  }
  
  toConfig = () =>
  {
  
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
        options={{
          
          responsive: true,
          legend: {
            position: "right",
            labels: {
              fontColor: 'white'
            }
          }
          
        }}
        onDoubleClick={this.ensureData}
        fontColor={'white'}
        labels={{fontColor: 'white', defaultFontColor: 'white'}}
        defaultFontColor={'white'}
      
      
      />
    
    
    );
    
    
  }
}

export default NavPanelInformationYouHoldPVDoughnutChartTypes;