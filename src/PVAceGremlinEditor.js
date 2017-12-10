import React from 'react';

// import brace from 'brace';
import AceEditor from 'react-ace';
import ResizeAware from 'react-resize-aware';

import 'brace/mode/groovy';
import 'brace/theme/monokai';


import axios from "axios";
// import "slickgrid-es6/dist/slick-default-theme.less";


class PVAceGremlinEditor extends React.Component
{
  constructor(props)
  {
  
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    this.url = props.url || "/gateway/sandbox/pvgdpr_graph";
  
    
  
  
  }
  getSearchObj = (data) =>
  {
    
    return {
      gremlin: JSON.stringify(data)
      
    }
  };
  
  
  
  sendData = (data) =>
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
      
      
      
      // http.post(url)
      axios.post(url
        , self.getSearchObj(data)
        , {
        headers: {
          'Content-Type': 'application/json'
          , 'Accept': 'application/json'
        }
        , cancelToken: self.req.token
      }).then(self.onSuccess).catch((thrown) =>
      {
        if (axios.isCancel(thrown))
        {
          console.log('Request canceled', thrown.message);
        }
        else
        {
          self.onError(thrown);
        }
      });
  
    }, 50);
  };
  onError = (err) =>
  {
    this.props.glEventHub.emit(this.namespace + 'PVAceGremlinEditor-on-change', err);
  };
  
  onSuccess = (resp) =>
  {
    this.props.glEventHub.emit(this.namespace + 'PVAceGremlinEditor-on-change', resp);
  };
  
  setObj = (obj) =>
  {
    this.obj = obj;
  };
  
  handleResize = ({width, height}) =>
  {
    if (this.obj && this.obj.editingArea)
    {
      this.obj.editingArea.childNodes[0].style.maxHeight =  (height - 30) + "px";
      
    }
    this.setState({maxHeight: height});
    
  };
  
  onChange = (val, ev) => {
  
    localStorage.setItem('savedStatePVAceGremlinEditor',val);
    // this.setState({value: val})
  }
  
  render()
  {
    // let eventHub = this.props.glEventHub;
    //
    let val = localStorage.getItem('savedStatePVAceGremlinEditor')|| "";
    
    return (
      <ResizeAware
        style={{width: '100%', height: 'calc(100% - 20px)', flex: 1}}
        onResize={this.handleResize}
      >
  
      <AceEditor
        mode="groovy"
        theme="monokai"
       onChange={this.onChange}
        name="gremlin-editor"
        editorProps={{$blockScrolling: true}}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        tabSize={2}
        ref={this.setObj}
        value={val}

        // height={this.state.height}
        // width={'100%'}

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


export default PVAceGremlinEditor;
