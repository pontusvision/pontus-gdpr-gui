import React from 'react';
import {Button} from 'semantic-ui-react';
import PontusComponent from "./PontusComponent";
import PVGremlinComboboxToolbar from "./PVGremlinComboboxToolbar";



class PVDataGraphEditorAddEdgesButton extends PontusComponent
{
  constructor(props)
  {
    super(props);
    this.namespace = this.props.namespace + '-pvgraph-edit-edges-click';
    
    this.objVertexLabels = null;
    this.state = {
      open: true
    };
    
  }
  
  
  onClickAddEdges = () =>
  {
    this.setState({open: false, operation: 'editEdge'});
    this.props.glEventHub.emit(this.namespace, {open: false, operation: 'editEdge'});
    
  };
  
  // onClickAddEdgesSave = () =>
  // {
  //
  //   this.setState({open: true, operation: 'save'});
  //   this.props.glEventHub.emit(this.namespace, {open: true, operation: 'save'});
  //
  // };
  
  onClickAddEdgesCancel = () =>
  {
    
    this.setState({open: true, operation: 'cancel'});
    this.props.glEventHub.emit(this.namespace, {open: true, operation: 'cancel'});
    
  };
  
  getEdgeLabel() {
    return this.vertexLabel;
  }
  
  onChangeVertexLabels = (val) => {
    this.vertexLabel = val;
  };
  
  render()
  {
    
    let addEdgesButton =
      <Button
        className={'compact'}
        style={{border: 0, background: 'rgb(69,69,69)', marginRight: '3px'}}
        size={'small'}
        onClick={this.onClickAddEdges}
      
      >Add Edges</Button>;
    
    
    let addEdgesSelectLabelsButton = <div>
      <PVGremlinComboboxToolbar
        namespace={this.namespace}
        onChange={this.onChangeVertexLabels}
        ref={(obj) => this.objVertexLabels = obj}
        url={PontusComponent.getRestEdgeLabelsURL(this.props)}
      />
      <Button
        className={'compact'}
        style={{border: 0, background: 'rgb(69,69,69)', marginRight: '3px'}}
        size={'small'}
        onClick={this.onClickAddEdgesSave}
      
      >Save</Button>
      <Button
        className={'compact'}
        style={{border: 0, background: 'rgb(69,69,69)', marginRight: '3px'}}
        size={'small'}
        onClick={this.onClickAddEdgesCancel}
      
      >Cancel</Button></div>;
    
    
    let buttonToShow = this.state.open ? addEdgesButton : addEdgesSelectLabelsButton;
    
    
    return (
      <div>
        {buttonToShow}
      </div>
    
    );
    
    
  }
}


export default PVDataGraphEditorAddEdgesButton;