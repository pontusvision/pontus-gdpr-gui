import React from 'react';
import {Form, FormBuilder} from 'react-formio';
import 'formiojs/dist/formio.full.css';
import ResizeAware from 'react-resize-aware';
import {Button, Menu, Portal, Segment} from 'semantic-ui-react';
// import {Creatable} from 'react-select';
import './react-select.css';
import axios from "axios";
// import Editor from 'react-quill'; // ES6
import {Base64} from 'js-base64';
// import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';


import 'react-quill/dist/quill.snow.css';
import PontusComponent from "./PontusComponent";

class PVFormBuilder extends PontusComponent
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
      , form: {display: 'form'}
    };
    // this.val = "";
  }
  
  
  handleResize = ({width, height}) =>
  {
    if (this.obj && this.obj.editingArea)
    {
      this.obj.editingArea.childNodes[0].style.maxHeight = (height - 60) + "px";
      this.obj.editingArea.childNodes[0].style.maxWidth = (width - 60) + "px";
      
    }
    this.setState({width: width, height: height});
    
  };
  
  getQuerySaveData = (newVal, lastData) =>
  {
    return {
      gremlin: "" +
      "def trans = graph.tx()\n" +
      "    try {\n" +
      "        if (!trans.isOpen()) {\n" +
      "            trans.open();\n" +
      "        }\n" +
      "        g.V(pg_id)\n" +
      "                .property(\"Object.Notification_Templates.Text\", pg_newValStr)\n" +
      "                .next();\n" +
      "        trans.commit();\n" +
      "    }\n" +
      "    catch (t) {\n" +
      "        trans.rollback();\n" +
      "        throw t;\n" +
      "    } finally {\n" +
      "        trans.close();\n" +
      "    }" +
      "" +
      ""
      , bindings: {
        pg_newValStr: newVal
        , pg_id: lastData.index
      }
      
    };
  };
  saveData = (newVal, lastData) =>
  {
    // this.origNodeId = (+(this.origNodeId));
    let url = this.url = PontusComponent.getGraphURL(this.props);
    // "/gateway/sandbox/pvgdpr_server/home/graph";
    if (this.h_request !== null)
    {
      clearTimeout(this.h_request);
    }
    
    let self = this;
    this.h_request = setTimeout(() =>
    {
      let CancelToken = axios.CancelToken;
      self.req = CancelToken.source();
      
      axios.post(url, this.getQuerySaveData(newVal, lastData), {
        headers: {
          'Content-Type': 'application/json'
          , 'Accept': 'application/json'
        }
        , cancelToken: self.req.token
      }).then(this.onSuccessSaveData).catch((thrown) =>
      {
        if (axios.isCancel(thrown))
        {
          console.log('Request canceled', thrown.message);
        }
        else
        {
          this.onErrorSaveData(newVal, lastData, thrown);
        }
      });
      
      
    }, 50);
    
  };
  
  onErrorSaveData = (newVal, lastData, thrown) =>
  {
    this.errorCount++;
    if (this.errorCount > 5)
    {
      alert("Failed to get graph data:" + thrown);
      
    }
    
    else
    {
      this.saveData(newVal, lastData);
    }
  };
  
  
  onSuccessSaveData = (resp) =>
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
      
      }
      
    }
    catch (e)
    {
      console.log(e);
    }
    
  };
  
  getQueryPreviewData = (dataType, templateText) =>
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
  
  previewData = (dataType, templateText) =>
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
      
      axios.post(url, this.getQueryPreviewData(dataType, templateText), {
        headers: {
          'Content-Type': 'application/json'
          , 'Accept': 'application/json'
        }
        , cancelToken: self.req.token
      }).then(this.onSuccessPreviewData).catch((thrown) =>
      {
        if (axios.isCancel(thrown))
        {
          console.log('Request canceled', thrown.message);
        }
        else
        {
          this.onErrorPreviewData(dataType, templateText, thrown);
        }
      });
      
      
    }, 50);
    
  };
  
  onErrorPreviewData = (dataType, templateText, thrown) =>
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
  
  
  onSuccessPreviewData = (resp) =>
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
  
  
  setObj = (obj) =>
  {
    this.obj = obj;
  };
  
  componentDidMount()
  {
    
    this.setState({open: false});
    this.setState({visible: false});
    
    
  }
  
  onClickPreview = () =>
  {
    this.setState({
      form: this.form
      , open: !this.state.open
    })
    
    
    // let newVal = Base64.encode(JSON.stringify(this.form));
    //
    // if (this.lastData){
    //   this.previewData(this.lastData['Object.Notification_Templates.Types'], newVal);
    //   this.setState({value: newVal});
    // }
  };
  
  onClickSave = () =>
  {
    // this.setState({ visible: !this.state.visible });
    
    let newVal = Base64.encode(this.val);
    if (this.lastData)
    {
      this.saveData(newVal, this.lastData);
      this.lastData['Object.Notification_Templates.Text'] = newVal;
      
    }
  };
  
  handleClose = () => this.setState({open: false});
  
  // previewDiv  = (previewDivObj) => {
  //   this.previewDivObj = previewDivObj;
  //   this.previewDivObj.setInnerHtml(this.previewDivObj,"hello world")
  // };
  
  onChange = (schema) =>
  {
    this.form = schema;
  };
  
  setFormBuilderRef = (formBuilder) =>
  {
    this.formBuilderRef = formBuilder;
  };
  
  onSubmit = (event) => {
    console.log( "FORM data:" + JSON.stringify(event));
  };
  
  render()
  {
    // let eventHub = this.props.glEventHub;
    //
    const {open, form} = this.state;
    
    // let templateOptions = [{key: 'af', value: 'af', flag: 'af', text: 'Afghanistan'}];
    
    return (
      <ResizeAware
        style={{width: '100%', height: '100%', flexDirection: 'column'}}
        onResize={this.handleResize}
      >
        
        
        <Menu style={{flexGrow: 0, margin: 0}}>
          <Button
            className={'compact'}
            onClick={this.onClickPreview}
            style={{border: 0, background: 'rgb(69,69,69)', margin: 4}}
            size={'small'}
          >
            Preview
          </Button>
          
          
          <Button
            className={'compact'}
            onClick={this.onClickSave}
            style={{border: 0, background: 'rgb(69,69,69)', margin: 4}}
            size={'small'}
          >
            Save
          </Button>
        
        
        </Menu>
        
        
        <FormBuilder ref={this.setFormBuilderRef} form={form} onChange={this.onChange}/>
        
        
        <Portal onClose={this.handleClose} open={open}>
          <Segment
            style={{
              height: '50%', width: '50%', overflowX: 'auto', overflowY: 'auto', left: '30%', position: 'fixed',
              top: '20%', zIndex: 100000, backgroundColor: '#696969', padding: '10px'
            }}>
            
            <Form form={form} ref={this.setFormBuilderRef} onSubmit={this.onSubmit}/>
          
          </Segment>
        </Portal>
      
      
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


export default PVFormBuilder;