import React, { Component } from 'react';
import ReactChart from 'react-chartjs';
import logo from './logo.svg';

export default class LineChart extends Component {

  getMonth(numMonth) {
    const months = {
      '1': 'January',
      '2': 'February',
      '3': 'March',
      '4': 'April',
      '5': 'May',
      '6': 'June',
      '7': 'July',
      '8': 'August',
      '9': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    }

    return months[numMonth];
  }

  render() {
    const { type, data, month, year } = this.props;
    const alphabetMonth = this.getMonth(month);
    const LineChart = ReactChart.Line;
    const arrDay = Array.apply(null, {length: 32}).map(Number.call, Number).slice(1);
    const arrMonth = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const labels = type === 'Daily' ? arrDay : arrMonth;

    const title = type === 'Daily' ? 'Daily Chat Data' : 'Monthly Chat Data';
    const date = type === 'Monthly' ? year : alphabetMonth + ' ' + year;

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
          data: data
        }
      ]
    };

    return (
      <div>
        <h1>{title}</h1>
        <h2>{date}</h2>
        <LineChart data={chartData} width="600" height="250" redraw />
      </div>
    );
  }
}