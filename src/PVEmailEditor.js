import React from 'react';
import ResizeAware from 'react-resize-aware';
import {Menu, Button, Segment, Portal} from 'semantic-ui-react';
import {Flex, Box} from 'reflexbox';
// import {Creatable} from 'react-select';
import './react-select.css';
import axios from "axios";
import Editor from 'react-quill'; // ES6

import 'react-quill/dist/quill.snow.css';

class PVEmailEditor extends React.Component
{
  
  constructor(props)
  {
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    this.errorCount = 0;
    this.state  = {
      maxHeight: 100
      , open: false
      , visible: false
      , preview: <div></div>
      , value: ""
    };
  }
  
  
  handleResize = ({width, height}) =>
  {
    if (this.obj && this.obj.editingArea)
    {
      this.obj.editingArea.childNodes[0].style.maxHeight = (height - 60) + "px";
      
    }
    this.setState({maxHeight: height});
    
  };
  
  saveData = (newVal, lastData) =>
  {
    // this.origNodeId = (+(this.origNodeId));
    let url = "/gateway/sandbox/pvgdpr_graph"; // "/gateway/sandbox/pvgdpr_server/home/graph";
    if (this.h_request !== null)
    {
      clearTimeout(this.h_request);
    }
  
    let self = this;
    this.h_request = setTimeout(() =>
    {
      let CancelToken = axios.CancelToken;
      self.req = CancelToken.source();
    
      axios.post(url, this.getQuery(newVal, lastData), {
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
          this.onError(newVal, lastData, thrown);
        }
      });
    
    
    }, 50);
  
  };
  
  onError = (newVal, lastData, thrown) =>
  {
    this.errorCount++;
    if (this.errorCount > 5)
    {
      alert("Failed to get graph data:" + thrown);
      
    }
    
    else
    {
      this.saveData(newVal,lastData);
    }
  };
  
  
  onSuccess = (resp) =>
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
        // let items = respParsed.data.result.data['@value'][0];
        //
        //
        // if (typeof items !== 'object')
        // {
        //   items = JSON.parse(items);
        // }
        //
        // let nodes = this.addMainNodeProperties(items.nodes);
        //
        //
        // let graph = {nodes: nodes, edges: items.edges};
        //
        // this.setState({graph: graph});
        // localStorage.setItem(this.subscription, graph);
        
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
  
    this.setState(
      {
        open: !this.state.open
        , preview:this.obj.getEditorContents()
      }
      );
  };
  
  onClickSave = () =>{
    // this.setState({ visible: !this.state.visible });
  
    let newVal = this.obj.getEditorContents();
    if (this.lastData){
      this.saveData(newVal,this.lastData);
      this.lastData['Object.Notification_Templates.Text'] = newVal;
  
    }
  };
  
  handleClose = () => this.setState({ open: false });
  
  previewDiv  = (previewDivObj) => {
    this.previewDivObj = previewDivObj;
    this.previewDivObj.setInnerHtml(this.previewDivObj,"hello world")
  };
  
  render()
  {
    // let eventHub = this.props.glEventHub;
    //
    const { open, visible } = this.state;
  
    let templateOptions = [{key: 'af', value: 'af', flag: 'af', text: 'Afghanistan'}];
    
    return (
      <ResizeAware
        style={{width: '100%', height: 'calc(100% - 20px)', flex: 1}}
        onResize={this.handleResize}
      >
        
        <Flex column w={1} wrap={true}>
          <Box px={2} w={1}>
            
            <Menu>
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
  
  
          </Box>
          <Box>
            <Editor
              style={{
                flex: 1, maxHeight: this.state.maxHeight }}
              ref={this.setObj}
              toolbarOnFocus
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              value={this.state.value}
  
            />


          </Box>
        </Flex>
  
        <Portal onClose={this.handleClose} open={open}>
          <Segment
            style={{ height:'50%' , width:'50%', overflowX: 'auto', overflowY: 'auto',  left: '30%', position: 'fixed', top: '20%', zIndex: 100000, backgroundColor: '#696969' }}>
            <div dangerouslySetInnerHTML={{__html: this.state.preview}}/>
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


export default PVEmailEditor;