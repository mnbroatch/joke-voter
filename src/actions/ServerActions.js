import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  resolveVote(jokes) {
    AppDispatcher.dispatch({
      actionType: 'RESOLVE_VOTE',
      jokes,
    });
  },
  resolveFlag(jokes) {
    AppDispatcher.dispatch({
      actionType: 'RESOLVE_FLAG',
      jokes,
    });
  },
  getRandomJokes(jokes) {
    AppDispatcher.dispatch({
      actionType: 'RETRIEVE_RANDOM_JOKES',
      jokes,
    });
  },
  receiveOneJoke(newJoke) {
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_ONE_JOKE',
      newJoke,
    });
  },
  getAllJokes(jokes) {
    AppDispatcher.dispatch({
      actionType: 'RETRIEVE_ALL_JOKES',
      jokes,
    });
  },
  removeJoke(deletedJoke) {
    AppDispatcher.dispatch({
      actionType: 'DELETE_JOKE',
      deletedJoke,
    });
  },
  editJoke(editedJoke) {
    AppDispatcher.dispatch({
      actionType: 'EDIT_JOKE',
      editedJoke,
    });
  },
  receiveOneUser(newUser) {
    AppDispatcher.dispatch({
      actionType: 'RECEIVE_ONE_USER',
      newUser,
    });
  },
  getAllUsers(users) {
    AppDispatcher.dispatch({
      actionType: 'RETRIEVE_ALL_USERS',
      users,
    });
  },
  removeUser(deletedUser) {
    AppDispatcher.dispatch({
      actionType: 'DELETE_USER',
      deletedUser,
    });
  },
  editUser(editedUser) {
    AppDispatcher.dispatch({
      actionType: 'EDIT_USER',
      editedUser,
    });
  },
}

export default ServerActions;
