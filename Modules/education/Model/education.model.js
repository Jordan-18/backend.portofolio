const Sequelize = require('sequelize');
const db = require('../../../config/db.js')

const DataTypes = Sequelize

const education = db.define('education', {
    id: {
        type:Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    school: {
        type:DataTypes.STRING(128),
    },
    prodi: {
        type:DataTypes.STRING(128),
    },
    date: {
        type:DataTypes.STRING(128),
    },
    grade: {
        type:DataTypes.STRING(128),
    },
    degree: {
        type:DataTypes.STRING(128),
    },
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true,
});


(async() => {
    await db.sync()
})();

module.exports = education