module.exports = (sequelize, Sequelize) => {
    const Tag = sequelize.define('tag', {
        name: {
            type: Sequelize.CHAR(50),
            unique: true,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Tagname is required.'
                },
                max: {
                    args: 50,
                    msg: 'Tagname should be less than 50 characters.'
                }
            }
        }
    }, {
        timestamps: false
    });

    Tag.associate = function (models) {
        Tag.belongsToMany(models.post, { through: 'tagsinpost', timestamps: false });
    }

    return Tag;
}