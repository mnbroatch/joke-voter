import React from 'react';

import TopJoke from './TopJoke';
import JokeActions from '../actions/JokeActions';

import JokeStore from '../stores/JokeStore';

import classnames from 'classnames';
import css from '../css/TopJoke.css';

export default class TopJokes extends React.Component {

  constructor(props) {
    super();

    this.state = {
      topJokeArray: [],
    }
  }

  componentWillMount() {
    JokeActions.getTopJokes()
      .then(jokes => {
        this.setState({ topJokeArray: jokes });
      });
  }

  render() {
    let jokes = this.state.topJokeArray.map((joke, idx) => {
      return <TopJoke key={joke._id} handleVote={this.handleVote} index={idx} {...joke} />
    });

    return (
        <ul className={css.TopJokeList}>
          {jokes}
        </ul>
    )
  }
}

