// import React  from 'react';
// import ResizeAware from 'react-resize-aware';
import PVGDPRScores from './PVGDPRScores';
// import axios from 'axios';
// import {Grid} from 'semantic-ui-react';
// import {ic_multiline_chart} from 'react-icons-kit-allreact/md/ic_multiline_chart'

import {blackTie} from 'react-icons-kit-allreact/fa/blackTie';
// import Icon from 'react-icons-kit-allreact';


/***************************
 * UserList Component
 ***************************/
class NavPanelDataProtnOfficerPopup extends PVGDPRScores
{
  
  constructor(props)
  {
    super(props);

    this.text = 'You should designate someone to take responsibility\n' +
      'for data protection compliance and assess where this\n' +
      'role will sit within your organisation’s structure and\n' +
      'governance arrangements. You should consider\n' +
      'whether you are required to formally designate a\n' +
      'Data Protection Officer.\n';
    this.title = "Data Prot'n Offcr";
    this.icon = blackTie;
    this.weight = 1;
  
  }
  
  
 
  
  
  getSearchQuery = () =>
  {
    
    
    return {
      gremlin: "\n" +
      "\n" +
        "long numDPOs = g.V().has('Person.Employee.Role',eq('Data Protection Officer'))\n" +
        ".count().next()\n" +
        " \n" +
        " \n" +
        "long numDPODirectReports = g.V().has('Person.Employee.Role',eq('Data Protection Officer')).inE('Reports_To')\n" +
        ".count().next()\n" +
        "\n" +
        "\n" +
        "long numDPOsFailed  = g.V().has('Person.Employee.Role',eq('Data Protection Officer'))\n" +
        ".in().has('Event.Training.Status',eq('Failed'))\n" +
        ".count().next()\n" +
        " \n" +
        "\n" +
        "long numDPODirectReportsFailed = g.V().has('Person.Employee.Role',eq('Data Protection Officer')).inE('Reports_To')\n" +
        ".outV().in().has('Event.Training.Status',eq('Failed'))\n" +
        ".count().next()\n" +
        "\n" +
        "\n" +
        "long numDPOsSecondReminder  = g.V().has('Person.Employee.Role',eq('Data Protection Officer'))\n" +
        ".in().has('Event.Training.Status',eq('Second  Reminder'))\n" +
        ".count().next()\n" +
        " \n" +
        "\n" +
        "long numDPODirectReportsSecondReminder = g.V().has('Person.Employee.Role',eq('Data Protection Officer')).inE('Reports_To')\n" +
        ".outV().in().has('Event.Training.Status',eq('Second  Reminder'))\n" +
        ".count().next()\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "long scoreValue = 100L;\n" +
        "if (numDPOs > 0){\n" +
        "  scoreValue -= (long) (25L + 25L*numDPOsFailed/numDPOs);\n" +
        "  scoreValue -= (long) (6L + 7L*numDPOsSecondReminder/numDPOs);\n" +
        "}\n" +
        "if (numDPODirectReports > 0){\n" +
        "  scoreValue -= (long) (13L + 12L*numDPODirectReportsFailed/numDPODirectReports);\n" +
        "  \n" +
        "  scoreValue -= (long) (6L + 6L*numDPODirectReportsSecondReminder/numDPODirectReports);\n" +
        "}\n" +
        "if (numDPOs == 0 && numDPODirectReports == 0){\n" +
        "  scoreValue = 0L; \n" +
        "}\n" +
        "\n" +
        "StringBuffer sb = new StringBuffer ('{ \\\"scoreValue\\\": ');\n" +
        "\n" +
        "sb.append(scoreValue)\n" +
        "  .append(', \\\"scoreExplanation\\\":\\\"');\n" +
        "if (numDPOs > 0)  {\n" +
        "  sb.append('This score reflects that out of ');\n" +
        "  sb.append(numDPOs);\n" +
        "  sb.append(' Data Protection Officer(s), ');\n" +
        "  if (numDPOsFailed == 0){\n" +
        "    sb.append( 'NONE have failed the GDPR Awareness Test, and ');\n" +
        "  }\n" +
        "  else {\n" +
        "    sb.append(numDPOsFailed);\n" +
        "    if (numDPOsFailed == 1){\n" +
        "      sb.append( ' has failed the GDPR Awarenss Test, and ');\n" +
        "    }\n" +
        "    else{\n" +
        "      sb.append(' have failed the GDPR Awarenss Test, and ');\n" +
        "    }\n" +
        "  }\n" +
        "    \n" +
        "    \n" +
        "  if (numDPOsSecondReminder == 0){\n" +
        "    sb.append( 'NONE have received a second reminder to take the test.');\n" +
        "  }\n" +
        "  else {\n" +
        "    sb.append(numDPOsSecondReminder);\n" +
        "    if (numDPOsSecondReminder == 1){\n" +
        "      sb.append( ' has received a second reminder to take the test.');\n" +
        "    }\n" +
        "    else{\n" +
        "      sb.append(' have received a second reminder to take the test.');\n" +
        "    }\n" +
        "  }\n" +
        "\n" +
        "\n" +
        "}\n" +
        "else {\n" +
        "  sb.append ('There are no Data Protection Officers listed in the system.');\n" +
        "}\n" +
        "\n" +
        "if (numDPODirectReports > 0){\n" +
        "  sb.append (\\\"  Out of the \\\").append(numDPODirectReports);\n" +
        "  if (numDPODirectReports == 1){\n" +
        "    sb.append(\\\" Data Protection Officers Direct Report, \\\");\n" +
        "  }\n" +
        "  else{\n" +
        "    sb.append(\\\" Data Protection Officers Direct Reports, \\\");\n" +
        "  }\n" +
        "  \n" +
        "  if (numDPODirectReportsFailed == 0){\n" +
        "    sb.append (\\\"NONE have failed the test, and \\\");\n" +
        "  }\n" +
        "  else{\n" +
        "    sb.append(numDPODirectReportsFailed);\n" +
        "    if (numDPODirectReportsFailed == 1){\n" +
        "      sb.append (\\\" has failed the test, and \\\");\n" +
        "    }\n" +
        "    else{\n" +
        "      sb.append (\\\" have failed the test, and \\\");\n" +
        "    }\n" +
        "  }\n" +
        "  \n" +
        "  if (numDPODirectReportsSecondReminder == 0){\n" +
        "    sb.append (\\\"NONE have received a second test reminder.\\\");\n" +
        "  }\n" +
        "  else{\n" +
        "    sb.append(numDPODirectReportsSecondReminder);\n" +
        "    if (numDPODirectReportsSecondReminder == 1){\n" +
        "      sb.append (\\\" has received a second test reminder.\\\");\n" +
        "    }\n" +
        "    else{\n" +
        "      sb.append (\\\" have received a second test reminder.\\\");\n" +
        "    }\n" +
        "  }\n" +
        "  \n" +
        "  \n" +
        "}\n" +
        "\n" +
        "\n" +
        "\n" +
        "sb.append('\\\" }')  \n" +
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

export default NavPanelDataProtnOfficerPopup;