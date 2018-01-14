import React from 'react';
import ResizeAware from 'react-resize-aware';
import {Menu, Button, Segment, Portal, Sidebar} from 'semantic-ui-react';
import {Flex, Box} from 'reflexbox';
import {Creatable} from 'react-select';
import './react-select.css';
// import axios from "axios";
import Editor from 'react-quill'; // ES6

import 'react-quill/dist/quill.snow.css';
// import GremlinComboBox from "./GremlinComboBox";
// import 'semantic-ui-css/semantic.min.css';

class PVEmailEditor extends React.Component
{
  
  state = {
    maxHeight: 100
    , open: false
    , visible: false
    , preview: <div></div>
  };
  
  constructor(props)
  {
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    
  }
  
  
  handleResize = ({width, height}) =>
  {
    if (this.obj && this.obj.editingArea)
    {
      this.obj.editingArea.childNodes[0].style.maxHeight = (height - 60) + "px";
      
    }
    this.setState({maxHeight: height});
    
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
    this.setState({ visible: !this.state.visible })
  }
  
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
              
              <Button
                className={'compact'}
                onClick={this.onClickSave}
                style={{border: 0, background: 'rgb(69,69,69)', margin: 4}}
                size={'small'}
              >
                Clear
              </Button>
            </Menu>
  
  
          </Box>
          <Box>
            
  
            <Sidebar.Pushable as={Segment}>
              <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
                <Menu.Item name='home'>
                  <Creatable
                    name={this.props.name || "form-field-name"}
                    // key={this.state.value.length}
                    // value={this.state.value}
                    // multi={this.props.multi === null? true : this.props.multi}
                    // options={this.state.options}
                    joinValues={true}
                    delimiter={","}
                    onChange={this.onChange}
                    style={{border: 0, background: 'rgb(69,69,69)', marginRight: 4, height: 20}}
  
                  >
                  </Creatable>

                </Menu.Item>

              </Sidebar>
              <Sidebar.Pusher>
                <Segment basic>
                  <Editor
                    style={{
                      flex: 1, maxHeight: this.state.maxHeight }}
                    ref={this.setObj}
                    toolbarOnFocus
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
  
                  />
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>

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