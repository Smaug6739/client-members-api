require('babel-register');
const express = require('express');
const session = require('express-session');
const path = require("path")//NODE
const http = require('http')//NODE
const fs = require('fs')//NODE
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')
const app = express();
const morgan = require('morgan')('dev');
const bodyParser = require('body-parser');
const config = require('./config.json');
const axios = require('axios');
const { send } = require('process');


db = require("./util/mongoose");
db.init();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: "A5H2G2V",
    name: 'member-space',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {

    }
}));




app.use(morgan)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    let userConnected;
    if (!req.session || !req.session.user) userConnected = false;
    else if (req.session.user.userAdmin) userConnected = 'admin';
    else userConnected = 'member';
    res.render(`${__dirname}/pages/index.ejs`, {
        userConnected: userConnected
    })
});
app.get('/css', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public/css/main.css'));
});
app.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/account')
    //else res.status(200).sendFile(path.join(__dirname, 'pages/login.ejs'));
    else res.render(`${__dirname}/pages/login.ejs`)
});
app.get("/disconnection", function (req, res) {
    req.session.destroy(function (error) {
        res.redirect('/')
    })
})

app.get('/account', (req, res) => {
    let userConnected;
    if (!req.session || !req.session.user) {
        return res.redirect('/login')
    }
    if (!req.session || !req.session.user) userConnected = false;
    else if (req.session.user.userAdmin) userConnected = 'admin';
    else userConnected = 'member';
    axios.post(`http://localhost:8080/api/v1/members/${req.session.user.userID}`, {
        userID: req.session.user.userID,
        userAdmin: req.session.user.userAdmin
    })
        .then((responce) => {
            if (responce.data.status === 'success') {
                res.render(`${__dirname}/pages/account.ejs`, {
                    member: responce.data.result,
                    userConnected: userConnected
                })
            } else {
                res.render(`${__dirname}/pages/error.ejs`, {
                    error: responce.data.message
                })
            }

        })
        .catch((error) => {
            res.render(`${__dirname}/pages/error.ejs`) //-------------------------ERROR-PAGE
        });
});
app.get('/error', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'pages/error.ejs'));
});




app.get('/admin', (req, res) => {

    if (req.session.user) {
        if (req.session.user.userAdmin) {
            let userConnected;
            if (!req.session || !req.session.user) userConnected = false;
            else if (req.session.user.userAdmin) userConnected = 'admin';
            else userConnected = 'member';
            console.log("ADMIN : YES")
            axios.get(`http://localhost:8080/api/v1/members/`, {
                userID: req.session.user.userID,
                userAdmin: req.session.user.userAdmin
            })
                .then((responce) => {
                    console.log(responce.data.status)
                    res.render(`${__dirname}/pages/admin.ejs`, {
                        members: responce.data.result,
                        userConnected: userConnected
                    })
                })
                .catch((error) => {
                    console.log(error)
                    /*sendPage(
                        data = {
                            status : 'error',
                            message : 'Une erreur s\'est produite. Merci de réessayer'
                        });*/
                });

        }
        else {
            console.log("ADMIN : NO");
            res.redirect("/")
        }
    } else res.redirect("/")

})
app.get('/admin/update/:id', (req, res) => {
    if (req.session.user) {
        if (req.session.user.userAdmin) {
            axios.get(`http://localhost:8080/api/v1/members/${req.params.id}`, {
                userID: req.session.user.userID,
                userAdmin: req.session.user.userAdmin
            })
                .then((responce) => {
                    console.log(responce.data.status)
                    res.render(`${__dirname}/pages/adminupdate.ejs`, {
                        member: responce.data.result,
                        userConnected: 'admin'
                    })
                })
                .catch((error) => {
                    console.log(error)
                    res.render(`${__dirname}/pages/error.ejs`, {
                        error: error,
                        userConnected: 'admin'
                    })
                });
            //res.status(200).sendFile(path.join(__dirname, './pages/adminupdate.ejs'));
        }
        else {
            res.redirect("/")
        }
    } else res.redirect("/")

})



app.post('/login', (req, res) => {


    axios.get(`http://localhost:8080/api/v1/members/${req.body.pseudo}/${req.body.pass}`)
        .then(result => {
            responce = result.data
            if (responce.status === "success") {
                req.session.user = {
                    userID: responce.result.userID,
                    userAdmin: responce.result.userAdmin
                }
                res.redirect('/account')
            } else {
                res.redirect('/login')
            }
        })
        .catch(err => {
            console.log(err)//--------------------------ERREUR-A-GERER
        })
});
app.post('/members/add', (req, res) => {
    function redirect(url) {
        res.redirect(url)
    }
    axios.post('http://localhost:8080/api/v1/members', {
        pseudo: req.body.pseudo,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    })
        .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
            if (res.data.status === 'error') {
                redirect('/error?error=' + res.data.message);
            } else if (res.data.status === 'success') redirect('/login');
        })
        .catch((error) => {
            console.error(error)
        })
});
app.post('/:id/update', (req, res) => {
    function redirect(url) {
        res.redirect(url)
    }
    axios.put(`http://localhost:8080/api/v1/members/${req.params.id}`, {
        pseudo: req.body.pseudo,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    })
        .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
            if (res.data.status === 'error') {
                redirect('/error?error=' + res.data.message);
            } else if (res.data.status === 'success') redirect('/account');
        })
        .catch((error) => {
            console.error(error)
        })
});
app.post('/:id/delete', (req, res) => {
    function redirect(url) {
        res.redirect(url)
    }
    axios.delete(`http://localhost:8080/api/v1/members/${req.params.id}`)
        .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
            if (res.data.status === 'error') {
                redirect('/error?error=' + res.data.message);
            } else if (res.data.status === 'success') redirect('/destroyusersession');
        })
        .catch((error) => {
            console.error(error)
        })
});


app.post('/admin/update/:id', (req, res) => {
    function redirect(url) {
        res.redirect(url)
    }
    axios.put(`http://localhost:8080/api/v1/members/${req.params.id}`, {
        pseudo: req.body.pseudo,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    })
        .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
            if (res.data.status === 'error') {
                redirect('/error?error=' + res.data.message);
            } else if (res.data.status === 'success') redirect('/admin');
        })
        .catch((error) => {
            console.error(error)
        })
});
app.post('/admin/delete/:id', (req, res) => {
    function redirect(url) {
        res.redirect(url)
    }
    axios.delete(`http://localhost:8080/api/v1/members/${req.params.id}`)
        .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
            if (res.data.status === 'error') {
                redirect('/error?error=' + res.data.message);
            } else if (res.data.status === 'success') redirect('/admin');
        })
        .catch((error) => {
            console.error(error)
        })
});


app.listen(config.port, () => console.log('Started on port ' + config.port));


