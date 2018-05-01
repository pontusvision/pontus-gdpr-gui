import React  from 'react';
// import ResizeAware from 'react-resize-aware';
import PVAceGremlinEditor from './PVAceGremlinEditor';
import PontusComponent from "./PontusComponent";
// import axios from 'axios';


/***************************
 * UserList Component
 ***************************/
class NavPanelTrackExpertPVAceGremlinEditor extends PontusComponent
{
  
  
  render()
  {
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    
    return (
        <PVAceGremlinEditor glEventHub={this.props.glEventHub} style={{height: '100%', width: '100%'}} namespace={"NavPanelTrackExpert"}/>
    
    );
    
    
  }
}

export default NavPanelTrackExpertPVAceGremlinEditor;