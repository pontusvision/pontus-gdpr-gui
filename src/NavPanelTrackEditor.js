// import React from 'react';

// import PVWorldMap from './PVWorldMap';
import PVGoldenLayoutComponent from "./PVGoldenLayoutComponent";
import NavPanelTrackEditorPVGrid from "./NavPanelTrackEditorPVGrid";
import NavPanelTrackEditorDataSearch from "./NavPanelTrackEditorDataSearch";
import NavPanelTrackEditorPVDataGraph from "./NavPanelTrackEditorPVDataGraph";


class NavPanelTrackEditor extends PVGoldenLayoutComponent
{
  constructor(props)
  {
    super(props);
    this.stateVar = 'savedStateNavPanelTrackSimple';
    
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
            }, {
              title: 'Data Search',
              type: 'react-component',
              component: 'data-search'
            }
            // ,{
            //   title: 'World Map',
            //   type: 'react-component',
            //   component: 'data-world-map'
            // }
            , {
              title: 'Data Graph',
              type: 'react-component',
              component: 'data-graph'
            }
          ]
        }
      ]
      
    };
    
  }
  
  select = () =>
  {
  
  };
  
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
    
    this.instance.registerComponent('data-grid', NavPanelTrackEditorPVGrid);
    this.instance.registerComponent('data-search', NavPanelTrackEditorDataSearch);
    this.instance.registerComponent('data-graph', NavPanelTrackEditorPVDataGraph);
    
  };
  
  
}

export default NavPanelTrackEditor;