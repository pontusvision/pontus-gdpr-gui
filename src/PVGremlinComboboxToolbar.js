import React from 'react';
// Be sure to include styles at some point, probably during your bootstrapping
import axios from "axios";
import PontusComponent from "./PontusComponent";
import PVGremlinComboBox from "./PVGremlinComboBox";
import CreatableSelect from 'react-select/creatable';
// import 'semantic-ui-css/semantic.min.css';
// import ResizeAware from 'react-resize-aware';


class PVGremlinComboboxToolbar extends PVGremlinComboBox
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
      , options: this.props.options === null ? [] : this.props.options
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
    
    
    // multi={this.props.multi === null ? true : this.props.multi}
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
        const top = '35%';
  
        return {...provided, opacity, transition,top};
        
      },
      container: (provided, state) =>
      {
        const display = 'inline-block';
        const  width = '20em';
        const  height = '20px';
        const minHeight = '20px';
        const marginLeft = '2px';
        const marginRight = '2px';
        return {...provided, display, width, height, minHeight, marginLeft, marginRight};
  
  
      },
      control: (provided, state) =>
      {
        // const display = 'inline-block';
        const  width = '20em';
        const  height = '20px';
        const minHeight = '20px';
        return {...provided, width, height, minHeight};
    
    
      },
      placeholder: (provided, state) =>
      {
        // const display = 'inline-block';
        const  width = '20em';
        const  height = '20px';
        const minHeight = '20px';
        const fontSize = '12px';
        const top = '45%';
        return {...provided, width, height, minHeight,fontSize,top};
    
      },
  
      input: (provided, state) =>
      {
        // const display = 'inline-block';
        const  width = '20em';
        const  height = '20px';
        const minHeight = '20px';
        const fontSize = '12px';
        const top = '25%';
        const  margin = '0px';   /* margin: 2px; */
        const  paddingBottom =  '0px';  /* padding-bottom: 2px; */
        const  paddingTop =  '1px';  /* padding-top: 2px; */
        return {...provided, width, height, minHeight,fontSize,top, margin,paddingBottom,paddingTop};
    
    
      },
      indicatorsContainer: (provided, state) =>
      {
        const  height = '20px';
        const minHeight = '20px';
        const fontSize = '12px';
        const top = '25%';
        return {...provided, height, minHeight,fontSize,top};
      }
  
  
    };
  
    return (
      
      <CreatableSelect
        options={this.state.options}
        placeholder='Select Label'
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


export default PVGremlinComboboxToolbar;