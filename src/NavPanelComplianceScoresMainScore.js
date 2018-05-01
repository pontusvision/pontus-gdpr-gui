import React from 'react';
import PVGauge from "./PVGauge";
import PontusComponent from "./PontusComponent";


class NavPanelComplianceScoresMainScore extends PontusComponent
{
  
  constructor(props){
    super(props);
    
    this.scores = new Map();
    
    this.state = {
       newDate: null
  
    };
    
  }
  
  setNode = (node) =>
  {
    this.instance = node;
  };
  
  componentDidMount(){
  
    if (this.props.glEventHub){
      this.props.glEventHub.on('on-score-changed',
        this.onScoreChanged
      );
    
    }
  
  }
  componentWillUnmount() {
    if (this.props.glEventHub){
      this.props.glEventHub.off('on-score-changed',
        this.onScoreChanged
      );
    
    }
  
  }
  
  onScoreChanged = (data) => {
  
    // {
    //   scoreValue: data.scoreValue
    //   ,title: this.title
    //   ,weight: this.weight
    // }
   this.scores.set(data.title, data);
   
   this.setState( {newDate: new Date()});
    
    
  };
  
  render()
  {
    let scores = this.scores;
    let totalWeight = 0;
    let totalScore = 0;
  
    let iterator = (score,key) => {
      if (score !== null){
        totalWeight += score.weight;
        totalScore += (score.weight * score.scoreValue);
      }
  
    };
    
    scores.forEach(iterator);
    
    // note: the |0 below converts the number to an integer.
    
    let weightedAverage = totalWeight > 0?   (totalScore/totalWeight)|0 : 0;
  
  
    return (
      <PVGauge label={"Main Score"} value={weightedAverage}
               valueLabelStyle={{ textAnchor: "middle", fill: "#ffffff", stroke: "none", fontStyle: "normal", fontVariant: "normal", fontWeight: "bold", fontStretch: "normal", lineHeight: "normal", fillOpacity: 1 }}
      />
    );
    
  }
}

export default NavPanelComplianceScoresMainScore;