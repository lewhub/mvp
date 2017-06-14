var sequelize = require('sequelize');
var db = new sequelize(process.env.dbUrl);

db
  .authenticate()
  .then(function() {
    console.log('connected to zodiac db');
  })
  .catch(function(err) {
    console.log('Error connecting to zodiac db', err);
  })

module.exports = db;