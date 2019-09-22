// import React from 'react';

import NavPanelConsentPVGridPrivacyNotices from './NavPanelConsentPVGridPrivacyNotices';
import NavPanelConsentPVGridEventConsent from './NavPanelConsentPVGridEventConsent';
import NavPanelConsentDataGraph from './NavPanelConsentDataGraph';
import NavPanelConsentPVDoughnutChartConsentStatus from './NavPanelConsentPVDoughnutChartConsentStatus';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";
import PontusComponent from "./PontusComponent";


class NavPanelConsent extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'savedStateNavPanelConsent';
    
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
              title: PontusComponent.t('Privacy Notices'),
              type: 'react-component',
              component: 'data-grid-privacy-notices'
            }
            , {
              title: PontusComponent.t('Consent Events'),
              type: 'react-component',
              component: 'data-grid-consent-events'
            }
            , {
              title: PontusComponent.t('Consent Chart (Privacy Notice)'),
              type: 'react-component',
              component: 'consent-chart'
            }
            , {
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
    /* register components or bind events to your new instance here */
    this.instance.registerComponent('data-grid-privacy-notices', NavPanelConsentPVGridPrivacyNotices);
    this.instance.registerComponent('data-grid-consent-events', NavPanelConsentPVGridEventConsent);
    this.instance.registerComponent('consent-chart', NavPanelConsentPVDoughnutChartConsentStatus);
    this.instance.registerComponent('data-graph', NavPanelConsentDataGraph);
    
  };
  
  
}

export default NavPanelConsent;