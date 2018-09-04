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
      "long numEvents = g.V().has('Metadata.Type.Event.Ingestion',eq('Event.Ingestion')).count().next();\n" +
      "\n" +
      "long numRecordsNoEdges =\n" +
      "g.V()\n" +
        " .has('Metadata.Type.Event.Ingestion',eq('Event.Ingestion')) \n" +
        " .where(bothE().count().is(eq(0)) )\n" +
        " .count().next()\n" +
      "\n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numEvents > 0){\n" +
      "  \n" +
      "  long pcntNoEdges = (long) (100L*numRecordsNoEdges/numEvents);\n" +
      "  scoreValue -= (pcntNoEdges)\n" +
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
      "if (numRecordsNoEdges > 0)  {\n" +
      "  sb.append('This score reflects that out of ')\n" +
      "    .append(numEvents).append(' personally identifiable information ingestion records, ')\n" +
      "    .append(numRecordsNoEdges).append(' have not been matched to an individual.')\n" +
      "}\n" +
     "else if (numEvents > 0) {\n" +
     "  sb.append('All ').append(numEvents).append(' personally identifiable information ingestion records in the system have been matched against individuals.')\n" +
     "}\n" +
      "else {\n" +
      "  sb.append('There are no personally identifiable information ingestion records in the system.')\n" +
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