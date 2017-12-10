import React from 'react';

// import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/monokai';


import axios from "axios";
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
  
  
    this.state = {value: ""};
  }
 
  
  setValue (data){
    this.setState({value: data});
  }
  
  setObj = (obj) =>
  {
    this.obj = obj;
  };
  
  componentDidMount()
  {
    
    // super.componentDidMount();
    this.props.glEventHub.on( 'PVAceGremlinEditor-on-change', this.setValue);
  
  }
  componentWillUnmount()
  {
    // this.props.glEventHub.off(this.namespace + 'pvgrid-on-data-loaded', this.onDataLoadedCb);
    this.props.glEventHub.off('PVAceGremlinEditor-on-change', this.setValue);
    
  }
  
  
  
  render()
  {
    // let eventHub = this.props.glEventHub;
    //
    
    
    return (
      <AceEditor
        mode="json"
        theme="dracula"
        name="gremlin-query-results"
        editorProps={{$blockScrolling: true}}
        enableBasicAutocompletion={false}
        enableLiveAutocompletion={false}
        height={'100%'}
        width={'100%'}
        tabSize={2}
        readOnly={true}
        value={this.state.value}
        ref={this.setObj}


      />
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
