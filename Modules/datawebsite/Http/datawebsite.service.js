const { where } = require('sequelize')
const {datawebsite, galleries} = require('../Model/datawebsite.model.js')


module.exports = class datawebsiteService{
    find = async (req) => {
        const response = await datawebsite.findAll({
            where:{
                status: 1
            },
            include: [galleries],
            order: [
                ['created_at', 'DESC']
            ]
        })
        return response
    }
    findOne = async (id) => {
        const response = await datawebsite.findAll({
            include: [galleries],
            where: {
                id : id
            }
        })
        return response
    }

    findTags = async (req) => {
        let data = await this.find()

        let allTags = data.map((item) => item.tools)
        let splitTags = allTags.map(tag => tag.split(',').map(t => t.trim())).flat()

        let count = {}
        splitTags.forEach(tag => {
            count[tag] = (count[tag] || 0) + 1
        });

        let response = Object.entries(count).map(([tag, total]) => ({
            "Tag": tag, 
            "Total":total
        }))

        response.sort((a, b) => b.Total - a.Total)
        
        return response
    }
}