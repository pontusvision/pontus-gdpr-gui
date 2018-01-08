import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVDataGraphShowNeighbouringNodes from './PVDataGraphShowNeighbouringNodes';
// import axios from 'axios';


/***************************
 * UserList Component
 ***************************/
class NavPanelConsentDataGraph extends Component
{
  
  
  render()
  {
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    
    return (
        <PVDataGraphShowNeighbouringNodes glEventHub={this.props.glEventHub} style={{height: '100%', width: '100%'}} namespace={"NavPanelConsent_EventConsent"}/>
    
    );
    
    
  }
}

export default NavPanelConsentDataGraph;