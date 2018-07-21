import React from 'react';
import PontusComponent from "./PontusComponent";

import PVFormBuilder from "./PVFormBuilder";
import {Base64} from 'js-base64';

//

class NavPanelIndividualsRightsPVFormBuilder extends PontusComponent
{
  
  componentDidMount()
  {
    this.namespace = ("NavPanelIndividualsRights_forms");
    
    // super.componentDidMount();
    
    this.lastData = null;
    
    this.props.glEventHub.on(this.namespace + '-pvgrid-on-click-row', this.onClickedRow);
    
    
  }
  
  componentWillUnmount()
  {
    this.props.glEventHub.off(this.namespace + '-pvgrid-on-click-row', this.onClickedRow);
    
  }
  
  
  onClickedRow = (data) =>
  {
    // this.val = Base64.decode(data['Object.Form.Text']);
    this.setState({
      formId: data['index']
      , formURL: data['Object.Form.URL']
      , formVertexLabel: data['Object.Form.Vertex_Label']
      , formB64: data['Object.Form.Text']
      , fullData: data
    });
    // this.lastData = data;
    
  };
  
  render()
  {
    let st = this.state;
    
    if (st === null || st.formId === null ){
      return <div>PLEASE CLICK ON THE FORM GRID</div>
    }
    
    // let eventHub = this.props.glEventHub;
    return <PVFormBuilder formId={st.formId} formURL={st.formURL} formVertexLabel={st.formVertexLabel}
                          formB64={st.formB64}/>;
    
    
  }
  
}

export default NavPanelIndividualsRightsPVFormBuilder;
