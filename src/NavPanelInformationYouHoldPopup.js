// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {info} from 'react-icons-kit-allreact/icomoon/info';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelInformationYouHoldPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text =
      'You should document what personal data you hold,\n' +
      'where it came from and who you share it with. You\n' +
      'may need to organise an information audit.';
    this.title = "Info You Hold";
    this.icon = info;
    
  
    this.weight = 4;
    
    
    
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "\n" +
      "long numEvents = g.V().has('Metadata.Type',eq('Person')).count().next();\n" +
      "\n" +
      "long numRecordsNoEdges =\n" +
      "g.V().has('Metadata.Type',eq('Person')).as('adults')\n" +
      " .match(\n" +
      "     __.as('adults').bothE().count().as('edgesCount')\n" +
      "\n" +
      " )\n" +
      " .select('edgesCount')\n" +
      " .where(__.as('edgesCount').is(eq(0)))\n" +
      " .count().next()\n" +
      "\n" +
      "\n" +
      "long numRecordsNoMetadata = \n" +
      "g.V().has('Metadata.Type',eq('Person')).hasNot('Metadata.Lineage')\n" +
      " .count().next()\n" +
      " \n" +
      "long scoreValue = 100L;\n" +
      "if (numEvents > 0){\n" +
      "  \n" +
      "  long pcntNoEdges = (long) (100L*numRecordsNoEdges/numEvents);\n" +
      "  if (pcntNoEdges > 10){\n" +
      "    scoreValue -= 50L;\n" +
      "  }\n" +
      "  else if (numRecordsNoEdges > 0) {\n" +
      "    scoreValue -= (30L + 2L* pcntNoEdges)\n" +
      "  }\n" +
      "  \n" +
      "  \n" +
      "\n" +
      "  long pcntNoMetadata = (long) (100L*numRecordsNoMetadata/numEvents);\n" +
      "  if (pcntNoMetadata > 10){\n" +
      "    scoreValue -= 50L;\n" +
      "  }\n" +
      "  else if (numRecordsNoMetadata > 0){\n" +
      "    scoreValue -= (30L + 2L*pcntNoMetadata)\n" +
      "  }\n" +
      "\n" +
      "  // scoreValue -= (10L * firstReminder/numEvents)\n" +
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
      "  sb.append('This score reflects that out of ')\n" +
      "    .append(numEvents).append(' people records, ')\n" +
      "    .append(numRecordsNoEdges).append(' do not have any connections to other data, and ')\n" +
      "    .append(numRecordsNoMetadata).append(' do not have the lineage metadata to trace it.')\n" +
      "}\n" +
      "else {\n" +
      "  sb.append('There are no person records currently tracked place.')\n" +
      "}\n" +
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

export default NavPanelInformationYouHoldPopup;