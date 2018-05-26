import React, { Component } from 'react';
import ReactHighCharts from 'react-highcharts';
import './TempGraph.css'

class VoltGraph extends Component {

  constructor(props){
    super(props);
    this.state={
      config: null,
      loading: true,
    }
  }

  componentDidMount = () => {
    console.log(this.props.data)
    this.createConfig();
  }

  addPoint = (pointinfo) => {
    let chart = this.vg.getChart();
    console.log(pointinfo.time)
    chart.series[0].addPoint([pointinfo.volt, pointinfo.speed], true, true)
    let categories = chart.xAxis[0].categories;
    categories.push(pointinfo.time);
    chart.xAxis[0].setCategories(categories, true);
  }

  createConfig = () => {
    console.log(this.props.data)
    let volts = [];
    let times = [];
    for(let i = 0; i < this.props.data.length; i++){
      volts[i] = this.props.data[i].volt;
      times[i] = this.props.data[i].time;
    }
    this.setState({config: {
      chart: {
        type: 'spline',
        animation: {
                duration: 0
            },
        marginRight: 10,
      },
      title: {
        text: 'Car Battery Voltage'
      },
      subtitle: {
        text: 'Source: Parse Technologies'
      },
      xAxis: {
        title: {
          text: 'Time'
        },
        categories: times
      },
      yAxis: {
        title: {
          text: 'Voltage (in V)'
        }
      },
      series: [{
        name: 'Car A',
        lineColor: 'gold',
        color: 'gold',
        data: volts
      }]
    }});
    this.setState({loading: false})
  }

  render = () => {
    return(
      <div>
        <div className="graph-cont">
          {this.state.loading ? null :
            <ReactHighCharts className="actual-graph" neverReflow={true} config={this.state.config} ref={a => this.vg = a}></ReactHighCharts>
          }
        </div>
      </div>
    )
  }
}

export default VoltGraph
