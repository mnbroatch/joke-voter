import React from 'react';
import UserActions from '../actions/UserActions';

export default class UserForm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      name: '',
      city: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let { addUser } = this.props;
    let user = {
      name: this.state.name,
      city: this.state.city,
    };

    UserActions.addNewUser(user);

    this.setState({ name: '' });
    this.setState({ city: '' });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div onChange={ e => this.setState({ name: e.target.value}) } className="form-group">
            <label htmlFor="name">User Name</label>
            <input type="text" className="form-control" id="name" placeholder="Name" value={this.state.name} required />
          </div>
          <div onChange={ e => this.setState({ city: e.target.value}) } className="form-group">
            <label htmlFor="city">User City</label>
            <input type="city" className="form-control" id="city" value={this.state.city} placeholder="City" required />
          </div>
          <button type="submit" className="btn btn-default"onClick={this.onAddUser}>Add User</button>
        </form>
      </div>
    )
  }
}

