import React, {Component} from 'react';
import ResizeAware from 'react-resize-aware';
import {NavPane, NavPaneItem} from 'react-desktop/windows';
import NavPanelInformationYouHold from "./NavPanelInformationYouHold";
import NavPanelAwareness from "./NavPanelAwareness";
import NavPanelPrivacyNotices from "./NavPanelPrivacyNotices";
import NavPanelSubjectAccessRequest from "./NavPanelSubjectAccessRequest";
import NavPanelLawfulBasis from "./NavPanelLawfulBasis";
import NavPanelConsent from "./NavPanelConsent";
import NavPanelChildren from "./NavPanelChildren";
import NavPanelDataBreaches from "./NavPanelDataBreaches";
import NavPanelDataProcedures from "./NavPanelDataProcedures";
import NavPanelPrivacyImpactAssessment from './NavPanelPrivacyImpactAssessment';
import NavPanelDataProtnOfficer from './NavPanelDataProtnOfficer';
import NavPanelInternational from "./NavPanelInternational";
import Icon from 'react-icons-kit-allreact';
import {book_2} from 'react-icons-kit-allreact/ikons/book_2';
import {info} from 'react-icons-kit-allreact/icomoon/info';
import {eyeBlocked} from 'react-icons-kit-allreact/icomoon/eyeBlocked';
import {iosPricetagsOutline} from 'react-icons-kit-allreact/ionicons/iosPricetagsOutline';
import {download} from 'react-icons-kit-allreact/entypo/download';
import {ic_child_care} from 'react-icons-kit-allreact/md/ic_child_care';
import {unlocked} from 'react-icons-kit-allreact/iconic/unlocked';
import {balanceScale} from 'react-icons-kit-allreact/fa/balanceScale';
import {globe} from 'react-icons-kit-allreact/ikons/globe';
import {check} from 'react-icons-kit-allreact/fa/check';
import {blackTie} from 'react-icons-kit-allreact/fa/blackTie';

import {shareAlt} from 'react-icons-kit-allreact/fa/shareAlt';


class ComplyPanel extends Component
{
  
  
  
  
  handleResize = ({width, height}) =>
  {
    try
    {
      
      this.setState({height: this.state.height, width: this.state.width});
      
    }
    catch (e)
    {
      console.log(e);
    }
    
  };
  
  
  
  // static defaultProps = {
  //   color: '#cc7f29',
  //   theme: 'dark'
  // };
  
