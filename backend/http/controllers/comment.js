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

router.post('', (req, res) => {
    const comment = req.body;

    models.comment.create(comment)
        .then((insertedComment) => {
            res.send(insertedComment.dataValues);
            return;
        })
        .catch((error) => {
            let answer = baseFunctions.getAnswer(false, 500, error);
            res.send(answer);
            return;
        });
})

router.delete('/:id', (req, res) => {
    const commentId = req.params.id;

    models.comment.destroy({ where: { id: commentId } })
        .then((message) => {
            let answer = {};
            if (message) {
               answer = baseFunctions.getAnswer(true, 200, 'Comment has been successfully deleted');
            }
            answer = baseFunctions.getAnswer(false, 400, `The comment with id = ${commentId} doesn't exist.`);             
            res.send(answer);
            return;
        })
        .catch((error) => {
            let answer = baseFunctions.getAnswer(true, 500, error);
            res.send(answer);
            return;
        })
})

module.exports = router;