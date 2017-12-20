var mysql      = require('mysql');
var express   = require('express');
var dbconfig   = require('../../config/database');

var connection = mysql.createConnection(dbconfig.connection);

var app       = express();
var router    = express.Router();

connection.query(`USE ${dbconfig.database}`);
console.log('conn-entites', dbconfig.database);

router.get('/posts', function(req, res) {
    connection.query('SELECT id, title, subtitle, dateCreate, text, excerpt from posts', (err, rows) => {
        if (err) {
            res.status(500).json(err);
        } else if (rows.length) {
            res.status(200).json(rows);
        }
    })
});

router.post('/post', function(req, res) {
    const postInsert = req.body;
    const query = `INSERT INTO posts (title, subtitle, text, dateCreate, dateUpdate, userId, excerpt) values ("${postInsert.title}", "${postInsert.subtitle}", "${postInsert.text}", ${postInsert.dateCreate}, ${postInsert.dateUpdate}, ${postInsert.userId}, '${postInsert.excerpt}')`;
    connection.query(query, (err, rows) => {
        if (err) {
            console.log('err', err);
            res.status(500).json(err);
        } else {
            let postId = rows.insertId;
            console.log('postId', postId);
            let tagsIds = [];
            // myfunc(postInsert.tags, tagsIds, callb);
            let tags = postInsert.tags;
            tags.forEach(element => {
                let tag = element;
                let tagQuery = `INSERT INTO tags (name) VALUE ('${tag}')`;
                connection.query(tagQuery, (err, rows) => {
                    if(err) {
                        connection.query(`SELECT id from tags WHERE name = '${tag}'`, (err, rows) => {
                            if(err) {
                                console.log('err', err);
                                res.status(500).json(err);
                            }
                            tagsIds.push(rows[0].id);
                            if (tagsIds.length === tags.length) {
                                addTags(tagsIds, postId);
                            }
                        });
                    } else {
                        tagsIds.push(rows.insertId);
                        if (tagsIds.length === tags.length) {
                            addTags(tagsIds, postId);
                        }
                    }
                });
            });
        }

        
        //}
        // if(tagsIds.length == postInsert.tags.length) {
        //     console.log("tagsArray5", tagsIds);
        // }
        // let tags = postInsert.tags;
        // for(i = 0; i < tags.length; i++) {
        //     let tagQuery = `INSERT INTO tags (name) VALUE ('${tags[i]}')`;
        //     connection.query(tagQuery, (err, rows) => {
        //         if(err) {
        //             connection.query(`SELECT id from tags WHERE name = '${tags[i]}'`, (err, rows) => {
        //                 if(err) {
        //                     console.log('err', err);
        //                     res.status(500).json(err);
        //                 }
        //                 console.log('select', rows);
        //                 tagsIds.push(rows[0].id);
        //                 console.log("tagsArray2", tagsIds);
        //             });
        //         } else {
        //             console.log('insert', rows.insertId);
        //             tagsIds.push(rows.insertId);
        //             console.log("tagsArray3", tagsIds);
        //         }
        //         console.log("tagsArray4", tagsIds);
        //     });
        // }

        // for (let i = 0; i < postInsert.tags.length; i++) {
        //     let tag = postInsert.tags[i];
        //     //(function(tag) {
        //         let tagQuery = `INSERT INTO tags (name) VALUE ('${tag}')`;
        //         connection.query(tagQuery, (err, rows) => {
        //             if(err) {
        //                 connection.query(`SELECT id from tags WHERE name = '${tag}'`, (err, rows) => {
        //                     if(err) {
        //                         console.log('err', err);
        //                         res.status(500).json(err);
        //                     }
        //                     console.log('select', rows);
        //                     tagsIds.push(rows[0].id);
        //                     console.log("tagsArray2", tagsIds);
        //                 });
        //             } else {
        //                 console.log('insert', rows.insertId);
        //                 tagsIds.push(rows.insertId);
        //                 console.log("tagsArray3", tagsIds);
        //             }
        //         });
        //     }//)(postInsert.tags[i]);
        // //}
    });    
});

function myfunc(tags, tagsIds, callb) {
    tags.forEach(element => {
        let tag = tags[i];
        let tagQuery = `INSERT INTO tags (name) VALUE ('${tag}')`;
        connection.query(tagQuery, (err, rows) => {
            if(err) {
                connection.query(`SELECT id from tags WHERE name = '${tag}'`, (err, rows) => {
                    if(err) {
                        console.log('err', err);
                        res.status(500).json(err);
                    }
                    console.log('select', rows);
                    tagsIds.push(rows[0].id);
                    console.log('tagsArray2', tagsIds);
                });
            } else {
                console.log('insert', rows.insertId);
                tagsIds.push(rows.insertId);
                console.log('tagsArray3', tagsIds);
            }
        });
    });
    // for (let i = 0; i < tags.length; i++) {
    //     let tag = tags[i];
    //     let tagQuery = `INSERT INTO tags (name) VALUE ('${tag}')`;
    //     connection.query(tagQuery, (err, rows) => {
    //         if(err) {
    //             connection.query(`SELECT id from tags WHERE name = '${tag}'`, (err, rows) => {
    //                 if(err) {
    //                     console.log('err', err);
    //                     res.status(500).json(err);
    //                 }
    //                 console.log('select', rows);
    //                 tagsIds.push(rows[0].id);
    //                 console.log('tagsArray2', tagsIds);
    //             });
    //         } else {
    //             console.log('insert', rows.insertId);
    //             tagsIds.push(rows.insertId);
    //             console.log('tagsArray3', tagsIds);
    //         }
    //     });
    // }
    // callb(tagsIds);
}

function addTags(tagsIds, postId) {
    let insertTagsForPost = `INSERT INTO tagsinpost(tagId, postId) VALUES`;
    tagsIds.forEach(id => {
        insertTagsForPost += ` (${id}, ${postId}),`;
    });
    insertTagsForPost = insertTagsForPost.slice(0, insertTagsForPost.length - 1);
    console.log('QUERY', insertTagsForPost);
    connection.query(insertTagsForPost, (err, rows) => {
        if(err) {
            console.log('Something was going wrong');
            res.status(500).json(err);
        }
        console.log("INSERTED");
    });
}

module.exports = router;