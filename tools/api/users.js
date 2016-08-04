import { Router } from 'express';
const router = Router();

import User from '../db/User'


router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    return res.status(err ? 400 : 200).send(err || users)
  })
})

router.post('/', (req, res) => {
  User.create(req.body, (err, user) => {
    return res.status(err ? 400 : 200).send(err || user)
  })
})

router.put('/', (req, res) => {
  User.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, savedUser) => {
    res.status(err ? 400 : 200).send(err || savedUser);
  });
})

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    return res.status(err ? 400 : 200).send(err || user)
  })
})

export default router;
