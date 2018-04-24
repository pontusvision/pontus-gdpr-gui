import React from 'react';
import ResizeAware from 'react-resize-aware';


import Gauge from 'react-svg-gauge';
import PontusComponent from "./PontusComponent";


/***************************
 * UserList Component
 ***************************/
class PVGauge extends PontusComponent
{
  
  constructor(props){
    super(props);
    // this.url = "/gateway/sandbox/pvgdpr_graph";
    let autoResize = true;
    if (props.height !== null && props.height > 0 && props.width !== null && props.width > 0){
      autoResize = false;
    }
  
    this.state = {
      height: props.height
      ,width: props.width
      ,autoResize: autoResize
      ,value: props.value
    }
  
  }
  
  
  
  getHexColor(value)
  {
    const string = value.toString(16);
    return (string.length === 1) ? '0' + string : string;
  }
  
  getRandomInt(max)
  {
    return Math.floor(Math.random() * Math.floor(max));
  }
  handleResize = ({width, height}) =>
  {
    // if (height > 0)
    // {
    //   this.instance.updateSize(width, height);
    //
    // }
    // else
    // {
    //   this.instance.updateSize(width, window.innerHeight - 50);
    //
    // }
    if (this.state.autoResize){
      this.setState({height: height, width: width});
  
    }
  };
  setNode = (node) =>{
    this.instance = node;
  };
  
  render()
  {
  
    let val = this.props.value; // || this.getRandomInt(100);
    let r = Math.floor(255 - (val * 2.55));
  
    let g = Math.floor(val * 2.55);
    let b = 0;
    let colorHex = '#' + this.getHexColor(r) + this.getHexColor(g) + this.getHexColor(b);
  
  
    // var eventHub = this.props.glEventHub;
    //         <Graph graph={this.state.graph} options={this.state.options} events={this.state.events}/>
    
    return (
      <ResizeAware
        style={{height: 'calc(100% - 20px)', width: '100%'}}
        onResize={this.handleResize}
      >
        <div style={{height: '100%', width: '100%'}}>
        
          <Gauge ref={this.setNode} color={colorHex} value={val} width={this.state.width} height={this.state.height}
                 label={this.props.label?this.props.label: ""}
                 valueLabelStyle={this.props.valueLabelStyle || { textAnchor: "middle", fill: "#000000", stroke: "none", fontStyle: "normal", fontVariant: "normal", fontWeight: 'bold', fontStretch: 'normal', lineHeight: 'normal', fillOpacity: 1 }}
                 
        />
      
      
        </div>
      </ResizeAware>
    );
    
    
  }
}

export default PVGauge;