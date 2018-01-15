import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import UserSearch from './UserSearch';
// import axios from 'axios';


/***************************
 * UserList Component
 ***************************/
class NavPanelTrackSimpleUserSearch extends Component
{
  
  
  render()
  {
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    
    return (
        <UserSearch glEventHub={this.props.glEventHub} style={{height: '100%', width: '100%'}} namespace={"NavPanelTrackSimple"}/>
    
    );
    
    
  }
}

export default NavPanelTrackSimpleUserSearch;