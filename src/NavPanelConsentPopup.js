import React from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {check} from 'react-icons-kit-allreact/fa/check';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelConsentPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text = 'You should review how you seek, record and manage\n' +
      'consent and whether you need to make any changes.\n' +
      'Refresh existing consents now if they don’t meet the\n' +
      'GDPR standard.';
    this.title = "Consent";
    this.icon = check;
  
    this.weight = 6;
  
  
  
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "long ageThresholdMs = (long)(System.currentTimeMillis() - (3600000L * 24L *365L  * 18L));\n" +
      "def dateThreshold = new java.util.Date (ageThresholdMs);\n" +
      "\n" +
      "\n" +
      "long numAdults = g.V().has('Metadata.Type',eq('Person'))\n" +
      ".where(\n" +
      "    and(\n" +
      "      __.values('Person.Date_Of_Birth').is(lt(dateThreshold))\n" +
      "    )\n" +
      "  )\n" +
      ".count().next()\n" +
      "\n" +
      "\n" +
      "long numWithoutAnyConsent = g.V().has('Metadata.Type',eq('Person'))\n" +
      ".where(\n" +
      "    and(\n" +
      "      __.values('Person.Date_Of_Birth').is(lt(dateThreshold))\n" +
      "    ,__.outE('Consent').count().is(eq(0))\n" +
      "    )\n" +
      "  )\n" +
      ".count().next()\n" +
      " \n" +
      " \n" +
      "long numNegativeConsent = \n" +
      "\n" +
      "g.V().has('Metadata.Type',eq('Person'))\n" +
      " .where(\n" +
      "    __.values('Person.Date_Of_Birth').is(lt(dateThreshold))\n" +
      "  ).as('adults')\n" +
      " .match(\n" +
      "     __.as('adults').outE('Consent').as('consentEdges')\n" +
      "    ,__.as('consentEdges').count().as('consentEdgesCount')\n" +
      "    ,__.as('consentEdges').inV().as('consentEvents')\n" +
      "    ,__.as('consentEvents').has('Event.Consent.Status',eq('No Consent ')).count().as('negConsentCount')\n" +
      "\n" +
      " )\n" +
      " .select('consentEdgesCount','negConsentCount')\n" +
      ".where('consentEdgesCount',eq('negConsentCount'))\n" +
      ".where(__.as('consentEdgesCount').is(gt(0)))\n" +
      "\n" +
      ".count().next()\n" +
      "\n" +
      "\n" +
      "\n" +
      "long numPendingConsent = \n" +
      "\n" +
      "g.V().has('Metadata.Type',eq('Person'))\n" +
      " .where(\n" +
      "    __.values('Person.Date_Of_Birth').is(lt(dateThreshold))\n" +
      "  ).as('adults')\n" +
      " .match(\n" +
      "     __.as('adults').outE('Consent').as('consentEdges')\n" +
      "    ,__.as('consentEdges').count().as('consentEdgesCount')\n" +
      "    ,__.as('consentEdges').inV().as('consentEvents')\n" +
      "    ,__.as('consentEvents').has('Event.Consent.Status',eq('Consent Pending')).count().as('pendingConsentCount')\n" +
      "\n" +
      " )\n" +
      " .select('consentEdgesCount','pendingConsentCount')\n" +
      ".where('consentEdgesCount',eq('pendingConsentCount'))\n" +
      ".where(__.as('consentEdgesCount').is(gt(0)))\n" +
      "\n" +
      ".count().next()\n" +
      "\n" +
      "\n" +
      "\n" +
      "long scoreValue = 100L;\n" +
      "if (numAdults > 0){\n" +
      "  \n" +
      "  long pcntWithoutAnyConsent = (long) (100L*numWithoutAnyConsent/numAdults);\n" +
      "  if (pcntWithoutAnyConsent > 10){\n" +
      "    scoreValue -= 45L;\n" +
      "  }\n" +
      "  else if (numWithoutAnyConsent > 0) {\n" +
      "    scoreValue -= (25L + 2L* pcntWithoutAnyConsent)\n" +
      "  }\n" +
      "  \n" +
      "  \n" +
      "\n" +
      "  long pcntWithNegativeConsent = (long) (100L*numNegativeConsent/numAdults);\n" +
      "  if (pcntWithNegativeConsent > 10){\n" +
      "    scoreValue -= 45L;\n" +
      "  }\n" +
      "  else if (numNegativeConsent > 0){\n" +
      "    scoreValue -= (25L + 2L*pcntWithNegativeConsent)\n" +
      "  }\n" +
      "\n" +
      "  scoreValue -= (10L * numPendingConsent/numAdults)\n" +
      " \n" +
      "\n" +
      "  \n" +
      "   \n" +
      "}\n" +
      "\n" +
      "StringBuffer sb = new StringBuffer ('{ \"scoreValue\": ');\n" +
      "\n" +
      "sb.append(scoreValue)\n" +
      "  .append(', \"scoreExplanation\":\"');\n" +
      "if (numAdults > 0)  {\n" +
      "  sb.append('This score reflects that out of ')\n" +
      "    .append(numAdults).append(' adult\\'s records, ')\n" +
      "    .append(numWithoutAnyConsent).append(' do not have any consent (positive, negative or pending), ')\n" +
      "    .append(numPendingConsent).append(' only have a pending consent to use their data, ')\n" +
      "    .append(numNegativeConsent).append(' only have a negative consent to use their data.');\n" +
      "}\n" +
      "else {\n" +
      "  sb.append('There are not any adult records for this business.')\n" +
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

export default NavPanelConsentPopup;