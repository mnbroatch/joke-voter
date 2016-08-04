import React from 'react';
import Welcome from './Welcome';
import Navbar from './Navbar';
import classnames from 'classnames';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}

