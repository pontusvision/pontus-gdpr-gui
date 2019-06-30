import React from 'react';
// import ResizeAware from 'react-resize-aware';
import PontusComponent from "./PontusComponent";
import PVDataGraphEditor from "./PVDataGraphEditor";

// import axios from 'axios';


/***************************
 * UserList Component
 ***************************/
class NavPanelTrackEditorPVDataGraph extends PontusComponent
{
  
  
  render()
  {
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    
    return (
      <PVDataGraphEditor glEventHub={this.props.glEventHub} style={{height: '100%', width: '100%'}}
                         namespace={"NavPanelTrackSimple"}/>
    
    );
    
    
  }
}

export default NavPanelTrackEditorPVDataGraph;