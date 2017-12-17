import React from 'react';

// import brace from 'brace';
import AceEditor from 'react-ace';
// import ResizeAware from 'react-resize-aware';
// import ReactResizeDetector from 'react-resize-detector';

import 'brace/mode/json';
import 'brace/theme/monokai';


// import axios from "axios";
// import "slickgrid-es6/dist/slick-default-theme.less";


class PVAceGremlinJSONQueryResults extends React.Component
{
  constructor(props)
  {
    
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    this.namespace = props.namespace || "";
    
    
    this.state = {value: "", height: 1000, width: 1000};
  }
  
  
  setValue = (data) =>
  {
    this.setState({value: data});
  }
  
  setObj = (obj) =>
  {
    this.obj = obj;
  };
  
  componentDidMount()
  {
    
    // super.componentDidMount();
    this.props.glEventHub.on(this.namespace + 'PVAceGremlinEditor-on-change', this.setValue);
    
  }
  
  componentWillUnmount()
  {
    // super.componentWillUnmount();
    // this.props.glEventHub.off(this.namespace + 'pvgrid-on-data-loaded', this.onDataLoadedCb);
    this.props.glEventHub.off(this.namespace + 'PVAceGremlinEditor-on-change', this.setValue);
    window.removeResizeListener(this.od.offsetParent, this.handleResize);
  
  }
  
  handleResize = () =>
  {
    try
    {
      
      let width = this.od.offsetParent.offsetWidth;
      let height = this.od.offsetParent.offsetHeight;
      this.setState({height: height, width: width});
      
      console.log(this);
    }
    catch (e)
    {
      console.log(e);
    }
    
  };
  
  setOuterDiv = (od) =>
  {
    this.od = od;
  
    try {
      window.addResizeListener(this.od.offsetParent, this.handleResize);
    
    }
    catch (e){
    
    }
    
  };
  
  render()
  {
    // let eventHub = this.props.glEventHub;
    //
    
    let data = this.state.value;
    if (typeof this.state.value === "object")
    {
      data = JSON.stringify(data, null, 2);
      
    }
    data = data.replace(/\\n/g, '"+\n"');
    data = data.replace(/\\t/g, '\t');
    return (
      
      <div
        ref={this.setOuterDiv}
        style={{
          height: 'calc(100%-5px)', width: 'calc(100%)', position: 'relative',
        }}

      >
        
        <AceEditor
          mode="json"
          theme="monokai"
          name="gremlin-query-results"
          editorProps={{$blockScrolling: true}}
          enableBasicAutocompletion={false}
          enableLiveAutocompletion={false}
          tabSize={2}
          readOnly={true}
          value={data}
          ref={this.setObj}
          // style={{height: this.state.height + 'px', width: this.state.width + 'px'}}
          height={this.state.height + "px"}
          width={this.state.width +"px"}
          style={{ overflow: 'auto'}}
        
        />
      </div>
    
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


export default PVAceGremlinJSONQueryResults;
