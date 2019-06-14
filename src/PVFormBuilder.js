import React, {Component} from 'react';
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

class FormBuilderRaw extends Component
{
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
  
  constructor(props)
  {
    super(props);
    this.form = props.form;
    
    this.state = {
      form: this.form
    }
    
  }
  
  componentDidMount = () =>
  {
    // this.initializeBuilder();
  };
  
  componentWillUnmount = () =>
  {
    if (this.builder !== undefined)
    {
      this.builder.instance.destroy(true);
    }
  };
  
  initializeBuilder = () =>
  {
    // const {options, form} = this.props;
    
    // this.form
    
    if (this.builder !== undefined)
    {
      this.builder.instance.destroy(true);
      this.builder = undefined;
    }
    
    this.form = this.props.form;
    
    if (this.form != null)
    {
      this.builder = new FormBuilder(this.element, this.form, this.props.options);
      this.builderReady = this.builder.setDisplay(this.form.display);
      
      this.builderReady.then(() =>
      {
        this.builder.instance.on('saveComponent', this.emit('onSaveComponent'));
        this.builder.instance.on('updateComponent', this.emit('onUpdateComponent'));
        this.builder.instance.on('deleteComponent', this.emit('onDeleteComponent'));
        this.builder.instance.on('cancelComponent', this.emit('onCancelComponent'));
        this.builder.instance.on('editComponent', this.emit('onEditComponent'));
        this.builder.instance.on('saveComponent', this.onChange);
        this.builder.instance.on('updateComponent', this.onChange);
        this.builder.instance.on('deleteComponent', this.onChange);
      });
    }
  };
  
  // componentWillReceiveProps = (nextProps) =>
  // {
  //   const {options, form} = this.props;
  //
  //   if (form !== nextProps.form)
  //   {
  //     this.initializeBuilder();
  //   }
  //
  //   if (options !== nextProps.options)
  //   {
  //     this.initializeBuilder();
  //   }
  // };
  
  setForm = (form) =>
  {
    this.setState({form: form});
  };
  
  setElement = (element) =>
  {
  
    if (element){
      this.element = element;
      this.initializeBuilder();
    
    }
    
    
  };
  
  render = () =>
  {
    
    if (this.element)
    {
      this.setElement(this.element);
    }
    return <div ref={this.setElement}/>;
  };
  
  onChange = () =>
  {
    if (this.props.hasOwnProperty('onChange') && typeof this.props.onChange === 'function')
    {
      this.props.onChange(this.builder.instance.schema);
    }
  };
  
  emit = (funcName) =>
  {
    return (...args) =>
    {
      if (this.props.hasOwnProperty(funcName) && typeof (this.props[funcName]) === 'function')
      {
        this.props[funcName](...args);
      }
    };
  };
}

class FormRaw extends Component
{
  static defaultProps = {
    options: {}
  };
  
