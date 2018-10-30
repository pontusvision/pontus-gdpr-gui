import React from 'react';
import {Button, Label} from 'semantic-ui-react';
import PontusComponent from "./PontusComponent";

// import PVDatamaps from './PVDatamaps';


class PVDataGraphNeighboursButton extends PontusComponent
{
  constructor(props)
  {
    super(props);
    // this.columns = [
    //   {key: 'name', name: 'Name'},
    //   {key: 'street', name: 'Street'}
    // ];
    this.errorCounter = 0;
  
    this.namespace = this.props.namespace + '-pvgraph-neighbours-click';
    
  
    this.state = {
      depth: 1
    };
    
  }
  
  
  
  onClickPlus = () =>
  {
    let depth = this.state.depth;
    depth ++;
    this.setState({depth: depth});
    this.props.glEventHub.emit(this.namespace, this.state.depth);
    this.props.glEventHub.emit(this.namespace, this.state.depth);
    
  };
  onClickPlusPlus = () =>
  {
    let depth = this.state.depth;
    depth +=10;
    this.setState({depth: depth});
    this.props.glEventHub.emit(this.namespace, this.state.depth);
    this.props.glEventHub.emit(this.namespace, this.state.depth);
    
  };
  
  onClickMinus = () =>
  {
    let depth = this.state.depth;
    depth --;
    if (depth < 1){
      depth = 1;
    }
    this.setState({depth: depth});
    this.props.glEventHub.emit(this.namespace, this.state.depth);
    this.props.glEventHub.emit(this.namespace, this.state.depth);
    
  };
  
  
  onClickMinusMinus = () =>
  {
    let depth = this.state.depth;
    depth -=10;
    if (depth < 1){
      depth = 1;
    }
    this.setState({depth: depth});
    this.props.glEventHub.emit(this.namespace, this.state.depth);
    this.props.glEventHub.emit(this.namespace, this.state.depth);
    
  };
  
  
  
  handleClose = () => this.setState({ open: false });
  
  render()
  {
    
    
    return (
      <div>
        <Button
          className={'compact'}
          style={{border: 0, background: 'rgb(69,69,69)', marginRight: '3px'}}
          size={'small'}
          onClick={this.onClickMinusMinus}
  
        >&lt;&lt;</Button>
  
        <Button
          className={'compact'}
          style={{border: 0, background: 'rgb(69,69,69)', marginRight: '3px'}}
          size={'small'}
          onClick={this.onClickMinus}
  
        >-</Button>
        <Label>{this.state.depth}</Label>
        <Button
          className={'compact'}
          style={{border: 0, background: 'rgb(69,69,69)', marginRight: '3px'}}
          size={'small'}
          onClick={this.onClickPlus}
  
        >+</Button>
        <Button
          className={'compact'}
          style={{border: 0, background: 'rgb(69,69,69)', marginRight: '3px'}}
          size={'small'}
          onClick={this.onClickPlusPlus}
  
        >&gt;&gt;</Button>
      </div>
    
    );
    
    
  }
}


export default PVDataGraphNeighboursButton;