import React  from 'react';
// import ResizeAware from 'react-resize-aware';
// import { Accordion } from 'semantic-ui-react'
import ResizeAware from 'react-resize-aware';


import NavPanelChildrenPopup from "./NavPanelChildrenPopup";
import NavPanelConsentPopup from "./NavPanelConsentPopup";
import NavPanelAwarenessPopup from "./NavPanelAwarenessPopup";
import NavPanelInformationYouHoldPopup from "./NavPanelInformationYouHoldPopup";
import NavPanelPrivacyNoticesPopup from "./NavPanelPrivacyNoticesPopup";
import NavPanelIndividualsRightsPopup from "./NavPanelIndividualsRightsPopup";
import NavPanelSubjectAccessRequestPopup from "./NavPanelSubjectAccessRequestPopup";
import NavPanelLawfulBasisPopup from "./NavPanelLawfulBasisPopup";
import NavPanelPrivacyImpactAssessmentPopup from './NavPanelPrivacyImpactAssessmentPopup';
import NavPanelDataProtnOfficerPopup from "./NavPanelDataProtnOfficerPopup";
import NavPanelInternationalPopup from "./NavPanelInternationalPopup";
import NavPanelDataBreachPopup from "./NavPanelDataBreachPopup";
import PontusComponent from "./PontusComponent";
class NavPanelComplianceScoresDetailedScores extends PontusComponent
{
  
  constructor(props){
    super(props);
    
    this.state = {
      value: props.value
      ,height: 100
      ,width: 100
      ,complyPanel: this.props.complyPanel
    }
  }
  
  setNode = (node) =>
  {
    this.instance = node;
  };
  
  // handleResize = ({width, height}) =>
  // {
  //   if (height > 0)
  //   {
  //     this.instance.updateSize(width, height);
  //
  //   }
  //   else
  //   {
  //     this.instance.updateSize(width, window.innerHeight - 50);
  //
  //   }
  // };
  
  render()
  {
  
    // const panels = [
    //   {title: "Children", content: <NavPanelChildrenPopup longShow={true}/>}
    //   ,{title: "Children2", content: <NavPanelChildrenPopup longShow={true}/>}
    //   ,{title: "Children3", content: <NavPanelChildrenPopup longShow={true}/>}
    //   ,{title: "Children4", content: <NavPanelChildrenPopup longShow={true}/>}
    //   ,{title: "Children5", content: <NavPanelChildrenPopup longShow={true}/>}
    //   ,{title: "Children6", content: <NavPanelChildrenPopup longShow={true}/>}
    //   ,{title: "Children7", content: <NavPanelChildrenPopup longShow={true}/>}
    //   ,{title: "Children8", content: <NavPanelChildrenPopup longShow={true}/>}
    //   ,{title: "Children9", content: <NavPanelChildrenPopup longShow={true}/>}
    //   ,{title: "Children10", content: <NavPanelChildrenPopup longShow={true}/>}
    //   ,{title: "Children11", content: <NavPanelChildrenPopup longShow={true}/>}
    //   ,{title: "Children12", content: <NavPanelChildrenPopup longShow={true}/>}
    // ];
  
  
  
    return (
  
      <ResizeAware
        style={{height: 'calc(100% - 20px)', width: '100%'}}
        onResize={this.handleResize}
      >
      <div  style={{overflowY:"scroll" , overflowX: "hidden",height: 'calc(100% - 20px)', width: '100%'}} >
        <NavPanelAwarenessPopup longShow={true}  glEventHub = {this.props.glEventHub}  complyPanel={this.state.complyPanel} />
        <NavPanelInformationYouHoldPopup longShow={true} glEventHub = {this.props.glEventHub} complyPanel={this.state.complyPanel}/>
        <NavPanelPrivacyNoticesPopup longShow={true} glEventHub = {this.props.glEventHub} complyPanel={this.state.complyPanel}/>
        <NavPanelIndividualsRightsPopup longShow={true} glEventHub = {this.props.glEventHub} complyPanel={this.state.complyPanel}/>
        <NavPanelSubjectAccessRequestPopup longShow={true} glEventHub = {this.props.glEventHub} complyPanel={this.state.complyPanel}/>
        <NavPanelLawfulBasisPopup longShow={true} glEventHub = {this.props.glEventHub} complyPanel={this.state.complyPanel}/>
        <NavPanelConsentPopup longShow={true} glEventHub = {this.props.glEventHub} complyPanel={this.state.complyPanel}/>
        <NavPanelChildrenPopup longShow={true} glEventHub = {this.props.glEventHub} complyPanel={this.state.complyPanel}/>
        <NavPanelDataBreachPopup longShow={true} glEventHub = {this.props.glEventHub} complyPanel={this.state.complyPanel}/>
        <NavPanelPrivacyImpactAssessmentPopup longShow={true} glEventHub = {this.props.glEventHub} complyPanel={this.state.complyPanel}/>
        <NavPanelDataProtnOfficerPopup longShow={true} glEventHub = {this.props.glEventHub} complyPanel={this.state.complyPanel}/>
        <NavPanelInternationalPopup longShow={true} glEventHub = {this.props.glEventHub} complyPanel={this.state.complyPanel}/>
        
        
      
      </div>
      </ResizeAware>

    );
    
  }
}

export default NavPanelComplianceScoresDetailedScores;