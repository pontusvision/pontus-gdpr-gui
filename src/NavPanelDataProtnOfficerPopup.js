// import React  from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {blackTie} from 'react-icons-kit-allreact/fa/blackTie';
import PontusComponent from "./PontusComponent";
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelDataProtnOfficerPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text = PontusComponent.t('NavPanelDataProtnOfficerPopup_text');
    
    this.title = PontusComponent.t('NavPanelDataProtnOfficerPopup_title');
    this.icon = blackTie;
    this.weight = 1;
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: PontusComponent.t('NavPanelDataProtnOfficerPopup_query')
      
      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
    };
  };
  

}

export default NavPanelDataProtnOfficerPopup;