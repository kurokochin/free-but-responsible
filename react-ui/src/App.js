import React, { Component } from 'react';
import LineChart from './LineChart';
import logo from './logo.svg';
import './App.css';

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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {'This is '}
          <a href="https://github.com/mars/heroku-cra-node">
            {'create-react-app with a custom Node/Express server'}
          </a><br/>
        </p>
        <p className="App-intro">
          {this.state.fetching
            ? 'Fetching message from API'
            : this.state.message}
        </p>

        <LineChart type="monthly" data={monthData} month="" year="2018" />
        <LineChart type="daily" data={dailyData} month="January" year="2018" />
      </div>
    );
  }
}