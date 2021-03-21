var express = require('express')
let AdminRouter = express.Router()

const adminCtrl = require('../controllers/admin');
const adminMid = require('../middleware/admin.js')

AdminRouter.get('/', adminMid, adminCtrl.getIndex)
AdminRouter.get('/infos', adminMid, adminCtrl.getInfos)
AdminRouter.get('/members/:page', adminMid, adminCtrl.getMembers)
AdminRouter.get('/updatepage/:id', adminMid, adminCtrl.getUpdatePage)
AdminRouter.post('/updatemember/:id', adminMid, adminCtrl.postUpdateMember)
AdminRouter.post('/updatememberpassword/:id', adminMid, adminCtrl.postUpdateMemberPassword)
AdminRouter.post('/deletemember/:id', adminMid, adminCtrl.postDeleteMember)
    

module.exports = AdminRouter;