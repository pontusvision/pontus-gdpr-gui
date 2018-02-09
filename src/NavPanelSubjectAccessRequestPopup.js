import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {download} from 'react-icons-kit-allreact/entypo/download';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelSubjectAccessRequestPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =
      'You should update your procedures and plan how you\n' +
      'will handle requests within the new timescales and\n' +
      'provide any additional information.';
    this.title = "Subj Access Req";
    this.icon = download;
  
    this.weight = 4;
  
  
  
  
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "long thirtyDayThresholdMs = (long)(System.currentTimeMillis() - (3600000L * 24L *30L));\n" +
      "def thirtyDayDateThreshold = new java.util.Date (thirtyDayThresholdMs);\n" +
      "long tenDayThresholdMs = (long)(System.currentTimeMillis() - (3600000L * 24L *10L));\n" +
      "def tenDayDateThreshold = new java.util.Date (tenDayThresholdMs);\n" +
      "\n" +
      "long numEvents = g.V().has('Metadata.Type','Event.Subject_Access_Request').count().next();\n" +
      "\n" +
      "long numRecordsOlder30Days =\n" +
      "\n" +
      "g.V().has('Metadata.Type','Event.Subject_Access_Request').as('sar')\n" +
      ".where(\n" +
      "  __.values('Metadata.Create_Date').is(lte(thirtyDayDateThreshold))\n" +
      ") \n" +
      "\n" +
      ".count().next()\n" +
      "\n" +
      "long numRecordsOlder10Days =\n" +
      "\n" +
      "g.V().has('Metadata.Type','Event.Subject_Access_Request').as('sar')\n" +
      ".where(\n" +
      "  __.values('Metadata.Create_Date').is(lte(tenDayDateThreshold))\n" +
      ") \n" +
      "\n" +
      ".count().next()\n" +
      "\n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numEvents > 0){\n" +
      "  \n" +
      "  long pcntOlder30Days = (long) (100L*numRecordsOlder30Days/numEvents);\n" +
      "  if (pcntOlder30Days > 10){\n" +
      "    scoreValue -= 80L;\n" +
      "  }\n" +
      "  else if (numRecordsOlder30Days> 0) {\n" +
      "    scoreValue -= (60L + 2L* pcntOlder30Days)\n" +
      "  }\n" +
      "  \n" +
      "  \n" +
      "\n" +
      "  scoreValue -= (20L * numRecordsOlder10Days/numEvents)\n" +
      " \n" +
      "\n" +
      "  \n" +
      "   \n" +
      "}else{\n" +
      "  scoreValue = 0L; \n" +
      "}\n" +
      "\n" +
      "StringBuffer sb = new StringBuffer ('{ \"scoreValue\": ');\n" +
      "\n" +
      "sb.append(scoreValue)\n" +
      "  .append(', \"scoreExplanation\":\"');\n" +
      "if (numEvents > 0)  {\n" +
      "  sb.append('This score reflects that out of ');\n" +
      "  sb.append(numEvents).append(' Subject Access Requests, ');\n" +
      "   \n" +
      "  if (numRecordsOlder30Days == 0){\n" +
      "    sb.append( 'NONE are older than 30 days, and ');\n" +
      "  }\n" +
      "  else {\n" +
      "    sb.append(numRecordsOlder30Days);\n" +
      "    if (numRecordsOlder30Days == 1){\n" +
      "      sb.append( ' is older than 30 days, and ');\n" +
      "    }\n" +
      "    else{\n" +
      "      sb.append(' are older than 30 days, and ');\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  if (numRecordsOlder10Days == 0){\n" +
      "    sb.append(' NONE are older than 10 days.');\n" +
      "\n" +
      "  }\n" +
      "  else{\n" +
      "    sb.append(numRecordsOlder10Days);\n" +
      "    if (numRecordsOlder10Days == 1){\n" +
      "      sb.append(' is older than 10 days.');\n" +
      "    }\n" +
      "    else {\n" +
      "      sb.append(' are older than 10 days.');\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "\n" +
      "}\n" +
      "else {\n" +
      "  sb.append ('There are no Subject Access Requests in the system.');\n" +
      "}\n" +
      "\n" +
      "sb.append('\" }')  \n" +
      "\n" +
      "sb.toString()"
      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  

}

export default NavPanelSubjectAccessRequestPopup;