import React from 'react';
// import ResizeAware from 'react-resize-aware';
import PVDataGraphShowAllNodes from './PVDataGraphShowAllNodes';
import PontusComponent from "./PontusComponent";
// import axios from 'axios';


/***************************
 * UserList Component
 ***************************/
class NavPanelDataBreachPVDataGraphInfrastructure extends PontusComponent
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