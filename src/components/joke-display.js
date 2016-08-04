import React from 'react';

import Joke from './Joke';
import JokeActions from '../actions/JokeActions';

import classnames from 'classnames';
import css from '../css/style.css';

export default class Jokes extends React.Component {

  constructor(props) {
    super();
  }

  _onChange() {
    this.setState( _getComponentState() )
  }

  render() {

    return (
      <div>
        <div className="joke-half col-md-6">
          {jokes[0]}
        </div>
        <div className="joke-half col-md-6">
          {jokes[1]}
        </div>
      </div>
    )
  }
}
