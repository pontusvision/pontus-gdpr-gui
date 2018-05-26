import React from 'react';
import PontusComponent from "./PontusComponent";

import PVFormBuilder from "./PVFormBuilder";
import { Base64 } from 'js-base64';
//

class NavPanelDataProceduresPVFormBuilder extends PontusComponent
{
  
  componentDidMount()
  {
    this.namespace = ("NavPanelIndividualsRights");
    
    super.componentDidMount();
    
    this.lastData = null;
    
    this.props.glEventHub.on(this.namespace + '-pvgrid-on-click-row', this.onClickedRow);
    
    
  }
  
  componentWillUnmount()
  {
    this.props.glEventHub.off(this.namespace + '-pvgrid-on-click-row', this.onClickedRow);
    
  }
  
  
  onClickedRow = (data) =>
  {
    this.val = Base64.decode(data['Object.Notification_Templates.Text']);
    this.setState({value: data['Object.Notification_Templates.Text']});
    this.lastData = data;
    
  };
  
  render()
  {
    // let eventHub = this.props.glEventHub;
    return <PVFormBuilder/>;
    
    
  }
  
}
export default NavPanelDataProceduresPVFormBuilder;
