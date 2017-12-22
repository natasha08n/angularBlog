var mysql      = require('mysql');
var express   = require('express');
var dbconfig   = require('../../config/database');

var connection = mysql.createConnection(dbconfig.connection);

var app       = express();
var router    = express.Router();

connection.query(`USE ${dbconfig.database}`);
console.log('conn-entites', dbconfig.database);

router.get('/posts', (req, res) => {
    connection.query('SELECT id, title, subtitle, dateCreate, text, excerpt FROM posts', (err, rows) => {
        if (err) {
            res.status(500).json(err);
        }
        res.status(200).json(rows);
    })
});

router.post('/post', (req, res) => {
    const postInsert = req.body;
    const query = `INSERT INTO posts (title, subtitle, text, dateCreate, dateUpdate, userId, excerpt)
    VALUES ("${postInsert.title}", "${postInsert.subtitle}", "${postInsert.text}", ${postInsert.dateCreate}, ${postInsert.dateUpdate}, ${postInsert.userId}, '${postInsert.excerpt}')`;
    connection.query(query, (err, rows) => {
        if (err) {
            res.status(500).json(err);
        }
        let postId = rows.insertId;
        let tagsIds = [];
        let tags = postInsert.tags;
        let isSuccess = false;
        tags.forEach(element => {
            let tag = element;
            let tagQuery = `INSERT INTO tags (name) VALUE ('${tag}')`;
            isSuccess = connection.query(tagQuery, (err, rows) => {
                if(err) {
                    connection.query(`SELECT id from tags WHERE name = '${tag}'`, (err, rows) => {
                        if(err) {
                            res.status(500).json(err);
                        }
                        tagsIds.push(rows[0].id);
                        if (tagsIds.length === tags.length) {
                            return addTags(tagsIds, postId);
                        }
                    });
                } else {
                    tagsIds.push(rows.insertId);
                    if (tagsIds.length === tags.length) {
                        return addTags(tagsIds, postId);
                    }
                }
            });
        });
        if(isSuccess) {
            return res.status(200).send((postId).toString());
        }
    });
});

router.get('/post/:id', (req, res) => {
    const postQuery = `SELECT posts.id, posts.title, posts.subtitle, posts.dateCreate, posts.text, users.name, users.surname
    FROM posts
    INNER JOIN users ON posts.userId = users.id WHERE posts.id = ${req.params.id}`;
    let tagsArray = [];
    connection.query(postQuery, (err, rows) => {
        if(err) {
            res.status(500).json(err);
        }
        if(rows.length) {
            const tagQuery = `SELECT tags.name
            FROM tags
            INNER JOIN tagsinpost ON tags.id = tagsinpost.tagId
            INNER JOIN posts ON posts.id = tagsinpost.postId
            WHERE posts.id = ${req.params.id}`;
            connection.query(tagQuery, (err, tagRows) => {
                if(err) {
                    res.status(500).json(err);
                }
                if(tagRows.length) {
                    tagRows.forEach(element => {
                        tagsArray.push(element.name);
                    });
                    let answer = {
                        id: rows[0].id,
                        title: rows[0].title,
                        subtitle: rows[0].subtitle,
                        dateCreate: rows[0].dateCreate,
                        text: rows[0].text,
                        tags: tagsArray,
                        authorName: rows[0].name,
                        authorSurname: rows[0].surname
                    }
                    res.status(200).send(answer);
                }
            })
            
        }
    });
});

router.put('/post/:id', (req, res) => {
    const post = req.body;
    const postQuery = `UPDATE posts
    SET title = ${post.title}, subtitle = ${post.subtitle}, text = ${post.text}, dateUpdate = ${post.dateUpdate}, excerpt = ${post.excerpt}
    WHERE id = ${post.id}`;
    connection.query(postQuery, (err, rows) => {
        if(err) {
            res.status.json(500);
        }
        else {
            console.log('PUT');
            console.log('ROWS', rows);
            res.status(200);
        }
    })
})

function addTags(tagsIds, postId) {
    let insertTagsForPost = `INSERT INTO tagsinpost(tagId, postId) VALUES`;
    tagsIds.forEach(id => {
        insertTagsForPost += ` (${id}, ${postId}),`;
    });
    insertTagsForPost = insertTagsForPost.slice(0, insertTagsForPost.length - 1);
    let isSuccess = connection.query(insertTagsForPost, (err, rows) => {
        if(err) {
            res.status(500).json(err);
        }
        return true;
    });
    return isSuccess;
}

module.exports = router;