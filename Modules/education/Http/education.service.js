const education = require('../Model/education.model.js')

module.exports = class experienceService{
    find = async (req) => {
        const response = await education.findAll({
            order: [['created_at', 'DESC']],
        })
        return response;
    }
    findOne = async (id) => {
        const response = await education.findAll({
            where: {
                id : id
            }
        })

        return response
    }
    create = async (req, transaction) => {
        const data = await education.create(req.body, {transaction})

        return req.body
    }
    update = async  (id, req, transaction) => {
        const numUpdated = await education.update(req.body, {
            where: {id: id},
            transaction: transaction
        });

        if (numUpdated == 0) {
            return { msg: 'Data Not Found' };
        }

        const response = await this.findOne(id)
    
        return response;
    }
    delete = async (id, transaction) => {
        const deleteData = await education.destroy({
            where: {
                id: id
            },
            transaction: transaction
        })
        const response = (deleteData == 0 ? { msg: 'Data Not Found' } : { msg: 'Data Deleted' })
        return response;
    }
}