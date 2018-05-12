import React, { Component } from 'react';
import LineChart from './LineChart';
import logo from './logo.svg';
import './Dashboard.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'



export default class App extends Component {

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
    const options = [
      { value: 1, label: 'Daily'},
      { value: 2, label: 'Monthly'}
    ];

    const defaultOption = options[0];

    const months = [
      { value: 1, label: 'January' },
      { value: 2, label: 'February' },
      { value: 3, label: 'March' },
      { value: 4, label: 'April' },
      { value: 5, label: 'May' },
      { value: 6, label: 'June' },
      { value: 7, label: 'July' },
      { value: 8, label: 'August' },
      { value: 9, label: 'September' },
      { value: 10, label: 'October' },
      { value: 11, label: 'November' },
      { value: 12, label: 'December' }
    ];

    const defaultOptionMonths = months[0];

    const optionsYear = [];
    for (var i = 1970; i <= 2018; i++) {
      optionsYear.push(i);
    }

    const defaultOptionYears = optionsYear[0];

    return (
      <div>
        <div className="landing-page page">
          <h1 className="title first">GCure</h1>
          <div className="background-layer">
            <div className="color-layer">

              <p className="welcome-text">WELCOME BACK</p>
              <p className="other-text">LET’S MAKE A FRIENDLY ENVIRONMENT TOGETHER</p>

            </div>
          </div>

          <a href="#visuals" className="start">
            GET STARTED
          </a>

        </div>

        <div id="visuals" className="visuals page">
          <h1 className="title second">Visuals</h1>
          <div className="admin-panel visualization">
            <Dropdown className="dropdown" options={options} onChange={this._onSelect} value={defaultOption} />
            <Dropdown className="dropdown" options={months} onChange={this._onSelect} value={defaultOptionMonths} />
            <Dropdown className="dropdown" options={optionsYear} onChange={this._onSelect} value={defaultOptionYears.toString()} />

            <div className="buttons">
              <a className="show-button" href="#">SHOW</a>
            </div>
            <div className="buttons">
              <a className="visual-button" href="#visuals">VISUALS</a>
            </div>
            <div className="buttons">
              <a className="list-button" href="#lists">LISTS</a>
            </div>
          </div>

          <div className="visualization panel">

          </div>

        </div>

        <div id="lists" className="list page">
          <h1 className="title third">Lists</h1>
          <div className="admin-panel lists">
            <Dropdown className="dropdown" options={options} onChange={this._onSelect} value={defaultOption} />
            <Dropdown className="dropdown" options={months} onChange={this._onSelect} value={defaultOptionMonths} />
            <Dropdown className="dropdown" options={optionsYear} onChange={this._onSelect} value={defaultOptionYears.toString()} />
            <div className="buttons">
              <div className="buttons">
                <a className="show-button" href="#">SHOW</a>
              </div>
              <a className="visual-button" href="#visuals">VISUALS</a>
            </div>
            <div className="buttons">
              <a className="list-button" href="#lists">LISTS</a>
            </div>
          </div>

          <div className="lists panel">

          </div>

        </div>
      </div>
    );
  }
}