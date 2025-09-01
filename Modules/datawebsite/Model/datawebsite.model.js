const Sequelize = require('sequelize');
const db = require('../../../config/db.js')
const galleries = require('./galleries.model.js')

const DataTypes = Sequelize

const datawebsite = db.define('datawebsite', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
    },
    app: {
        type:DataTypes.STRING(100),
        allowNull: false,
    },
    author: {
        type:DataTypes.STRING(100),
        allowNull: false,
    },
    link: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
    gambar: {
        type:DataTypes.STRING(100),
        allowNull: false,
    },
    tanggal: {
        type:DataTypes.TIME,
        allowNull: false,
    },
    jenis: {
        type:DataTypes.STRING(50),
        allowNull: false,
    },
    tools: {
        type:DataTypes.STRING(100),
        allowNull: false,
    },
    user_id: {
        type:DataTypes.INTEGER,
        allowNull: true,
    },
    jumlah_rating: {
        type:DataTypes.INTEGER,
        allowNull: true,
    },
    user_rating: {
        type:DataTypes.INTEGER,
        allowNull: true,
    },
    github_url: {
        type:DataTypes.STRING,
        allowNull: true,
    },
    deskripsi: {
        type:DataTypes.TEXT,
        allowNull: true,
    },
    flow: {
        type:DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type:DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'datawebsite',
    paranoid:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    freezeTablename: true,
});

datawebsite.hasMany(galleries, { foreignKey: 'induk_id' });

(async() => {
    await db.sync()
})();

module.exports = {datawebsite , galleries}