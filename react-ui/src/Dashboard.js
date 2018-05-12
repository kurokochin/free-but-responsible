import React, { Component } from 'react';
import LineChart from './LineChart';
import logo from './logo.svg';
import './Dashboard.css';

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
            <div className="daily-monthly dropdown">
              Daily
            </div>
            <div className="months dropdown">
              May
            </div>
            <div className="years dropdown">
              2018
            </div>
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
            <div className="daily-monthly dropdown">
              Daily
            </div>
            <div className="months dropdown">
              May
            </div>
            <div className="years dropdown">
              2018
            </div>
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