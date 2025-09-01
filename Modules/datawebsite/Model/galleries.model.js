const Sequelize = require('sequelize');
const db = require('../../../config/db.js')

const DataTypes = Sequelize

const galleries = db.define('galleries', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
    },
    induk_id: {
        type:DataTypes.INTEGER,
    },
    galleries_img: {
        type:DataTypes.STRING
    },
}, {
    tableName: 'galleries',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true,
});

(async() => {
    await db.sync()
})();

module.exports = galleries