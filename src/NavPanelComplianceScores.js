// import React from 'react';
import NavPanelComplianceScoresMainScore from './NavPanelComplianceScoresMainScore';
import NavPanelComplianceScoresDetailedScores from './NavPanelComplianceScoresDetailedScores';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";
import PontusComponent from "./PontusComponent";


class NavPanelComplianceScores extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    
    this.stateVar = 'savedStateNavPanelComplianceScores';
    
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
              title: PontusComponent.t('Main Score'),
              type: 'react-component',
              component: 'main-score'
            }
            , {
              title: PontusComponent.t('Detailed Scores'),
              type: 'react-component',
              component: 'detailed-scores'
            }
          ]
        }
      ]
      
    };
    
  }
  
  registerComponents = (instance) =>
  {
    
    this.registerComponentsPreamble(instance);
    this.instance.registerComponent('main-score', NavPanelComplianceScoresMainScore);
    this.instance.registerComponent('detailed-scores', () => { return new NavPanelComplianceScoresDetailedScores({complyPanel: this.props.complyPanel}); });
  };
  
}

export default NavPanelComplianceScores;