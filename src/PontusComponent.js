import React from 'react';

class PontusComponent extends React.Component
{
  
  constructor(props)
  {
    super(props);
    this.url = PontusComponent.getGraphURL(props);
  }
  
  static getGraphURL(props)
  {
    // if (props.url)
    // {
    //   return props.url;
    // }
    // else if (props.baseURI)
    // {
    //   if (props.ownerDocument && props.ownerDocument.origin)
    //   {
    //     let uri = props.baseURI;
    //     let pvgdprGuiIndex = uri.indexOf('pvgdpr_gui');
    //
    //     if (pvgdprGuiIndex > 0)
    //     {
    //
    //       let originLen = props.ownerDocument.origin.length();
    //       let retVal = uri.substr(originLen, pvgdprGuiIndex);
    //
    //       retVal.concat('pvgdpr_graph');
    //
    //       return retVal;
    //     }
    //   }
    // }
    // return "/gateway/sandbox/pvgdpr_graph";
    return PontusComponent.getURLGeneric(props, 'pvgdpr_gui', 'pvgdpr_graph', "/gateway/sandbox/pvgdpr_graph");
    
  }
  
  
  static getRestVertexLabelsURL(props)
  {
    
    return PontusComponent.getURLGeneric(props, 'pvgdpr_gui', 'pvgdpr_server/home/vertex_labels', "/gateway/sandbox/pvgdpr_server/home/vertex_labels");
  }
  
  static getRestNodePropertyNamesURL(props)
  {
    
    return PontusComponent.getURLGeneric(props, 'pvgdpr_gui', 'pvgdpr_server/home/node_property_names', "/gateway/sandbox/pvgdpr_server/home/node_property_names");
  }
  
  static getRestURL(props)
  {
    
    return PontusComponent.getURLGeneric(props, 'pvgdpr_gui', 'pvgdpr_server/home/records', "/gateway/sandbox/pvgdpr_server/home/records");
  }
  
  
  static getURLGeneric(props, pvgdprGuiStr, defaultSuffix, defaultSandbox)
  {
    if (props.url)
    {
      return props.url;
    }
    else if (window.location && window.location.pathname)
    {
      let pvgdprGuiIndex = window.location.pathname.indexOf(pvgdprGuiStr)
      if (pvgdprGuiIndex > 0)
      {
        let retVal = window.location.pathname.substr(0, pvgdprGuiIndex);
        return retVal.concat(defaultSuffix);
      }
    }
    else if (props.baseURI)
    {
      if (props.ownerDocument && props.ownerDocument.origin)
      {
        let uri = props.baseURI;
        let pvgdprGuiIndex = uri.indexOf(pvgdprGuiStr);
        
        if (pvgdprGuiIndex > 0)
        {
          
          let originLen = props.ownerDocument.origin.length();
          let retVal = uri.substr(originLen, pvgdprGuiIndex);
          
          return retVal.concat(defaultSuffix);
          
        }
      }
    }
    
    return defaultSandbox;
  }
  
  getColorBasedOnLabel = (vLabel) =>
  {
    if (vLabel.toUpperCase().startsWith('P'))
    {
      return '#440000';
    }
    
    if (vLabel.toUpperCase().startsWith('O'))
    {
      return '#0099cc';
    }
    if (vLabel.toUpperCase().startsWith('L'))
    {
      return '#ffaa00';
    }
    
    if (vLabel.toUpperCase().startsWith('E'))
    {
      return '#004433';
    }
    
    return '#595959';
    
    
  };
  
  
  stringify = (obj) =>{
  
    let cache = [];
    
  
    let stringifyFilter = (key, value) => {
      if (key === 'chartInstance' || key === 'canvas' || key === 'chart'){
        return;
      }
      
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Duplicate reference found
          try {
            // If this value does not reference a parent it can be deduped
            return JSON.parse(JSON.stringify(value ));
          } catch (error) {
            // discard key if value cannot be deduped
            return;
          }
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    };
  
    let state = JSON.stringify(obj,stringifyFilter );
    cache = null;
  
    return state;
  };

  

}


export default PontusComponent;
