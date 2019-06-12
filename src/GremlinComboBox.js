import React, {Component} from 'react';
import CreatableSelect from 'react-select/creatable';
// Be sure to include styles at some point, probably during your bootstrapping
import axios from "axios";

// import ResizeAware from 'react-resize-aware';


class GremlinComboBox extends Component
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
    
    this.state = {
      value: this.props.multi ? [] : {}
      // ,options: [{label : "one", value: "one"}, {label: "two", value: "two"}]
      , options: []
    };
    
    
  }
  
  
  
  
  
  getOptions = (jsonRequest) =>
  {
    
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
        this.setState({
          options: response.data.labels
        });
        
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
    
  }
  
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
    
    if (this.props.onChange)
    {
      this.props.onChange(value);
      // this.reactSelect.setFocus();
    }
    
  };
  
  
  componentDidMount()
  {
    /* you can pass config as prop, or use a predefined one */
    
    this.getOptions();
    
  }
  
  componentWillUnmount()
  {
    // this.props.glEventHub.off('pvgrid-on-data-loaded', this.onDataLoadedCb);
  }
  
  
  render()
  {
  
    const CustomClearText = () => 'clear all';
  
    const ClearIndicator = props =>
    {
      const {
        children = <CustomClearText/>,
        getStyles,
        innerProps: {ref, ...restInnerProps},
      } = props;
      return (
        <div
          {...restInnerProps}
          ref={ref}
          style={getStyles('clearIndicator', props)}
        >
          <div style={{padding: '0px 5px'}}>{children}</div>
        </div>
      );
    };
  
  
    const  ClearIndicatorStyles = (base, state) => ({
      ...base,
      cursor: 'pointer',
      color: state.isFocused ? 'blue' : 'black',
    });
  
    // multi={this.props.multi === null ? true : this.props.multi}
  
    return (
      
      <CreatableSelect
        name={this.props.name || "form-field-name"}
        key={this.state.value ? this.state.value.length : 0}
        value={this.state.value}
        isMulti={this.props.multi === null ? true : this.props.multi}
        isClearable
        options={this.state.options}
        joinValues={true}
        delimiter={","}
        onChange={this.onChange}
        components={ ClearIndicator }

        styles={{ clearIndicator: ClearIndicatorStyles }}
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


export default GremlinComboBox;