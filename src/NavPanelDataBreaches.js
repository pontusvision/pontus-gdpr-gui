
import React  from 'react';
import ResizeAware from 'react-resize-aware';

import GoldenLayout from 'golden-layout';

import NavPanelDataBreachPVGridDataBreachEvents from './NavPanelDataBreachPVGridDataBreachEvents';
import NavPanelDataBreachPVDataGraphDataBreached from './NavPanelDataBreachPVDataGraphDataBreached';
import NavPanelDataBreachPVDataGraphInfrastructure from './NavPanelDataBreachPVDataGraphInfrastructure';
import PontusComponent from "./PontusComponent";
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";
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
              title: 'Data',
              type: 'react-component',
              component: 'data-grid'
            }
            // , {
            //   title: 'Data Search',
            //   type: 'react-component',
            //   component: 'data-search'
            // }
            ,{
              title: 'Data Breach Graph',
              type: 'react-component',
              component: 'data-breach-graph'
            }
            ,{
              title: 'Infrastructure Graph',
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