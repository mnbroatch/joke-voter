import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events'

let _users = [];

class UserStore extends EventEmitter {
  constructor(props) {
    super(props);

    AppDispatcher.register(action => {
      switch(action.actionType) {
        case 'RECEIVE_ONE_USER':
          _users.push(action.newUser);
          this.emit('CHANGE');
          break;
        case 'RETRIEVE_ALL_USERS':
          _users = action.users;
          this.emit('CHANGE');
          break;
        case 'DELETE_USER':
          _users = _users.filter(el => el._id !== action.deletedUser._id);
          this.emit('CHANGE');
          break;
        case 'EDIT_USER':
          console.log('e',action.editedUser)
          let objectToEdit = _users.find(el => el._id !== action.editedUser._id);
          objectToEdit = action.editedUser;
          this.emit('CHANGE');
          break;
      }
    });
  }

  getAllUsers() {
    return _users;
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

}

export default new UserStore();
