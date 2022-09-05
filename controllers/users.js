const bcrypt = require('bcrypt')
const express = require('express')
const user = express.Router()
const User = require('../models/user.js')

user.get('/createaccount', (req, res) => {
  User.find({},  (err, foundUser) => {
    res.json(foundUser)
  })
})

user.post('/createaccount', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log(createdUser);
    if(err){
      console.log(err);
      res.json('username taken')
      res.json(err.message)
    } else {
      console.log('user is created', createdUser);
      res.json(createdUser)
    }
  })
});

user.put('/login', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if(err) {
      res.json('An error has occured, please try again.')
    } else {
      if(!foundUser){
        res.json('incorrect username and/or password.')
      } else if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.json({username: foundUser.username})
      } else {
        res.json('incorrect username and/or password.')
      }
    }
  })
});

module.exports = user
