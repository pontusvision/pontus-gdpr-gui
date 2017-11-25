import React from 'react';
import {Box} from 'reflexbox';
import ResizeAware from 'react-resize-aware';

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
        <div height={'100%'} width={'100%'} style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          flexBasis: "auto",
          flexFlow: "column",
          flexDirection: "column",
          flexWrap: "nowrap"
        }}
        >
          {/*<Flex >*/}
          
          <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}} px={1} w={1}>
            <div style={{color: "white", paddingTop: 160, paddingBottom: 60, fontSize: '72px'}}>GDPR</div>
          
          </Box>
          
          
          <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}} px={1} w={1}>
            <img height={200} width={200} src="pvgdpr/extract.png" alt="extract" onClick={this.myfunction}/>
            <img style={styleTrack} height={200} width={200} src="pvgdpr/track.png" alt="track"
                 onClick={this.myfunction}/>
            <img style={styleComply} height={200} width={200} src="pvgdpr/comply.png" alt="comply"
                 onClick={this.myfunction}/>
          </Box>
          
          <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}} px={1} w={1}>
            <div style={{color: "white", paddingTop: 60, paddingBottom: 60, fontSize: '26px'}}> Select a panel from the
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
    
    this.mainPanelSource =   <MainPanel style={{height: '100%', width: '100%'}}/>;
    
    this.trackPanelSource = <TrackPanel style={{height: '100%', width: '100%'}}/>;
    this.state = { tabIndex: 0 };
  
  
    // this.config = {
    //   settings: {
    //     hasHeaders: true,
    //     constrainDragToContainer: true,
    //     reorderEnabled: false,
    //     selectionEnabled: true,
    //     popoutWholeStack: false,
    //     blockedPopoutsThrowError: true,
    //     closePopoutsOnUnload: true,
    //     showPopoutIcon: false,
    //     showMaximiseIcon: false,
    //     showCloseIcon: false
    //   }
    //   , dimensions: {
    //     borderWidth: 5,
    //     minItemHeight: 10,
    //     minItemWidth: 10,
    //     headerHeight: 20,
    //     dragProxyWidth: 300,
    //     dragProxyHeight: 200
    //   }
    //   // , labels: {
    //   //   close: 'close',
    //   //   maximise: 'maximise',
    //   //   minimise: 'minimise',
    //   //   popout: 'open in new window'
    //   // }
    //   , content: [
    //     {
    //       type: 'row',
    //       width: 30,
    //       content: [
    //         // {
    //         //   title: '',
    //         //   type: 'react-component',
    //         //   component: 'menu'
    //         // }
    //         // ,
    //         {
    //           type: 'stack',
    //           width: 70,
    //
    //           content: [
    //             {
    //               title: '',
    //               type: 'react-component',
    //               component: 'main-panel'
    //             }
    //             , {
    //               title: '',
    //               type: 'react-component',
    //               component: 'extract-panel'
    //             }
    //             , {
    //               title: '',
    //               type: 'react-component',
    //               component: 'track-panel'
    //             }
    //             , {
    //               title: '',
    //               type: 'react-component',
    //               component: 'comply-panel'
    //             }
    //           ]
    //         }
    //
    //       ]
    //
    //     }
    //   ]
    // };
  }
  
  // handleResize = () =>
  // {
  //   // if (this.node)
  //   // {
  //   //   this.node.height = window.innerHeight - 2;
  //   //   this.node.width = window.innerWidth - 2;
  //   //
  //   // }
  //
  //   // this.forceUpdate();
  //   if (this.instance)
  //   {
  //
  //     this.instance.updateSize(window.innerWidth - 4, window.innerHeight - 4);
  //   }
  // };
  
  componentWillUnmount()
  {
    // window.removeEventListener('resize', this.handleResize);
  }
  
  componentDidMount()
  {
    // window.addEventListener('resize', this.handleResize);
    
    /* you can pass config as prop, or use a predefined one */
    
    var
      savedState = null;// LPPM: TODO: re-enable this later localStorage.getItem('savedState');
    
    // if (savedState !== null)
    // {
    //   this.instance = new GoldenLayout(JSON.parse(savedState), this.node);
    // }
    // else
    // {
    //   this.instance = new GoldenLayout(this.config, this.node);
    // }
    //
    //
    // this.instance.registerComponent('main-panel', MainPanel );
    // this.instance.registerComponent('extract-panel',ExtractPanel);
    // this.instance.registerComponent('track-panel', TrackPanel);
    // this.instance.registerComponent('comply-panel',ComplyPanel);
    //
    //
    // this.mainPanelInstance = new MainPanel(this.props);
    // this.extractPanelInstance = new ExtractPanel(this.props);
    // this.trackPanelInstance = new TrackPanel(this.props);
    // this.complyPanelInstance = new ComplyPanel(this.props);
    //
    
    // instance = new GoldenLayout(config, this.node);
    /* register components or bind events to your new instance here */
    // this.instance.registerComponent('main-panel', () => {return this.mainPanelInstance;} );
    // this.instance.registerComponent('extract-panel',() => {return this.extractPanelInstance;} );
    // this.instance.registerComponent('track-panel', ()=> { return this.trackPanelInstance});
    // this.instance.registerComponent('comply-panel', ()=> { return this.complyPanelInstance});
    
    // this.instance.registerComponent('menu', PVMenu);
    // this.instance.on('tabCreated', function (tab)
    // {
    //   tab.closeElement.off('click').click(function ()
    //   {
    //     // if( confirm( 'You have unsaved changes, are you sure you want to close this tab' ) ) {
    //     //     tab.contentItem.remove();
    //     // }
    //   })
    // });
    // this.instance.on('stateChanged', this.saveState);
    //
    //
    //
    // this.instance.init();
    //
    // this.selectedItem = this.instance.selectedItem();
  }
  
  
  saveState = () =>
  {
    var state = JSON.stringify(this.instance.toConfig());
    localStorage.setItem('savedState', state);
    
  }
  
  setNode = (node) =>
  {
    
    this.node = node;
    this.node.setState({selectedIndex: 0});
  };
  setOuter = (outter) =>
  {
    this.outter = outter;
   }
  
  trackPanel = {
    cb: (event) =>
    {
      event.preventDefault();
      // this.headerTitle = "";
      // var obj = this.instance.getComponent('track-panel');
      this.node.setState({selectedIndex: 2});
  
      // this.instance.selectItem(this.trackPanelInstance);
      // emitter.emit('panel-select', this.trackPanel);
    }
    , panelId: "trackPanel"
    , title: "Track"
  }
  
  // informationYouHold = {
  //   cb: (event) =>
  //   {
  //     event.preventDefault();
  //     emitter.emit('panel-select', this.informationYouHold);
  //   }
  //   , panelId: "informationYouHold"
  //   , title: "Information You Hold"
  //   , actionJSX: <PontusGridPanel/>
  // }
  
  extractPanel = {
    cb: (event) =>
    {
      event.preventDefault();
      // emitter.emit('panel-select', this.extractPanel);
      // this.node.setSelected(1,true);
      this.node.setState({selectedIndex: 1});
  
      // this.instance.selectItem(this.extractPanelInstance);
      
    }
    , title: "Extract"
    , panelId: "extractPanel"
    
  }
  
  complyPanel = {
    cb: (event) =>
    {
      event.preventDefault();
      // this.instance.selectItem(this.complyPanelInstance);
      this.node.setState({selectedIndex: 3});
  
      // emitter.emit('panel-select', this.complyPanel);
    }
    , title: "Comply"
    , panelId: "comply"
    // , actionJSX: <ComplyPanel/>
  }
  
  
  handleResize = ({width, height}) =>
  {
    // if (this.outter){
    //   this.outter.height = window.innerHeight;
    //   this.outter.width = window.innerWidth;
    // }
    if (this.instance)
    {
      
      this.instance.updateSize(window.innerWidth, window.innerHeight - 30);
    }
    
  }
  
  
  render()
  {
    var styles = {
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
                        href="">{item.title}</a>);
    }
    
    
    return (
      <ResizeAware
        id="outer-container"
        ref={this.setOuter}
        style={{height: "calc(100%)", width: window.innerWidth, overflow: 'hidden'}}
        onResize={this.handleResize}
      
      >
        
        <header style={{background: 'black', height: 30}}> {this.headerTitle}
          <Menu id={"menu"} right={true} styles={styles} pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
            {menuItems}
          
          </Menu>
        </header>
        
        {/*<main id="page-wrap" style={{height: "calc(100%-10)", width: window.innerWidth, overflow: 'hidden'}}>*/}
        
        <Tabs ref={this.setNode} style={{height: '100%', width: '100%'}} selectedIndex={0} onSelect={tabIndex => this.setState({ tabIndex })} >
          <TabList style ={{display: 'none'}}>
            <Tab>Home</Tab>
            <Tab>Extract</Tab>
            <Tab>Track</Tab>
            <Tab>Comply</Tab>
          </TabList>
          
          <TabPanel   style={{height: '100%', width: '100%'}}  >
            {this.mainPanelSource}
          </TabPanel>
          
          <TabPanel style={{height: '100%', width: '100%'}} forceRender={false} >
            <ExtractPanel style={{height: '100%', width: '100%'}}/>
          </TabPanel>
          
          <TabPanel  style={{height: '100%', width: '100%'}} forceRender={false} >
            {this.trackPanelSource}
          </TabPanel>
          
          <TabPanel style={{height: '100%', width: '100%'}} forceRender={false} >
            <ComplyPanel style={{height: '100%', width: '100%'}}/>
          </TabPanel>
          
          {/*<div style={{height: "100%", width: window.innerWidth, overflow: 'hidden'}}*/}
          {/*ref={this.setNode}/>*/}
        </Tabs>
        {/*</main>*/}
      </ResizeAware>
    
    );
  }
}


export default App;
