import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVDataGraphShowAllNodes from './PVDataGraphShowAllNodes';
// import axios from 'axios';


/***************************
 * UserList Component
 ***************************/
class NavPanelDataBreachPVDataGraphInfrastructure extends Component
{
  
  
  render()
  {
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    
    return (
        <PVDataGraphShowAllNodes glEventHub={this.props.glEventHub} style={{height: '100%', width: '100%'}} namespace={"NavPanelDataBreach"}/>
    
    );
    
    
  }
}

export default NavPanelDataBreachPVDataGraphInfrastructure;