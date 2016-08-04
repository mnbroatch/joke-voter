import React from 'react';
import JokeActions from '../actions/JokeActions';

import classnames from 'classnames';
import css from '../css/Joke.css';

export default class Joke extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  removeJoke(_id) {
    JokeActions.removeJoke(_id);
  }

  updateTitle(e) {
    let joke = Object.assign({}, this.state.joke);
    joke.title = e.target.value;
    this.setState({ joke });
  }

  updateBody(e) {
    let joke = Object.assign({}, this.state.joke);
    joke.body = e.target.value;
    this.setState({ joke });
  }

  onClick() {
    this.props.handleVote(this.props.index);
  }

  render() {
    let jokeBody = { __html: decodeHtml(this.props.body) }

    return (
      <div className={css.jokeCol + " col-md-6"}>

        <div className={css.jokeDisplay}>
          <div className={css.jokeTitle}>
            <b>{this.props.title}</b>
          </div>
          <div className={css.jokeBody} dangerouslySetInnerHTML={jokeBody}>
          </div>
        </div>

        <button className={ css.voteButton } onClick={ this.onClick }>
          This one's funnier!
        </button>
        <button className={css.flagButton + " btn btn-danger"}>
          Flag this Joke <span className="glyphicon glyphicon-flag" aria-hidden="true"></span>
        </button>
      </div>
    )
  }
}


function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
