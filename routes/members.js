var express = require('express')
let MembersRouter = express.Router()
const multerMidAvatar = require('../middleware/multer-avatar')

const memberCtrl = require('../controllers/member');
MembersRouter.get('/login', memberCtrl.getLogin)
MembersRouter.get('/register', memberCtrl.getRegister)
MembersRouter.post('/register', memberCtrl.postRegister)
MembersRouter.post('/login', memberCtrl.postLogin)
MembersRouter.get('/disconnection', memberCtrl.disconnection)
MembersRouter.get('/account', memberCtrl.getAccount)
MembersRouter.get('/edit', memberCtrl.getEditAccount)
MembersRouter.post('/:id/update',multerMidAvatar, memberCtrl.updateMember)
MembersRouter.post('/updatepassword/:id', memberCtrl.updatePassword)
MembersRouter.post('/:id/delete', memberCtrl.deleteMember)



module.exports = MembersRouter;