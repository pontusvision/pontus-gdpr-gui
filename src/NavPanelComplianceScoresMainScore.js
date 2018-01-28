import React, {Component} from 'react';
import ResizeAware from 'react-resize-aware';


import Gauge from 'react-svg-gauge';
import PVGauge from "./PVGauge";


class NavPanelComplianceScoresMainScore extends Component
{
  
  constructor(props){
    super(props);
    
    }
  
  setNode = (node) =>
  {
    this.instance = node;
  };
  
  
  
  render()
  {
    
    return (
      <PVGauge label={"Main Score"}/>
    );
    
  }
}

export default NavPanelComplianceScoresMainScore;