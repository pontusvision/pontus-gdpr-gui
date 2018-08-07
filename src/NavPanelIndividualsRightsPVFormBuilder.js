// import React from 'react';
// import PontusComponent from "./PontusComponent";

import PVFormBuilder from "./PVFormBuilder";

//

class NavPanelIndividualsRightsPVFormBuilder extends PVFormBuilder
{
  
  // constructor(props){
  //   super(props);
  // }
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
  
    // if (this.formBuilderRef){
    //   const form = this.getFormFromB64(this.state.formB64);
    //
    //   this.formBuilderRef.setForm (form);
    //
    // }
    // this.formBuilderRef.setState ({ form: this.form});
    
    
    
    
    // this.lastData = data;
    // if (this.formBuilderRef){
    //   this.formBuilderRef.setState({ formB64: data['Object.Form.Text']});
    //   this.forceUpdate();
    //
    // }
  
  };
  
  // render()
  // {
  //   let st = this.state;
  //
  //   if (st === null || st.formId === null ){
  //     return <div>PLEASE CLICK ON THE FORM GRID</div>
  //   }
  //
  //   // let eventHub = this.props.glEventHub;
  //   return <PVFormBuilder formId={st.formId} formURL={st.formURL} formVertexLabel={st.formVertexLabel}
  //                         formB64={st.formB64}/>;
  //
  //
  // }
  
}

export default NavPanelIndividualsRightsPVFormBuilder;
