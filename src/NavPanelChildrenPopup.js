// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {ic_child_care} from 'react-icons-kit-allreact/md/ic_child_care';
import PontusComponent from "./PontusComponent";
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelChildrenPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text = PontusComponent.t("NavPanelChildrenPopup_text");
    this.title = PontusComponent.t("NavPanelChildrenPopup_title");
    this.icon = ic_child_care;
  
  
    this.weight = 2;
  
  
  
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: PontusComponent.t("NavPanelChildrenPopup_query")
      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  

}

export default NavPanelChildrenPopup;