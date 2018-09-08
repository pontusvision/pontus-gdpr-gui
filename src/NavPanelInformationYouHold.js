
import React from 'react';
import ResizeAware from 'react-resize-aware';

import GoldenLayout from 'golden-layout';

import NavPanelInformationYouHoldPVGrid from './NavPanelInformationYouHoldPVGrid';
import NavPanelInformationYouHoldPVDataGraph from './NavPanelInformationYouHoldPVDataGraph';
import NavPanelInformationYouHoldPVDoughnutChartTypes from './NavPanelInformationYouHoldPVDoughnutChartTypes';
import NavPanelInformationYouHoldPVGridEventIngestion from './NavPanelInformationYouHoldPVGridEventIngestion';
import NavPanelInformationYouHoldIngestionTimeline from './NavPanelInformationYouHoldIngestionTimeline';
import PVTimeline from './PVTimeline';

import PontusComponent from "./PontusComponent";


class NavPanelInformationYouHold extends PontusComponent
{
  constructor(props)
  {
    super(props);
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
            // ,{
            //   title: 'Compliance Emails',
            //   type: 'react-component',
            //   component: 'compliance-email'
            // }
            ,{
              title: 'Data Graph',
              type: 'react-component',
              component: 'data-graph'
            }
            ,{
              title: 'Data Types',
              type: 'react-component',
              component: 'data-types-doughnut'
            }
            ,{
              title: 'Unmatched Records',
              type: 'react-component',
              component: 'data-grid-unmatched'
            }
            ,{
              title: 'Ingestion Events',
              type: 'react-component',
              component: 'data-events-timeline'
    
            }
            

          ]
        }
      ]
      
    };
    
  }
  
  select= ()=>{
  
  };
  
  deselect= ()=>{
  
  };
  
  
  componentDidMount()
  {
    /* you can pass config as prop, or use a predefined one */
    
    // var savedState = null;// LPPM: TODO: re-enable this later localStorage.getItem('savedStatePontusPanel');
    let savedState =  localStorage.getItem('savedStateNavPanelInformationYouHold');
    
    
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
    this.instance.registerComponent('data-grid', NavPanelInformationYouHoldPVGrid);
    // this.instance.registerComponent('compliance-email', PVTimeline);
    this.instance.registerComponent('data-graph', NavPanelInformationYouHoldPVDataGraph);
    this.instance.registerComponent('data-types-doughnut', NavPanelInformationYouHoldPVDoughnutChartTypes);
    this.instance.registerComponent('data-grid-unmatched', NavPanelInformationYouHoldPVGridEventIngestion);
    this.instance.registerComponent('data-events-timeline', NavPanelInformationYouHoldIngestionTimeline);
    
    
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
    this.instance.init();
  
  }
  
  saveState = () =>
  {
    try{
      
      // let conf = this.pvToConfig(this.instance.root);
      let conf = this.instance.toConfig();
      
      // let state = JSON.stringify(conf);
  
      let state = this.stringify(conf);
      localStorage.setItem('savedStateNavPanelInformationYouHold', state);
  
    }
    catch (e){
    
    }
    
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
export default NavPanelInformationYouHold;