const express = require('express');
const app     = express();
const router  = express.Router();

const config        = require('../middleware/token');
const models        = require('../../models');
const baseFunctions = require('./base');

const dbconfig   = require('../../config/database');
const Sequelize  = require('sequelize');
const sequelize  = new Sequelize(dbconfig.database, dbconfig.connection.user, dbconfig.connection.password, {
    dialect: 'mysql'
});

router.get('', (req, res) => {
    models.post.findAndCountAll({
        attributes: Object.keys(models.post.attributes).concat([
            [sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments.postId = post.id)'), 'comments']
        ]),
        order: [ ['dateCreate', 'DESC'] ],
        limit: Number(req.query.limit) || 5000,
        offset: Number(req.query.offset) || 0
    })
        .then((posts) => {
            res.send(posts);
            return;
        })
        .catch((error) => {
            const answer = baseFunctions.getAnswer(false, 500, error);
            res.send(answer);
            return;
        });
});

router.post('', (req, res) => {
    const post = req.body;

    models.post.create(post)
        .then((insertedPost) => {
            baseFunctions.addTags(post.tags, (addedTags) => {
                baseFunctions.addPostTags(addedTags, insertedPost.dataValues.id);
            });
            res.send((insertedPost.dataValues.id).toString());
            return;
        })
        .catch((error) => {
            const answer = baseFunctions.getAnswer(false, 500, error);
            res.send(answer);
            return;
        });
});

router.get('/:id', (req, res) => {
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
                author: foundedPost.dataValues.user.name + ' ' + foundedPost.dataValues.user.surname,
                userId: foundedPost.dataValues.userId
            }

            res.status(200).send(answer);
            return;
        })
        .catch((error) => {
            const answer = baseFunctions.getAnswer(false, 500, error);
            res.send(answer);
            return;
        })
});

router.get('/:id/comments', (req, res) => {
    const postId = req.params.id;

    console.log('backend comments', postId);

    models.comment.findAll({
        where: { 'postId': postId },
        include: [
            { model: models.user,
                attributes: { exclude: ['email', 'password', 'roleId', 'avatarUrl']}
            }
        ]
    })
        .then((foundComments) => {
            let modifiedComments = [];
            foundComments.map((comment) => {
                modifiedComments.push({
                    id: comment.dataValues.id,
                    text: comment.dataValues.text,
                    dateUpdate: comment.dataValues.dateUpdate,
                    postId: comment.dataValues.postId,
                    userId: comment.dataValues.userId,
                    previousId: comment.dataValues.previousId,
                    author: comment.dataValues.user.dataValues.name + ' ' + comment.dataValues.user.dataValues.surname
                });
            });
            
            res.send(modifiedComments);
            return;
        })
        .catch((error) => {
            const answer = baseFunctions.getAnswer(false, 500, error);
            res.send(answer);
            return;
        })
})

router.put('/:id', (req, res) => {
    const post = req.body;
    const postId = req.params.id;

    models.post.update(post, { where: { id: postId } })
        .then((updatedPost) => {
            baseFunctions.deleteOldTags(postId, () => {
                baseFunctions.addTags(post.tags, (addedTags) => {
                    baseFunctions.addPostTags(addedTags, postId);
                });
            });
            
            const answer = baseFunctions.getAnswer(true, 200, 'Post has been updated successfully');
            res.send(answer);
            return;
        })
        .catch((error) => {
            const answer = baseFunctions.getAnswer(false, 500, error);
            res.send(answer);
            return;
        })
});

router.delete('/:id', (req, res) => {
    const postId = req.params.id;

    models.post.destroy({ where: { id: postId } })
        .then(() => {
            let answer = baseFunctions.getAnswer(true, 200, 'Post has been deleted succesfully');
            res.send(answer);
            return;
        })
        .catch((error) => {
            let answer = baseFunctions.getAnswer(false, 500, 'Some error in the sql-query');
            res.send(answer);
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
            let modifiedPosts = {
                count: 0,
                rows: []
            };
            posts.map((post) => {
                if(post.dataValues.tagsinposts.length) {
                    modifiedPosts.rows.push(post);
                }
            });
            modifiedPosts.count = modifiedPosts.rows.length;
            res.send(modifiedPosts);
            return;
        })
        .catch((error) => {
            console.log(error);
            const answer = baseFunctions.getAnswer(false, 500, error);
            res.send(answer);
            return;
        });
})

module.exports = router;