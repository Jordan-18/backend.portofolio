const Sequelize = require('sequelize');
const db = require('../../../config/db.js')

const DataTypes = Sequelize

const language = db.define('language', {
    id: {
        type:Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    language: {
        type:DataTypes.STRING(128),
    },
    link: {
        type:DataTypes.TEXT(),
    },
    institution: {
        type:DataTypes.STRING(128),
    },
    grade: {
        type:DataTypes.STRING(128),
    },
    date: {
        type:DataTypes.DATEONLY(),
    },
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true,
});


(async() => {
    await db.sync()
})();

module.exports = language