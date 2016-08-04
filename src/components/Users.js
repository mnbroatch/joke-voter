import React from 'react';

import UserForm from './UserForm';
import User from './User';
import UserActions from '../actions/UserActions';

import UserStore from '../stores/UserStore';

import classnames from 'classnames';
import css from '../css/style.css';

let _getComponentState = () => {
  return {
    userArray: UserStore.getAllUsers()
  }
}

export default class Users extends React.Component {

  constructor(props) {
    super();

    this.state = _getComponentState();
    
    this.editUser = this.editUser.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    UserStore.startListening(this._onChange);
  }

  componentWillMount() {
    UserActions.getAllUsers();
    UserStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState( _getComponentState() )
  }

  editUser(editedUser) {
    let tempUserArray = this.state.userArray.slice(0);
    let index = tempUserArray.findIndex(el => el._id == editedUser._id);
    tempUserArray[index] = editedUser;
    this.setState({ userArray: tempUserArray });
  }

  render() {
      console.log('users50',this.state)
    let users = this.state.userArray.map((user, idx) => {
      return <User key={user._id} editUser={this.editUser} {...user} />
    })

    return (
      <div>
        <UserForm />
        {users}
      </div>
    )
  }
}
