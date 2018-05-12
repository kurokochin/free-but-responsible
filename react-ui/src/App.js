import React, { Component } from 'react';
import LineChart from './LineChart';
import logo from './logo.svg';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      fetching: true
    };
  }

  componentDidMount() {
    fetch('/bad-messages/daily/5/2018')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log('lalala', json)
        this.setState({
          message: json,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render() {
    const data = this.state.message;
    return (
      <div>
        HOME
        <LineChart type="daily" data={data} month="January" year="2018" />
      </div>
    );
  }
}