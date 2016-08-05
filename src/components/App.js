import React from 'react';
import Welcome from './Welcome';
import Navbar from './Navbar';

import classnames from 'classnames';
import trans from '../css/Transition.css';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group')

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <ReactCSSTransitionGroup
          transitionName={{
            enter: trans.exampleEnter,
            enterActive: trans.exampleEnterActive,
            appear: trans.exampleAppear,
            appearActive: trans.exampleAppearActive,
            leave: trans.exampleLeave,
            leaveActive: trans.exampleLeaveActive,
          }}
          transitionEnter = {true}
          transitionEnterTimeout={1500}
          transitionLeave = {true}
          transitionLeaveTimeout={1500}
        >
          {React.cloneElement(this.props.children, { key: Math.random() })}
          <div key={Math.random()} className={trans.box}></div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

