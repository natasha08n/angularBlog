const express = require('express');
const app     = express();
const router  = express.Router();
const models  = require('../../models');

const dbconfig   = require('../../config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbconfig.database, dbconfig.connection.user, dbconfig.connection.password, {
    dialect: 'mysql'
});

router.get('/posts', (req, res) => {
    models.post.findAll({
        attributes: Object.keys(models.post.attributes).concat([
            [sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments.postId = post.id)'), 'count']
        ]),
        order: [ ['dateCreate', 'DESC'] ],
        limit: Number(req.query.limit) || 5000,
        offset: Number(req.query.offset) || 0
    })
        .then((posts) => {
            posts.forEach((post, index) => {
                posts[index] = post.dataValues;
            });
            res.send(posts);
            return;
        })
        .catch((error) => {
            const answer = getAnswer(false, 500, error);
            res.send(answer);
            return;
        });
});

router.post('/post', (req, res) => {
    const post = req.body;

    models.post.create(post)
        .then((insertedPost) => {
            addTags(post.tags, (addedTags) => {
                addPostTags(addedTags, insertedPost.dataValues.id);
            });
            res.send((insertedPost.dataValues.id).toString());
            return;
        })
        .catch((error) => {
            const answer = getAnswer(false, 500, error);
            res.send(answer);
            return;
        });
});

router.get('/post/:id', (req, res) => {
    models.post.findById(req.params.id, {
        include: [
           { model: models.user, attributes: ['name', 'surname'] },
           { model: models.tagsinpost, include: [
               { model: models.tag, attributes: ['name'] }
           ]}
        ]
      })
        .then((foundedPost) => {
            let tags = [];
            foundedPost.dataValues.tagsinposts.map((tagInPost) => {
                tags.push(tagInPost.tag.name)
            });

            let answer = {
                id: foundedPost.dataValues.id,
                title: foundedPost.dataValues.title,
                subtitle: foundedPost.dataValues.subtitle,
                dateCreate: foundedPost.dataValues.dateCreate,
                text: foundedPost.dataValues.text,
                tags: tags,
                authorName: foundedPost.dataValues.user.name,
                authorSurname: foundedPost.dataValues.user.surname,
                userId: foundedPost.dataValues.userId
            }

            res.status(200).send(answer);
            return;
        })
        .catch((error) => {
            res.send(error);
            return;
        })
});

router.put('/post/:id', (req, res) => {
    const post = req.body;
    const postId = req.params.id;

    models.post.update(post, { where: { id: postId } })
        .then((updatedPost) => {
            deleteOldTags(postId, () => {
                addTags(post.tags, (addedTags) => {
                    addPostTags(addedTags, postId);
                });
            });
            
            const answer = getAnswer(true, 200, 'Post has been updated successfully');
            res.send(answer);
            return;
        })
        .catch((error) => {
            const answer = getAnswer(false, 500, error);
            res.send(answer);
            return;
        })
});

router.delete('/post/:id', (req, res) => {
    const postId = req.params.id;

    models.post.destroy({ where: { id: postId } })
        .then(() => {
            let answer = getAnswer(true, 200, 'Post has been deleted succesfully');
            res.send(answer);
            return;
        })
        .catch((error) => {
            let answer = getAnswer(false, 500, 'Some error in the sql-query');
            res.send(answer);
            return;
        })
})

router.get('/tags', (req, res) => {
    models.tagsinpost.findAll({
        attributes: [ [sequelize.fn('COUNT', sequelize.col('tagId')), 'count'] ],
        group: 'tagsinpost.tagId',
        order: [[sequelize.col('count'), 'DESC']],
        limit: 10,
        include: [ { model: models.tag, attributes: [ 'name' ] } ]
    })
        .then((tags) => {
            const tagsRes = [];
            tags.map((tag) => {
                tagsRes.push({
                    count: tag.dataValues.count,
                    name: tag.dataValues.tag.name
                });
            });
            res.send(tagsRes);
            return;
        })
        .catch((error) => {
            res.send(error);
            return;
        })
})

