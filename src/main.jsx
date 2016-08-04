const React = require('react');
const ReactDOM = require('react-dom');

import { Router, Route, Link, browserHistory, hashHistory, IndexRoute } from 'react-router';
import App from './components/App';
import Welcome from './components/Welcome';
import Jokes from './components/Jokes';
import TopJokes from './components/TopJokes';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="jokes" component={Jokes} />
      <Route path="top" component={TopJokes} />
    </Route>
  </Router>,
  document.getElementById('root')
)
