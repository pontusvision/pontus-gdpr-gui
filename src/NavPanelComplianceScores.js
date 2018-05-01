
import React from 'react';
import ResizeAware from 'react-resize-aware';

import GoldenLayout from 'golden-layout';

// import UserSearch from './';
import NavPanelComplianceScoresMainScore from './NavPanelComplianceScoresMainScore';
import NavPanelComplianceScoresDetailedScores from './NavPanelComplianceScoresDetailedScores';
import PontusComponent from "./PontusComponent";


class NavPanelComplianceScores extends PontusComponent
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
              title: 'Main Score',
              type: 'react-component',
              component: 'main-score'
            }
            ,{
              title: 'Detailed Scores',
              type: 'react-component',
              component: 'detailed-scores'
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
    var savedState =  localStorage.getItem('savedStateNavPanelComplianceScores');
    
    
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
    this.instance.registerComponent('main-score', NavPanelComplianceScoresMainScore);
    this.instance.registerComponent('detailed-scores', NavPanelComplianceScoresDetailedScores);
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
    try{
      let state = JSON.stringify(this.instance.toConfig());
      localStorage.setItem('savedStateNavPanelComplianceScores', state);
  
    }catch(e){
      // ignore
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
export default NavPanelComplianceScores;