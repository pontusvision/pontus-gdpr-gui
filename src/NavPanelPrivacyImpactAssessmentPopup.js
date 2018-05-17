import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {shareAlt} from 'react-icons-kit-allreact/fa/shareAlt';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelPrivacyImpactAssessmentPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =  'You should familiarise yourself now with the ICO’s\n' +
      'code of practice on Privacy Impact Assessments as\n' +
      'well as the latest guidance from the Article 29\n' +
      'Working Party, and work out how and when to\n' +
      'implement them in your organisation.';
    this.title = "Priv Impact Asmnt";
    this.icon = shareAlt;
    this.weight = 6;
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "\n" +
      "long numItems = g.V().has('Metadata.Type',eq('Object.Privacy_Impact_Assessment'))\n" +
      ".count().next()\n" +
      " \n" +
      " \n" +
      "long numPIAWithoutPrivNotices = \n" +
      "  g.V()\n" +
      "  .has('Metadata.Type',eq('Object.Privacy_Impact_Assessment'))\n" +
      "  .where( __.out().has('Metadata.Type',eq('Object.Privacy_Notice')).count().is(eq(0)))\n" +
      "  .count().next()\n" +
      "\n" +
      "\n" +
      " \n" +
      "long numPIAWithPrivNoticesAndDataWithoutConsent = \n" +
      "  g.V()\n" +
      "  .has('Metadata.Type',eq('Object.Privacy_Impact_Assessment'))\n" +
      "  .where( \n" +
      "    __.out().has('Metadata.Type',eq('Object.Privacy_Notice'))\n" +
      "      .in().has('Event.Consent.Status',eq('No Consent '))\n" +
      "      .count().is(gt(0))\n" +
      "  )\n" +
      "  .count().next()\n" +
      "\n" +
      "\n" +
      "long numPIAWithPrivNoticesAndDataWithPendingConsent = \n" +
      "  g.V()\n" +
      "  .has('Metadata.Type',eq('Object.Privacy_Impact_Assessment'))\n" +
      "  .where( \n" +
      "    __.out().has('Metadata.Type',eq('Object.Privacy_Notice'))\n" +
      "      .in().has('Event.Consent.Status',eq('Consent Pending'))\n" +
      "      .count().is(gt(0))\n" +
      "  )\n" +
      "  .count().next()\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numItems > 0){\n" +
      "  \n" +
      "  scoreValue -= (numPIAWithoutPrivNotices > 0)?(long) (15L + 10L*numPIAWithoutPrivNotices/numItems):0;\n" +
      "  scoreValue -= (numPIAWithPrivNoticesAndDataWithoutConsent > 0)?(long) (40L + 5L*numPIAWithPrivNoticesAndDataWithoutConsent/numItems):0;\n" +
      "  scoreValue -= (numPIAWithPrivNoticesAndDataWithPendingConsent > 0)?(long) (20L + 10L*numPIAWithPrivNoticesAndDataWithPendingConsent/numItems):0;\n" +
      "\n" +
      "\n" +
      "  scoreValue = scoreValue < 0 ? 0 : scoreValue;\n" +
      "\n" +
      " \n" +
      "}else{\n" +
      "  scoreValue = 0L; \n" +
      "}\n" +
      "\n" +
      "StringBuffer sb = new StringBuffer ('{ \"scoreValue\": ');\n" +
      "\n" +
      "sb.append(scoreValue)\n" +
      "  .append(', \"scoreExplanation\":\"');\n" +
      "if (numItems > 0)  {\n" +
      "  sb.append('This score reflects that out of ');\n" +
      "  sb.append(numItems).append(' Privacy Impact Assessments, ');\n" +
      "   \n" +
      "  if (numPIAWithoutPrivNotices == 0){\n" +
      "    sb.append( 'ALL have a Privacy Notice assigned to them, ');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numPIAWithoutPrivNotices);\n" +
      "    if (numPIAWithoutPrivNotices == 1){\n" +
      "      sb.append( ' does not have a Privacy Notice assigned to it, ' );\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' do not have a Privacy Notice assigned to them, ');\n" +
      "    }\n" +
      "  }\n" +
      "    \n" +
      "  if (numPIAWithPrivNoticesAndDataWithoutConsent == 0){\n" +
      "    sb.append( 'NONE of the Privacy Notices assigned to them have negative consents, and ');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numPIAWithPrivNoticesAndDataWithoutConsent);\n" +
      "    if (numPIAWithPrivNoticesAndDataWithoutConsent == 1){\n" +
      "      sb.append( ' has a privacy notice with data events that have negative consents, and ' );\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' have a privacy notice with data events that have negative consents, and ');\n" +
      "    }\n" +
      "  }\n" +
      "   \n" +
      "  if (numPIAWithPrivNoticesAndDataWithPendingConsent == 0){\n" +
      "    sb.append( 'NONE of the Privacy Notices assigned to them have pending consents.');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numPIAWithPrivNoticesAndDataWithPendingConsent);\n" +
      "    if (numPIAWithPrivNoticesAndDataWithPendingConsent == 1){\n" +
      "      sb.append( ' has a privacy notice with data events that have negative consents.' );\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' have a privacy notice with data events that have negative consents.');\n" +
      "    }\n" +
      "  }\n" +
      "   \n" +
      "   \n" +
      "   \n" +
      "\n" +
      "}\n" +
      "else {\n" +
      "  sb.append ('There are no Privacy Impact Assessments listed in the system.');\n" +
      "}\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "sb.append('\" }')  \n" +
      "\n" +
      "sb.toString()\n"
      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  

}

export default NavPanelPrivacyImpactAssessmentPopup;