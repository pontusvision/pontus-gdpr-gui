import PontusComponent from "./PontusComponent";
import React from "react";
import Toast from "react-bootstrap/Toast";
import PVGremlinComboBox from "./PVGremlinComboBox";

class PVGraphEditorAddEdge extends PontusComponent
{
  
  render()
  {
    return (
      <Toast>
        <Toast.Header>
          <strong>Add Edge</strong>
        </Toast.Header>
        <Toast.Body>
          <label>Edge Label</label><PVGremlinComboBox
          namespace={this.namespace}
          name="node-types"
          multi={false}
          onChange={this.onChangeVertexLabels}
          onError={this.onError}
          ref={this.setObjVertexLabels}
          url={PontusComponent.getRestEdgeLabelsURL(this.props)}
        />
        
        </Toast.Body>
      </Toast>
    
    );
  }
}

export default PVGraphEditorAddEdge;