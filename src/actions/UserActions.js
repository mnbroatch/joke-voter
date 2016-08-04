import API from '../API';

const UserActions = {

  addNewUser(newUser) {
    API.addNewUser(newUser);
  },
  getAllUsers() {
    API.getAllUsers();
  },
  removeUser(_id) {
    API.removeUser(_id);
  },
  editUser(editedUser) {
    API.editUser(editedUser);
  },
}

export default UserActions;
