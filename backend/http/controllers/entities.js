var mysql      = require('mysql');
var express   = require('express');
var dbconfig   = require('../../config/database');

var connection = mysql.createConnection(dbconfig.connection);

var app       = express();
var router    = express.Router();

connection.query(`USE ${dbconfig.database}`);
console.log('conn-entites', dbconfig.database);

router.get('/posts', function(req, res) {
    connection.query('SELECT id, title, subtitle, dateCreate from posts', function(err, rows){
        if (err) {
            res.status(500).json(err);
        } else if (rows.length) {
            res.status(200).json(rows);
        }
    })
});

router.post('/post', function(req, res) {
    const postInsert = req.body;
    const query = `INSERT INTO posts (title, subtitle, text) values ('${postInsert.title}', '${postInsert.subtitle}', '${postInsert.text}')`;
    console.log("query", query);
    connection.query(query, function(err, rows){
        if (err) {
            return;
        }
        console.log("rows", rows);
    })
})

module.exports = router;