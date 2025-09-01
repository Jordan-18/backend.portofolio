const Sequelize = require('sequelize');
const db = require('../../../config/db.js')

const DataTypes = Sequelize

const position = db.define('position', {
    id: {
        type:Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    induk_id: {
        type:DataTypes.STRING(128),
    },
    position: {
        type:DataTypes.STRING(128),
    },
    position_begin: {
        type:DataTypes.DATEONLY,
    },
    position_end: {
        type:DataTypes.DATEONLY,
    },
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true,
});

(async() => {
    await db.sync()
})();

module.exports = position