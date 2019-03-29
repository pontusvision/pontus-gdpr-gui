import React from 'react';
import {Box} from 'reflexbox';
import ResizeAware from 'react-resize-aware';

// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

// import GoldenLayout from 'golden-layout';

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
// import {render} from 'react-dom';
import {stack as Menu} from 'react-burger-menu';


// import PontusGridPanel from './PontusGridPanel';
import TrackPanel from './TrackPanel';
import ExtractPanel from './ExtractPanel';
import {EventEmitter} from 'fbemitter';
import ComplyPanel from './ComplyPanel';

let emitter = new EventEmitter();


// import ReactDataGrid from 'react-data-grid';
// import ReactSlickGrid from 'react-slickgrid';

// import ReactDataGridPlugins from 'react-data-grid-addons';


/***************************
 * GoldenLayout Init
 ***************************/


/***************************
 * UserDetail Component
 ***************************/
class MainPanel extends React.Component
{
  // constructor(props)
  // {
  //   super(props);
  //
  // }
  select = () =>
  {
  
  };
  
  deselect = () =>
  {
  
  };
  
  
  componentWillMount()
  {
    this.sub = emitter.addListener('panel-select', this.setPanel);
  }
  
  componentWillUnmount()
  {
    if (this.sub)
    {
      this.sub.remove();
    }
    // this.props.glEventHub.off('panel-select', this.setPanel);
  }
  
  
  setPanel = (panel) =>
  {
    this.setState(
      panel
    );
  };
  
  clickOnExtract = () =>
  {
    this.props.appPointer.extractPanel.cb()
  
  };
  
  clickOnTrack = () =>
  {
    this.props.appPointer.trackPanel.cb()
  
  };
  
  clickOnComply = () =>
  {
    this.props.appPointer.complyPanel.cb()
  };
  
  
  render()
  {
    if (this.state)
    {
      return this.state.actionJSX;
      
    }
    else
    {
      const styleTrack = {
        paddingLeft: 25,
        paddingRight: 25
      };
      const styleComply = {
        paddingLeft: 50,
        paddingRight: 50
      };
      
      return (
        <div height={'100%'} width={'100%'}>
          {/*<Flex >*/}
          
          <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}} px={1} w={1}>
            <div style={{color: "white", paddingTop: window.innerHeight/20, paddingBottom: window.innerHeight/10, fontSize: '72px'}}>GDPR</div>
          
          </Box>
          <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}} px={1} w={1}>
            <img height={200} width={200} src="pvgdpr/extract.png" alt="extract" onClick={this.clickOnExtract}/>
            <img style={styleTrack} height={200} width={200} src="pvgdpr/track.png" alt="track"
                 onClick={this.clickOnTrack}/>
            <img style={styleComply} height={200} width={200} src="pvgdpr/comply.png" alt="comply"
                 onClick={this.clickOnComply}/>
          </Box>
          <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}} px={1} w={1}>
            <div style={{color: "white", paddingTop: window.innerHeight/20, paddingBottom: window.innerHeight/20, fontSize: '26px'}}> Select a panel from the
              menu on the top right
            </div>
          
          </Box>
          {/*</Flex>*/}
        </div>)
    }
  }
}

class App extends React.Component
{
  
  constructor(props)
  {
    super(props);
    this.headerTitle = "";
    this.mainPanelSource = <MainPanel appPointer={this}  style={{height: '100%', width: '100%'}}/>;
    this.state = {tabIndex: 0, height: window.innerHeight - 20, width: window.innerWidth - 20};
  }
  
  
  setNode = (node) =>
  {
    this.node = node;
    this.node.setState({selectedIndex: 0});
  };
  
  componentWillUnmount()
  {
    // super.componentWillUnmount();
    // this.props.glEventHub.off(this.namespace + 'pvgrid-on-data-loaded', this.onDataLoadedCb);
    this.props.glEventHub.off(this.namespace + '-PVAceGremlinEditor-on-change', this.setValue);
    // window.removeResizeListener(this.od.offsetParent, this.handleResize);
    
  }
  
  handleResize = () =>
  {
    try
    {
      this.setState({height: window.innerHeight - 20, width: window.innerWidth -20});

      // console.log(this);
    }
    catch (e)
    {
      // console.log(e);
    }

  };
  
