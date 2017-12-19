var mysql      = require('mysql');
var express   = require('express');
var dbconfig   = require('../../config/database');

var connection = mysql.createConnection(dbconfig.connection);

var app       = express();
var router    = express.Router();

connection.query(`USE ${dbconfig.database}`);
console.log('conn-entites', dbconfig.database);

router.get('/posts', function(req, res) {
    connection.query('SELECT id, title, subtitle, dateCreate, text from posts', function(err, rows){
        if (err) {
            res.status(500).json(err);
        } else if (rows.length) {
            res.status(200).json(rows);
        }
    })
});

router.post('/post', function(req, res) {
    const postInsert = req.body;
    const query = `INSERT INTO posts (title, subtitle, text, dateCreate, dateUpdate, userId) values ('${postInsert.title}', '${postInsert.subtitle}', '${postInsert.text}', ${postInsert.dateCreate}, ${postInsert.dateUpdate}, ${postInsert.userId})`;
    connection.query(query, (err, rows) => {
        if (err) {
            console.log('err', err);
            res.status(500).json(err);
        } else {
            let tagsQuery = 'INSERT IGNORE INTO tags (name) VALUES';
            postInsert.tags.forEach(element => {
                tagsQuery += ` ('${element}'),`;
            });
            tagsQuery = tagsQuery.substr(0, tagsQuery.length - 1);
            connection.query(tagsQuery, (err, rows) => {
                if(err) {
                    console.log('err tags', err);
                    res.status(500).json(err);
                } else {
                    console.log('success', rows);
                }
            })
        }
    })
})

module.exports = router;