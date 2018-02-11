import PVTemplateEditor from "./PVTemplateEditor";
import { Base64 } from 'js-base64';
//

class NavPanelDataProceduresPVTemplateEditor extends PVTemplateEditor
{
  
  componentDidMount()
  {
    this.namespace = ("NavPanelInformationYouHold");
    
    super.componentDidMount();
    
    this.lastData = null;
  
    this.props.glEventHub.on(this.namespace + '-pvgrid-on-click-row', this.onClickedRow);
    
    
  }
  componentWillUnmount(){
    this.props.glEventHub.off(this.namespace + '-pvgrid-on-click-row', this.onClickedRow);
  
  }
  
  
  
  onClickedRow = (data) => {
    this.val = Base64.decode(data['Object.Notification_Templates.Text']);
    this.setState({value: data['Object.Notification_Templates.Text']});
    this.lastData = data;
    
  };
  
  
 
}


export default NavPanelDataProceduresPVTemplateEditor;
