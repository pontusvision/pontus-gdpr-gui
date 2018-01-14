import PropTypes from 'prop-types';
import React from 'react';
import Datamaps from 'datamaps';

var d3 = window.d3;
const MAP_CLEARING_PROPS = [
  'height', 'scope', 'setProjection', 'width'
];

const propChangeRequiresMapClear = (oldProps, newProps) =>
{
  return MAP_CLEARING_PROPS.some((key) =>
    oldProps[key] !== newProps[key]
  );
};

export default class Datamap extends React.Component
{
  
  static propTypes = {
    arc: PropTypes.array,
    arcOptions: PropTypes.object,
    bubbleOptions: PropTypes.object,
    bubbles: PropTypes.array,
    data: PropTypes.object,
    graticule: PropTypes.bool,
    height: PropTypes.any,
    labels: PropTypes.bool,
    responsive: PropTypes.bool,
    style: PropTypes.object,
    updateChoroplethOptions: PropTypes.object,
    width: PropTypes.any
  };
  
  constructor(props)
  {
    super(props);
    this.scale = {max: 50, currentShift: 0};
    // this.setState({percentage: 0});
    this.state = {percentage: 0};
    
  }
  
  componentDidMount()
  {
    // if (this.props.responsive)
    // {
    //   window.addEventListener('resize', this.resizeMap);
    // }
    // this.drawMap();
    this.resizeMap();
    // this.drawMap();
    
  }
  
  componentWillReceiveProps(newProps)
  {
    if (propChangeRequiresMapClear(this.props, newProps))
    {
      this.clear();
    }
  }
  
  componentDidUpdate()
  {
    // this.drawMap();
  }
  
  componentWillUnmount()
  {
    this.clear();
    if (this.props.responsive)
    {
      // window.removeEventListener('resize', this.resizeMap);
    }
  }
  
  clear()
  {
    // const { container } = this.refs;
    if (this.container)
    {
      for (const child of Array.from(this.container.childNodes))
      {
        this.container.removeChild(child);
      }
      
    }
    
    delete this.map;
  }
  
  drawMap()
  {
    const {
      arc,
      arcOptions,
      bubbles,
      bubbleOptions,
      data,
      graticule,
      labels,
      updateChoroplethOptions,
      ...props
    } = this.props;
    
    let map = this.map;
    
    if (!map)
    {
      map = this.map = new Datamaps({
        ...props,
        data,
        element: this.container
      });
      
    }
    else
    {
      map.updateChoropleth(data, updateChoroplethOptions);
    }
    
    if (arc)
    {
      map.arc(arc, arcOptions);
    }
    
    if (bubbles)
    {
      map.bubbles(bubbles, bubbleOptions);
    }
    
    if (graticule)
    {
      map.graticule();
    }
    
    if (labels)
    {
      map.labels();
    }
    this.zoomSetup();
    
  }
  
  resizeMap = () =>
  {
    this.drawMap();
  
    this.map.resize();
  }
  
  setObj = (obj) =>
  {
    this.container = obj;
  }
  
  
  zoomSetup = () =>
  {
    var paths = this.map.svg.selectAll("path"),
      subunits = this.map.svg.selectAll(".maps-subunit");
    
    // preserve stroke thickness
    paths.style("vector-effect", "non-scaling-stroke");
    
    // disable click on drag end
    subunits.call(
      d3.behavior.drag().on("dragend", function ()
      {
        d3.event.sourceEvent.stopPropagation();
      })
    );
    
    this.scale.set = this._getScalesArray();
    this.d3Zoom = d3.behavior.zoom().scaleExtent([1, this.scale.max]);
    
    this._displayPercentage(1);
    
    this.map.svg
      .call(this.d3Zoom.on("zoom", this._handleScroll))
      .on("dblclick.zoom", null); // disable zoom on double-click
  
    //   var obj = {DE:1214, FI:1189, DK:1284, FR:1316, NZ:1260, BR:1214,  GB:1188, IE:1185, US:1216, CA:1183, CH:1135, IR:1233};
    // this.updateColours(obj);
    
  };
  
  resetZoom = () =>
  {
    this._shift("reset");
    
  };
  zoomIn = () =>
  {
    this._shift("in");
  };
  zoomOut = () =>
  {
    this._shift("out");
  };
  
  
  _shift = (direction) =>
  {
    var center = [this.container.offsetWidth / 2, this.container.offsetHeight / 2],
      translate = this.d3Zoom.translate(), translate0 = [], l = [],
      view = {
        x: translate[0],
        y: translate[1],
        k: this.d3Zoom.scale()
      }, bounded;
    
    translate0 = [
      (center[0] - view.x) / view.k,
      (center[1] - view.y) / view.k
    ];
    
    if (direction === "reset")
    {
      view.k = 1;
      this.scrolled = true;
    }
    else
    {
      view.k = this._getNextScale(direction);
    }
    
    l = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];
    
