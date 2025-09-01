const Sequelize = require('sequelize');
const db = require('../../../config/db.js')

const DataTypes = Sequelize

const about = db.define('abouts', {
    id: {
        type:Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    about: {
        type:DataTypes.TEXT(),
    },
    email: {
        type:DataTypes.STRING(64),
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true,
});


(async() => {
    await db.sync()
})();

module.exports = about