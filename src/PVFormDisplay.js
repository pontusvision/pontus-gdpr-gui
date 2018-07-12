import React from 'react';
import 'formiojs/dist/formio.full.css';
import 'formiojs/dist/formio.builder.css';
// import {Form, FormBuilder} from 'react-formio';
import ResizeAware from 'react-resize-aware';
import './react-select.css';
import axios from "axios";
import {Base64} from 'js-base64';
import PontusComponent from "./PontusComponent";

import {FormRaw} from 'PVFormBuilder';
// import FormBuilder from 'formiojs/dist/formio.full';

//
// Components.setComponents(AllComponents);


class PVFormDisplay extends PontusComponent
{
  
  constructor(props)
  {
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    this.errorCount = 0;
    this.state = {
      maxHeight: 100
      , open: false
      , visible: false
      , preview: <div/>
      , value: ""
      , width: 1000
      , height: 1000
      , form: props.form? props.form:{display: 'form'}
    };
    
    this.formURL = props.formURL;
    // this.val = "";
  }
  
  
  handleResize = ({width, height}) =>
  {
    this.setState({width: width, height: height});
    
  };
  

  getSubmitQuery = (event) =>
  {
    return {
      gremlin: "" +
      "long randId = g.V().has('Metadata.Type.'+pg_dataType,eq(pg_dataType)).order().by(shuffle).range(0,1).id().next();\n" +
      "renderReportInBase64(randId, pg_templateText);" +
      ""
      , bindings: {
        pg_dataType: dataType
        , pg_templateText: templateText
      }
      
    };
  };
  
  
  getQueryLoadForm = (formURL) =>{
    return {
      gremlin: "" +
      "g.V().has('Object.Form.URL',eq(pg_formURL)).properties('Object.Form.Text')" +
      ""
      , bindings: {
        pg_formURL: formURL
      }
    
    };
    
  };
  
  onLoadFormSuccess = (resp) => {
    console.log( "onLoadFormSuccess data:" + JSON.stringify(resp));
  
  
    this.errorCount = 0;
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
        let items = respParsed.data.result.data['@value'][0];
      
        //
        // if (typeof items !== 'object')
        // {
        //   items = JSON.parse(items);
        // }
        //
        this.setState(
          {
            form: Base64.decode(items)
          }
        );
      
      
      }
    
    }
    catch (e)
    {
      console.log(e);
    }
  
  };

  
  loadFormSubmit = (formURL) => {
    console.log( "FORM URL:" + JSON.stringify(formUrl));
  
    this.genericSubmit(event,this.getQueryLoadForm, this.onLoadFormSuccess, this.onSubmitError);
  };
  
  onSubmit = (event) => {
    console.log( "FORM data:" + JSON.stringify(event));
  
    this.genericSubmit(event,this.getSubmitQuery, this.onSubmitSuccess, this.onSubmitError);
  };
  
  genericSubmit = (event,getQueryFn, successFn, errFn ) => {
  
    // this.origNodeId = (+(this.origNodeId));
    let url = this.url; // "/gateway/sandbox/pvgdpr_server/home/graph";
    if (this.h_request !== null)
    {
      clearTimeout(this.h_request);
    }
    
    let self = this;
    this.h_request = setTimeout(() =>
    {
      let CancelToken = axios.CancelToken;
      self.req = CancelToken.source();
      
      axios.post(url, getQueryFn(event), {
        headers: {
          'Content-Type': 'application/json'
          , 'Accept': 'application/json'
        }
        , cancelToken: self.req.token
      }).then(successFn).catch((thrown) =>
      {
        if (axios.isCancel(thrown))
        {
          console.log('Request canceled', thrown.message);
        }
        else
        {
          errFn(event, thrown);
        }
      });
      
      
    }, 50);
    
  };
  
  onSubmitSuccess = (resp) =>
  {
    
    this.errorCount = 0;
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
        let items = respParsed.data.result.data['@value'][0];
        
        //
        // if (typeof items !== 'object')
        // {
        //   items = JSON.parse(items);
        // }
        //
        this.setState(
          {
            open: !this.state.open
            , preview: Base64.decode(items)
            , value: Base64.encode(JSON.stringify(this.form))
          }
        );
        
        
      }
      
    }
    catch (e)
    {
      console.log(e);
    }
    
  };
  
  
  
  onSubmitError = (dataType, templateText, thrown) =>
  {
    this.errorCount++;
    if (this.errorCount > 5)
    {
      alert("Failed to get graph data:" + thrown);
      
    }
    
    else
    {
      this.previewData(dataType, templateText);
    }
  };
  
  
  
  
  setObj = (obj) =>
  {
    this.obj = obj;
  };
  
  componentDidMount()
  {
    if (this.formURL){
      this.loadFormSubmit(this.formURL);
    }
    
  
  }
  
  
  render()
  {
    // let eventHub = this.props.glEventHub;
    //
    const {form} = this.state;
    
    // let templateOptions = [{key: 'af', value: 'af', flag: 'af', text: 'Afghanistan'}];
    
    return (
      <ResizeAware
        style={{width: '100%', height: '100%', flexDirection: 'column'}}
        onResize={this.handleResize}
      >
        <FormRaw form={form} ref={this.setFormBuilderRef} onSubmit={this.onSubmit}/>
      
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


export default PVFormDisplay;