  constructor(props)
  {
    super(props);
    this.state = {
      selected: 'Awareness',
      height: props.height,
      width: props.width
    }
  }
  
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
    
    
    return (
      
      <div
        style={{height: '100%', width: '100%'}}
      >
        <NavPane
          openLength={200}
          push
          color={this.props.color}
          height={this.state.height - 40}
          width={this.state.width - 20}

          theme={this.props.theme}
        >
          {this.renderItem("Awareness", <NavPanelAwareness style={{height: '100%', width:'100%'}}/>, <Icon icon={book_2}/>)}
          {this.renderItem("Info You Hold", <NavPanelInformationYouHold style={{height: '100%', width:'100%'}}/>, <Icon icon={info}/>)}
          {this.renderItem("Privacy Notices", <NavPanelPrivacyNotices style={{height: '100%', width:'100%'}}/>, <Icon icon={eyeBlocked}/>)}
          {this.renderItem("Individual's Rights", <NavPanelDataProcedures style={{height: '100%', width:'100%'}}/>, <Icon icon={iosPricetagsOutline}/>)}
          {this.renderItem("Subj Access Req", <NavPanelSubjectAccessRequest style={{height: '100%', width:'100%'}}/>, <Icon icon={download}/>)}
          {this.renderItem("Lawful Basis", <NavPanelLawfulBasis style={{height: '100%', width:'100%'}}/>, <Icon icon={balanceScale}/>)}
          {this.renderItem("Consent", <NavPanelConsent style={{height: '100%', width:'100%'}}/>, <Icon icon={check}/>)}
          {this.renderItem("Children", <NavPanelChildren style={{height: '100%', width:'100%'}}/>, <Icon icon={ic_child_care}/>)}
          {this.renderItem("Data Breaches", <NavPanelDataBreaches style={{height: '100%', width:'100%'}}/>, <Icon icon={unlocked}/>)}
          {this.renderItem("Priv Impact Asmnt", <NavPanelPrivacyImpactAssessment style={{height: '100%', width:'100%'}}/>, <Icon icon={shareAlt}/>)}
          {this.renderItem("Data Prot'n Offcr", <NavPanelDataProtnOfficer style={{height: '100%', width:'100%'}}/>, <Icon icon={blackTie}/>)}
          {this.renderItem("International", <NavPanelInternational style={{height: '100%', width:'100%'}}/>, <Icon icon={globe}/>)}
        
        
        </NavPane>
      </div>
    );
  }
  
  // renderAwareness()
  // {
  //   let title = "Awareness";
  //   return (
  //     <NavPaneItem
  //       title={title}
  //       icon={<Icon icon={book_2} />}
  //       style={{height: this.state.height, width: '100%'}}
  //       theme="light"
  //       background="#000000"
  //       selected={this.state.selected === title}
  //       onSelect={() => this.setState({selected: title})}
  //       padding="10px 20px"
  //       push
  //
  //     >
  //       <NavPanelAwareness/>
  //     </NavPaneItem>
  //   );
  // }
  //
  
  // renderItemInfoYouHold()
  // {
  //   let title = "Info You Hold";
  //
  //   return (
  //     <NavPaneItem
  //       title={title}
  //       icon={<Icon icon={info} />}
  //       style={{height: this.state.height, width: '100%'}}
  //       theme="light"
  //       background="#000000"
  //       selected={this.state.selected === title}
  //       onSelect={() => this.setState({selected: title})}
  //       padding="10px 20px"
  //       push
  //
  //     >
  //       <NavPanelInformationYouHold/>
  //     </NavPaneItem>
  //   );
  // }
  //
  
  // renderPrivacyInformation()
  // {
  //   let title = "Info You Hold";
  //
  //   return (
  //     <NavPaneItem
  //       title={title}
  //       icon={<Icon icon={info}/>}
  //       style={{height: this.state.height, width: '100%'}}
  //       theme="light"
  //       background="#000000"
  //       selected={this.state.selected === title}
  //       onSelect={() => this.setState({selected: title})}
  //       padding="10px 20px"
  //       push
  //
  //     >
  //       <NavPanelInformationYouHold/>
  //     </NavPaneItem>
  //   );
  // }
  
  renderItem(title, content, icon)
  {
    
    
    return (
      <NavPaneItem
        title={title}
        icon={icon}
        style={{height: this.state.height - 80 + 'px', width: '100%'}}
        
        theme="light"
        background="#000000"
        selected={this.state.selected === title}
        onSelect={() => this.setState({selected: title})}
        padding="10px 20px"
        push
      
      >
        <ResizeAware
          style={{height: '100%', width: '100%'}}
          
          onResize={this.handleResize}
        >
          {content}
        </ResizeAware>
      </NavPaneItem>
    
    
    );
  }
  
  // renderIcon(name)
  // {
  //   const fill = this.props.theme === 'dark' ? '#ffffff' : '#000000';
  //   switch (name)
  //   {
  //     case 'Item 1':
  //       return (
  //         <svg x="0px" y="0px" width="16px" height="14.9px" viewBox="0 0 16 14.9">
  //           <polygon fill={fill} points="16,5.6 10.6,4.7 8,0 5.4,4.7 0,5.7 3.8,9.6 3.1,14.9 8,12.6 13,14.8 12.3,9.5
  // "/> </svg> ); case 'Item 2': return ( <svg x="0px" y="0px" width="16px" height="13.5px" viewBox="0 0 16 13.5">
  // <path fill={fill} d="M16,4.2C16,1.9,14.1,0,11.7,0c-1.4,0-2.6,0.6-3.4,1.6c0,0,0,0,0,0C8.3,1.7,8.1,1.8,8,1.8
  // c-0.2,0-0.3-0.1-0.4-0.2c0,0,0,0,0,0C6.8,0.6,5.6,0,4.3,0C1.9,0,0,1.9,0,4.2c0,0,0,0.1,0,0.1l0,0c0,0,0,0.1,0,0.3
  // C0,4.8,0.1,5,0.1,5.2c0.3,1.4,1.4,4.1,5.1,6.5c2.1,1.4,2.6,1.8,2.8,1.8c0,0,0,0,0,0c0,0,0,0,0,0c0.1,0,0.7-0.4,2.8-1.8
  // c3.5-2.3,4.6-4.8,5-6.3C15.9,5.1,16,4.8,16,4.5C16,4.3,16,4.2,16,4.2L16,4.2C16,4.2,16,4.2,16,4.2z" /> </svg> ); case
  // 'Item 3': return ( <svg x="0px" y="0px" width="16px" height="15.6px" viewBox="0 0 16 15.6"> <path fill={fill}
  // d="M19,24.968v1H7v-1c0-0.551,0.449-1,1-1h2.013c0.053-1.248,0.863-2.29,1.987-2.689V9.554
  // c-0.527-0.333-0.88-0.917-0.88-1.587H12h2h0.88c0,0.67-0.353,1.254-0.88,1.587v11.724c1.124,0.399,1.934,1.441,1.987,2.689H18
  // C18.551,23.968,19,24.417,19,24.968z
  // M26,15.967c-0.733,2.064-2.685,3.553-5,3.553s-4.267-1.49-5-3.553h1.154l3.378-8.953
  // c0.146-0.39,0.789-0.39,0.936,0l3.378,8.953H26z M23.777,15.967L21,8.608l-2.777,7.36H23.777z M5,5.978
  // c0.453,0,0.822-0.303,0.95-0.714c0.331-0.126,0.67-0.296,1.018-0.472C7.733,4.406,8.6,3.967,9.5,3.967
  // c0.864,0,1.404,0.399,1.713,0.739c-0.012,0.086-0.026,0.172-0.026,0.261c0,1.001,0.812,1.813,1.813,1.813s1.813-0.812,1.813-1.813
  // c0-0.089-0.014-0.174-0.026-0.26c0.308-0.339,0.848-0.74,1.713-0.74c0.9,0,1.767,0.438,2.531,0.824
  // c0.349,0.176,0.688,0.346,1.019,0.472c0.128,0.411,0.497,0.714,0.95,0.714c0.558,0,1.01-0.452,1.01-1.01s-0.452-1.01-1.01-1.01
  // c-0.288,0-0.545,0.124-0.729,0.318c-0.247-0.104-0.514-0.237-0.789-0.376c-0.864-0.437-1.843-0.932-2.982-0.932
  // c-0.996,0-1.69,0.379-2.161,0.787c-0.211-0.233-0.481-0.407-0.788-0.506c0.373-0.2,0.635-0.581,0.635-1.032
  // C14.186,1.561,13,0.032,13,0.032s-1.186,1.529-1.186,2.184c0,0.452,0.262,0.832,0.635,1.032c-0.307,0.098-0.577,0.273-0.788,0.506 C11.19,3.346,10.496,2.967,9.5,2.967c-1.139,0-2.119,0.495-2.983,0.932C6.242,4.039,5.976,4.172,5.729,4.275 C5.545,4.082,5.288,3.957,5,3.957c-0.558,0-1.01,0.452-1.01,1.01S4.442,5.978,5,5.978z M5,19.521c-2.315,0-4.267-1.49-5-3.553 h1.154l3.378-8.953c0.146-0.39,0.789-0.39,0.936,0l3.378,8.953H10C9.267,18.031,7.315,19.521,5,19.521z M7.777,15.967L5,8.608 l-2.777,7.36H7.777z" /> </svg> ); } }
}

export default ComplyPanel;