    view.x += center[0] - l[0];
    view.y += center[1] - l[1];
    
    bounded = this._bound([view.x, view.y], view.k);
    
    this._animate(bounded.translate, bounded.scale);
  };
  
  _bound = (translate, scale) =>
  {
    var width = this.container.offsetWidth,
      height = this.container.offsetHeight;
    
    translate[0] = Math.min(
      (width / height) * (scale - 1),
      Math.max(width * (1 - scale), translate[0])
    );
    
    translate[1] = Math.min(0, Math.max(height * (1 - scale), translate[1]));
    
    return {translate: translate, scale: scale};
  };
  
  
  _handleScroll = () =>
  {
    var translate = d3.event.translate,
      scale = d3.event.scale,
      limited = this._bound(translate, scale);
    
    this.scrolled = true;
    
    this._update(limited.translate, limited.scale);
  };
  
  _bound = (translate, scale) =>
  {
    var width = this.container.offsetWidth,
      height = this.container.offsetHeight;
    
    translate[0] = Math.min(
      (width / height) * (scale - 1),
      Math.max(width * (1 - scale), translate[0])
    );
    
    translate[1] = Math.min(0, Math.max(height * (1 - scale), translate[1]));
    
    return {translate: translate, scale: scale};
  };
  
  _update = (translate, scale) =>
  {
    this.d3Zoom
      .translate(translate)
      .scale(scale);
    
    this.map.svg.selectAll("g")
      .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
    
    this._displayPercentage(scale);
  };
  
  _animate = function (translate, scale)
  {
    var _this = this,
      d3Zoom = this.d3Zoom;
    
    d3.transition().duration(350).tween("zoom", function ()
    {
      var iTranslate = d3.interpolate(d3Zoom.translate(), translate),
        iScale = d3.interpolate(d3Zoom.scale(), scale);
      
      return function (t)
      {
        _this._update(iTranslate(t), iScale(t));
      };
    });
  };
  
  _displayPercentage = function (scale)
  {
    var value;
    
    value = Math.round(Math.log(scale) / Math.log(this.scale.max) * 100);
    
    this.setState({percentage: value + "%"});
    // this.info.text(value + "%");
  };
  
  
  _getScalesArray = () =>
  {
    var array = [],
      scaleMaxLog = Math.log(this.scale.max);
    
    for (var i = 0; i <= 10; i++)
    {
      array.push(Math.pow(Math.E, 0.1 * i * scaleMaxLog));
    }
    
    return array;
  };
  
  _getNextScale = (direction) =>
  {
    var scaleSet = this.scale.set,
      currentScale = this.d3Zoom.scale(),
      lastShift = scaleSet.length - 1,
      shift, temp = [];
    
    if (this.scrolled)
    {
      
      for (shift = 0; shift <= lastShift; shift++)
      {
        temp.push(Math.abs(scaleSet[shift] - currentScale));
      }
      
      shift = temp.indexOf(Math.min.apply(null, temp));
      
      if (currentScale >= scaleSet[shift] && shift < lastShift)
      {
        shift++;
      }
      
      if (direction === "out" && shift > 0)
      {
        shift--;
      }
      
      this.scrolled = false;
      
    }
    else
    {
      
      shift = this.scale.currentShift;
      
      if (direction === "out")
      {
        shift > 0 && shift--;
      }
      else
      {
        shift < lastShift && shift++;
      }
    }
    
    this.scale.currentShift = shift;
    
    return scaleSet[shift];
  };
  
  
  getColorScale(minVal, maxVal) {
    var colors = d3.scale.linear()
      .domain([minVal, (maxVal-minVal)/2, maxVal])
      .range(['green', 'orange', 'red']);
  
    return colors;
  
  }
  
  updateColours = (vals) =>{
  
    
    if (this.lastVals ){
  
      var defaultFill = this.props.fills ? this.props.fills.defaultFill||'#eddc4e': '#eddc4e';
      for (var prop in this.lastVals) {
        this.lastVals[prop] =  defaultFill;
      }
  
      this.map.updateChoropleth(this.lastVals);
  
    }
  
  
  
    this.drawMap();
    
    // var colors = d3.scale.category10();
  
    this.map.updateChoropleth(vals);
    
    this.lastVals = vals;
  
  
  }
  
  
  render()
  {
    const style = {
      height: '100%',
      position: 'relative',
      width: '100%',
      ...this.props.style
    };
    
    return (
      <div style={style}>
        <div ref={this.setObj} style={style}>
          <button className="zoom-button" onClick={this.resetZoom}>0</button>
          <button className="zoom-button" onClick={this.zoomOut}>-</button>
          <button className="zoom-button" onClick={this.zoomIn}>+</button>
          <div style={{overflowY: 'auto'}}>{this.state.percentage}</div>
        </div>
      </div>
    
    )
    
  }
  
}