import React from 'react';
import JokeActions from '../actions/JokeActions';

export default class JokeForm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      name: '',
      email: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let { addJoke } = this.props;
    let joke = {
      name: this.state.name,
      email: this.state.email,
    };

    JokeActions.addNewJoke(joke);

    this.setState({ name: '' });
    this.setState({ email: '' });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div onChange={ e => this.setState({ name: e.target.value}) } className="form-group">
            <label htmlFor="name">Joke Name</label>
            <input type="text" className="form-control" id="name" placeholder="Name" value={this.state.name} required />
          </div>
          <div onChange={ e => this.setState({ email: e.target.value}) } className="form-group">
            <label htmlFor="email">Joke Email</label>
            <input type="email" className="form-control" id="email" value={this.state.email} placeholder="Email" required />
          </div>
          <button type="submit" className="btn btn-default"onClick={this.onAddJoke}>Add Joke</button>
        </form>
      </div>
    )
  }
}

