import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import Dashboard from './Dashboard';
import Chatroom from './Chatroom';

const Routes = () => (
  <Router>
    <div>
      <Route exact path='/' component={Dashboard} />
      <Route path='/chat' component={Chatroom} />
    </div>
  </Router>
);

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
