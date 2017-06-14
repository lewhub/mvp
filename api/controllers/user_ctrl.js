var User = require('../models/user.js');

module.exports = {
  index: function(req, res) {
    User
      .findAll({})
      .then(function(users) {
        res.json({ success: true, message: 'all users', users: users })
      })
      .catch(function(err) {
        console.log(err, '< err');
      })
  },
  create: function(req, res) {
    User
      .create(req.body)
      .then(function(user) {
        res.json({ success: true, message: 'user created', user: user });
      })
      .catch(function(err) {
        console.log(err, '< err');
      })
  },
  show: function(req, res) {
    User
      .findById(req.params.id)
      .then(function(user) {
        res.json({success: true, message: 'user found', user: user})
      })
      .catch(function(err) {
        console.log(err, '< err');
      })
  },
  remove_user: function(req, res) {
    User
      .destroy({
        where: {id : req.params.id}
      })
      .then(function() {
        res.json({success: true, message: 'user successfully deleted.'});
      })
      .catch(function(err) {
        console.log(err, '< err')
      })
  },
  edit_user_info: function(req, res) {
    User
      .update(
        req.body,
        { where: { id: req.params.id } }
      )
      .then(function(user) {
        res.json({ success: true, message: 'user updated', user: user })
      })
      .catch(function(err) {
        console.log(err, '< err')
      })  
  },
  login: function(req, res) {
    User
      .findOne({
        where: {email: req.body.email}
      })
      .then(function(user) {
        if (!user.checkPassword(req.body.password)) return res.json({ success: false, message: "invalid password" })
        req.session.regenerate(function(){
          req.session.user = user;
          req.session.save(function(err){
            if (err) return console.log(err)
            res.json({success: true, message: 'login successful', user: user, session: req.session});
          })
        })
      })
      .catch(function(err) {
        console.log(err, '< err');
      })
  },
  verify_access: function(req, res, next) {
    console.log(req.session, '<<<<<<<<<<< session')
    if (req.session.user) {
      next();
    } else {
      console.log('no user on session object...');
      req.session.error = 'security level is too low.... access denied.'
      res.json({ success: false, message: 'redirecting to log in', session: req.session })
    }
  },
  checkOutSession: function(req, res) {
    console.log(req.session, '<< session in checkout session route in backend')
    res.json({ canStay: !!req.session.user, user: req.session.user })
  },
  logout: function(req, res) {
    req.session.destroy(function(){
      console.log('logging out..........');
      res.json({ success: true, message: 'logged out'});
    })
  }
}