import React from 'react';
import 'formiojs/dist/formio.full.css';
import 'formiojs/dist/formio.builder.css';
// import {Form, FormBuilder} from 'react-formio';
import ResizeAware from 'react-resize-aware';
import './react-select.css';
import axios from "axios";
import {Base64} from 'js-base64';
import PontusComponent from "./PontusComponent";

import {FormRaw} from './PVFormBuilder';
// import FormBuilder from 'formiojs/dist/formio.full';
import queryString from 'query-string'

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
    
    this.form = props.form ? props.form : {
      "display": "form", "components": [
        {
          "input": true, "key": "clickIfYouAgree",
          label:
            "Click if you agree",
          mask:
            false,
          type:
            "checkbox"
        }
      ]
    }
    this.errorCount = 0;
    this.state = {
      maxHeight: 100
      , open: false
      , visible: false
      , preview: <div/>
      , value: ""
      , width: 1000
      , height: 1000
      , form: this.form
    };
    if (this.props.queryStr)
    {
      const values = queryString.parse(this.props.queryStr);
      console.log(values.url); // "top"
      
      this.formURL = values.url;
      
    }
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
        pg_dataType: event
      }
      
    };
  };
  
  
  getQueryLoadForm = (formURL) =>
  {
    return {
      gremlin: "" +
      "g.V().has('Object.Form.URL',eq(pg_formURL)).properties('Object.Form.Text')" +
      ""
      , bindings: {
        pg_formURL: formURL
      }
      
    };
    
  };
  
  onLoadFormSuccess = (resp) =>
  {
    console.log("onLoadFormSuccess data:" + JSON.stringify(resp));
    
    
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
        let items = respParsed.data.result.data['@value'][0]['@value']['value'];
        
        let formObj = JSON.parse(Base64.decode(items));
        //
        // if (typeof items !== 'object')
        // {
        //   items = JSON.parse(items);
        // }
        //
  
  
        if (this.formBuilderRef){
    
          this.formBuilderRef.setForm (formObj);
          this.formBuilderRef.forceUpdate()
    
        }
  
        this.setState(
          {
            form: formObj
          }
        );
        
        
        // this.forceUpdate();
        
        
      }
      
    }
    catch (e)
    {
      console.log(e);
    }
    
  };
  
  onLoadFormError = (evnt, thrown) =>
  {
    this.errorCount++;
    if (this.errorCount > 5)
    {
      console.error("Failed to get graph data:" + thrown);
      
    }
    
    else
    {
      this.loadFormSubmit(evnt);
    }
  };
  
  
  loadFormSubmit = (formURL) =>
  {
    console.log("FORM URL:" + JSON.stringify(formURL));
    
    this.genericSubmit(formURL, this.getQueryLoadForm, this.onLoadFormSuccess, this.onLoadFormError);
  };
  
  onSubmit = (evnt) =>
  {
    console.log("FORM data:" + JSON.stringify(evnt));
    
    this.genericSubmit(evnt, this.getSubmitQuery, this.onSubmitSuccess, this.onSubmitError);
  };
  
  genericSubmit = (evnt, getQueryFn, successFn, errFn) =>
  {
    
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
      
      axios.post(url, getQueryFn(evnt), {
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
          errFn(evnt, thrown);
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
        let items = respParsed.data.result.data['@value'][0]['@value']['value'];
        
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
  
  
  onSubmitError = (evnt, thrown) =>
  {
    this.errorCount++;
    if (this.errorCount > 5)
    {
      console.error("Failed to get graph data:" + thrown);
      
    }
    
    else
    {
      this.onSubmit(evnt);
    }
  };
  
  
  setObj = (obj) =>
  {
    this.obj = obj;
  };
  
  componentDidMount()
  {
    if (this.formURL)
    {
      this.loadFormSubmit(this.formURL);
    }
    
    
  }
  
  setFormBuilderRef = (formBuilder) =>
  {
    this.formBuilderRef = formBuilder;
  };
  
  
  
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
        <div
          style={{
            height: '50%', width: '50%', overflowX: 'auto', overflowY: 'auto', left: '30%', position: 'fixed',
            top: '20%', zIndex: 100000, backgroundColor: '#696969', padding: '10px'
          }}>
          
          <FormRaw form={form} ref={this.setFormBuilderRef} onSubmit={this.onSubmit}/>
        </div>
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