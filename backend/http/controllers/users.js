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
    let content = {
        success: true,
        message: 'Successfully logged in'
    };
    res.send(content);
})

router.post('/register', (req, res) => {
    console.log("reqUser-----------------------------------------");

    
})

router.post('/login', (req, res) => {
    console.log('-------------------------function-login');
})

function getReplyObject(status, message) {
    if (message.length === 0){
        return {status, message : "unknown reasons"};
    }
    return { status, message };
} 

module.exports = router;