// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {globe} from 'react-icons-kit-allreact/ikons/globe';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelInternationalPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text = 'If your organisation operates in more than one EU\n' +
      'member state (ie you carry out cross-border\n' +
      'processing), you should determine your lead data\n' +
      'protection supervisory authority. Article 29 Working\n' +
      'Party guidelines will help you do this.';
    this.title = "International";
    this.icon = globe;
    this.weight = 1;
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "\n" +
      "\n" +
      "long numItems = g.V().has('Metadata.Type',eq('Object.Privacy_Impact_Assessment'))\n" +
      ".count().next()\n" +
      " \n" +
      " \n" +
      "long numPrivNoticesWithoutRegulator = \n" +
      "  g.V()\n" +
      "  .has('Metadata.Type',eq('Object.Privacy_Impact_Assessment'))\n" +
      "  .where( __.out().has('Metadata.Type',eq('Person.Organisation')).count().is(eq(0)))\n" +
      "  .count().next()\n" +
      "\n" +
      "\n" +
      " \n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numItems > 0){\n" +
      "  \n" +
      "  scoreValue -= (long) (100L*numPrivNoticesWithoutRegulator/numItems);\n" +
      "\n" +
      "\n" +
      "\n" +
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
      "  if (numPrivNoticesWithoutRegulator == 0){\n" +
      "    sb.append( 'ALL have a regulator assigned to them.');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numPrivNoticesWithoutRegulator);\n" +
      "    if (numPrivNoticesWithoutRegulator == 1){\n" +
      "      sb.append( ' does not have a regulator assigned to it.');\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' do not have a regulator assigned to it.');\n" +
      "    }\n" +
      "  }\n" +
      "    \n" +
      "    \n" +
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

export default NavPanelInternationalPopup;