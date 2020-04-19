const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('../app/routes');
const { port, morganMode } = require('./config');
const { MONGO_URI, MONGODB_OPTIONS } = require('./db/mongo');

const server = (app) => {
  mongoose.connect(MONGO_URI, MONGODB_OPTIONS, (err) => {
    if (err) {
      return console.log('Error while connecting to MongoDB Atlas');
    }
    return console.log('Successful MongoDB Atlas connection!');
  });

  app.disable('x-powered-by');
  app.set('port', port);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan(morganMode));
  app.use(cors());
  app.use('/', routes);
};

module.exports = server;
