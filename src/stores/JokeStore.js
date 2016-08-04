import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events'

let _jokes = [];

class JokeStore extends EventEmitter {
  constructor(props) {
    super(props);

    AppDispatcher.register(action => {
      switch(action.actionType) {
        case 'RESOLVE_VOTE':
          _jokes = action.jokes;
          this.emit('CHANGE');
          break;
        case 'RETRIEVE_RANDOM_JOKES':
          _jokes = action.jokes;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_ONE_JOKE':
          _jokes.push(action.newJoke);
          this.emit('CHANGE');
          break;
        case 'RETRIEVE_ALL_JOKES':
          _jokes = action.jokes;
          this.emit('CHANGE');
          break;
        case 'DELETE_JOKE':
          _jokes = _jokes.filter(el => el._id !== action.deletedJoke._id);
          this.emit('CHANGE');
          break;
        case 'EDIT_JOKE':
          console.log('e',action.editedJoke)
          let objectToEdit = _jokes.find(el => el._id !== action.editedJoke._id);
          objectToEdit = action.editedJoke;
          this.emit('CHANGE');
          break;
      }
    });
  }

  getRandomJokes() {
    return _jokes;
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

}

export default new JokeStore();
