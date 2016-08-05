import React from 'react';

import classnames from 'classnames';
import css from '../css/welcome.css';

export default class Welcome extends React.Component {
  render() {
    return (
      <div className={css.titleContainer}>
        <div className={css.titleText}>
        </div>
        <div className={css.explanation}>
          Welcome to Heh2Heh, where jokes are pitted against each other for your amusement. Simply vote on the joke you find funnier out of each displayed pair. The weakest are regularly removed and replaced with a fresh set.
          <br /> 
          <b> WARNING: Some jokes herein are sexist, sexual, racist, homophobic, or otherwise hilarious. Leave your usual good taste on this page.</b>
        </div>
      </div>
    )
  }
}
