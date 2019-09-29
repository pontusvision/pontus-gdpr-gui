// import React from 'react';
import NavPanelInformationYouHoldPVDataGraph from './NavPanelInformationYouHoldPVDataGraph';
import NavPanelInformationYouHoldPVDoughnutChartTypes from './NavPanelInformationYouHoldPVDoughnutChartTypes';
import NavPanelInformationYouHoldPVGridEventIngestion from './NavPanelInformationYouHoldPVGridEventIngestion';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";
import NavPanelInformationYouHoldPVGrid from "./NavPanelInformationYouHoldPVGrid";
import PontusComponent from "./PontusComponent";
import NavPanelInformationYouHoldPVGridAllEventsIngestion from "./NavPanelInformationYouHoldPVGridAllEventsIngestion";
import NavPanelInformationYouHoldPVGridSensitiveData from "./NavPanelInformationYouHoldPVGridSensitiveData";


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
            {
              title: PontusComponent.t('NavPanelInformationYouHold_personGrid'),
              type: 'react-component',
              component: 'data-grid'
            },
            // ,{
            //   title: 'Compliance Emails',
            //   type: 'react-component',
            //   component: 'compliance-email'
            // }
            // ,
            {
              title: PontusComponent.t('Data Graph'),
              type: 'react-component',
              component: 'data-graph'
            }
            , {
              title: PontusComponent.t('Data Types'),
              type: 'react-component',
              component: 'data-types-doughnut'
            }
            , {
              title: PontusComponent.t('Unmatched Records'),
              type: 'react-component',
              component: 'data-grid-unmatched'
            }
            , {
              title: PontusComponent.t('Ingestion Events'),
              type: 'react-component',
              component: 'data-all-events'
              
            }
            , {
              title: PontusComponent.t('Sensitive Data'),
              type: 'react-component',
              component: 'sensitive-data'
              
            }
          
          
          ]
        }
      ]
      
    };
    
  }
  
  
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
    
    this.instance.registerComponent('data-grid', NavPanelInformationYouHoldPVGrid);
    // this.instance.registerComponent('compliance-email', PVTimeline);
    this.instance.registerComponent('data-graph', NavPanelInformationYouHoldPVDataGraph);
    this.instance.registerComponent('data-types-doughnut', NavPanelInformationYouHoldPVDoughnutChartTypes);
    this.instance.registerComponent('data-grid-unmatched', NavPanelInformationYouHoldPVGridEventIngestion);
    this.instance.registerComponent('data-all-events', NavPanelInformationYouHoldPVGridAllEventsIngestion);
    this.instance.registerComponent('sensitive-data', NavPanelInformationYouHoldPVGridSensitiveData);
    
  };
  
}

export default NavPanelInformationYouHold;