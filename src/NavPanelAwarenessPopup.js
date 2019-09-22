// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {book_2} from 'react-icons-kit-allreact/ikons/book_2';
import PontusComponent from "./PontusComponent";
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelAwarenessPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text = PontusComponent.t("NavPanelAwarenessPopup_text")
      
      
    this.title = PontusComponent.t(  "NavPanelAwarenessPopup_title");
    this.icon = book_2;
    this.weight = 1;
    
    
    
    
    
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: PontusComponent.t("NavPanelAwarenessPopup_query")
      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  

}

export default NavPanelAwarenessPopup;