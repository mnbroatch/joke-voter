var Router = require('express').Router;
var Joke = require('../db/Joke')

const router = Router();

router.get('/', (req, res) => {
  Joke.find({})
    .then(jokes => res.send(jokes))
    .catch(err => res.status(400).send(err))
})

router.get('/seed', (req, res) => {
  Joke.addJokesFromReddit();
  res.send('jokes.js 14 seeding');
})

router.get('/random', Joke.repopulateDb, (req, res) => {
  var source = req.query.source;
  Joke.getRandom(source)
    .then(jokes => {
      res.send(jokes)})
    .catch(err => {
      res.status(400).send(err);
    })
})

router.get('/top', Joke.repopulateDb, (req, res) =>
  Joke.getTop()
    .then(jokes => res.send(jokes))
    .catch(err => res.status(400).send(err))
)

router.put('/flag/:id', (req, res) =>
  Joke.addFlag(req.params.id)
    .then(jokes => res.send(jokes))
    .catch(err => res.status(400).send(err))
)

router.put('/vote', (req, res) => {
  var voteObj = req.body;
  Joke.resolveVote(voteObj)
    .then(newJokes => {
      res.send(newJokes)
    })
    .catch(err => res.status(400).send(err))
})

router.post('/', (req, res) =>
  Joke.create(req.body)
    .then(joke => res.send(joke))
    .catch(err => res.status(400).send(err))
)

router.delete('/:id', (req, res) =>
  Joke.findByIdAndRemove(req.params.id)
    .then(joke => res.send(joke))
    .catch(err => res.status(400).send(err))
)

