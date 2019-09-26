// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {eyeBlocked} from 'react-icons-kit-allreact/icomoon/eyeBlocked';
import PontusComponent from "./PontusComponent";
// import Icon from 'react-icons-kit-allreact';


class NavPanelPrivacyNoticesPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text = PontusComponent.t("NavPanelPrivacyNoticesPopup_text");
    this.title = PontusComponent.t("NavPanelPrivacyNoticesPopup_title");
    this.icon = eyeBlocked;
    
    this.weight = 6;
   
    
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin:PontusComponent.t("NavPanelPrivacyNoticesPopup_query")
      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  

}

export default NavPanelPrivacyNoticesPopup;