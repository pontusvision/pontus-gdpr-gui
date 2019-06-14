// import React from 'react';

import NavPanelTrackExpertPVDataGraph from './NavPanelTrackExpertPVDataGraph';
import NavPanelTrackExpertPVAceGremlinEditor from "./NavPanelTrackExpertPVAceGremlinEditor";
import NavPanelTrackExpertPVAceGremlinJSONQueryResults from "./NavPanelTrackExpertPVAceGremlinJSONQueryResults";
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";


class NavPanelTrackExpert extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'savedStateNavPanelTrackExpert';
    
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
              title: 'Gremlin Editor',
              type: 'react-component',
              component: 'gremlin-editor'
            }
            ,
            {
              title: 'Query Results',
              type: 'react-component',
              component: 'query-results'
            }
            , {
              title: 'Query Graph',
              type: 'react-component',
              component: 'data-graph'
            }
          
          ]
        }
      ]
      
    };
    
    this.state = {height: props.height, width: props.width};
    
  }
  
  shouldComponentUpdate()
  {
    return false;
  }
  
  deselect = () =>
  {
  
  };
  
  
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
    
    this.instance.registerComponent('gremlin-editor', NavPanelTrackExpertPVAceGremlinEditor);
    this.instance.registerComponent('query-results', NavPanelTrackExpertPVAceGremlinJSONQueryResults);
    this.instance.registerComponent('data-graph', NavPanelTrackExpertPVDataGraph);
    
  };
  
  
}

export default NavPanelTrackExpert;