  // setOuter = (od) =>
  // {
  //   this.od = od;
  //   try
  //   {
  //     window.addResizeListener(this.od.offsetParent, this.handleResize);
  //     this.handleResize();
  //   }
  //   catch (e)
  //   {
  //
  //   }
  //
  // };
  
  trackPanel = {
    cb: (event) =>
    {
      if (event){
        event.preventDefault();
  
      }
      this.node.setState({selectedIndex: 2});
      
    }
    , panelId: "trackPanel"
    , title: "Track"
  };
  
  
  extractPanel = {
    cb: (event) =>
    {
      if (event){
        event.preventDefault();
    
      }
      // emitter.emit('panel-select', this.extractPanel);
      // this.node.setSelected(1,true);
      this.node.setState({selectedIndex: 1});
      
      // this.instance.selectItem(this.extractPanelInstance);
      
    }
    , title: "Extract"
    , panelId: "extractPanel"
    
  };
  
  complyPanel = {
    cb: (event) =>
    {
      if (event){
        event.preventDefault();
    
      }
      // this.instance.selectItem(this.complyPanelInstance);
      this.node.setState({selectedIndex: 3});
      
      // emitter.emit('panel-select', this.complyPanel);
    }
    , title: "Comply"
    , panelId: "comply"
    // , actionJSX: <ComplyPanel/>
  };
  
  
  render()
  {
    let styles = {
      bmBurgerButton: {
        position: 'fixed',
        width: '20px',
        height: '20px',
        right: '5px',
        top: '5px'
      },
      bmBurgerBars: {
        background: '#ffffff'
      },
      bmCrossButton: {
        height: '24px',
        width: '24px'
      },
      bmCross: {
        background: '#bdc3c7'
      },
      bmMenu: {
        background: '#909897',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
      },
      bmMorphShape: {
        fill: '#858788'
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
      }
    };
    
    
    var menuItems = [];
    var items = [this.extractPanel, this.trackPanel, this.complyPanel];
    for (var i = 0, ilen = items.length; i < ilen; i++)
    {
      var item = items[i];
      menuItems.push(<a style={{color: 'white'}} onClick={item.cb} key={item.panelId} className="menu-item"
                        >{item.title}</a>);
    }
    
    
    return (
      
      
      <ResizeAware
        // ref={this.setOuter}
        style={{height: '100%', width: '100%', flexDirection: 'column', flexGrow: 1}}
        height={this.state.height}
        width={this.state.width}
        onResize={this.handleResize}
      
      >
        
        <header style={{background: 'black', height: 30}}> {this.headerTitle}
          <Menu id={"menu"} right={true} styles={styles} pageWrapId={"page-wrap"}
                outerContainerId={"outer-container"}>
            {menuItems}
          
          </Menu>
        </header>
        
        
        <Tabs
          ref={this.setNode}
          style={{height: '100%', width: '100%', flexDirection: 'column', flexGrow: 1}}

          height={this.state.height}
          width={this.state.width}
          selectedIndex={this.props.selIndex ? this.props.selIndex: 0}
          onSelect={tabIndex => this.setState({tabIndex})}
        >
          <TabList style={{display: 'none'}}>
            <Tab>Home</Tab>
            <Tab>Extract</Tab>
            <Tab>Track</Tab>
            <Tab>Comply</Tab>
          </TabList>
          
          <TabPanel
            height={this.state.height}
            width={this.state.width}
            style={{backgroundColor: 'rgb(79,79,79)'}}
          >
            {this.mainPanelSource}
          </TabPanel>
          
          <TabPanel
            height={this.state.height}
            width={this.state.width}
            forceRender={false}
          >
            <ExtractPanel
              height={this.state.height}
              width={this.state.width}
            />
          </TabPanel>
          
          <TabPanel
            height={this.state.height}
            width={this.state.width}
            forceRender={false}
          >
            <TrackPanel
              height={this.state.height}
              width={this.state.width}
            />
          </TabPanel>
          
          <TabPanel
            height={this.state.height}
            width={this.state.width}
            forceRender={false}
          >
            <ComplyPanel
              height={this.state.height}
              width={this.state.width}
            />
          </TabPanel>
        
        </Tabs>
      </ResizeAware>
    
    );
  }
}


export default App;
