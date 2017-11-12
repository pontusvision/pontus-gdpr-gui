import React, {Component} from 'react';
// import Box, {Center as BoxCenter} from 'react-layout-components';
import GremlinComboBox from './GremlinComboBox';
import {Flex, Box} from 'reflexbox'
import SearchBar from 'react-search-bar';

// import GremlinComboBoxReactBSMultiSelect from './GremlinComboBoxReactBSMultiSelect';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

import ResizeAware from 'react-resize-aware';


class UserSearch extends Component
{
  constructor(props)
  {
    super(props);
    
    this.req = null;
    
    
    this.state = {checkedFuzzy: false};
    this.nodePropertyNamesReactSelect = null;
    this.vertexLabels = null;
    this.propsSelected = null;
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
    alert("error loading pages " + err);
  };
  onChangeVertexLabels = (val) =>
  {
    // alert("got data " + val);
    // this.props.glEventHub.emit('userSearch-on-boxChanged')
    
    this.vertexLabels = val;
    this.nodePropertyNamesReactSelect.getOptions({labels: val});
    this.props.glEventHub.emit('pvgrid-on-extra-search-changed', val);
  
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
    
    for (let i = 0,  ilen = val.length; i < ilen; i++){
      colSettings.push({id: val[i].value, name: val[i].label, field: val[i].value, sortable: true});
      this.propsSelected.push(val[i].value);
    }
    
    // for (val)
  
  
    this.props.glEventHub.emit('pvgrid-on-col-settings-changed', colSettings);
  };
  
  setObjNodePropertyNames = (reactSelect) =>
  {
    this.nodePropertyNamesReactSelect = reactSelect;
  };
  
  handleSearch = (searchStr) =>
  {
  
    // this.props.glEventHub.emit('pvgrid-on-search-changed', {searchStr : searchStr, propsSelected: this.propsSelected, vertexLabels: this.vertexLabels});
    this.props.glEventHub.emit('pvgrid-on-search-changed', searchStr);
  
  
  }
  
  onCheckedFuzzy = (checked) =>
  {
    this.setState({checkedFuzzy: !this.state.checkedFuzzy});
    // this.props.glEventHub.emit('pvgrid-on-search-changed', {searchStr : searchStr, propsSelected: this.propsSelected, vertexLabels: this.vertexLabels});
    this.props.glEventHub.emit('pvgrid-on-search-exact-changed', this.state.checkedFuzzy);
  
  
  }
  
  
  
  componentDidMount()
  {
    /* you can pass config as prop, or use a predefined one */
    
    
  }
  
  componentWillUnmount()
  {
    this.props.glEventHub.off('pvgrid-on-data-loaded', this.onDataLoadedCb);
  }
  
  
  render()
  {
    /*
     <Flex p={1}  w={1} align='center' mr ={1}>
 
     <Box px={2} w={1 / 8}>
     <div className="userdetails">Relationships</div>
     </Box>
 
     <Box px={2} w={1 / 4}>
     <GremlinComboBox
     name="edgge-types"
     multi={true}
     onChange={this.onChangeEdgeLabels}
     onError={this.onError}
     ref={this.setObjEdgeLabels}
     url={"/gateway/sandbox/pvgdpr_server/home/edge_labels"}
     />
     </Box>
     </Flex>
     
     <GremlinComboBox
     name="node-types"
     multi={true}
     onChange={this.onChange}
     onError={this.onError}
     ref={this.setObj}
     url={"/gateway/sandbox/pvgdpr_server/home/vertex_labels"}
     />
     
     <GremlinComboBoxReactBSMultiSelect
     multi={true}
     onChange={this.onChange}
     onError={this.onError}
     ref={this.setObj}
     url={"/gateway/sandbox/pvgdpr_server/home/vertex_labels"}
     />
     */
    return (
      <ResizeAware
        style={{width: '100%', height: '100%'}}
        onResize={this.handleResize}
      >
        
        <Flex w={1} wrap={true}>
          <Flex p={1} w={1} align='center' mr ={1}>
            <Box px={2} w={1 / 4}>
              <div className="userdetails">Data Types</div>
            </Box>
            
            <Box px={2} w={1 / 2}>
              <GremlinComboBox
                name="node-types"
                multi={false}
                onChange={this.onChangeVertexLabels}
                onError={this.onError}
                ref={this.setObjVertexLabels}
                url={"/gateway/sandbox/pvgdpr_server/home/vertex_labels"}
              />
            </Box>
          </Flex>
          
          <Flex p={1} w={1} align='center' mr ={1}>
            <Box px={2} w={1 / 4}>
              <div className="userdetails">Data Properties</div>
            </Box>
    
            <Box px={2} w={1 / 2}>
              <GremlinComboBox
                name="node-property-types"
                multi={true}
                onChange={this.onChangeNodePropertyNames}
                onError={this.onError}
                ref={this.setObjNodePropertyNames}
                url={"/gateway/sandbox/pvgdpr_server/home/node_property_names"}
              />
            </Box>
          </Flex>
  
          <Flex p={1} w={1} align='center' mr ={1}>
            <Box px={2} w={1 / 4}>
              <div className="userdetails">Full Name (Sounds Like)</div>
              {/*<label>*/}
                {/*<input type="checkbox"*/}
                       {/*name="SoundsLike"*/}
                       {/*checked={this.state.checkedFuzzy}*/}
                       {/*onClick={this.onCheckedFuzzy} />*/}
                {/*Sounds Like*/}
              {/*</label>*/}
            </Box>
    
            <Box px={2} w={1 / 2}>
              <SearchBar
                autoFocus
                // renderClearButton
                renderSearchButton
                placeholder="Search Properties..."
                onChange={()=>{}}
                onClear={()=>{}}
                onSelection={()=>{}}
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