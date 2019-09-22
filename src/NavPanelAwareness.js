// import React from 'react';


import PVGridEmployees from './PVGridEmployees';
import PVGridAwarenessCampaign from './PVGridAwarenessCampaign';


import PVDoughnutChart from './PVDoughnutChart';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";
import PontusComponent from "./PontusComponent";

class NavPanelAwareness extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'savedStateNavPanelAwareness';
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
              title: PontusComponent.t('Awareness Campaigns'),
              type: 'react-component',
              component: 'awareness-campaign-data-grid'
            }, {
              title: PontusComponent.t('Employees'),
              type: 'react-component',
              component: 'employees-grid'
            }, {
              title: PontusComponent.t('Charts'),
              type: 'react-component',
              component: 'awareness-campaign-employees-pie-charts'
            }
          
          ]
        }
      ]
      
    };
    
  }
  
  
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
    
    this.instance.registerComponent('awareness-campaign-data-grid', PVGridAwarenessCampaign);
    this.instance.registerComponent('employees-grid', PVGridEmployees);
    this.instance.registerComponent('awareness-campaign-employees-pie-charts', PVDoughnutChart);
    
  };
  
  
}

export default NavPanelAwareness;
