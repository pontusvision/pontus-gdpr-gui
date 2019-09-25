// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {download} from 'react-icons-kit-allreact/entypo/download';
import PontusComponent from "./PontusComponent";
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelSubjectAccessRequestPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =PontusComponent.t("NavPanelSubjectAccessRequestPopup_text");

    this.title = PontusComponent.t("NavPanelSubjectAccessRequestPopup_title");
    this.icon = download;
  
    this.weight = 4;
  
  
  
  
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: PontusComponent.t("NavPanelSubjectAccessRequestPopup_query")
      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  

}

export default NavPanelSubjectAccessRequestPopup;
