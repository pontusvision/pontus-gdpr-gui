// import React from 'react';

import NavPanelSubjectAccessRequestPVGrid from './NavPanelSubjectAccessRequestPVGrid';
import NavPanelSubjectAccessRequestDataGraph from './NavPanelSubjectAccessRequestDataGraph';
import NavPanelSubjectAccessRequestPVDoughnutChartReqType from './NavPanelSubjectAccessRequestPVDoughnutChartReqType';
import NavPanelSubjectAccessRequestPVDoughnutChartReqStatus
  from './NavPanelSubjectAccessRequestPVDoughnutChartReqStatus';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";
import PontusComponent from "./PontusComponent";

class NavPanelSubjectAccessRequest extends PVGoldenLayoutComponent

{
  constructor(props)
  {
    super(props);
    this.stateVar = 'savedStateNavPanelSubjectAccessRequest';
    
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
            , {
              title: PontusComponent.t('Data Graph'),
              type: 'react-component',
              component: 'data-graph'
            }
            , {
              title: PontusComponent.t('Request Types'),
              type: 'react-component',
              component: 'req-types'
            }
            , {
              title: PontusComponent.t('Request Status'),
              type: 'react-component',
              component: 'req-status'
            }
          ]
        }
      ]
      
    };
    
  }
  
  
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
    
    this.instance.registerComponent('data-grid', NavPanelSubjectAccessRequestPVGrid);
    
    this.instance.registerComponent('data-graph', NavPanelSubjectAccessRequestDataGraph);
    this.instance.registerComponent('req-types', NavPanelSubjectAccessRequestPVDoughnutChartReqType);
    this.instance.registerComponent('req-status', NavPanelSubjectAccessRequestPVDoughnutChartReqStatus);
    
  };
  
  
}

export default NavPanelSubjectAccessRequest;