import React from 'react';

import ResizeAware from 'react-resize-aware';

// import axios from "axios";
import Editor from 'react-quill'; // ES6

import 'react-quill/dist/quill.snow.css'; // ES6



class PVEmailEditor extends React.Component
{
  constructor(props)
  {
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    this.state = {maxHeight: 100};
    
  }
  
  
  handleResize = ({width, height}) =>
  {
    if (this.obj && this.obj.editingArea)
    {
      this.obj.editingArea.childNodes[0].style.maxHeight =  (height - 30) + "px";
      
    }
    this.setState({maxHeight: height});
    
  };
  
  setObj = (obj) =>
  {
    this.obj = obj;
  };
  
  componentDidMount()
  {
  
  
  }
  
  
  render()
  {
    // let eventHub = this.props.glEventHub;
    //
    
    
    return (
      <ResizeAware
        style={{width: '100%', height: 'calc(100% - 20px)', flex: 1}}
        onResize={this.handleResize}
      >
        <Editor
          style={{flex: 1, maxHeight: this.state.maxHeight}}
          ref={this.setObj}
          toolbarOnFocus
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        
        />
      
      
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