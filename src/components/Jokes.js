import React from 'react';

import Joke from './Joke';
import JokeActions from '../actions/JokeActions';

import JokeStore from '../stores/JokeStore';

import classnames from 'classnames';
import css from '../css/style.css';


let _getComponentState = jokeSource => {
  return {
    jokeArray: JokeStore.getRandomJokes(jokeSource)
  }
}

export default class Jokes extends React.Component {

  constructor(props) {
    super();

    this.state = {
      jokeArray: [],
      jokeSource: 'new',
    }


    this._onChange = this._onChange.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    JokeStore.startListening(this._onChange);
  }

  componentWillMount() {
    JokeActions.getRandomJokes(this.state.jokeSource);
    JokeStore.stopListening(this._onChange);
  }

  _onChange() {
    let jokeSource = (this.state.jokeSource == 'old') ? 'new' : 'old';
    this.setState(_getComponentState(this.state.jokeSource) )
    this.setState({ jokeSource })
  }

  handleVote(winnerIndex) {
    let winnerId = this.state.jokeArray[winnerIndex]._id
    let loserId = this.state.jokeArray[+!winnerIndex]._id
    let voteObj = {
      winner: winnerId,
      loser: loserId,
      source: this.state.jokeSource,
    }
    console.log(this.state.jokeSource);
    JokeActions.resolveVote(voteObj)
  }

  render() {
    console.log(css)
    let jokes = this.state.jokeArray.map((joke, idx) => {
      return <Joke key={joke._id} handleVote={this.handleVote} index={idx} {...joke} />
    })

    return (
        <div className={css.jokeRow + " row"}>{jokes}</div>
    )
  }
}
