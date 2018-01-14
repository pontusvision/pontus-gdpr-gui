import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVAceGremlinJSONQueryResults from './PVAceGremlinJSONQueryResults';
// import axios from 'axios';


/***************************
 * UserList Component
 ***************************/
class NavPanelTrackExpertPVAceGremlinJSONQueryResults extends Component
{
  
  
  render()
  {
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    
    return (
        <PVAceGremlinJSONQueryResults glEventHub={this.props.glEventHub} style={{height: '100%', width: '100%'}} namespace={"NavPanelTrackExpert"}/>
    
    );
    
    
  }
}

export default NavPanelTrackExpertPVAceGremlinJSONQueryResults;