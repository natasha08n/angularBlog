module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comment', {
        text: {
            type: Sequelize.TEXT,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Text is required.'
                },
                max: {
                    args: 450,
                    msg: 'Comment test shoul be less than 450 characters. Please, shorten your answer.'
                }
            }
        }
    }, {
        paranoid: true,
        deletedAt: 'isDeleted',
        createdAt: 'dateCreate',
        updatedAt: 'dateUpdate'
    });

    Comment.associate = function (models) {
        Comment.belongsTo(models.post, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        }),

        Comment.belongsTo(models.user, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        }),

        Comment.belongsTo(Comment, { as: 'previous' });
    };

    return Comment;
}