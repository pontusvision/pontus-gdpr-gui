import React from 'react';
import axios from "axios";
import {Button, Segment, Portal} from 'semantic-ui-react';
import {Base64} from 'js-base64';

// import PVDatamaps from './PVDatamaps';


class PVReportButton extends React.Component
{
  constructor(props)
  {
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    this.errorCounter = 0;
    
    this.url = props.url || "/gateway/sandbox/pvgdpr_graph";
    // this.url = "/gateway/sandbox/pvgdpr_graph";
    
    this.state = {
      open: false
     ,preview: ""
    };
    
  }
  
  
  setObj = (obj) =>
  {
    this.obj = obj;
  };
  
  onClick = () =>
  {
    this.ensureData(this.props.contextId, this.props.templateText);
    
  };
  
  
  
  componentDidMount()
  {
    // super.componentDidMount();
    // this.props.glEventHub.on('PVGridAwarenessCampaign-pvgrid-on-click-row', this.onClickedPVGridAwarenessCampaign);
  
    this.setState({ open: false });
  
  }
  
  componentWillUnmount()
  {
    // this.props.glEventHub.off('PVGridAwarenessCampaign-pvgrid-on-click-row', this.onClickedPVGridAwarenessCampaign);
    
    // super.componentWillUnmount();
  }
  
  
  getQuery = (contextId, templateText) =>
  {
    
    return {
      gremlin: "renderReportInBase64(pg_id,pg_templateText)"
      , bindings: {
        pg_id: contextId
        , pg_templateText: templateText
      }
      
      
    };
  };
  
  
  ensureData = (contextId, templateText) =>
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
  
      axios.post(url,
        self.getQuery(contextId, templateText)
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
      this.ensureData(this.props.contextId, this.props.templateText);
    }
    this.errorCounter++;
  };
  
  onSuccess = (resp) =>
  {
    
    this.errorCounter = 0;
    
    try
    {
      
      
      if (resp.status === 200)
      {
        // let items = resp.data.result.data['@value'][0]['@value'];
        let items = resp.data.result.data['@value'][0];
        
        
        this.setState(
          {
            open: !this.state.open
            , preview: Base64.decode(items)
            // , value: Base64.encode(this.obj.getEditorContents())
          }
        );
        
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
  
  handleClose = () => this.setState({ open: false });
  
  render()
  {
    
    
    return (
      <div>
        <Button
          className={'compact'}
          style={{border: 0, background: 'rgb(69,69,69)', marginRight: '3px'}}
          size={'small'}
          onClick={this.onClick}
        
        >
          {this.props.buttonLabel}
        </Button>
        
        <Portal onClose={this.handleClose} open={this.state.open}>
          <Segment
            style={{
              height: '50%', width: '50%', overflowX: 'auto', overflowY: 'auto', left: '30%', position: 'fixed',
              top: '20%', zIndex: 100000, backgroundColor: '#696969', padding: '10px'
            }}>
            <div dangerouslySetInnerHTML={{__html: this.state.preview}}/>
          </Segment>
        </Portal>
      </div>
    
    );
    
    
  }
}


export default PVReportButton;