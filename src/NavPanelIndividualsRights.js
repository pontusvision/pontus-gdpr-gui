
import React from 'react';
import ResizeAware from 'react-resize-aware';
import PontusComponent from "./PontusComponent";

import GoldenLayout from 'golden-layout';
import NavPanelIndividualsRightsPVGrid from './NavPanelIndividualsRightsPVGrid';
import NavPanelIndividualsRightsPVGridNoticeTemplates from './NavPanelIndividualsRightsPVGridNoticeTemplates';
import NavPanelIndividualsRightsPVTemplateEditor from './NavPanelIndividualsRightsPVTemplateEditor';
import NavPanelIndividualsRightsPVFormBuilder from './NavPanelIndividualsRightsPVFormBuilder';
import NavPanelIndividualsRightsPVGridForms from './NavPanelIndividualsRightsPVGridForms';


class NavPanelIndividualsRights extends PontusComponent
{
  constructor(props)
  {
    super(props);
    
    
    this.content = this.props.isFullMode? [
        {
          type: 'column',
          content: [
            {
              title: 'Data Procedures',
              type: 'react-component',
              component: 'data-grid'
            }
            ,{
              title: 'Compliance Notices',
              type: 'react-component',
              component: 'compliance-email'
            }
            ,{
              title: 'Compliance Notices Grid',
              type: 'react-component',
              component: 'compliance-grid'
            }
            ,{
              title: 'Form Builder Grid',
              type: 'react-component',
              component: 'compliance-form-builder-grid'
            }
            ,{
              title: 'Form Builder Editor',
              type: 'react-component',
              component: 'compliance-form-builder'
            }
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
          ,{
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
      , content:  this.content
      
    };
    this.stateVarName = 'savedStateNavPanelIndividualsRights' + ((!this.props.isFullMode) ? '': '-fullMode');
    
  }
  
  select= ()=>{
  
  };
  
  deselect= ()=>{
  
  };
  
  
  componentDidMount()
  {
    /* you can pass config as prop, or use a predefined one */
    
    var savedState =  localStorage.getItem('this.stateVarName');
    
    
    if (savedState !== null)
    {
      this.instance = new GoldenLayout(JSON.parse(savedState), this.node);
    }
    else
    {
      this.instance = new GoldenLayout(this.config, this.node);
    }
    
    // instance = new GoldenLayout(config, this.node);
    /* register components or bind events to your new instance here */
    
    if (this.props.isFullMode){
      this.instance.registerComponent('data-grid', NavPanelIndividualsRightsPVGrid);
      this.instance.registerComponent('compliance-email', NavPanelIndividualsRightsPVTemplateEditor);
      this.instance.registerComponent('compliance-grid', NavPanelIndividualsRightsPVGridNoticeTemplates);
  
    }
    this.instance.registerComponent('compliance-form-builder', NavPanelIndividualsRightsPVFormBuilder);
    this.instance.registerComponent('compliance-form-builder-grid', NavPanelIndividualsRightsPVGridForms);
    this.instance.init();
    
    this.instance.on('tabCreated', function (tab)
    {
      tab.closeElement.off('click').click(function ()
      {
        // if( confirm( 'You have unsaved changes, are you sure you want to close this tab' ) ) {
        //     tab.contentItem.remove();
        // }
      })
    });
    
    this.instance.on('stateChanged', this.saveState);
    
  }
  
  saveState = () =>
  {
    var state = JSON.stringify(this.instance.toConfig());
    localStorage.setItem('this.stateVarName', state);
    
  };
  
  setNode = (node) =>
  {
    this.node = node;
  };
  
  handleResize = ({width, height}) =>
  {
    if (height > 0)
    {
      this.instance.updateSize(width, height);
  
    }
    else{
      this.instance.updateSize(width,window.innerHeight - 50);
  
    }
  };
  
  render()
  {
    
    return (         <ResizeAware
        style={{height: 'calc(100% - 20px)', width: '100%'}}
        onResize={this.handleResize}
      >
        <div style={{height: '100%', width: '100%'}} ref={this.setNode}/>
      </ResizeAware>
    )
    
  }
}
export default NavPanelIndividualsRights;