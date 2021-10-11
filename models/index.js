const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const models = {};
const mongoose = require('mongoose');
const CONFIG = require('../config/config');
const { log } = require('../services/log.service');

const getConnectionUrl = () => {
  if (
    typeof CONFIG.db_user === 'undefined' &&
    typeof CONFIG.db_password === 'undefined'
  ) {
    return `mongodb://${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}`;
  }
  return `mongodb://${CONFIG.db_user}:${CONFIG.db_password}@${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}/?authSource=admin`;
};

/**
 * DB Connection for modules
 */
if (CONFIG.db_host !== '') {
  // eslint-disable-next-line no-unused-vars
  const files = fs
    .readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
      );
    })
    .forEach(file => {
      var filename = file.split('.')[0];
      var modelName = filename.charAt(0).toUpperCase() + filename.slice(1);
      models[modelName] = require('./' + file);
    });

  mongoose.Promise = global.Promise; // set mongo up to use promises

  if (CONFIG.db_server === 'atlas') {
    const mongoLocation =
      'mongodb+srv://' +
      CONFIG.db_user +
      ':' +
      CONFIG.db_password +
      '@' +
      CONFIG.db_host;
    mongoose
      .connect(mongoLocation, {
        dbName: CONFIG.db_name
      })
      .catch(err => {
        log.error('*** Can Not Connect to Atlas Mongo Server:', err);
      });
  } else {
    const mongoLocation = getConnectionUrl();
    log.info('mongo connection string' + mongoLocation);
    mongoose
      .connect(mongoLocation, {
        useNewUrlParser: true,
        useFindAndModify: false
      })
      .catch(err => {
        log.error('*** Can Not Connect to Local Mongo Server:', err);
      });
  }

  const db = mongoose.connection;
  module.exports = db;
  db.once('open', () => {
    log.info('Connected to mongo');
  });
  db.on('error', error => {
    log.error('error', error);
  });
  // End of Mongoose Setup
} else {
  log.error('No Mongo Credentials Given');
}

module.exports = models;
