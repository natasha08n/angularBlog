var express   = require('express');
var app       = express();
var router    = express.Router();
var jwt       = require('jsonwebtoken');
var config    = require('../middleware/token');
var auth      = require('../middleware/auth');
var bcrypt    = require('bcrypt-nodejs');

var mysql      = require('mysql');
var dbconfig   = require('../../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
console.log('conn', dbconfig.database);

router.get('/checkstate', auth, (req, res) => {
    console.log('callback');
    let answer = {
        success: true,
        message: 'Successfully logged in'
    };
    res.send(answer);
})

router.post('/signup', (req, res) => {
    console.log("signup-----------------------------------------");
    var data = req.body;
    if (Object.keys(data).length === 0) {
        let answer = getAnswer(false, "Please, enter information");
        res.send(answer);
        return;
    }
    else if (data.name.length < 3 || data.name.length > 80){
        let answer = getAnswer(false, "Name is not valid. It should be between 3 and 80 characters long.");
        res.send(answer);
        return;
    }
    else if (data.surname.length < 3 || data.surname.length > 80){
        let answer = getAnswer(false, "Surname is not valid. It should be between 3 and 80 characters long.");
        res.send(answer);
        return;
    }
    else if (data.password.length < 6 || data.password.length > 80){
        let answer = getAnswer(false, "Password is not valid. It should be between 6 and 80 charachters long.")
    }
    let querySignUp = `SELECT users.name, users.email, users.surname, users.passwordHash FROM users WHERE users.email = "${data.email}"`;
    connection.query(querySignUp, function(err, rows){
        if (err) {
            res.send(err);
            return;
        }
        if (rows.length) {
            let answer = getAnswer(false, "Such user already exists");
            res.send(answer);
            return;
        } else {
            let newUser = {
                email: data.email,
                name: data.name,
                surname: data.surname,
                passwordHash: bcrypt.hashSync(data.password)
            };
            let queryInsertNewUser = `INSERT INTO users (email, name, surname, passwordHash) values ("${newUser.email}", "${newUser.name}", "${newUser.surname}", "${newUser.passwordHash}")`;
            connection.query(queryInsertNewUser, function(err, rows){
                if (err) {
                    res.send(err);
                    return;
                }
                let token = jwt.sign(newUser, config.secret, {
                    expiresIn: 60 * 60 * 24
                });
                let answer = {
                    user: newUser,
                    success: true,
                    message: "New user has been successfully created",
                    token: token
                };
                console.log("answer", answer);
                res.send(answer);
                return;
            }) 
        }
    })
})

router.post('/signin', (req, res) => {
    console.log('-------------------------function-signin');
    var data = req.body;
    if (!data) {
        let answer = getAnswer(false, "Please, enter information");
        res.send(answer);
        return;
    }
    let querySignIn = `SELECT users.email, users.name, users.surname, users.passwordHash FROM users WHERE users.email = "${data.email}"`;
    console.log("query", querySignIn);
    connection.query(querySignIn, function (err, rows) {
        if (err) {
            res.send(err);
            return;
        }
        if (rows.length === 0) {
            let answer = getAnswer(false, "Such user doesn't exit. Please, sign up first.");
            res.send(answer);
            return;
        }
        if (!bcrypt.compareSync(data.password, rows[0].passwordHash)) {
            let answer = getAnswer(false, "Incorrect password");
            res.send(answer);
            return;
        }
        let registeredUser = rows[0];
        let token = jwt.sign(registeredUser, config.secret, {
            expiresIn: 60 * 60 * 24
        });
        let answer = {
            user: registeredUser,
            success: true,
            message: "User has already logged in",
            token: token
        };
        res.send(answer);
        return;
    })
})

function getAnswer(status, message) {
    if (message.length === 0){
        return {status, message : "unknown reasons"};
    }
    return { status, message };
} 

module.exports = router;