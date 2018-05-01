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
    return PontusComponent.getURLGeneric(props,'pvgdpr_gui','pvgdpr_graph', "/gateway/sandbox/pvgdpr_graph" );
  
  }
  
  
  static getRestVertexLabelsURL(props) {
    
    return PontusComponent.getURLGeneric(props,'pvgdpr_gui','pvgdpr_server/home/vertex_labels', "/gateway/sandbox/pvgdpr_server/home/vertex_labels" );
  }
  
  static getRestNodePropertyNamesURL(props) {

    return PontusComponent.getURLGeneric(props,'pvgdpr_gui','pvgdpr_server/home/node_property_names', "/gateway/sandbox/pvgdpr_server/home/node_property_names" );
  }
  
  static getRestURL(props)  {
    
    return PontusComponent.getURLGeneric(props,'pvgdpr_gui','pvgdpr_server/home/records', "/gateway/sandbox/pvgdpr_server/home/records" );
  }
  
  
  static getURLGeneric(props,pvgdprGuiStr, defaultSuffix, defaultSandbox)
  {
    if (props.url)
    {
      return props.url;
    }
    else if (window.location && window.location.pathname){
      let pvgdprGuiIndex = window.location.pathname.indexOf(pvgdprGuiStr)
      if (pvgdprGuiIndex > 0)
      {
        let retVal = window.location.pathname.substr(0, pvgdprGuiIndex);
        retVal.concat(defaultSuffix);
        return retVal;
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
          
          retVal.concat(defaultSuffix);
          
          return retVal;
        }
      }
    }
    
    return defaultSandbox;
  }
  
}


export default PontusComponent;
