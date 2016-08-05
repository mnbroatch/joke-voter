import React from 'react';
import JokeActions from '../actions/JokeActions';
import $ from 'jquery'

import classnames from 'classnames';
import css from '../css/TopJoke.css';

export default class TopJoke extends React.Component {

  componentDidMount() {
    $('li').find('.md').hide();
    $('li').find('span').hide();
  }

  componentDidUpdate() {
    $('li').find('.md').hide();
    $('li').find('span').hide();
  }

  render() {
    let jokeBody = { __html: decodeHtml(this.props.body) }

    return (
      <li className={css.jokeRow}>
        <div onClick={toggleJoke} className={css.jokeTitle}>
          <b>{this.props.title}</b>
        </div>
        <br />
        <div className={css.jokeBodyContainer}>
          <span style={{ height: '20px', display: 'block' }}></span>
          <div className={css.jokeBodyText} dangerouslySetInnerHTML={jokeBody}>
          </div>
        </div>
      </li>
    )
  }
}


function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function toggleJoke(e) {
  $(e.target).closest('li').find('.md').slideToggle();
  $(e.target).closest('li').find('span').slideToggle();
}
