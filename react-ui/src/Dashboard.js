import React, { Component } from 'react';
import LineChart from './LineChart';
import logo from './logo.svg';
import './Dashboard.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const PREFIX_API = 'bad-messages/';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      messages: [],
      visuals: {
        api: 'bad-messages/monthly/2018',
        type: 'Monthly',
        month: 5,
        year: '2018'
      },
      list: {
        api: 'bad-messages/12/5/2018',
        day: '12',
        month: '5',
        year: '2018'
      }
    }
  }

 componentDidMount() {
    const { api } = this.state.visuals;
    fetch(api)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          stats: json,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          stats: `API call failed: ${e}`,
          fetching: false
        });
      })

      fetch(this.state.list.api)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          messages: json,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          messages: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  renderMessageCard() {
    const { messages } = this.state;
    return (
      <div className="msg-container">
        {
          messages.map(msg => {
            const date = new Date(msg.createdAt)
            const time = date.toLocaleTimeString();
            return (
              <div className="msg-card">
                <div className="msg-content">
                  {msg.content}
                </div>
                <div className="msg-date">
                  {time}
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }

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

  handleChangeVis(opt, val) {
    let changedVisuals = this.state.visuals;
    changedVisuals[opt] = val;

    let tempApi = `${PREFIX_API}monthly/${changedVisuals.year}`;
    if (changedVisuals.type === 'Daily') {
      tempApi = `${PREFIX_API}daily/${changedVisuals.month}/${changedVisuals.year}`;
    }

    changedVisuals['api'] = tempApi;

    this.setState({
      visuals: changedVisuals,
    }, () => {
      fetch(tempApi)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          stats: json,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          stats: `API call failed: ${e}`,
          fetching: false
        });
      })
    })
  }

  handleChangeList(opt, val) {
    let changedList = this.state.list;
    changedList[opt] = val;

    let api = `${PREFIX_API}${changedList.day}/${changedList.month}/${changedList.year}`;

    changedList['api'] = api;
    this.setState({
      list: changedList,
    }, () => {
      fetch(api)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          messages: json,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          messages: `API call failed: ${e}`,
          fetching: false
        });
      })
    })
  }

  render() {
    console.log('api render', this.state.api)
    const options = [
      { label: 'Daily'},
      { label: 'Monthly'}
    ];

    const defaultOption = options[0];

    const dateOptions = [];
    for (var i = 1; i <= 31; i++) {
      dateOptions.push(i);
    }

    const defaultOptionDate = dateOptions[0];

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

    const { stats } = this.state;
    const { type, month, year } = this.state.visuals;
    const sentencedMonth = this.getMonth(month);

    const listDay = this.state.list.day;
    const listMonth = this.getMonth(this.state.list.month);
    const listYear = this.state.list.year;

    console.log('messages', this.state.messages)

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
            <Dropdown className="dropdown" options={options} onChange={(evt) => {this.handleChangeVis('type', evt.value)}} value={type} />
            {type === 'Daily' ? <Dropdown className="dropdown" options={months} onChange={(evt) => {this.handleChangeVis('month', evt.value)}} value={sentencedMonth} /> : null}
            <Dropdown className="dropdown" options={optionsYear} onChange={(evt) => {this.handleChangeVis('year', evt.label.toString())}} value={year} />

            <div className="buttons">
              <a className="visual-button" href="#visuals">VISUALS</a>
            </div>
            <div className="buttons">
              <a className="list-button" href="#lists">LISTS</a>
            </div>
          </div>

          <div className="visualization panel">
            <LineChart type={type} data={stats} month={month} year={year} />
          </div>

        </div>

        <div id="lists" className="list page">
          <h1 className="title third">Lists</h1>
          <div className="admin-panel lists">
            <Dropdown className="dropdown" options={dateOptions} onChange={(evt) => this.handleChangeList('day', evt.label.toString())} value={listDay} />
            <Dropdown className="dropdown" options={months} onChange={(evt) => this.handleChangeList('month', evt.value)} value={listMonth} />
            <Dropdown className="dropdown" options={optionsYear} onChange={(evt) => this.handleChangeList('year', evt.label.toString())} value={listYear} />
            <div className="buttons">
              <a className="visual-button" href="#visuals">VISUALS</a>
            </div>
            <div className="buttons">
              <a className="list-button" href="#lists">LISTS</a>
            </div>
          </div>

          <div className="lists panel">
            {this.renderMessageCard()}
          </div>

        </div>
      </div>
    );
  }
}