// import React from 'react';

import NavPanelDataBreachPVGridDataBreachEvents from './NavPanelDataBreachPVGridDataBreachEvents';
import NavPanelDataBreachPVDataGraphDataBreached from './NavPanelDataBreachPVDataGraphDataBreached';
import NavPanelDataBreachPVDataGraphInfrastructure from './NavPanelDataBreachPVDataGraphInfrastructure';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";
import PontusComponent from "./PontusComponent";

// import PVTemplateEditor from './PVTemplateEditor';


class NavPanelDataBreaches extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'savedStateNavPanelDataBreaches';
    
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
            }
            // , {
            //   title: 'Data Search',
            //   type: 'react-component',
            //   component: 'data-search'
            // }
            , {
              title: PontusComponent.t('Data Breach Graph'),
              type: 'react-component',
              component: 'data-breach-graph'
            }
            , {
              title: PontusComponent.t('Infrastructure Graph'),
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
    /* register components or bind events to your new instance here */
    this.instance.registerComponent('data-grid', NavPanelDataBreachPVGridDataBreachEvents);
    this.instance.registerComponent('data-breach-graph', NavPanelDataBreachPVDataGraphDataBreached);
    this.instance.registerComponent('data-graph', NavPanelDataBreachPVDataGraphInfrastructure);
    
  };
  
}

export default NavPanelDataBreaches;