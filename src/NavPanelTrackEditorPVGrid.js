import React from 'react';
import PVGrid from './PVGrid';
import PontusComponent from "./PontusComponent";



class NavPanelTrackEditorPVGrid extends PontusComponent
{
  
  
  render()
  {
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    
    return (
      <PVGrid glEventHub={this.props.glEventHub} style={{height: '100%', width: '100%'}}
              namespace={"NavPanelTrackSimple"}/>
    
    );
    
    
  }
}

export default NavPanelTrackEditorPVGrid;