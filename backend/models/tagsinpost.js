module.exports = (sequelize, Sequelize) => {
    const TagsInPost = sequelize.define('tagsinpost', {
        tagId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    TagsInPost.associate = function (models) {
        TagsInPost.belongsTo(models.post);
        TagsInPost.belongsTo(models.tag);
    }

    return TagsInPost;
}