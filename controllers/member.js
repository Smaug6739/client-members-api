const axios = require('axios');
const path = require('path');
const config = require('../config.js');
const { statusUser } = require('../functions');
const dirMemberPages = '../pages/member';


exports.getRegister = (req, res) => {
    if (req.session && req.session.user) return res.redirect('/member/account')
    else {
        res.render(path.join(__dirname, `${dirMemberPages}/register.ejs`), {
            userConnected: statusUser(req.session),
        })
    }
}

exports.postRegister = (req, res) => {
    axios.post(`${config.api.baseURL}members`, {
        nickname: req.body.pseudo,
        password: req.body.password1,
        avatar: 'default.png',
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        phone_number: req.body.phoneNumber
    })
        .then((responce) => {
            if (responce.data.status === 'error') {
                res.render(path.join(__dirname, '../pages/error.ejs'), {
                    userConnected: statusUser(req.session),
                    error: responce.data.message
                })
            } else if (responce.data.status === 'success') {
                req.session.user = {
                    userID: responce.data.result.userID,
                    userPermissions: responce.data.result.userPermissions,
                    token: responce.data.result.token,
                    userAvatar: responce.data.result.userAvatar || config.defaultAvatar
                }
                res.redirect('/member/login')
            };
        })
        .catch((error) => {
            res.render(path.join(__dirname, '../pages/error.ejs'), {
                userConnected: statusUser(req.session),
                error: error

            })
        })
}

exports.getLogin = (req, res) => {
    if (req.session && req.session.user) return res.redirect('/member/account')
    else {
        res.render(path.join(__dirname, `${dirMemberPages}/login.ejs`), {
            userConnected: statusUser(req.session),
        })
    }
}

exports.postLogin = (req, res) => {
    axios.post(`${config.api.baseURL}members/auth`, {
        email: req.body.email,
        password: req.body.pass
    })
        .then(responce => {
            if (responce.data.status === "success") {
                req.session.user = {
                    userID: responce.data.result.user.id,
                    userPermissions: responce.data.result.user.permissions,
                    token: responce.data.result.auth.token,
                    userAvatar: responce.data.result.user.avatar
                }
                res.redirect('/member/account')
            } else res.redirect('/member/login')
        })
        .catch(error => {
            res.render(path.join(__dirname, '../pages/error.ejs'), {
                userConnected: statusUser(req.session),
                error: error
            })
        })
}

exports.disconnection = (req, res) => {
    req.session.destroy(function (error) {
        res.redirect('/')
    })
}

exports.getAccount = (req, res) => {
    if (!req.session || !req.session.user) return res.redirect('/member/login')
    axios.get(`${config.api.baseURL}members/${req.session.user.userID}`, {
        headers: { 'Authorization': `${req.session.user.userID} ${req.session.user.token}` },
    })
        .then((responce) => {
            if (responce.data.status === 'success') {
                res.render(path.join(__dirname, `${dirMemberPages}/account.ejs`), {
                    userConnected: statusUser(req.session),
                    member: responce.data.result,
                })
            } else {
                res.render(path.join(__dirname, '../pages/error.ejs'), {
                    userConnected: statusUser(req.session),
                    error: responce.data.message
                })
            }
        })
        .catch((error) => {
            res.render(path.join(__dirname, '../pages/error.ejs'), {
                userConnected: statusUser(req.session),
                error: error,
            })
        })
}
exports.getEditAccount = (req, res) => {
    if (!req.session || !req.session.user) return res.redirect('/member/login')
    axios.get(`${config.api.baseURL}members/${req.session.user.userID}`, {
        headers: { 'Authorization': `${req.session.user.userID} ${req.session.user.token}` },
    })
        .then((responce) => {
            if (responce.data.status === 'success') {
                res.render(path.join(__dirname, `${dirMemberPages}/edit.ejs`), {
                    userConnected: statusUser(req.session),
                    member: responce.data.result,
                })
            } else {
                res.render(path.join(__dirname, '../pages/error.ejs'), {
                    userConnected: statusUser(req.session),
                    error: responce.data.message
                })
            }
        })
        .catch((error) => {
            res.render(path.join(__dirname, '../pages/error.ejs'), {
                userConnected: statusUser(req.session),
                error: error,
            })
        })
}

exports.updateMember = (req, res) => {
    let file = "";
    if (req.file && req.file.filename) file = req.file.filename
    axios.put(`${config.api.baseURL}members/${req.params.id}`, {
        nickname: req.body.pseudo || "",
        avatar: file || "",
        first_name: req.body.firstName || "",
        last_name: req.body.lastName || "",
        age: req.body.age || "",
        email: req.body.email || "",
        phone_number: req.body.phoneNumber || ""
    },
        {
            headers: { 'Authorization': `${req.session.user.userID} ${req.session.user.token}` },
        })
        .then((responce) => {
            if (responce.data.status === 'error') {
                res.render(path.join(__dirname, '../pages/error.ejs'), {
                    userConnected: statusUser(req.session),
                    error: responce.data.message,
                })
            } else if (responce.data.status === 'success') {
                req.session.user.userAvatar = responce.data.result.avatar
                res.redirect('/member/account')
            };
        })
        .catch((error) => {
            res.render(path.join(__dirname, '../pages/error.ejs'), {
                userConnected: statusUser(req.session),
                error: error
            })
        })
}
exports.updatePassword = (req, res) => {
    axios.put(`${config.api.baseURL}members/${req.params.id}/password`, {
        oldPassword: req.body.oldPassword,
        password1: req.body.password1,
        password2: req.body.password2
    },
        {
            headers: { 'Authorization': `${req.session.user.userID} ${req.session.user.token}` },
        })
        .then((responce) => {
            if (responce.data.status === 'error') {
                res.render(path.join(__dirname, '../pages/error.ejs'), {
                    userConnected: statusUser(req.session),
                    error: responce.data.message,
                })
            } else if (responce.data.status === 'success') res.redirect('/member/account');
        })
        .catch((error) => {
            res.render(path.join(__dirname, '../pages/error.ejs'), {
                userConnected: statusUser(req.session),
                error: error
            })
        })
}

exports.deleteMember = (req, res) => {
    axios.delete(`${config.api.baseURL}members/${req.params.id}/${req.body.password}`, {
        headers: { 'Authorization': `${req.session.user.userID} ${req.session.user.token}` }
    })
        .then((responce) => {
            if (responce.data.status === 'error') {
                res.render(path.join(__dirname, '../pages/error.ejs'), {
                    userConnected: statusUser(req.session),
                    error: responce.data.message,
                })
            } else if (responce.data.status === 'success') res.redirect('/member/disconnection');
        })
        .catch((error) => {
            res.render(path.join(__dirname, '../pages/error.ejs'), {
                userConnected: statusUser(req.session),
                error: error,
            })
        })
}

/*function apiCall(url, method, data, headers, session, res, next) {
    fetch({
        method : method,
        headers: headers,
        url : url,
        data : data
    })
    .then((response) => {
            if (response.data.status == 'success') {
                next(response.data.result)
            }
            else {
                renderError(res, response.data.message, session)
            }
        })
        .catch((err) => renderError(res, err.message))
}
function renderError(res, err, session) {
    res.render(res.render(path.join(__dirname, '../pages/error.ejs')), {
        userConnected:{
            userPermissions :  session.user.userPermissions
        },
        error : err
    })
}*/
