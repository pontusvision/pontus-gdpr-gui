import React from 'react';
import axios from "axios";
import {Button, Portal, Segment} from 'semantic-ui-react';
import PontusComponent from "./PontusComponent";

// import PVDatamaps from './PVDatamaps';


class PVDetailsButton extends PontusComponent
{
  constructor(props)
  {
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    this.errorCounter = 0;
    
    this.doubleClickNamespace = this.props.namespace + '-pvgraph-double-click';
    
    
    this.url = PontusComponent.getGraphURL(this.props);
    // this.url = "/gateway/sandbox/pvgdpr_graph";
    
    this.state = {
      open: false
      , preview: ""
    };
    
  }
  
  
  setObj = (obj) =>
  {
    this.obj = obj;
  };
  
  onClick = () =>
  {
    this.ensureData(this.props.contextId, this.props.metadataType);
    
  };
  
  onDoubleClickGraph = (event) =>
  {
    this.ensureData(event.vid, event.metadataType);
    
  };
  
  componentDidMount()
  {
    // super.componentDidMount();
    this.props.glEventHub.on(this.doubleClickNamespace, this.onDoubleClickGraph);
    
    this.setState({open: false});
    
  }
  
  componentWillUnmount()
  {
    this.props.glEventHub.off(this.doubleClickNamespace, this.onDoubleClickGraph);
    
    // super.componentWillUnmount();
  }
  
  
  getQuery = (contextId, templateText) =>
  {
    
    return {
      gremlin: "getPropsNonMetadataAsHTMLTableRows(g, pg_id as Long,  pg_origLabel)"
      , bindings: {
        pg_id: contextId
        , pg_origLabel: templateText
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
      
      axios.post(url,
        self.getQuery(contextId, templateText)
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
    if (this.errorCounter > 5)
    {
      console.error("error loading data:" + err);
      
    }
    else
    {
      this.ensureData(this.props.contextId, "");
    }
    this.errorCounter++;
  };
  
  onSuccess = (resp) =>
  {
    
    this.errorCounter = 0;
    
    try
    {
      
      let backgroundColor = this.getColorBasedOnLabel(this.props.metadataType);
      if (resp.status === 200)
      {
        // let backgroundColor = this.getColorBasedOnLabel(vLabel);
        
        let data = JSON.parse(atob(resp.data.result.data['@value'][0]));
        
        let tableData = "";
        for (let key in data)
        {
          
          if (data.hasOwnProperty(key))
          {
            let val = data[key];
            tableData += "<tr><td class='tg-yw4l'>";
            let cleanKey = PontusComponent.replaceAll('.', ' ', key);
            cleanKey = PontusComponent.replaceAll('_', ' ', cleanKey)
            tableData += PontusComponent.t(cleanKey);
            val = data[key];
            val = val.replace('[', '').replace(']', '');
            if (key.endsWith("b64"))
            {
              val = atob(val);
              tableData += ' (' + PontusComponent.t('Decoded') + ')';
            }
            tableData += "</td><td class='tg-yw4l'>";
            tableData += PontusComponent.escapeHTML(val);
            tableData += "</td></tr>";
            
          }
        }
        
        
        // let tableBodySb =
        //   "<div xmlns=\"http://www.w3.org/1999/xhtml\"
        // style=\"font-size:20px;color:#FFFFFF;height:100%;width:100%;\">" + "<style>" + ".tg td{font-family:Arial,
        // sans-serif;font-size:14px;padding:10px
        // 5px;border-style:solid;border-width:1px;overflow:visible;word-break:normal;}" + ".tg th{font-family:Arial,
        // sans-serif;font-size:14px;font-weight:normal;padding:10px
        // 5px;border-style:solid;border-width:1px;overflow:visible;word-break:normal;color:#ffffff;}" + ".tg
        // .tg-ygl1{font-weight:bold;background-color:#9b9b9b}" + ".tg
        // .tg-x9s4{font-weight:bold;background-color:#9b9b9b;vertical-align:top}" + ".tg .tg-yw4l{vertical-align:top;
        // color:#ffffff;}" + "</style>" // + "<h3 style=\"color: white;\">" // + vLabel.replace(this.underscoreOrDot,
        // " ") // + "</h3>" + "<table class=\"tg\" style=\" overflow: visible; background: " + backgroundColor + ";
        // height: auto; width: 600px; padding: 5px;\">" + "<colgroup> <col style=\"width: 30%\"/><col style=\"width:
        // 70%\"/></colgroup>" + "<tr><th class=\"tg-ygl1\">" + PontusComponent.t('Property') + "</th><th
        // class=\"tg-x9s4\">" + PontusComponent.t('Value') + "</th></tr>" + tableData + "</table></div>";
        
        // let items = resp.data.result.data['@value'][0];
        let tableBodySb =
          "<div xmlns=\"http://www.w3.org/1999/xhtml\" style=\"font-size:20px;color:#FFFFFF;height:100%;width:100%;\">"
          + "<style>"
          + ".tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:visible;word-break:normal;}"
          + ".tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:visible;word-break:normal;color:#ffffff;}"
          + ".tg .tg-ygl1{font-weight:bold;background-color:#9b9b9b}"
          + ".tg .tg-x9s4{font-weight:bold;background-color:#9b9b9b;vertical-align:top}"
          + ".tg .tg-yw4l{vertical-align:top; color:#ffffff;}"
          + "</style>"
          // + "<h3 style=\"color: white;\">"
          // + vLabel.replace(this.underscoreOrDot, " ")
          // + "</h3>"
          + "<table class=\"tg\" style=\" overflow: visible; background: " + backgroundColor + "; height: 100%; width: 100%; padding: 5px;\">"
          + "<colgroup> <col style=\"width: 30%\"/><col style=\"width: 70%\"/></colgroup>"
          + "<tr><th class=\"tg-ygl1\">"
          + PontusComponent.t('Property')
          + "</th><th class=\"tg-x9s4\">"
          + PontusComponent.t('Value')
          + "</th></tr>"
          + tableData
          + "</table></div>";
        
        
        this.setState(
          {
            open: !this.state.open
            , preview: tableBodySb
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
  
  handleClose = () => this.setState({open: false});
  
  render()
  {
    
    
    return (
      <div>
        <Button
          className={'compact'}
          style={{border: 0, background: 'rgb(69,69,69)', marginRight: '3px'}}
          size={'small'}
          onClick={this.onClick}
        
        >Details</Button>
        
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


export default PVDetailsButton;