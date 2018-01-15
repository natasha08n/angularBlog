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
                },
                notNull: {
                    args: true,
                    msg: 'Title is required.'
                }
            }
        },
        subtitle: {
            type: Sequelize.CHAR(70),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 70],
                    msg: 'Subtitle is not valid. It should be less than 70 characters long.'
                },
                notNull: {
                    args: true,
                    msg: 'Subtitle is required.'
                }
            }
        },
        text: {
            type: Sequelize.TEXT,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Text is required.'
                }
            }
        },
        excerpt: {
            type: Sequelize.CHAR(255),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 80],
                    msg: 'Excerpt is not valid. It should be less than 80 characters long.'
                },
                notNull: {
                    args: true,
                    msg: 'Excerpt is required.'
                }
            }
        }
    }, {
        createdAt: 'dateCreate',
        updatedAt: 'dateUpdate',
        deletedAt: 'isDeleted'
    });

    return Post;
}
