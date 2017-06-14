var sequelize = require('sequelize');
var db = require('../db/config.js');
var bcrypt = require('bcrypt-nodejs');

var User = db.define('user', {
  email: { type: sequelize.STRING, unique: true, allowNull: false },
  password: { type: sequelize.STRING, allowNull: false },
  birthday: { type: sequelize.DATEONLY, allowNull: false }
})

User.prototype.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

User.prototype.checkPassword = function(password) {
  console.log(this.password, '< password in check password - user model')
  return bcrypt.compareSync(password, this.password);
}

User.hook('beforeCreate', function(user, options) {
  console.log('in before create hook')
  user.password = user.hashPassword(user.password);
})

User.sync();

module.exports = User;