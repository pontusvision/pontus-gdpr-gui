// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {iosPricetagsOutline} from 'react-icons-kit-allreact/ionicons/iosPricetagsOutline';
import PontusComponent from "./PontusComponent";
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelIndividualsRightsPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text = PontusComponent.t("NavPanelIndividualsRightsPopup_text");
      
    this.title = PontusComponent.t("NavPanelIndividualsRightsPopup_title");
    this.icon = iosPricetagsOutline;
    this.weight = 1;
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: PontusComponent.t("NavPanelIndividualsRightsPopup_query")
      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  

}

export default NavPanelIndividualsRightsPopup;