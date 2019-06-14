// import React from 'react';
import NavPanelInformationYouHoldPVDataGraph from './NavPanelInformationYouHoldPVDataGraph';
import NavPanelInformationYouHoldPVDoughnutChartTypes from './NavPanelInformationYouHoldPVDoughnutChartTypes';
import NavPanelInformationYouHoldPVGridEventIngestion from './NavPanelInformationYouHoldPVGridEventIngestion';
import NavPanelInformationYouHoldIngestionTimeline from './NavPanelInformationYouHoldIngestionTimeline';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";


class NavPanelInformationYouHold extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'savedStateNavPanelInformationYouHold';
    
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
            // {
            //   title: 'Data',
            //   type: 'react-component',
            //   component: 'data-grid'
            // }
            // ,{
            //   title: 'Compliance Emails',
            //   type: 'react-component',
            //   component: 'compliance-email'
            // }
            // ,
            {
              title: 'Data Graph',
              type: 'react-component',
              component: 'data-graph'
            }
            , {
              title: 'Data Types',
              type: 'react-component',
              component: 'data-types-doughnut'
            }
            , {
              title: 'Unmatched Records',
              type: 'react-component',
              component: 'data-grid-unmatched'
            }
            , {
              title: 'Ingestion Events',
              type: 'react-component',
              component: 'data-events-timeline'
              
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
    this.instance.registerComponent('data-graph', NavPanelInformationYouHoldPVDataGraph);
    this.instance.registerComponent('data-types-doughnut', NavPanelInformationYouHoldPVDoughnutChartTypes);
    this.instance.registerComponent('data-grid-unmatched', NavPanelInformationYouHoldPVGridEventIngestion);
    this.instance.registerComponent('data-events-timeline', NavPanelInformationYouHoldIngestionTimeline);
    
  };
  
}

export default NavPanelInformationYouHold;