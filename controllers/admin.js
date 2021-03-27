const axios = require('axios')
const path = require('path');
const config = require('../config.js');
const { statusUser } = require('../functions');
exports.getIndex = (req, res) => {
    res.render(path.join(__dirname, '../pages/admin/index.ejs'), {
        userConnected: statusUser(req.session),
    })
}

exports.getMembers = (req, res) => {
    if (!req.user.permissions.includes('ADMINISTRATOR') && !req.user.permissions.includes('VIEW_MEMBERS')) return res.status(401).redirect('/')
    axios.get(`${config.api.baseURL}members/all/${req.params.page}`, {
        headers: { 'Authorization': `${req.session.user.userID} ${req.session.user.token}` }
    })
        .then((responce) => {
            if (responce.data.status === 'success') {
                res.render(path.join(__dirname, '../pages/admin/members.ejs'), {
                    userConnected: statusUser(req.session),
                    members: responce.data.result,
                })
            } else {
                res.render(path.join(__dirname, '../pages/error.ejs'), {
                    userConnected: statusUser(req.session),
                    error: responce.data.message,
                })
            }

        })
        .catch((error) => {
            res.render(path.join(__dirname, '../pages/error.ejs'), {
                userConnected: statusUser(req.session),
                error: error,
            })
        });
}

exports.getUpdatePage = (req, res) => {
    if (!req.user.permissions.includes('ADMINISTRATOR') && !req.user.permissions.includes('UPDATE_MEMBERS')) return res.status(401).redirect('/')
    axios.get(`${config.api.baseURL}members/${req.params.id}`, {
        headers: { 'Authorization': `${req.session.user.userID} ${req.session.user.token}` },
    })
        .then((responce) => {
            res.render(path.join(__dirname, '../pages/admin/adminupdate.ejs'), {
                userConnected: statusUser(req.session),
                member: responce.data.result,
            })
        })
        .catch((error) => {
            res.render(path.join(__dirname, '../pages/error.ejs'), {
                userConnected: statusUser(req.session),
                error: error,
            })
        });
}


exports.postUpdateMember = (req, res) => {
    if (!req.user.permissions.includes('ADMINISTRATOR') && !req.user.permissions.includes('UPDATE_MEMBERS')) return res.status(401).redirect('/')
    axios.put(`${config.api.baseURL}members/${req.params.id}`, {
        nickname: req.body.pseudo,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        phone_number: req.body.phoneNumber
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
            } else if (responce.data.status === 'success') res.redirect('/admin');
        })
        .catch((error) => {
            res.render(path.join(__dirname, '../pages/error.ejs'), {
                userConnected: statusUser(req.session),
                error: error,
            })
        })
}
exports.postUpdateMemberPassword = (req, res) => {
    if (!req.user.permissions.includes('ADMINISTRATOR') && !req.user.permissions.includes('UPDATE_MEMBERS')) return res.status(401).redirect('/')
    axios.put(`${config.api.baseURL}members/${req.params.id}`, {
        password: req.body.password2,
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
            } else if (responce.data.status === 'success') res.redirect('/admin');
        })
        .catch((error) => {
            res.render(path.join(__dirname, '../pages/error.ejs'), {
                userConnected: statusUser(req.session),
                error: error,
            })
        })
}
exports.postDeleteMember = (req, res) => {
    if (!req.user.permissions.includes('ADMINISTRATOR') && !req.user.permissions.includes('DELETE_MEMBERS')) return res.status(401).redirect('/')
    axios.delete(`${config.api.baseURL}members/${req.params.id}`, {
        headers: { 'Authorization': `${req.session.user.userID} ${req.session.user.token}` }
    })
        .then((responce) => {
            if (responce.data.status === 'error') {
                res.render(path.join(__dirname, '../pages/error.ejs'), {
                    userConnected: statusUser(req.session),
                    error: responce.data.message,
                })
            } else if (responce.data.status === 'success') res.redirect('/admin');
        })
        .catch((error) => {
            res.render(path.join(__dirname, '../pages/error.ejs'), {
                userConnected: statusUser(req.session),
                error: error,
            })
        })
}