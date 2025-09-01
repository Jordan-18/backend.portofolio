const Sequelize = require('sequelize');
const db = require('../../../config/db.js')
const position = require('./position.model.js')

const DataTypes = Sequelize

const company = db.define('company', {
    id: {
        type:Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    company: {
        type:DataTypes.STRING(128),
    },
    company_type: {
        type:DataTypes.STRING(64),
    },
    company_link: {
        type:DataTypes.STRING(128),
    },
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true,
});

company.hasMany(position, { foreignKey: 'induk_id' });

(async() => {
    await db.sync()
})();

module.exports = {company, position}