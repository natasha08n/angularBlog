'use strict';

const bcrypt  = require('bcrypt-nodejs');

module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('user', {
        email: {
            type: Sequelize.CHAR(80),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        name: {
            type: Sequelize.CHAR(80),
            allowNull: false,
            validate: {
                len: {
                    args: [3, 80],
                    msg: 'Name is not valid. It should be between 3 and 80 characters long.'
                }
            }
        },
        surname: {
            type: Sequelize.CHAR(80),
            allowNull: false,
            validate: {
                len: {
                    args: [3, 80],
                    msg: 'Surname is not valid. It should be between 3 and 80 characters long.'
                }
            }
        },
        password: {
            type: Sequelize.CHAR(255),
            allowNull: false,
            validate: {
                len: {
                    args: [6, 80],
                    msg: 'Password is not valid. It should be between 6 and 80 characters long.'
                }
            }
        },
        roleId: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        avatarUrl: {
            type: Sequelize.STRING,
            defaultValue: 'http://via.placeholder.com/100x100'
        }
    }, {
        timestamps: false,
        hooks: {
            afterValidate: function (user) {
                user.password = bcrypt.hashSync(user.password);
            }
        }
    });

    return User;
};
