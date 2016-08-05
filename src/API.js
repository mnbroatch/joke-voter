let post = require('jquery').post
let get = require('jquery').get
let ajax = require('jquery').ajax
var ServerActions = require('../src/actions/ServerActions');

const API = {

  resolveVote(voteObj) {
    ajax({ 
      url: `/api/jokes/vote`,
      type: 'PUT',
      data: voteObj,
    })
      .done(response => {
        get(`/api/jokes/random?source=${voteObj.source}`)
          .done(jokes => {
            ServerActions.getRandomJokes(jokes) 
          });
      })
  },
  resolveFlag(_id) {
    ajax({ 
      url: `/api/jokes/flag/${_id}`,
      type: 'PUT',
    })
      .done(response => {
        get(`/api/jokes/random?source=old`)
          .done(jokes => {
            ServerActions.resolveFlag(jokes) 
          });
      })
  },
  getAllJokes() {
    get('/api/jokes')
      .done(response => {
        ServerActions.getAllJokes(response) 
      });
  },
  getTopJokes(source) {
    return get(`/api/jokes/top`)
      .done(jokes => {
        return new Promise((resolve,reject) => {
          resolve(jokes);
        });
      })
  },
  getRandomJokes(source) {
    get(`/api/jokes/random?source=${source}`)
      .done(response => {
        ServerActions.getRandomJokes(response) 
      });
  },
  addNewJoke(joke) {
    post('/api/jokes', joke)
      .done(response => { 
        ServerActions.receiveOneJoke(response) });
  },
  removeJoke(_id) {
    ajax({ 
      url: `/api/jokes/${_id}`,
      type: 'DELETE',
    })
      .done(response => {
        ServerActions.removeJoke(response)
      });
  },
  editJoke(editedJoke) {
    ajax({ 
      url: `/api/jokes/`,
      type: 'PUT',
      data: editedJoke,
    })
      .done(response => {
        ServerActions.editJoke(response)
      });
  },
}
