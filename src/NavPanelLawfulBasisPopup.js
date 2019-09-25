// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {balanceScale} from 'react-icons-kit-allreact/fa/balanceScale';
import PontusComponent from "./PontusComponent";
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelLawfulBasisPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =PontusComponent.t('NavPanelLawfulBasisPopup_text');
    
    this.title = PontusComponent.t('NavPanelLawfulBasisPopup_title');
    this.icon = balanceScale;
    this.weight = 1;
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: PontusComponent.t("NavPanelLawfulBasisPopup_query")
      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  

}

export default NavPanelLawfulBasisPopup;