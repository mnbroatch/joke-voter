const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const request = require('request');

const JOKES_TO_FETCH = 10;
const MINIMUM_UNVIEWED_JOKES = 10;
const NUM_TOP_JOKES = 10;

let isFetchingFromReddit = false;

const jokeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
  votes: { type: Number, required: true },
  ratio: { type: Number, required: true },
  flags: Number,
});


jokeSchema.pre('save', function (next) {
  this.votes = this.wins + this.losses;
  this.ratio = this.wins / this.votes;
  return next();
});

jokeSchema.statics.getRandom = function getRandom(source) {
  if (source == 'old') {
    return this.getRandomOld();
  }
  if (source == 'new') {
    return this.getRandomNew();
  } 
};

jokeSchema.statics.getRandomOld = function getRandomOld() {
  return this.count({ votes: { $gt: 0 } })
    .then(count => {

      if (count < 2)
        return this.getRandomNew();

      let random1 = Math.floor(Math.random() * count)
      let random2 = Math.floor(Math.random() * count)

      //  need two random numbers that aren't equal
      while (random1 == random2 && count >= 2){
        random1 = Math.floor(Math.random() * count)
      }

      let jokePromise1 = Joke.findOne({ votes: { $gt: 0 } }).skip(random1).exec();
      let jokePromise2 = Joke.findOne({ votes: { $gt: 0 } }).skip(random2).exec();
      return Promise.all([jokePromise1, jokePromise2]);
    })
    .catch(err => {
      console.log(err);
    });
};

jokeSchema.statics.getRandomNew = function getRandomNew() {
  return this.count({ votes: 0 })
    .then(count => {
      let random1 = Math.floor(Math.random() * count)
      let random2 = Math.floor(Math.random() * count)

      //  need two random numbers that aren't equal
      while (random1 == random2 && count >= 2){
        random1 = Math.floor(Math.random() * count)
      }

      let jokePromise1 = Joke.findOne({ votes: 0 }).skip(random1).exec();
      let jokePromise2 = Joke.findOne({ votes: 0 }).skip(random2).exec();
      return Promise.all([jokePromise1, jokePromise2], (err,stuff) => {
      });
    })
    .catch(err => {
      console.log(err);
    });
};

jokeSchema.statics.getTop = function getTop() {
  return Joke.find({ votes: { $gt: 0 } })
    .sort({ ratio: -1})
    .limit(NUM_TOP_JOKES)
    .exec();
}

jokeSchema.statics.repopulateDb = function repopulateDb(req, res, next) {
  if (req.query.source == 'old') {
    return next();

  }
  else { 
    Joke.count({ votes: 0 })
      .then(count => {
        if (count >= MINIMUM_UNVIEWED_JOKES) {
          return next();
        }
        else {
          Joke.removeBadJokes();
          Joke.addJokesFromReddit();
          req.query.source = 'old';
          return next();
        }
      })
      .catch(err => {
        console.log(err);
        return next();
      });
  } 
};

jokeSchema.statics.removeBadJokes = function removeBadJokes() {
  return Joke.find({ votes: { $gt: 0 } })
    .sort({ votes: -1, ratio: 1})
    .limit(JOKES_TO_FETCH)
    .exec((err,stuff) => {
      stuff.forEach(el => {
        el.remove();
      });
    });
}

jokeSchema.statics.addJokesFromReddit = function addJokesFromReddit() {
  if (!isFetchingFromReddit) {
    isFetchingFromReddit = true;
    let jokePromiseArray = []
    for (let i = 0; i < JOKES_TO_FETCH; i++) {
      jokePromiseArray.push(this.addOneJokeFromReddit())
    }
    Promise.all(jokePromiseArray)
      .then(() => {
        console.log('all done');
        isFetchingFromReddit = false;
      })
      .catch(err => {
        console.log('jokes fetch fail');
      });
  }
};

jokeSchema.statics.addOneJokeFromReddit = function addOneJokeFromReddit() {
  let url = 'http://reddit.com/r/jokes/random.json';
  console.log('fetching');
  return new Promise((resolve,reject) => {
    request(url, (error, response, body) => {
      if (error){
        console.log('Joke model 136 error',error);
        return addOneJokeFromReddit();
      }
      try{
        body = JSON.parse(body);
      }
      catch (e){
        return console.log(e);
      }

      let joke = {
        title: body[0].data.children[0].data.title,
        body: body[0].data.children[0].data.selftext_html,
        wins: 0,
        losses: 0,
        votes: 0,
        ratio: 0,
        flags: 0,
      };
      Joke.find({body: joke.body}, foundJoke => {
        if (!foundJoke) {
          return Joke.create(joke)
            .then(joke => {
              resolve();
              console.log('model 149 joke added');
            })
            .catch(err => {
              reject();
              console.log(err);
            });
        } else {
          Joke.addOneJokeFromReddit();
        }
      });
    });
  });
};

jokeSchema.statics.resolveVote = function resolveVote(voteObj) {
  let winnerPromise = Joke.findById(voteObj.winner, (err, winner) => {
    if(winner) {
      winner.wins++;
      return winner.save();
    } else {
      return Promise.resolve();
    }

  });
  let loserPromise = Joke.findById(voteObj.loser, (err, loser) => {
    if(loser) {
      loser.losses++;
      return loser.save();
    } else {
      return Promise.resolve();
    }
  });
  return Promise.all([winnerPromise,loserPromise])
};


jokeSchema.statics.addFlag = function addFlag(jokeId) {
  return this.findByIdAndUpdate(jokeId, { $inc: { flags: 1 } }, { new: true })
    .then(updatedJoke => {
      if (updatedJoke.flags > 1) {
        return updatedJoke.remove();
      } else {
        return updatedJoke;
      }
    });
};

const Joke = mongoose.model('Joke', jokeSchema);
module.exports = Joke;
