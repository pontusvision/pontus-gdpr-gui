
import React from 'react';
import ResizeAware from 'react-resize-aware';

import GoldenLayout from 'golden-layout';

import NavPanelChildrenPVGrid from './NavPanelChildrenPVGrid';
import NavPanelChildrenPVBarChartChildrenAges from './NavPanelChildrenPVBarChartChildrenAges';
import NavPanelChildrenPVDataGraph from './NavPanelChildrenPVDataGraph';
import PontusComponent from "./PontusComponent";
// import UserSearch from './UserSearch';


class NavPanelChildren extends PontusComponent
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
              title: 'Data',
              type: 'react-component',
              component: 'data-grid'
            }
            ,{
              title: 'Children Ages',
              type: 'react-component',
              component: 'children-ages'
            }
            ,{
              title: 'Children Data Graph',
              type: 'react-component',
              component: 'children-data-graph'
            }
          ]
        }
      ]
      
    };
    
  }
  customStringify = (v) => {
  const cache = new Map();
  return JSON.stringify(v, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.get(value)) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.set(value, true);
    }
    return value;
  });
};
  
  
  select= ()=>{
  
  };
  
  deselect= ()=>{
  
  };
  
  
  componentDidMount()
  {
    /* you can pass config as prop, or use a predefined one */
    
    
    let savedState =  localStorage.getItem('savedStateNavPanelChildren');
    
    
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
    this.instance.registerComponent('data-grid', NavPanelChildrenPVGrid);
    this.instance.registerComponent('children-ages', NavPanelChildrenPVBarChartChildrenAges);
    this.instance.registerComponent('children-data-graph', NavPanelChildrenPVDataGraph);
    this.instance.init();
    
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
    try{
      let stateObj = this.instance.toConfig();
      let state = this.customStringify(stateObj);
      localStorage.setItem('savedStateNavPanelChildren', state);
  
    }
    catch(e){
      // e;
    }
  };
  
  setNode = (node) =>
  {
    this.node = node;
  };
  
  handleResize = ({width, height}) =>
  {
    if (height > 0)
    {
      this.instance.updateSize(width, height);
  
    }
    else{
      this.instance.updateSize(width,window.innerHeight - 50);
  
    }
  };
  
  render()
  {
    
    return (         <ResizeAware
        style={{height: 'calc(100% - 20px)', width: '100%'}}
        onResize={this.handleResize}
      >
        <div style={{height: '100%', width: '100%'}} ref={this.setNode}/>
      </ResizeAware>
    )
    
  }
}
export default NavPanelChildren;