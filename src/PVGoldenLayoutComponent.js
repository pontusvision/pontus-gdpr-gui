import React from 'react';
import ResizeAware from 'react-resize-aware';
import PontusComponent from "./PontusComponent";
import {GoldenLayoutComponent} from "./GoldenLayoutComponent";


class PVGoldenLayoutComponent extends PontusComponent
{
  constructor(props)
  {
    
    super(props);
    
    this.stateVar = 'dummy';
    
    this.config = {};
    
  }
  
  getStateVar()
  {
    return this.stateVar;
  }
  
  
  saveState = () =>
  {
    try
    {
      let state = JSON.stringify(this.instance.toConfig());
      PontusComponent.setItem(this.getStateVar(), state);
      
    }
    catch (e)
    {
      // ignore
    }
    
  };
  
  
  handleResize = ({width, height}) =>
  {
    if (height > 0)
    {
      this.instance.updateSize(width, height);
      
    }
    else
    {
      this.instance.updateSize(width, window.innerHeight - 50);
      
    }
  };
  
  registerComponents = (instance) =>
  {
    this.registerComponentsPreamble(instance);
  };
  
  registerComponentsPreamble = (instance) =>
  {
    this.instance = instance;
    
    this.instance.on('tabCreated', function (tab)
    {
      tab.closeElement.off('click').click(function ()
      {
        // if( confirm( 'You have unsaved changes, are you sure you want to close this tab' ) ) {
        //     tab.contentItem.remove();
        // }
      })
    });
    
    this.instance.on('stateChanged', this.saveState);
  };
  
  render()
  {
    let savedState = PontusComponent.getItem(this.getStateVar());
    if (savedState !== null)
    {
      savedState = JSON.parse(savedState);
    }
    else
    {
      savedState = this.config;
    }
    
    
    return (<ResizeAware
        style={{height: 'calc(100% - 10px)', width: '100%'}}
        onResize={this.handleResize}
      >
        <GoldenLayoutComponent
          htmlAttrs={{style: {height: '100%', width: '100%'}}}
          config={savedState}
          registerComponents={this.registerComponents}
        />
      </ResizeAware>
    );
    
    // {/*<div style={{height: '100%', width: '100%'}} ref={this.setNode}/>*/}
    
  }
}

export default PVGoldenLayoutComponent;