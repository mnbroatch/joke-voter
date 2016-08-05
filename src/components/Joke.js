import React from 'react';
import JokeActions from '../actions/JokeActions';
import FlagModal from './FlagModal';

import classnames from 'classnames';
import css from '../css/Joke.css';

export default class Joke extends React.Component {

  constructor(props) {
    super(props);

    this.onVote = this.onVote.bind(this);
    this.onFlag = this.onFlag.bind(this);
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

  onVote() {
    this.props.handleVote(this.props.index);
  }

  onFlag() {
    this.props.handleFlag(this.props._id);
  }

  render() {
    let jokeBody = { __html: decodeHtml(this.props.body) }

    return (
      <div className={css.jokeCol + " col-md-6"}>
        <div className={css.jokeDisplay} style={{minWidth: "45vw"}}>
          <div className={css.jokeTitle}>
            <b>{this.props.title}</b>
          </div>
          <div className={css.jokeBody} dangerouslySetInnerHTML={jokeBody}>
          </div>
        </div>
        <button className={ css.voteButton } onClick={ this.onVote }>
          This one's funnier!
        </button>
        <FlagModal handleFlag={this.onFlag} onVote={ this.onVote } />
      </div>
    )
  }
}


function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
