var express   = require('express');
var app       = express();
var router    = express.Router();

var mysql      = require('mysql');
var dbconfig   = require('../../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
console.log('conn-entites', dbconfig.database);

router.get('/posts', function(req, res) {
    console.log("function-posts");
    connection.query("SELECT id, title, subtitle, dateCreate from posts", function(err, rows){
        console.log("I know query-users, I sent request to DB");
        if(err){
            return;
        }
        if(rows.length){
            console.log("rows", rows);
            res.status(200).json(rows);
        }
    })
});

module.exports = router;