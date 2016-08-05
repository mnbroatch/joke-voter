import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import css from '../css/Joke.css';

import Modal from '../modal';

export default class FlagModal extends React.Component {
  constructor () {
    super();
    this.state = {}
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ open: true });
  }
  nextStep() {
    this.setState({ open: false });
  }
  closeModal() {
    this.setState({ open: false });
  }

  render () {
    return (
      <div>
        <Modal isOpen={this.state.open}>
          <h1>Flag a Joke</h1>
          <p><b>Please do not flag a joke because you find it offensive/unfunny !</b></p>
          <p>Jokes are pulled from reddit.com/r/Jokes, so there are a few reasons a joke might be flagged: </p>
          <ul>
            <li>It isn't a joke (reddit meta discussion, etc.)</li>
            <li>It doesn't make sense outside of the context of being a reddit thread</li>
            <li>There is some technical glitch preventing it from displaying</li>
          </ul>
          <p>Together we can keep this world funny.</p>
          <button onClick={this.closeModal}>Close</button>
          <button onClick={this.props.handleFlag}>Flag!</button>
          </Modal>        
          <button className={css.flagButton + " btn btn-danger"} onClick={this.openModal}>Flag this Joke <span className="glyphicon glyphicon-flag" aria-hidden="true"></span>
          </button>
      </div>
    );
  }
}


