import React, {Component} from 'react';
import ResizeAware from 'react-resize-aware';
import Iframe from 'react-iframe';
import {NavPane, NavPaneItem} from "react-desktop/windows";
import {child} from "react-icons-kit-allreact/fa/child";
import {lab} from "react-icons-kit-allreact/icomoon/lab";
import Icon from 'react-icons-kit-allreact';
import ReactDataGrid from 'react-data-grid';


class ExtractPanel extends Component
{
  
  constructor(props)
  {
    super(props);
    this.state = {height: window.innerHeight - 50};

  }
  
  
  select = () =>
  {
  
  };
  
  deselect = () =>
  {
  
  };
  
  handleResize = ({width, height}) =>
  {
    if (height > 0){
      // this.ref.updateSize(width, height);
    }
    else{
      // this.ref.updateSize(width,window.innerHeight - 50);
    }
    
    this.setState({height: window.innerHeight - 50});
  
    
  };
  
  setRef=(ref)=>
  {
    this.ref = ref;
  };
  
  render()
  {
    //
    // let consentIcon = (<svg x="0px" y="0px" width="16px" height="15.6px" viewBox="0 0 1000 1000">
    //   <path
    //     fill={"#030104"}
    //     d="M513.8,747.3c0.2-0.8,0.5-1.6,0.7-2.4H117V182.4h765.4V520c52.3,19.2,89.8,88.2,107,141.7V163.4c0-42-34.1-76.1-76.1-76.1H86.1c-42,0-76.1,34.1-76.1,76.1V764c0,42,34.1,76.1,76.1,76.1h469.8C515.9,816.6,505.2,778.6,513.8,747.3z
    // M529.2,442.3c26.1,0,51.1,16.6,59.4,44.2c-10.6-8.1-22.9-12.1-35.4-12.1c-12.6,0-25.4,4.1-36.5,12c-22.1,15.8-31.8,42.6-23.3,68c-34.3-24.6-34.5-75.9,0.1-100.6C504.6,445.9,517,442.3,529.2,442.3
    // M557.9,508.3c11.1,0,21.9,5.2,28.8,14.9l86.1,120.7c2.5,3.5,6.5,5.4,10.6,5.4c2.6,0,5.2-0.8,7.5-2.4c5.8-4.2,7.2-12.2,3-18.1L672.7,599c9.6-2.4,21.3-5.4,34.2-8.5c1.8-0.4,3.6-0.6,5.3-0.6c7.2,0,14.1,3.4,18.3,9.5l17.4,24.4c2.5,3.5,6.5,5.4,10.6,5.4c2.6,0,5.2-0.8,7.5-2.4c5.8-4.2,7.2-12.2,3-18.1l-20.1-28.2c11.1-2.6,22.4-5.1,33.6-7.5c1.6-0.3,3.2-0.5,4.8-0.5c7.2,0,14.1,3.5,18.3,9.5l14.8,20.7c2.5,3.5,6.5,5.4,10.6,5.4c2.6,0,5.2-0.8,7.5-2.4c5.8-4.2,7.2-12.2,3-18.1l-16.5-23.2c3.4-0.6,6.6-1.2,9.9-1.8c4.5-0.8,8.7-1.2,12.6-1.2c26.7,0,43.1,16.9,61.4,42.5c47,65.9,34,112.3,81.3,178.7c-59.5,42.5-119.6,85.4-182.3,130.1c-98.4-73.4-183.4-96.9-210.8-106.1c-26.1-8.8-43-25.6-37.2-46.6c5.6-20.1,25.7-26.9,43.4-26.9c1.1,0,2.1,0,3.1,0.1c27.7,1.3,50.1,9.6,50.1,9.6L529.1,564.3c-11.3-15.9-7.6-38,8.3-49.4C543.6,510.5,550.8,508.3,557.9,508.3"
    // /> </svg>);
    let hght = ''+ this.state.height - 40  + 'px';
    let nifiPanel =       <Iframe url="/nifi/"
              style={{height: hght, width: '100%'}}
  
              width="100%"
              height={hght}
              ref={this.setRef}
              display="initial"
              position="relative"
        // frameborder="0"
              allowFullScreen={false}/>;
  
    const columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'count', name: 'Count' } ];
  
    const rows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];
    let handsOnTable = <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      rowsCount={3}
      minHeight={150} />;
    
    
    return (
      <div
        style={{height: hght, width:'100%', flexDirection: 'column', flexGrow: 1, flexBasis:'auto'}}
      >
        <NavPane
          style={{flexDirection: 'column', flexGrow: 1, flexBasis:'auto'}}
          
          openLength={200}
          push
          color={this.props.color}
          height={this.state.height - 40}
          width={this.state.width - 20}
          theme={this.props.theme}
        >
          {this.renderItem("NiFi", nifiPanel, <Icon icon={lab}/>)}
          {this.renderItem("Test", handsOnTable, <Icon icon={child}/>)}
        </NavPane>
      </div>
    );
  }
  
  renderItem(title, content, icon)
  {
    
    
    return (
      <NavPaneItem
        title={title}
        icon={icon}
        // style={{height: this.state.height - 80+'px', width: '100%'}}
        style={{height: this.state.height - 80+'px', width: '100%', flexDirection: 'column', flexGrow: 1, flexBasis:'auto'}}
        
        theme="light"
        background="#000000"
        selected={this.state.selected === title}
        onSelect={() => this.setState({selected: title})}
        padding="10px 20px"
        push
      
      >
        <ResizeAware
          style={{height: '100%', width: '100%', flexDirection: 'column', flexGrow: 1, flexBasis:'auto'}}
          
          onResize={this.handleResize}
        >
          {content}
        </ResizeAware>
      </NavPaneItem>
    );
  }
  //
  // render()
  // {
  //
  //   return (         <ResizeAware
  //       style={{height: this.state.height, width: '100%'}}
  //       onResize={this.handleResize}
  //     >
  //       <Iframe url="/nifi/"
  //               style={{height: this.state.height, width: '100%'}}
  //
  //               width="100%"
  //          height={this.state.height}
  //               ref={this.setRef}
  //               display="initial"
  //               position="relative"
  //         // frameborder="0"
  //               allowFullScreen={false}/>
  //     </ResizeAware>
  //   )
  //
  // }
}

export default ExtractPanel;
