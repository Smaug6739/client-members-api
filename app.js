const express = require('express');
const session = require('express-session');
const path = require("path")//NODE
const app = express();
const  morgan = require('morgan')('dev');
const config = require('./config.js');
const {statusUser} = require('./functions')
const routerMembers = require('./routes/members')
const routerAdmin = require('./routes/admin')
var MySQLStore = require('express-mysql-session')(session);


app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: "A5H2G2V",
    name: 'member-space',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore(config.db),
    expires: new Date(Date.now() + (6 * 60 * 1000)),
    cookie: {}
}));
    app.use(morgan)
    app.use(express.json());
    app.use(express.urlencoded({ extended : true}))
    app.listen(config.port, () => console.log('Started on port '+ config.port));
    app.use('/member',routerMembers)
    app.use('/admin',routerAdmin)
    app.use('/static', express.static(path.join(__dirname, 'public')));
    app.get('/', (req, res) => {
        res.render(`${__dirname}/pages/index.ejs`,{
            userConnected : statusUser(req.session)
        })
    });
    app.get('/uploads/:dir/:image', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, `uploads/${req.params.dir}/${req.params.image}`));
    });
    app.get('/error', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, 'pages/error.ejs'));
    });

    app.get('/test', (req, res) => {
    res.render(path.join(__dirname, 'pages/test.ejs'), {userConnected : statusUser(req.session)});
    });



    /*app.get('/admin',(req,res) => {
        if(req.session.user){
            if(req.session.user.userAdmin){
                const userConnected = statusUser(req)
                axios.get(`http://localhost:8080/api/v1/members/`, {
                    userID: req.session.user.userID,
                    userAdmin: req.session.user.userAdmin
                })
                .then((responce) => {
                    res.render(`${__dirname}/pages/admin.ejs`,{
                        members : responce.data.result,
                        userConnected : userConnected
                    })
                })
                .catch((error) => {
                    res.render(`${__dirname}/pages/error.ejs`, {
                        error : error,
                        userConnected : userConnected
                    })
                });
            } else res.redirect("/")
        } else res.redirect("/")
        
    })*/
    /*app.get('/admin/update/:id',(req,res) => {
        if(req.session.user){
            if(req.session.user.userAdmin){
                axios.get(`http://localhost:8080/api/v1/members/${req.params.id}`, {
                    userID: req.session.user.userID,
                    userAdmin: req.session.user.userAdmin
                })
                .then((responce) => {
                    res.render(`${__dirname}/pages/adminupdate.ejs`,{
                        member : responce.data.result,
                        userConnected : 'admin'
                    })
                })
                .catch((error) => {
                    res.render(`${__dirname}/pages/error.ejs`,{
                        error : error,
                        userConnected : 'admin'
                    })
                });
            } else res.redirect("/")
        } else res.redirect("/")
        
    })*/



   /* app.post('/login', (req, res) => {
            axios.get(`http://localhost:8080/api/v1/members/${req.body.pseudo}/${req.body.pass}`)
            .then(result =>{
                responce = result.data 
                if(responce.status === "success"){
                    req.session.user = {
                        userID: responce.result.userID,
                        userAdmin : responce.result.userAdmin
                    }
                      res.redirect('/account')
                }else res.redirect('/login')
            })
            .catch(error =>{
                res.render(`${__dirname}/pages/error.ejs`,{
                    error : error,
                    userConnected : false
                })
            })
    });*/
    /*app.post('/members/add', (req, res) => {
        function redirect(url){
            res.redirect(url)
        }
        axios.post('http://localhost:8080/api/v1/members', {
            pseudo : req.body.pseudo,
            password :req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        })
        .then((res) => {
            if(res.data.status === 'error'){
                redirect('/error?error=' + res.data.message);
            }else if(res.data.status === 'success') redirect('/login');
        })
        .catch((error) => {
            res.render(`${__dirname}/pages/error.ejs`,{
                error : error,
                userConnected : false
            })
        })
    });*/
    /*app.post('/:id/update', (req, res) => {
        const userConnected = statusUser(req);
        axios.put(`http://localhost:8080/api/v1/members/${req.params.id}`, {
            pseudo : req.body.pseudo,
            password :req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        })
        .then((responce) => {
            if(responce.data.status === 'error'){
                res.render(`${__dirname}/pages/error.ejs`,{
                    error : responce.data.message,
                    userConnected : userConnected
                })
            }else if(responce.data.status === 'success') res.redirect('/account');
        })
        .catch((error) => {
            res.render(`${__dirname}/pages/error.ejs`,{
                error : error,
                userConnected : userConnected
            })
        })
    });*/
    /*app.post('/:id/delete', (req, res) => {
        const userConnected = statusUser(req)
        axios.delete(`http://localhost:8080/api/v1/members/${req.params.id}`)
        .then((res) => {

            if(res.data.status === 'error'){
                res.render(`${__dirname}/pages/error.ejs`,{
                    error : res.data.message,
                    userConnected : userConnected
                })
            }else if(res.data.status === 'success') res.redirect('/destroyusersession');
        })
        .catch((error) => {
            console.error(error)
        })
    });*/


    /*app.post('/admin/updatemember/:id', (req, res) => {
        const userConnected = statusUser(req)
        axios.put(`http://localhost:8080/api/v1/members/${req.params.id}`, {
            pseudo : req.body.pseudo,
            password :req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        })
        .then((responce) => {
            if(responce.data.status === 'error'){
                res.render(`${__dirname}/pages/error.ejs`,{
                    error : responce.data.message,
                    userConnected : userConnected
                })
            }else if(responce.data.status === 'success') res.redirect('/admin');
        })
        .catch((error) => {
            res.render(`${__dirname}/pages/error.ejs`,{
                error : error,
                userConnected : userConnected
            })
        })
    });*/
    /*app.post('/admin/deletemember/:id', (req, res) => {
        const userConnected = statusUser(req)
        axios.delete(`http://localhost:8080/api/v1/members/${req.params.id}`)
        .then((responce) => {
            if(responce.data.status === 'error'){
                res.render(`${__dirname}/pages/error.ejs`,{
                    error : responce.data.message,
                    userConnected : userConnected
                })
            }else if(responce.data.status === 'success') redirect('/admin');
        })
        .catch((error) => {
            res.render(`${__dirname}/pages/error.ejs`,{
                error : error,
                userConnected : userConnected
            })
        })
    });*/
    
        
    

