const models = require('../../models');

module.exports = {

    getAnswer: function getAnswer(status, statusCode, message) {
        console.log('in base');
        if (!message.length) {
            return {status, statusCode, message : 'unknown reasons'};
        }
        return { status, statusCode, message };
    },

    addTags: function addTags(tags, callback) {
        console.log('in base');
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
    },

    addPostTags: function addPostTags(tags, postId) {
        console.log('in base');
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
    },

    deleteOldTags: function deleteOldTags(postId, callback) {
        console.log('in base');
        models.tagsinpost.destroy({ where: { postId: postId } })
            .then((info) => {
                callback();
                return info;
            })
            .carch((error) => {
                return error;
            })
    }
}
