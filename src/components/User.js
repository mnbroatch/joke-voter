import React from 'react';
import UserActions from '../actions/UserActions';

export default class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: this.props.name,
        city: this.props.city,
        _id: this.props._id,
      },
      editing: false,
    };
    this.onEdit = this.onEdit.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateCity = this.updateCity.bind(this);
  }

  removeUser(_id) {
    UserActions.removeUser(_id);
  }

  //  this is editing state directly. Isn't this terrible?
  updateName(e) {
    let user = Object.assign({}, this.state.user);
    user.name = e.target.value;
    this.setState({ user });
  }

  updateCity(e) {
    let user = Object.assign({}, this.state.user);
    user.city = e.target.value;
    this.setState({ user });
  }

  onEdit(e){
    e.preventDefault()
    if(this.state.editing)
      UserActions.editUser(this.state.user);
    this.setState({ editing: !this.state.editing });
  }

  render() {
    let userName = this.state.editing ?
      <input value={this.state.user.name} onChange={this.updateName} required  /> :
      this.state.user.name;

    let userCity = this.state.editing ?
      <input type="text" value={this.state.user.city} onChange={this.updateCity} required /> :
      this.state.user.city;

    return (
      // <div className="user-row">
      //   {userName} {userCity}
      //   <button onClick={this.onEdit} className="btn btn-default">{this.state.editing ? 'Confirm' : 'Edit'}</button>
      //   <button onClick={ () => UserActions.removeUser(this.state.user._id) } className="btn btn-danger">DELETE</button>
      //   <div id="delete"></div>
      // </div>
      <form onSubmit={this.onEdit} className="user-row">
        {userName} {userCity}
        <button type="submit" className="btn btn-default">{this.state.editing ? 'Confirm' : 'Edit'}</button>
        <button onClick={ () => UserActions.removeUser(this.state.user._id) } className="btn btn-danger">DELETE</button>
        <div id="delete"></div>
      </form>
    )
  }
}
