// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVTimeline from './PVTimeline';
// import axios from 'axios';


/***************************
 * UserList Component
 ***************************/
class NavPanelLawfulBasisPVTimeline extends PVTimeline
{
  
  constructor(props)
  {
    super(props);
    this.namespace = 'NavPanelLawfulBasis';
    this.subscription = (this.namespace) + '-pvgrid-on-click-row';
  
  }
  
  
}

export default NavPanelLawfulBasisPVTimeline;