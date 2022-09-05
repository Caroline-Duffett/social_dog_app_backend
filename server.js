//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const app = express()



//___________________
//Controllers
//___________________
const usersController = require('./controllers/locations.js')




//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT



//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const SOCIALDOG_1 = process.env.SOCIALDOG_1



//___________________
//Middleware
//___________________
app.use(express.json())
app.use(cors())



//___________________
//Routes
//___________________
app.use(usersController)


//redirect for heroku
app.get('/', (req, res) => {
  res.redirect('/')
})



//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('Listening on port: 3000'));

// Connect to Mongo
mongoose.connect(SOCIALDOG_1,  { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost:27017/chowder")

// Error / success
mongoose.connection.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
mongoose.connection.on('connected', () => console.log('mongo connected: ', SOCIALDOG_1));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));
mongoose.connection.once('open', () => {
  console.log('connected to mongod...');
})
