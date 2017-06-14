var express = require('express');
var userRouter = express.Router();
var userCtrl = require('../controllers/user_ctrl.js');

userRouter.get('/', userCtrl.index)
userRouter.post('/', userCtrl.create)
userRouter.get('/sessionWatch', userCtrl.checkOutSession)

userRouter.post('/login', userCtrl.login)
userRouter.get('/logout', userCtrl.logout)
userRouter.get('/:id', userCtrl.show)

userRouter.use('/:id', userCtrl.verify_access)
userRouter.delete('/:id', userCtrl.remove_user)
userRouter.patch('/:id', userCtrl.edit_user_info)

module.exports = userRouter;