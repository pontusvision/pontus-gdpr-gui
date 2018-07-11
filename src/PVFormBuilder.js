import React, {Component}  from 'react';
import 'formiojs/dist/formio.full.css';
import 'formiojs/dist/formio.builder.css';

// import {Form, FormBuilder} from 'react-formio';
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

import PropTypes from 'prop-types';

import 'react-quill/dist/quill.snow.css';
import PontusComponent from "./PontusComponent";

// import AllComponents from 'formiojs/lib/formio.full';
// import Components from 'formiojs/dist/formio.full';
// import Form from 'formiojs/dist/formio.full';
// import FormBuilder from 'formiojs/dist/formio.full';
import {Form, FormBuilder} from 'formiojs';
// import FormBuilder from 'formiojs/dist/formio.full';

//
// Components.setComponents(AllComponents);

class FormBuilderRaw extends Component {
  static defaultProps = {
    options: {}
  };
  
  static propTypes = {
    form: PropTypes.object,
    options: PropTypes.object,
    onSaveComponent: PropTypes.func,
    onUpdateComponent: PropTypes.func,
    onDeleteComponent: PropTypes.func,
    onCancelComponent: PropTypes.func,
    onEditComponent: PropTypes.func,
  };
  
  componentDidMount = () => {
    this.initializeBuilder();
  };
  
  componentWillUnmount = () => {
    if (this.builder !== undefined) {
      this.builder.instance.destroy(true);
    }
  };
  
  initializeBuilder = () => {
    const {options, form} = this.props;
    
    this.builder = new FormBuilder(this.element, form, options);
    this.builderReady = this.builder.setDisplay(form.display);
    
    this.builderReady.then(() => {
      this.builder.instance.on('saveComponent', this.emit('onSaveComponent'));
      this.builder.instance.on('updateComponent', this.emit('onUpdateComponent'));
      this.builder.instance.on('deleteComponent', this.emit('onDeleteComponent'));
      this.builder.instance.on('cancelComponent', this.emit('onCancelComponent'));
      this.builder.instance.on('editComponent', this.emit('onEditComponent'));
      this.builder.instance.on('saveComponent', this.onChange);
      this.builder.instance.on('updateComponent', this.onChange);
      this.builder.instance.on('deleteComponent', this.onChange);
    });
  };
  
  componentWillReceiveProps = (nextProps) => {
    const {options, form} = this.props;
    
    if (form !== nextProps.form) {
      this.initializeBuilder();
    }
    
    if (options !== nextProps.options) {
      this.initializeBuilder();
    }
  };
  
  render = () => {
    return <div ref={element => this.element = element} />;
  };
  
  onChange = () => {
    if (this.props.hasOwnProperty('onChange') && typeof this.props.onChange === 'function') {
      this.props.onChange(this.builder.instance.schema);
    }
  };
  
  emit = (funcName) => {
    return (...args) => {
      if (this.props.hasOwnProperty(funcName) && typeof (this.props[funcName]) === 'function') {
        this.props[funcName](...args);
      }
    };
  };
}

class FormRaw extends Component {
  static defaultProps = {
    options: {}
  };
  
  static propTypes = {
    src: PropTypes.string,
    form: PropTypes.object,
    submission: PropTypes.object,
    options: PropTypes.shape({
      readOnly: PropTypes.boolean,
      noAlerts: PropTypes.boolean,
      i18n: PropTypes.object,
      template: PropTypes.string
    }),
    onPrevPage: PropTypes.func,
    onNextPage: PropTypes.func,
    onChange: PropTypes.func,
    onCustomEvent: PropTypes.func,
    onSubmit: PropTypes.func,
    onSubmitDone: PropTypes.func,
    onFormLoad: PropTypes.func,
    onError: PropTypes.func,
    onRender: PropTypes.func
  };
  
  componentDidMount = () => {
    const {options, src, form} = this.props;
    
    if (src) {
      this.createPromise = new Form(this.element, src, options).render().then(formio => {
        this.formio = formio;
        this.formio.src = src;
      });
    }
    if (form) {
      this.createPromise = new Form(this.element, form, options).render().then(formio => {
        this.formio = formio;
        this.formio.form = form;
      });
    }
    
    this.initializeFormio();
  };
  
  componentWillUnmount = () => {
    if (this.formio !== undefined) {
      this.formio.destroy(true);
    }
  };
  
  initializeFormio = () => {
    if (this.createPromise) {
      this.createPromise.then(() => {
        if (this.props.submission) {
          this.formio.submission = this.props.submission;
        }
        //this.formio.hideComponents([]); (From Components.js)
        this.formio.on('prevPage', this.emit('onPrevPage'));
        this.formio.on('nextPage', this.emit('onNextPage'));
        this.formio.on('change', this.emit('onChange'));
        this.formio.on('customEvent', this.emit('onCustomEvent'));
        this.formio.on('formLoad', this.emit('onFormLoad'));
        this.formio.on('submit', this.emit('onSubmit'));
        this.formio.on('submitDone', this.emit('onSubmitDone'));
        this.formio.on('error', this.emit('onError'));
        this.formio.on('render', this.emit('onRender'));
      });
    }
  };
  
  componentWillReceiveProps = (nextProps) => {
    const {options, src, form, submission} = this.props;
    
    if (src !== nextProps.src) {
      this.createPromise = new Form(this.element, nextProps.src, options).render().then(formio => {
        this.formio = formio;
        this.formio.src = nextProps.src;
      });
      this.initializeFormio();
    }
    if (form !== nextProps.form) {
      this.createPromise = new Form(this.element, nextProps.form, options).render().then(formio => {
        this.formio = formio;
        this.formio.form = form;
      });
      this.initializeFormio();
    }
    
    if (submission !== nextProps.submission && this.formio) {
      this.formio.submission = nextProps.submission;
    }
  };
  
  render = () => {
    return <div ref={element => this.element = element} />;
  };
  
  emit = (funcName) => {
    return (...args) => {
      if (this.props.hasOwnProperty(funcName) && typeof (this.props[funcName]) === 'function') {
        this.props[funcName](...args);
      }
    };
  };
}




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
  
  getQuerySaveData = (newVal, id,urlStr,vertexLabel) =>
  {
    return {
      gremlin: "" +
      "def trans = graph.tx()\n" +
      "    try {\n" +
      "        if (!trans.isOpen()) {\n" +
      "            trans.open();\n" +
      "        }\n" +
      "        def vert = null;" +
      "        if (pg_id == null) {" +
      "            vert = g.addV('Object.Form');" +
      "            vert.property('Metadata.Type.Object.Form','Object.Form')" +
      "                .property('Metadata.Type','Object.Form');" +
      "        }" +
      "        else {" +
      "            vert = g.V(pg_id))" +
      "        }\n" +
      "        vert.property(\"Object.Form.Text\", pg_newValStr)" +
      "            .property('Object.Form.URL', pg_urlStr)" +
      "            .property('Object.Form.Vertex_Label', pg_vertexLabel)" +
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
        , pg_id: id
        , pg_urlStr: urlStr
        , pg_vertexLabel: vertexLabel
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
        
        
        <FormBuilderRaw ref={this.setFormBuilderRef} form={form} onChange={this.onChange}/>
        
        
        <Portal onClose={this.handleClose} open={open}>
          <Segment
            style={{
              height: '50%', width: '50%', overflowX: 'auto', overflowY: 'auto', left: '30%', position: 'fixed',
              top: '20%', zIndex: 100000, backgroundColor: '#696969', padding: '10px'
            }}>
            
            <FormRaw form={form} ref={this.setFormBuilderRef} onSubmit={this.onSubmit}/>
          
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