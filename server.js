const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const contacts = require('./route/api/contacts');
const projects = require('./route/api/projects');
const employees = require('./route/api/employees');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

//Use routes
app.use('/api/contacts', contacts);
app.use('/api/projects', projects);
app.use('/api/employees', employees);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}...`));
