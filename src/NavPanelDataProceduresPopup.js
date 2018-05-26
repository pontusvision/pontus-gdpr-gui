// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {iosPricetagsOutline} from 'react-icons-kit-allreact/ionicons/iosPricetagsOutline';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelDataProceduresPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text = 'You should check your procedures to ensure they\n' +
      'cover all the rights individuals have, including how\n' +
      'you would delete personal data or provide data\n' +
      'electronically and in a commonly used format.';
    this.title = "Individual's Rights";
    this.icon = iosPricetagsOutline;
    this.weight = 1;
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "\n" +
      "long numItems = g.V()\n" +
      " .has('Metadata.Type',eq('Object.Data_Procedures'))\n" +
      " .count()\n" +
      " .next()\n" +
      "\n" +
      "\n" +
      "long numDeleteURL = g.V()\n" +
      " .has('Metadata.Type',eq('Object.Data_Procedures'))\n" +
      " .values('Object.Data_Procedures.Delete_URL')\n" +
      " .count()\n" +
      " .next()\n" +
      "\n" +
      "long numUpdateURL = g.V()\n" +
      " .has('Metadata.Type',eq('Object.Data_Procedures'))\n" +
      " .values('Object.Data_Procedures.Delete_URL')\n" +
      " .count()\n" +
      " .next()\n" +
      "\n" +
      "long numWithoutDeleteUrl = (numItems - numDeleteURL);\n" +
      "long numWithoutUpdateUrl = (numItems - numUpdateURL);\n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numItems > 0){\n" +
      "  \n" +
      "  scoreValue -= (long) (50L*numWithoutDeleteUrl/numItems);\n" +
      "  scoreValue -= (long) (50L*numWithoutUpdateUrl/numItems);\n" +
      "\n" +
      "}else{\n" +
      "  scoreValue = 0L; \n" +
      "}\n" +
      "\n" +
      "StringBuffer sb = new StringBuffer ('{ \\\"scoreValue\\\": ');\n" +
      "\n" +
      "sb.append(scoreValue)\n" +
      "  .append(', \\\"scoreExplanation\\\":\\\"');\n" +
      "if (numItems > 0)  {\n" +
      "  sb.append('This score reflects that out of ');\n" +
      "  sb.append(numItems).append(' Data Procedures, ');\n" +
      "   \n" +
      "  if (numWithoutUpdateUrl == 0){\n" +
      "    sb.append( 'ALL have an update URL, and ');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numWithoutUpdateUrl);\n" +
      "    if (numWithoutUpdateUrl == 1){\n" +
      "      sb.append( ' has an update URL, and ');\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' have an update URL, and ');\n" +
      "    }\n" +
      "  }\n" +
      "    \n" +
      "    \n" +
      "       \n" +
      "  if (numWithoutDeleteUrl == 0){\n" +
      "    sb.append( 'ALL have a delete URL.');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numWithoutDeleteUrl);\n" +
      "    if (numWithoutDeleteUrl == 1){\n" +
      "      sb.append( ' has a delete URL.');\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' have a delete URL.');\n" +
      "    }\n" +
      "  }\n" +
      "\n" +
      "\n" +
      "}\n" +
      "else {\n" +
      "  sb.append ('There are no Data Procedures listed in the system.');\n" +
      "}\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "sb.append('\\\" }')  \n" +
      "\n" +
      "sb.toString();\n"

      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  

}

export default NavPanelDataProceduresPopup;