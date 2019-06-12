import React from 'react';

import NavPanelChildrenPVGrid from './NavPanelChildrenPVGrid';
import NavPanelChildrenPVBarChartChildrenAges from './NavPanelChildrenPVBarChartChildrenAges';
import NavPanelChildrenPVDataGraph from './NavPanelChildrenPVDataGraph';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";

// import UserSearch from './UserSearch';


class NavPanelChildren extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'savedStateNavPanelChildren';
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
            , {
              title: 'Children Ages',
              type: 'react-component',
              component: 'children-ages'
            }
            , {
              title: 'Children Data Graph',
              type: 'react-component',
              component: 'children-data-graph'
            }
          ]
        }
      ]
      
    };
    
  }
  
  
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
    
    this.instance.registerComponent('data-grid', NavPanelChildrenPVGrid);
    this.instance.registerComponent('children-ages', NavPanelChildrenPVBarChartChildrenAges);
    this.instance.registerComponent('children-data-graph', NavPanelChildrenPVDataGraph);
  }
}

export default NavPanelChildren;