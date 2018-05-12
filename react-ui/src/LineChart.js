import React, { Component } from 'react';
import ReactChart from 'react-chartjs';
import logo from './logo.svg';
import './App.css';

export default class LineChart extends Component {

  constructor(props) {
    super(props);
    this.type = this.props.type;
    this.data = this.props.data;
    this.month = this.props.month;
    this.year = this.props.year
  }
  render() {
    const LineChart = ReactChart.Line;
    const arrDay = Array.apply(null, {length: 32}).map(Number.call, Number).slice(1);
    const arrMonth = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const labels = this.type === 'daily' ? arrDay : arrMonth;
    const title = this.type === 'daily' ? 'Daily Chat Data' : 'Monthly Chat Data';

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Chart",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: this.data
        }
      ]
    };

    return (
      <div>
        <h1>{title}</h1>
        <h2>{this.month + ' ' + this.year}</h2>
        <LineChart data={chartData} width="600" height="250" />
      </div>
    );
  }
}