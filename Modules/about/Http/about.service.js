const about = require('../Model/about.model.js')

module.exports = class aboutService{
    find = async (req) => {
        const response = await about.findAll({
            order: [['created_at', 'DESC']],
        })
        return response;
    }
    findOne = async (id) => {
        const response = await about.findAll({
            where: {
                id : id
            }
        })

        return response
    }
    create = async (req, transaction) => {
        const data = await about.create(req.body, {transaction})

        return req.body
    }
    update = async  (id, req, transaction) => {
        const numUpdated = await about.update(req.body, {
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
        const deleteData = await about.destroy({
            where: {
                id: id
            },
            transaction: transaction
        })
        const response = (deleteData == 0 ? { msg: 'Data Not Found' } : { msg: 'Data Deleted' })
        return response;
    }
}