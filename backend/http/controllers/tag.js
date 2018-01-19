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
            const answer = baseFunctions.getAnswer(false, 500, error);
            res.send(answer);
            return;
        })
})

module.exports = router;