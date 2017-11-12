import React, {Component} from 'react';
import ResizeAware from 'react-resize-aware';
import Iframe from 'react-iframe';


class ExtractPanel extends Component
{
  
  constructor(props)
  {
    super(props);
    this.state = {height: window.innerHeight - 50};

  }
  
  
  select = () =>
  {
  
  };
  
  deselect = () =>
  {
  
  };
  
  handleResize = ({width, height}) =>
  {
    if (height > 0){
      // this.ref.updateSize(width, height);
    }
    else{
      // this.ref.updateSize(width,window.innerHeight - 50);
    }
    
    this.setState({height: window.innerHeight - 50});
  
    
  };
  
  setRef=(ref)=>
  {
    this.ref = ref;
  }
  
  render()
  {
    
    return (         <ResizeAware
        style={{height: this.state.height, width: '100%'}}
        onResize={this.handleResize}
      >
        <Iframe url="/nifi"
                style={{height: this.state.height, width: '100%'}}

                width="100%"
           height={this.state.height}
                ref={this.setRef}
                display="initial"
                position="relative"
          // frameborder="0"
                allowFullScreen={false}/>
      </ResizeAware>
    )
    
  }
}

export default ExtractPanel;
