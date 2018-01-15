import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVDataGraph from './PVDataGraph';
// import axios from 'axios';


/***************************
 * UserList Component
 ***************************/
class NavPanelInformationYouHoldPVDataGraph extends Component
{
  
  
  render()
  {
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    
    return (
        <PVDataGraph glEventHub={this.props.glEventHub} style={{height: '100%', width: '100%'}} namespace={"NavPanelInformationYouHold"}/>
    
    );
    
    
  }
}

export default NavPanelInformationYouHoldPVDataGraph;