  static propTypes = {
    src: PropTypes.string,
    form: PropTypes.object,
    submission: PropTypes.object,
    options: PropTypes.shape({
      readOnly: PropTypes.bool,
      noAlerts: PropTypes.bool,
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
  
  
  constructor(props)
  {
    super(props);
    this.form = this.props.form;
    this.state = {form: this.form}
    
    
  }
  
  componentDidMount = () =>
  {
    // const {options, src, form} = this.props;
    //
    // if (src)
    // {
    //   this.createPromise = new Form(this.element, src, options).render().then(formio =>
    //   {
    //     this.formio = formio;
    //     this.formio.src = src;
    //   });
    // }
    // if (form)
    // {
    //   this.createPromise = new Form(this.element, form, options).render().then(formio =>
    //   {
    //     this.formio = formio;
    //     this.formio.form = form;
    //   });
    // }
    //
    // this.initializeFormio();
  };
  
  componentWillUnmount = () =>
  {
    if (this.formio !== undefined)
    {
      this.formio.destroy(true);
    }
  };
  
  initializeFormio = () =>
  {
    if (this.createPromise)
    {
      this.createPromise.then(() =>
      {
        if (this.props.submission)
        {
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
  
  // componentWillReceiveProps = (nextProps) =>
  // {
  //   const {options, src, form, submission} = this.props;
  //
  //   if (src !== nextProps.src)
  //   {
  //     this.createPromise = new Form(this.element, nextProps.src, options).render().then(formio =>
  //     {
  //       this.formio = formio;
  //       this.formio.src = nextProps.src;
  //     });
  //     this.initializeFormio();
  //   }
  //   if (form !== nextProps.form)
  //   {
  //     this.setState({form: nextProps.form});
  //   }
  //
  //   if (submission !== nextProps.submission && this.formio)
  //   {
  //     this.formio.submission = nextProps.submission;
  //   }
  // };
  
  //
  
  setForm = (form) =>
  {
    // TODO: SET THE FORM HERE?????
    
    this.setState({form: form});
    
    
  };
  
  setElement = (element) =>
  {
    
    this.element = element;
    
    const {form} = this.state;
    
    this.form = form;
    
    if (this.form)
    {
      if (this.formio !== undefined)
      {
        this.formio.destroy(true);
      }
      
      this.createPromise = new Form(this.element, this.form, this.props.options).render().then(formio =>
      {
        this.formio = formio;
        this.formio.form = form;
      });
      
      this.initializeFormio();
      
    }
    
    
  };
  
  render = () =>
  {
    if (this.element != null)
    {
      this.setElement(this.element);
    }
    
    return <div ref={this.setElement}/>;
  };
  
  emit = (funcName) =>
  {
    return (...args) =>
    {
      if (this.props.hasOwnProperty(funcName) && typeof (this.props[funcName]) === 'function')
      {
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
    
    if (props.formB64)
    {
      this.formB64 = props.formB64;
      this.formPlainText = Base64.decode(this.formB64);
      
    }
    else if (props.formPlainText)
    {
      this.formPlainText = props.formPlainText;
      this.formB64 = Base64.encode(this.formPlainText);
      
    }
    else
    {
      this.formPlainText = JSON.stringify({'display': 'form'});
      this.formB64 = Base64.encode(this.formPlainText);
    }
    try
    {
      this.form = JSON.parse(this.formPlainText);
      
    }
    catch (t)
    {
      this.form = {'display': 'form'};
      
    }
    
    this.formURL = props.formURL;
    this.formId = props.formId;
    this.formVertexLabel = props.formVertexLabel;
    
    
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
      , formB64: this.formB64
      , formPlainText: this.formPlainText
      , formURL: this.formURL
      , formId: this.formId
      , formVertexLabel: this.formVertexLabel
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
  
  getQuerySaveData = (formB64, formId, formURL, formVertexLabel) =>
  {
    return {
      gremlin: "" +
      "def trans = graph.tx()\n" +
      "    try {\n" +
      "        if (!trans.isOpen()) {\n" +
      "            trans.open();\n" +
      "        }\n" +
      "        def vert = null;\n" +
      "        if (pg_id == null) {\n" +
      "            g.addV('Object.Form')\n" +
      "             .property('Metadata.Type.Object.Form','Object.Form')\n" +
      "             .property('Metadata.Type','Object.Form')\n" +
      "             .property('Object.Form.Text', pg_newValStr)\n" +
      "             .property('Object.Form.URL', pg_urlStr)\n" +
      "             .property('Object.Form.Vertex_Label', pg_vertexLabel)\n" +
      "             .next();\n" +
      "        }" +
      "        else {" +
      "            g.V(pg_id)\n" +
      "             .property('Object.Form.Text', pg_newValStr)\n" +
      "             .property('Object.Form.URL', pg_urlStr)\n" +
      "             .property('Object.Form.Vertex_Label', pg_vertexLabel)\n" +
      "             .next();\n" +
      "        }\n" +
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
        pg_newValStr: formB64
        , pg_id: formId
        , pg_urlStr: formURL
        , pg_vertexLabel: formVertexLabel
      }
      
    };
  };
  saveData = (formB64, formId, formURL, formVertexLabel) =>
  {
    this.props.glEventHub.emit(this.namespace + '-pvform-on-save-form', {
      formB64: formB64, formId: formId, formURL: formURL, formVertexLabel: formVertexLabel
    });
    
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
      
      axios.post(url, this.getQuerySaveData(formB64, formId, formURL, formVertexLabel), {
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
          this.onErrorSaveData(formB64, formId, formURL, formVertexLabel, thrown);
        }
      });
      
      
    }, 50);
    
  };
  
  onErrorSaveData = (formB64, formId, formURL, formVertexLabel, thrown) =>
  {
    this.errorCount++;
    if (this.errorCount > 5)
    {
      console.error("Failed to get graph data:" + thrown);
      
    }
    
    else
    {
      this.saveData(formB64, formId, formURL, formVertexLabel);
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
      console.error("Failed to get graph data:" + thrown);
      
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
    
    this.setState({open: false, visible: false});
    
    
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
    
    this.saveData(this.formB64, this.state.formId, this.state.formURL, this.state.formVertexLabel);
    
    
    // TODO: EMIT A SAVE STATE SO THE GRID CAN UPDATE ITS in_MEM VALUE!!!!!
  };
  
  handleClose = () => this.setState({open: false});
  
  // previewDiv  = (previewDivObj) => {
  //   this.previewDivObj = previewDivObj;
  //   this.previewDivObj.setInnerHtml(this.previewDivObj,"hello world")
  // };
  
  onChangeSchema = (schema) =>
  {
    this.form = schema;
    this.formPlainText = JSON.stringify(this.form);
    this.formB64 = Base64.encode(this.formPlainText);
    
    // this.setState ({form: this.form, formPlainText: this.formPlainText, formB64: this.formB64})
  };
  
  setFormBuilderRef = (formBuilder) =>
  {
    this.formBuilderRef = formBuilder;
    // this.formBuilderRef.setState ({ form: this.form});
  };
  
  setFormViewRef = (formRef) =>
  {
    this.formViewRef = formRef;
  };
  
  
  onSubmit = (event) =>
  {
    console.log("FORM data:" + JSON.stringify(event) + "\n" + JSON.stringify(this.state));
  };
  
  
  getFormFromB64 = (formB64) =>
  {
    
    const formPlainText = Base64.decode(formB64);
    
    try
    {
      this.form = JSON.parse(formPlainText);
      
    }
    catch (t)
    {
      this.form = null;
      
    }
    
    return this.form;
    
  };
  
  
  render()
  {
    // let eventHub = this.props.glEventHub;
    //
    const {open, formB64} = this.state;
    
    const form = this.getFormFromB64(formB64);
    
    const formBuilder = (form == null) ? <div/>
      :  <FormBuilderRaw ref={this.setFormBuilderRef} form={ form } onChange={this.onChangeSchema}/>;
  
  
    if (this.formBuilderRef != null)
    {
      this.setFormBuilderRef(this.formBuilderRef);
    }
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
        
         { formBuilder }
        
        <Portal onClose={this.handleClose} open={open}>
          <Segment
            style={{
              height: '50%', width: '50%', overflowX: 'auto', overflowY: 'auto', left: '30%', position: 'fixed',
              top: '20%', zIndex: 100000, backgroundColor: '#696969', padding: '10px'
            }}>
            
            <FormRaw form={form} ref={this.setFormViewRef} onSubmit={this.onSubmit}/>
          
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

export default PVFormBuilder
export {FormRaw};

