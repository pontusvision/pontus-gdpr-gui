// import React from 'react';

import NavPanelDataProtnOfficerPVGrid from './NavPanelDataProtnOfficerPVGrid';
import NavPanelDataProtnOfficerPVDataGraph from './NavPanelDataProtnOfficerPVDataGraph';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";
import PontusComponent from "./PontusComponent";


class NavPanelDataProtnOfficer extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'savedStateNavPanelDataProtnOfficer';
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
              title: PontusComponent.t('Data'),
              type: 'react-component',
              component: 'data-grid'
            }, {
              title: PontusComponent.t('Data Graph'),
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
    
    this.instance.registerComponent('data-grid', NavPanelDataProtnOfficerPVGrid);
    this.instance.registerComponent('data-graph', NavPanelDataProtnOfficerPVDataGraph);
  };
}

export default NavPanelDataProtnOfficer;