router.get('/tag/:tag', (req, res) => {
    const tag = req.params.tag;

    models.post.findAll({
        attributes: Object.keys(models.post.attributes).concat([
            [sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments.postId = post.id)'), 'comments']
        ]),
        include: [
            { model: models.tagsinpost,
                attributes: { exclude: ['id', 'postId'] },
                include: [ { model: models.tag, where: { 'name' : tag }, attributes: ['name'] }]
            }
        ],
        limit: Number(req.query.limit) || 5000,
        offset: Number(req.query.offset) || 0
    })
        .then((posts) => {
            let modifiedPosts = [];
            posts.map((post) => {
                if(post.dataValues.tagsinposts.length) {
                    modifiedPosts.push(post);
                }
            });
            res.send(modifiedPosts);
            return;
        })
        .catch((error) => {
            console.log(error);
            const answer = getAnswer(false, 500, error);
            res.send(answer);
            return;
        });
})

router.post('/comment', (req, res) => {
    const comment = req.body;

    models.comment.create(comment)
        .then((insertedComment) => {
            res.send(insertedComment.dataValues);
            return;
        })
        .catch((error) => {
            console.log(error);
            let answer = getAnswer(false, 500, error);
            res.send(answer);
            return;
        });
})

router.get('/:id/comments', (req, res) => {
    const postId = req.params.id;

    models.comment.findOne({
        where: { 'postId': postId },
        include: [
            { model: models.user,
                attributes: { exclude: ['email', 'password', 'roleId', 'avatarUrl']}
            }
        ]
    })
        .then((foundComments) => {
            const modifiedComment = {
                id: foundComments.dataValues.id,
                text: foundComments.dataValues.text,
                dateUpdate: foundComments.dataValues.dateUpdate,
                postId: foundComments.dataValues.postId,
                userId: foundComments.dataValues.userId,
                previousId: foundComments.dataValues.previousId,
                author: foundComments.dataValues.user.name + ' ' + foundComments.dataValues.user.surname
            }
            res.send(modifiedComment);
            return;
        })
        .catch((error) => {
            res.send(error);
            return;
        })
})

router.delete('/comment/:id', (req, res) => {
    const commentId = req.params.id;

    models.comment.destroy({ where: { id: commentId } })
        .then((message) => {
            let answer = {};
            if (message) {
               answer = getAnswer(true, 200, 'Comment has been successfully deleted');
            }
            answer = getAnswer(false, 400, `The comment with id = ${commentId} doesn't exist.`);             
            res.send(answer);
            return;
        })
        .catch((error) => {
            let answer = getAnswer(true, 500, error);
            res.send(answer);
            return;
        })
})

function addTags(tags, callback) {
    var result = [];     

    var promises = tags.map((one) => {
      return models.tag.create({ name: one })
        .then(function(tag) {
          result.push({
            id: tag.dataValues.id,
            name: tag.dataValues.name
          });
        })
        .catch(function(err) {
            return models.tag.findOne({ where: {name: one}})
            .then((foundTag) => {
                result.push({
                    id: foundTag.dataValues.id,
                    name: foundTag.dataValues.name
                });
            })
        });
    });
  
    return Promise.all(promises)
        .then(() => {
            callback(result);
            return Promise.resolve(result);
        });
}

function addPostTags(tags, postId) {
    let toInsertTags = [];
    tags.map((tag) => {
        toInsertTags.push({
            tagId: tag.id,
            postId: postId
        });
    })
    models.tagsinpost.bulkCreate(toInsertTags)
        .then((connectedTags) => {
            return connectedTags;
        })
        .catch((error) => {
            return error;
        });
}

function deleteOldTags(postId, callback) {
    models.tagsinpost.destroy({ where: { postId: postId } })
        .then((info) => {
            callback();
            return info;
        })
        .carch((error) => {
            return error;
        })
}

function getAnswer(status, statusCode, message) {
    if (!message.length) {
        return {status, statusCode, message : 'unknown reasons'};
    }
    return { status, statusCode, message };
}

module.exports = router;