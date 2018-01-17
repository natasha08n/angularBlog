'user strict';

module.exports = (sequelize, Sequelize) => {

    const Post = sequelize.define('post', {
        title: {
            type: Sequelize.CHAR(50),
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 50],
                    msg: 'Title is not valid. It should be less than 50 characters long.'
                }
            }
        },
        subtitle: {
            type: Sequelize.CHAR(70),
            allowNull: false,
            validate: {
                max: {
                    args: 70,
                    msg: 'Subtitle is not valid. It should be less than 70 characters long.'
                }
            }
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        excerpt: {
            type: Sequelize.CHAR(255),
            allowNull: false,
            validate: {
                max: {
                    args: 80,
                    msg: 'Excerpt is not valid. It should be less than 80 characters long.'
                }
            }
        }
    }, {
        /*paranoid: true,
        deletedAt: 'isDeleted',*/
        createdAt: 'dateCreate',
        updatedAt: 'dateUpdate'
    });

    Post.associate = function (models) {
        Post.belongsTo(models.user, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });

        Post.hasMany(models.comment);

        Post.hasMany(models.tagsinpost);
    };

    return Post;
}
