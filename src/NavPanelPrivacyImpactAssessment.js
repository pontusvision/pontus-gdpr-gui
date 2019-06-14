// import React from 'react';

import NavPanelPrivacyImpactAssessmentPVGrid from './NavPanelPrivacyImpactAssessmentPVGrid';
import NavPanelPrivacyImpactAssessmentDataGraph from './NavPanelPrivacyImpactAssessmentDataGraph';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";


class NavPanelPrivacyImpactAssessment extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'savedStateNavPanelPrivacyImpactAssessment';
    
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
            }, {
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
    
    this.instance.registerComponent('data-grid', NavPanelPrivacyImpactAssessmentPVGrid);
    this.instance.registerComponent('data-graph', NavPanelPrivacyImpactAssessmentDataGraph);
    
  };
  
}

export default NavPanelPrivacyImpactAssessment;