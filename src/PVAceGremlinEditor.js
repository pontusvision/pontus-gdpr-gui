import React from 'react';
import {Menu, Button} from 'semantic-ui-react';
import {Flex, Box} from 'reflexbox';
import AceEditor from 'react-ace';
import 'brace/mode/groovy';
import 'brace/theme/monokai';
import 'brace/ext/searchbox';



import axios from "axios";
import PontusComponent from "./PontusComponent";

// import "slickgrid-es6/dist/slick-default-theme.less";


class PVAceGremlinEditor extends PontusComponent
{
  constructor(props)
  {
    
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    this.url = PontusComponent.getGraphURL(props);
    this.state = {height: 1000, width: 1000};
    this.namespace = props.namespace || "";
    
  }
  
  getSearchObj = (data) =>
  {
    
    return {
      gremlin: data //JSON.stringify(data)
      
    }
  };
  
  runQuery = () =>
  {
    let val = localStorage.getItem('savedStatePVAceGremlinEditor') || "";
  
    this.props.glEventHub.emit(this.namespace + '-PVAceGremlinEditor-on-before-run-query', resp);
  
    this.sendData(val);
    
  }
  
  
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
    this.props.glEventHub.emit(this.namespace + '-PVAceGremlinEditor-on-change', err);
  };
  
  onSuccess = (resp) =>
  {
    this.props.glEventHub.emit(this.namespace + '-PVAceGremlinEditor-on-change', resp);
  };
  
  setObj = (obj) =>
  {
    this.obj = obj;
    // this.obj.container.parentNode.onresize = this.resize;
    // this.obj.container.parentNode.addEventListener("resize", this.resize);
  };
  
  
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
  
  onChange = (val, ev) =>
  {
    
    localStorage.setItem('savedStatePVAceGremlinEditor', val);
    // this.setState({value: val})
  };
  
  setOuterDiv = (od) =>
  {
    this.od = od;
    try
    {
      window.addResizeListener(this.od.offsetParent, this.handleResize);
      
    }
    catch (e)
    {
    
    }
  };
  
  componentWillUnmount()
  {
    window.removeResizeListener(this.od.offsetParent, this.handleResize);
    
  }
  
  
  render()
  {
    // let eventHub = this.props.glEventHub;
    //
    let val = localStorage.getItem('savedStatePVAceGremlinEditor') || "";
    //
    // <ResizeAware
    //   style={{width: '100%', height: 'calc(100% - 20px)', flex: 1 }}
    //   onResize={this.handleResize}
    //   ref={this.setObj}
    //
    //
//
//
//
//
// // >
//  <ReactResizeDetector handleWidth handleHeight onResize={this.handleResize}
//                       style={{height: this.state.height + 'px', width: this.state.width + 'px'}}
//
//  >
    return (
      
      <div
        // style={{
        //   height: 'calc(100%-5px)', width: 'calc(100%)', position: 'relative',
        // }}
        height={this.state.height}
        width={this.state.width}
        ref={this.setOuterDiv}
      >
        
        
        <Flex column w={1} wrap={true}>
          <Box px={2} w={1 / 4}>
            
            <Menu>
              <Button
                className={'compact'}
                onClick={this.runQuery}
                // inverted={false}
                // color={'black'}
                style={{border:0, background:'rgb(69,69,69)'}}
                size={'small'}
              >
                Send Query
              </Button>
              

            </Menu>
          </Box>
          <Box px={2} w={1 / 4}>
            <AceEditor
              mode="groovy"
              theme="monokai"
              onChange={this.onChange}
              name="gremlin-editor"
              editorProps={{$blockScrolling: true, useIncrementalSearch: true}}
              enableBasicAutocompletion={true}
              // enableLiveAutocompletion={true}
              tabSize={2}
              value={val}
              height={this.state.height -20 + "px"}
              width={this.state.width -20 + "px"}
              style={{overflow: 'auto', flexGrow: 1}}
              
              ref={this.setObj}
            />
          </Box>
        </Flex>
      
      
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


export default PVAceGremlinEditor;
