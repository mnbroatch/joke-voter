import API from '../API';

const JokeActions = {

  getRandomJokes(source) {
    API.getRandomJokes(source);
  },
  resolveVote(voteObj) {
    API.resolveVote(voteObj);
  },
  getTopJokes() {
    return API.getTopJokes();
  },
  getAllJokes() {
    API.getAllJokes();
  },
  addNewJoke(newJoke) {
    API.addNewJoke(newJoke);
  },
  removeJoke(_id) {
    API.removeJoke(_id);
  },
  editJoke(editedJoke) {
    API.editJoke(editedJoke);
  },
}

export default JokeActions;
