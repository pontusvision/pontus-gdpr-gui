// import React, {Component} from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {book_2} from 'react-icons-kit-allreact/ikons/book_2';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelAwarenessPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text = 'You should make sure that decision makers and key\n' +
      'people in your organisation are aware that the law is\n' +
      'changing to the GDPR. They need to appreciate the\n' +
      'impact this is likely to have.'
      
      
    this.title = "Awareness";
    this.icon = book_2;
    this.weight = 1;
    
    
    
    
    
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "def retVal = '';\n" +
      "try {\n" +
      "long numEvents = g.V().has('Metadata.Type.Object.Awareness_Campaign',eq('Object.Awareness_Campaign')).in().as('events').count().next();\n" +
      "\n" +
      "def map = g.V().has('Metadata.Type.Object.Awareness_Campaign',eq('Object.Awareness_Campaign')).in().as('events').groupCount().by('Event.Training.Status').next();\n" +
      "\n" +
      "long failedCount = map.get('Failed');\n" +
      "long secondReminder = map.get('Second  Reminder');\n" +
      "long firstReminder = map.get('Reminder Sent');\n" +
      "\n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numEvents > 0){\n" +
      "  \n" +
      "  long pcntFailed = (long) (100L*failedCount/numEvents);\n" +
      "  if (pcntFailed > 10){\n" +
      "    scoreValue -= 60L;\n" +
      "  }\n" +
      "  else if (failedCount > 0){\n" +
      "    scoreValue -= (40L + 2L* pcntFailed)\n" +
      "  }\n" +
      "  \n" +
      "  \n" +
      "\n" +
      "  long pcntSecondReminder = (long) (100L*secondReminder/numEvents);\n" +
      "  if (pcntSecondReminder > 10){\n" +
      "    scoreValue -= 30L;\n" +
      "  }\n" +
      "  else if (secondReminder > 0) {\n" +
      "    scoreValue -= (10L + 2L*pcntWithNegativeConsent)\n" +
      "  }\n" +
      "\n" +
      "  scoreValue -= (10L * firstReminder/numEvents)\n" +
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
      "    .append(numEvents).append(' GDPR training records, ')\n" +
      "    .append(failedCount).append(' have FAILED the awareness campaign tests, ')\n" +
      "    .append(firstReminder).append(' have been sent a FIRST reminder to take the awareness campaign training course and, ')\n" +
      "    .append(secondReminder).append(' have been sent a SECOND reminder to take the awareness campaign training course.');\n" +
      "}\n" +
      "else {\n" +
      "  sb.append('There are no awareness campaign training records in place.')\n" +
      "}\n" +
      "sb.append('\" }')  \n" +
      "\n" +
      "retVal = sb.toString()\n" +
      "} catch (Throwable t) {\n" +
      "StringBuffer sb = new StringBuffer ('{ \"scoreValue\": ');\n" +
      "\n" +
      "sb.append(0L)\n" +
      "  .append(', \"scoreExplanation\":\"');\n" +
      "  sb.append('There are no awareness campaign training records in place.')\n" +
      "sb.append('\" }')  \n" +
      "retVal = sb.toString()\n" +
      "}\n" +
      "retVal.toString()\n"
      
      , bindings: {
        // pg_from: from
        // , pg_to: to
        // , pg_orderCol: sortcolId
        // , pg_orderDir: sortdir
      }
      
      
    };
  };
  

}

export default NavPanelAwarenessPopup;