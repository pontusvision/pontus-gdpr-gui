// import React from 'react';


import NavPanelAwarenessPVGridEmployees from './NavPanelAwarenessPVGridEmployees';
import NavPanelAwarenessPVGrid from './NavPanelAwarenessPVGrid';


import PVDoughnutChart from './PVDoughnutChart';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";
import PontusComponent from "./PontusComponent";
import NavPanelAwarenessPVDataGraph from "./NavPanelAwarenessPVDataGraph";

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
      , _dimensions: {
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
              "type": "stack", "height": 50, "isClosable": true, "reorderEnabled": true, "title": "",
              "activeItemIndex": 0, "content": [
                {
                  "title": PontusComponent.t('Awareness Campaigns'), "type": "component",
                  "component": "awareness-campaign-data-grid", "componentName": "lm-react-component",
                  "isClosable": true, "reorderEnabled": true
                }
              ]
            }, {
              "type": "row", "isClosable": true, "reorderEnabled": true, "title": "", "height": 50, "content": [
                {
                  "type": "stack", "height": 50, "isClosable": true, "reorderEnabled": true, "title": "",
                  "activeItemIndex": 0, "width": 59.50752393980848, "content": [
                    {
                      "title": PontusComponent.t('Employees'), "type": "component", "component": "employees-grid",
                      "componentName": "lm-react-component", "isClosable": true, "reorderEnabled": true
                    }
                  ]
                }, {
                  "type": "stack", "header": {}, "isClosable": true, "reorderEnabled": true, "title": "",
                  "activeItemIndex": 0, "width": 40.49247606019152, "content": [
                    {
                      "title": PontusComponent.t('Charts'), "type": "component",
                      "component": "awareness-campaign-employees-pie-charts", "componentName": "lm-react-component",
                      "isClosable": true, "reorderEnabled": true
                    }
                  ]
                },
                {
                  "type": "stack", "header": {}, "isClosable": true, "reorderEnabled": true, "title": "",
                  "activeItemIndex": 0, "width": 40.49247606019152, "content": [
                    {
                      "title": PontusComponent.t('Data Graph'), "type": "component",
                      "component": "awareness-campaign-data-graph", "componentName": "lm-react-component",
                      "isClosable": true, "reorderEnabled": true
                    }
                  ]
                }
              ]
            }
            
            
          ]
        }
      ]
      
    };
    
    
    
  }
  
  
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
    
    this.instance.registerComponent('awareness-campaign-data-grid', NavPanelAwarenessPVGrid);
    this.instance.registerComponent('employees-grid', NavPanelAwarenessPVGridEmployees);
    this.instance.registerComponent('awareness-campaign-employees-pie-charts', PVDoughnutChart);
    this.instance.registerComponent('awareness-campaign-data-graph', NavPanelAwarenessPVDataGraph);
    
  };
  
  
}

export default NavPanelAwareness;
