import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGauge from './PVGauge';
import axios from 'axios';
import {Grid} from 'semantic-ui-react';
import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {ic_child_care} from 'react-icons-kit-allreact/md/ic_child_care';
import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class PVGDPRScores extends Component
{
  
  constructor(props)
  {
    super(props);
    this.url = "/gateway/sandbox/pvgdpr_graph";
    this.text = 'You should start thinking now about whether you\n' +
      'need to put systems in place to verify individuals’\n' +
      'ages and to obtain parental or guardian consent for\n' +
      'any data processing activity.';
    this.scoreIcon = ic_multiline_chart;
  
    this.title = "BASE CLASS";
    this.icon = ic_child_care;
  
    this.errCounter = 0;
    this.state = {
      scoreExplanation: "...  LOADING DATA ...",
      scoreValue: 0
    };
  
  
  
    // this.title = "Children";
    // this.icon = ic_child_care;
    //
    //
    // this.state = {
    //   scoreExplanation: "This score reflects the fact that 34 children do not have consent, and " +
    //   "23 do not have a parent or guardian configured",
    //   scoreValue: 45
    // };
    
    
    
    
  }
  
  
  componentDidMount()
  {
    this.ensureData();
  
  }
  
  ensureData = () =>
  {
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
      axios.post(url
        , self.getSearchQuery()
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
          self.onError(thrown);
        }
      });
      
      
    }, 50);
  };
  onError = (err) =>
  {
    this.errCounter++;
    
    if (this.errCounter < 25)
    {
      this.ensureData();
    }
    
  };
  
  onSuccessProxy = (resp) =>
  {
    this.errCounter = 0;
    
    this.onSuccess(resp);
  };
  
  
  onSuccess = (resp) =>
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
        let data = JSON.parse(respParsed.data.result.data['@value'][0]);
        this.setState({
          scoreExplanation: data.scoreExplanation,
          scoreValue: data.scoreValue
  
        })
        
      }
      
      
      
    }
    catch (e)
    {
      // e;
    }
    
    
  };
  
  
  getSearchQuery = () =>
  {
    
    throw "This is a base class; getSearchQuery must be overriden "
  };
  

  
  render()
  {
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    if (this.props.longShow)
    {
      
      return (
        
        <Grid centered divided columns={3} style = {{padding: 15}}>
          <Grid.Column textAlign='center'>
            <div>
              <PVGauge value={this.state.scoreValue} width={150} height={130} label={this.title}/>
            </div>
          </Grid.Column>
  
  
          <Grid.Column textAlign='justified'>
            <Icon
              icon={this.icon}/>
            <p>{this.text}</p>
          </Grid.Column>
          <Grid.Column textAlign='justified'>
            <Icon
              icon={this.scoreIcon}/>
  
            <p>{this.state.scoreExplanation}</p>
          </Grid.Column>
        
        </Grid>
      );
      
    }
    else
    {
      return (
        
        <Grid centered divided columns={2}>
          
          <Grid.Column textAlign='center'>
            <strong>{this.title}</strong>
            <p>{this.text}</p>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <div>
              <PVGauge value={this.state.scoreValue} width={100} height={130} label={this.title}/>
            </div>
          </Grid.Column>
        
        </Grid>
      );
    }
    
    
  }
}

export default PVGDPRScores;