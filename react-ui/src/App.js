import React, { Component } from 'react';
import LineChart from './LineChart';
import logo from './logo.svg';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  // componentDidMount() {
  //   fetch('/api')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`status ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(json => {
  //       this.setState({
  //         message: json.message,
  //         fetching: false
  //       });
  //     }).catch(e => {
  //       this.setState({
  //         message: `API call failed: ${e}`,
  //         fetching: false
  //       });
  //     })
  // }

  render() {
    const monthData = [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56]
    const dailyData = [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 81, 56, 55]
    return (
      <div>
        HOME
        <LineChart type="monthly" data={monthData} month="January" year="2018" />
      </div>
    );
  }
}