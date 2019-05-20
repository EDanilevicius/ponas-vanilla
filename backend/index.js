const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Connect mongo
mongoose.connect('mongodb://localhost:27017/pons1v', {
  useCreateIndex: true,
  useNewUrlParser: true,
});

//To get token
var corsOptions = {
  exposedHeaders: ['x-auth'],
  exposedID: ['user-id'],
};

app.use(bodyParser.json());

//To create header
app.use(cors(corsOptions));

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api', apiRoutes); // naudosiu per api routes.js

app.use('/uploads', express.static('uploads')); // to see uploaded images

//Run server through 3000 port
app.listen(3001, () => console.log('Server running on port 3001'));
