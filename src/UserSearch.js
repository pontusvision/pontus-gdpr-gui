import React from 'react';
// import Box, {Center as BoxCenter} from 'react-layout-components';
import PVGremlinComboBox from './PVGremlinComboBox';
import {Box, Flex} from 'reflexbox'
import SearchBar from '@opuscapita/react-searchbar';
import ResizeAware from 'react-resize-aware';
import PontusComponent from "./PontusComponent";

// import GremlinComboBoxReactBSMultiSelect from './GremlinComboBoxReactBSMultiSelect';

// Be sure to include styles at some point, probably during your bootstrapping
// import 'react-select/dist/react-select.css';


class UserSearch extends PontusComponent
{
  constructor(props)
  {
    super(props);
    
    this.req = null;
    
    
    this.state = {checkedFuzzy: false};
    this.nodePropertyNamesReactSelect = null;
    this.vertexLabels = null;
    this.propsSelected = null;
    
    this.namespace = this.props.namespace || "";
  }
  
  
  handleResize = () =>
  {
    if (this.grid)
    {
      this.grid.resizeCanvas();
      this.onViewportChanged();
      
    }
  };
  
  onError = (err) =>
  {
    console.error("error loading pages " + err);
  };
  onChangeVertexLabels = (val) =>
  {
    // alert("got data " + val);
    // this.props.glEventHub.emit('userSearch-on-boxChanged')
    
    this.vertexLabels = val;
    this.nodePropertyNamesReactSelect.getOptions({labels: val});
    this.props.glEventHub.emit(this.namespace + '-pvgrid-on-extra-search-changed', val);
    
  };
  
  setObjVertexLabels = (reactSelect) =>
  {
    this.vertexLabelsReactSelect = reactSelect;
    
  };
  
  onChangeNodePropertyNames = (val) =>
  {
    // alert("got data " + val);
    // this.props.columnSettings = [
    //   {id: "name", name: "Name", field: "name", sortable: true},
    //
    //   {id: "street", name: "Street", field: "street", sortable: true}
    // ];
    
    let colSettings = [];
    
    this.propsSelected = [];
    
    if (val)
    {
      for (let i = 0, ilen = val.length; i < ilen; i++)
      {
        colSettings.push({id: val[i].value, name: val[i].label, field: val[i].value, sortable: true});
        this.propsSelected.push(val[i].value);
      }
      
    }
    
    // for (val)
    
    
    this.props.glEventHub.emit(this.namespace + '-pvgrid-on-col-settings-changed', colSettings);
  };
  
  setObjNodePropertyNames = (reactSelect) =>
  {
    this.nodePropertyNamesReactSelect = reactSelect;
  };
  
  handleSearch = (searchStr) =>
  {
    
    if (searchStr)
    {
      this.props.glEventHub.emit(this.namespace + '-pvgrid-on-search-changed', searchStr);
      
    }
    else
    {
      this.props.glEventHub.emit(this.namespace + '-pvgrid-on-search-changed', "");
      
    }
    // this.props.glEventHub.emit('pvgrid-on-search-changed', {searchStr : searchStr, propsSelected:
    // this.propsSelected, vertexLabels: this.vertexLabels});
    
    
  };
  handleClear = () =>
  {
    
    this.props.glEventHub.emit(this.namespace + '-pvgrid-on-search-changed', "");
    
    
    // this.props.glEventHub.emit('pvgrid-on-search-changed', {searchStr : searchStr, propsSelected:
    // this.propsSelected, vertexLabels: this.vertexLabels});
    
    
  };
  
  
  onCheckedFuzzy = (checked) =>
  {
    this.setState({checkedFuzzy: !this.state.checkedFuzzy});
    // this.props.glEventHub.emit('pvgrid-on-search-changed', {searchStr : searchStr, propsSelected:
    // this.propsSelected, vertexLabels: this.vertexLabels});
    this.props.glEventHub.emit(this.namespace + '-pvgrid-on-search-exact-changed', this.state.checkedFuzzy);
    
    
  };
  
  
  componentDidMount()
  {
    /* you can pass config as prop, or use a predefined one */
    
    
  }
  
  componentWillUnmount()
  {
    this.props.glEventHub.off(this.namespace + '-pvgrid-on-data-loaded', this.onDataLoadedCb);
  }
  
  
  render()
  {
    return (
      <ResizeAware
        style={{width: '100%', height: '100%'}}
        onResize={this.handleResize}
      >
        
        <Flex w={1} wrap={true}>
          <Flex p={1} w={1} align='center' mr={1}>
            <Box px={2} w={1 / 4}>
              <div className="userdetails">Data Types</div>
            </Box>
            
            <Box px={2} w={1 / 2} style={{zIndex: 200}}>
              <PVGremlinComboBox
                namespace={this.namespace}
                name="node-types"
                multi={false}
                onChange={this.onChangeVertexLabels}
                onError={this.onError}
                ref={this.setObjVertexLabels}
                url={PontusComponent.getRestVertexLabelsURL(this.props)}
              />
            </Box>
          </Flex>
          
          <Flex p={1} w={1} align='center' mr={1}>
            <Box px={2} w={1 / 4}>
              <div className="userdetails">Data Properties</div>
            </Box>
            
            <Box px={2} w={1 / 2} style={{zIndex: 199}}>
              <PVGremlinComboBox
                name="node-property-types"
                namespace={this.namespace}
                
                multi={true}
                onChange={this.onChangeNodePropertyNames}
                onError={this.onError}
                ref={this.setObjNodePropertyNames}
                url={PontusComponent.getRestNodePropertyNamesURL(this.props)}
              />
            </Box>
          </Flex>
          
          <Flex p={1} w={1} align='center' mr={1}>
            <Box px={2} w={1 / 4}>
              <div className="userdetails">Search</div>
            </Box>
            
            <Box px={2} w={1 / 2}>
              <SearchBar
                autoFocus
                renderClearButton
                
                renderSearchButton
                placeholder="Search Properties..."
                onChange={() => {}}
                onClear={this.handleClear}
                onSelection={() => {}}
                onSearch={this.handleSearch}
                suggestions={[]}
                // suggestionRenderer={this.suggestionRenderer}
                // styles={styles}
              
              />
            </Box>
          </Flex>
        
        
        </Flex>
      
      
      </ResizeAware>
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


export default UserSearch;
