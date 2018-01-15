import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGrid from './PVGrid';
// import axios from 'axios';


/***************************
 * UserList Component
 ***************************/
class NavPanelTrackSimplePVGrid extends Component
{
  
  
  render()
  {
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    
    return (
        <PVGrid glEventHub={this.props.glEventHub} style={{height: '100%', width: '100%'}} namespace={"NavPanelTrackSimple"}/>
    
    );
    
    
  }
}

export default NavPanelTrackSimplePVGrid;