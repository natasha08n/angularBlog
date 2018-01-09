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
    let answer = {
        success: true,
        message: 'Successfully logged in'
    };
    res.send(answer);
})

router.post('/signup', (req, res) => {
    var data = req.body;
    Object.keys(data).forEach(key => {
        const property = data[key];
        switch(key) {
            case 'name':
                validate(property, 3, 80, 'Name is not valid. It should be between 3 and 80 characters long.', res);
                break;
            case 'surname':
                validate(property, 3, 80, 'Surname is not valid. It should be between 3 and 80 characters long.', res);
                break;
            case 'password':
                validate(property, 6, 80, 'Password is not valid. It should be between 6 and 80 charachters long.', res);
                break;
            case 'email':
                validate(property, 3, 80, 'Email is required', res);
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(property.toLowerCase())) {
                    return getAnswer(false, 400, 'Email is not valid');
                }
                break;
            default:
                return getAnswer(true, 200, 'ok');
                break;
        }
    });
    let querySignUp = `SELECT users.id, users.name, users.email, users.surname, users.passwordHash FROM users WHERE users.email = '${data.email}'`;
    connection.query(querySignUp, function(err, rows){
        if (err) {
            res.send(err);
            return;
        }
        if (rows.length) {
            let answer = getAnswer(false, 400, 'Such user already exists');
            res.send(answer);
            return;
        } else {
            let newUser = {
                email: data.email,
                name: data.name,
                surname: data.surname,
                passwordHash: bcrypt.hashSync(data.password)
            };
            let queryInsertNewUser = `INSERT INTO users (email, name, surname, passwordHash) values ('${newUser.email}', '${newUser.name}', '${newUser.surname}', '${newUser.passwordHash}')`;
            connection.query(queryInsertNewUser, function(err, rows){
                if (err) {
                    res.send(err);
                    return;
                }
                let token = jwt.sign(newUser, config.secret, {
                    expiresIn: 60
                });
                let answer = {
                    user: newUser,
                    success: true,
                    message: 'New user has been successfully created',
                    token: token
                };
                console.log('answer', answer);
                res.send(answer);
                return;
            }) 
        }
    })
})

router.post('/signin', (req, res) => {
    var data = req.body;
    if (!data) {
        let answer = getAnswer(false, 400,  'Please, enter information');
        res.send(answer);
    }
    let querySignIn = `SELECT users.id, users.email, users.name, users.surname, users.passwordHash FROM users WHERE users.email = '${data.email}'`;
    console.log('query', querySignIn);
    connection.query(querySignIn, function (err, rows) {
        if (err) {
            let answer = getAnswer(false, 400,  "Such user doesn't exit. Please, sign up first.");
            res.send(answer);
            return;
        }
        if (!rows.length) {
            let answer = getAnswer(false, 400,  "Such user doesn't exit. Please, sign up first.");
            res.send(answer);
            return;
        }
        if (!bcrypt.compareSync(data.password, rows[0].passwordHash)) {
            let answer = getAnswer(false, 400,  'Incorrect password');
            res.send(answer);
        }
        let registeredUser = rows[0];
        let token = jwt.sign(registeredUser, config.secret, {
            expiresIn: 60 * 60 * 24
        });
        let answer = {
            user: registeredUser,
            success: true,
            message: 'User has already logged in',
            token: token
        };
        res.send(answer);
    })
})

function getAnswer(status, statusCode, message) {
    if (!message.length) {
        return {status, code, message : 'unknown reasons'};
    }
    return { status, code, message };
}

function validate(data, minValue, maxValue, message, response) {
    if (data < minValue || data > maxValue) {
        response.send(getAnswer(false, 400, message));
        return;
    }
}

module.exports = router;