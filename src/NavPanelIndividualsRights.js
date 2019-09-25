// import React from 'react';
import NavPanelIndividualsRightsPVGrid from './NavPanelIndividualsRightsPVGrid';
import NavPanelIndividualsRightsPVGridNoticeTemplates from './NavPanelIndividualsRightsPVGridNoticeTemplates';
import NavPanelIndividualsRightsPVTemplateEditor from './NavPanelIndividualsRightsPVTemplateEditor';
import NavPanelIndividualsRightsPVFormBuilder from './NavPanelIndividualsRightsPVFormBuilder';
import NavPanelIndividualsRightsPVGridForms from './NavPanelIndividualsRightsPVGridForms';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";


class NavPanelIndividualsRights extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    
    this.stateVar = 'savedStateNavPanelIndividualsRights';
    
    this.content = this.props.isFullMode ? [
      {
        type: 'column',
        content: [
          // {
          //   title: 'Data Procedures',
          //   type: 'react-component',
          //   component: 'data-grid'
          // }
          // ,
          {
            title: 'Compliance Notices',
            type: 'react-component',
            component: 'compliance-email'
          }
          , {
            title: 'Compliance Notices Grid',
            type: 'react-component',
            component: 'compliance-grid'
          }
          // , {
          //   title: 'Form Builder Grid',
          //   type: 'react-component',
          //   component: 'compliance-form-builder-grid'
          // }
          // , {
          //   title: 'Form Builder Editor',
          //   type: 'react-component',
          //   component: 'compliance-form-builder'
          // }
        ]
      }
    ] : [
      {
        type: 'column',
        content: [
          {
            title: 'Form Builder Grid',
            type: 'react-component',
            component: 'compliance-form-builder-grid'
          }
          , {
            title: 'Form Builder Editor',
            type: 'react-component',
            component: 'compliance-form-builder'
          }
        ]
      }
    ];
    
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
      , content: this.content
      
    };
    
  }
  
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
    
    if (this.props.isFullMode)
    {
      this.instance.registerComponent('data-grid', NavPanelIndividualsRightsPVGrid);
      this.instance.registerComponent('compliance-email', NavPanelIndividualsRightsPVTemplateEditor);
      this.instance.registerComponent('compliance-grid', NavPanelIndividualsRightsPVGridNoticeTemplates);
      
    }
    this.instance.registerComponent('compliance-form-builder', NavPanelIndividualsRightsPVFormBuilder);
    this.instance.registerComponent('compliance-form-builder-grid', NavPanelIndividualsRightsPVGridForms);
  };
  
}

export default NavPanelIndividualsRights;