
import React, {Component} from 'react';
import ResizeAware from 'react-resize-aware';

import GoldenLayout from 'golden-layout';

import PVDataGraph from './PVDataGraph';
import PVAceGremlinEditor from "./PVAceGremlinEditor";
import PVAceGremlinJSONQueryResults from "./PVAceGremlinJSONQueryResults";


class NavPanelTrackExpert extends Component
{
  constructor(props)
  {
    super(props);
    this.config = {
      settings: {
        hasHeaders: true,
        constrainDragToContainer: false,
        reorderEnabled: true,
        selectionEnabled: true,
        popoutWholeStack: false,
        blockedPopoutsThrowError: true,
        closePopoutsOnUnload: true,
        showPopoutIcon: false,
        showMaximiseIcon: false,
        showCloseIcon: false
      }
      , dimensions: {
        borderWidth: 5,
        minItemHeight: 10,
        minItemWidth: 10,
        headerHeight: 20,
        dragProxyWidth: 300,
        dragProxyHeight: 200
      }
      , content: [
        {
          type: 'column',
          content: [
            {
              title: 'Gremlin Editor',
              type: 'react-component',
              component: 'gremlin-editor'
            }
            ,
            {
              title: 'Query Results',
              type: 'react-component',
              component: 'query-results'
            }
            , {
              title: 'Query Graph',
              type: 'react-component',
              component: 'data-graph'
            }
            
          ]
        }
      ]
      
    };
    
    this.state = {height: props.height , width: props.width};
    
  }
  
  shouldComponentUpdate(){
    return false;
  }
  
  deselect= ()=>{
  
  };
  
  componentDidMount()
  {
    /* you can pass config as prop, or use a predefined one */
    
    // var savedState = null;// LPPM: TODO: re-enable this later localStorage.getItem('savedStatePontusPanel');
    var savedState =  localStorage.getItem('savedStateNavPanelTrackExpert');
    
    
    if (savedState !== null)
    {
      this.instance = new GoldenLayout(JSON.parse(savedState), this.node);
    }
    else
    {
      this.instance = new GoldenLayout(this.config, this.node);
    }
    
    // instance = new GoldenLayout(config, this.node);
    /* register components or bind events to your new instance here */
    this.instance.registerComponent('gremlin-editor', PVAceGremlinEditor);
    this.instance.registerComponent('query-results', PVAceGremlinJSONQueryResults);
    this.instance.registerComponent('data-graph', PVDataGraph);
    this.instance.init();
    
    // this.instance.on('resize', ({a,b})=>{
    //   this.handleResize({width:a, height: b });
    // });
    
    this.instance.on('tabCreated', function (tab)
    {
      tab.closeElement.off('click').click(function ()
      {
        // if( confirm( 'You have unsaved changes, are you sure you want to close this tab' ) ) {
        //     tab.contentItem.remove();
        // }
      })
    });
    
    this.instance.on('stateChanged', this.saveState);
    
  }
  
  saveState = () =>
  {
    var state = JSON.stringify(this.instance.toConfig());
    localStorage.setItem('savedStateNavPanelTrackExpert', state);
    
  };
  
  setNode = (node) =>
  {
    this.node = node;
  };
  
  // handleResize = ({width, height}) =>
  // {
  //   if (height > 0){
  //     this.instance.updateSize(width, height);
  //
  //   }
  //   else{
  //     this.instance.updateSize(width,window.innerHeight - 50);
  //   }
  // };
  
  
  handleResize = () =>
  {
    try
    {
      
      let width = this.node.offsetParent.offsetWidth;
      let height = this.node.offsetParent.offsetHeight;
      // this.setState({height: height, width: width});
      if (this.instance){
        this.instance.updateSize(width, height);
  
      }
  
      console.log(this);
    }
    catch (e)
    {
      console.log(e);
    }
    
  };
  
 
  
  
  
  
  /*
 
   <div
   // style={{height: this.state.height+'px', width: this.state.width+'px'}}
   height={this.state.height}
   width={this.state.width }
 
   ref={this.setOuterDiv}/>
   */
  
  render()
  {
    
    return (
      <ResizeAware
         style={{height: '100%', width: '100%'}}
      >
        <div
         style={{height: '100%', width: '100%'}}
          ref={this.setNode}
        />
      </ResizeAware>
  
    )
    
  }
}
export default NavPanelTrackExpert;
