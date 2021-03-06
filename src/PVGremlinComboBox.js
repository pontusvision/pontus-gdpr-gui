import React, {Component} from 'react';
import CreatableSelect from 'react-select/creatable';
// Be sure to include styles at some point, probably during your bootstrapping
import axios from "axios";
import PontusComponent from "./PontusComponent";

// import ResizeAware from 'react-resize-aware';


class PVGremlinComboBox extends Component
{
  constructor(props)
  {
    super(props);
    
    this.req = null;
    if (this.props.url === null)
    {
      let err = "must set the URL to forward requests";
      throw (err);
    }
    
    let lastValStr =     PontusComponent.getItem(`${this.props.namespace}-value`);
  
    let optionsStr =  PontusComponent.getItem(`${this.props.namespace}-options`);
    
    let lastVal = null;
    if(lastValStr){
      lastVal = JSON.parse(lastValStr);
      
    }
    else {
      lastVal = lastVal?lastVal: (this.props.value) ? this.props.value : (this.props.multi ? [] : {});
  
      let options = (!this.props.options) ? this.props.multi? lastVal: [lastVal] : this.props.options;
  
  
    }
  
    lastVal = lastVal?lastVal: (this.props.value) ? this.props.value : (this.props.multi ? [] : {});

    let options = (!this.props.options) ? this.props.multi? lastVal: [lastVal] : this.props.options;
    
    
  
    this.state = {
      ...props
      , value: lastVal
      // ,options: [{label : "one", value: "one"}, {label: "two", value: "two"}]
      , options: options
    };
    
    
  }
  
  
  getOptions = (jsonRequest) =>
  {
    if (jsonRequest)
    {
      let reqToSave = jsonRequest;
      if (typeof jsonRequest === 'object')
      {
        reqToSave = JSON.stringify(jsonRequest);
      }
      PontusComponent.setItem(`${this.props.namespace}.optionsJsonRequest`, reqToSave);
    }
    
    
    let url = this.props.url;
    
    if (this.req)
    {
      this.req.cancel();
    }
    
    
    let CancelToken = axios.CancelToken;
    this.req = CancelToken.source();
    
    axios.post(url, jsonRequest,
      {
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        , cancelToken: this.req.token
      }).then(
      (response) =>
      {
        // this.reactSelect.options = response.data.labels || [];
        if (response.data && response.data.labels)
        {
          for (let i = 0; i < response.data.labels.length; i++)
          {
            let lbl = response.data.labels[i];
            lbl.label = PontusComponent.t(lbl.label);
          }
          this.setState({
            options: response.data.labels
          });
          
          
        }
        
        // callback(null, {
        //   options: response.data.labels || [],
        //   complete: true
        //
        // });
      }
    ).catch((thrown) =>
    {
      if (axios.isCancel(thrown))
      {
        console.log('Request canceled', thrown.message);
      }
      else
      {
        this.onError(thrown);
      }
    });
    
    
    // return retVal;
    
  };
  
  onError = (err) =>
  {
    if (this.props.onError)
    {
      this.props.onError(err);
    }
    else
    {
      console.error("error loading pages " + err);
      
    }
  };
  
  
  onChange = (value) =>
  {
    this.setState({
      value: value
    });
    PontusComponent.setItem(`${this.props.namespace}-value`, JSON.stringify(value));
    
    if (this.props.onChange)
    {
      this.props.onChange(value);
      // this.reactSelect.setFocus();
    }
    
  };
  
  
  componentDidMount()
  {
    /* you can pass config as prop, or use a predefined one */
    let savedReq = PontusComponent.getItem(`${this.props.namespace}.optionsJsonRequest`);
    try
    {
      if (savedReq){
        savedReq = JSON.parse(savedReq);
  
      }
      else {
        savedReq = this.props.optionsRequest;
      }
    }
    catch (e)
    {}
    
    this.getOptions(savedReq);
    
  }
  
  componentWillUnmount()
  {
    // this.props.glEventHub.off('pvgrid-on-data-loaded', this.onDataLoadedCb);
  }
  
  
  render()
  {
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        color: 'black',
        padding: 2,
      }),
      singleValue: (provided, state) =>
      {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        return {...provided, opacity, transition};
      }
    };
    
    // multi={this.props.multi === null ? true : this.props.multi}
    
    return (
      
      <CreatableSelect
        name={this.props.name || "form-field-name"}
        // key={this.state.value}
        defaultValue={this.state.value}
        isMulti={this.props.multi === null ? true : this.props.multi}
        isClearable
        options={this.state.options}
        joinValues={true}
        delimiter={","}
        onChange={this.onChange}
        placeholder={this.state.placeholder}
        styles={customStyles}
      />
    
    
    );
    
    /*       return (
     <ul className="userlist">
     {this.state.users.map(function (user) {
     return <User
     key={user.name}
     userData={user}
     glEventHub={eventHub}/>
     })}
     </ul>
     )
     */
  }
}


export default PVGremlinComboBox;