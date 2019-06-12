import React from 'react';

import NavPanelInternationalPVGridRegulators from './NavPanelInternationalPVGridRegulators';
import NavPanelInternationalPVDataGraph from './NavPanelInternationalPVDataGraph';
// import PVTemplateEditor from './PVTemplateEditor';
import PVWorldMap from "./PVWorldMap";
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";


class NavPanelInternational extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'savedStateNavPanelInternational';
    
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
              title: 'World Map',
              type: 'react-component',
              component: 'world-map'
            }
            , {
              title: 'Data Graph',
              type: 'react-component',
              component: 'data-graph'
            }
          ]
        }
      ]
      
    };
    
  }
  
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
    
    // this.instance.registerComponent('data-grid', NavPanelInformationYouHoldPVGrid);
    // this.instance.registerComponent('compliance-email', PVTimeline);
    this.instance.registerComponent('data-grid', NavPanelInternationalPVGridRegulators);
    this.instance.registerComponent('world-map', PVWorldMap);
    this.instance.registerComponent('data-graph', NavPanelInternationalPVDataGraph);
    
  };
  
  
}

export default NavPanelInternational;