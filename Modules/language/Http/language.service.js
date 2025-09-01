const language = require('../Model/language.model.js')

module.exports = class experienceService{
    find = async (req) => {
        const data = await language.findAll({
            order: [['created_at', 'DESC']],
        })

        const grouped = {}
        data.forEach(item => {
            if(!grouped[item.language]){
                grouped[item.language] = {
                   item : item.language,
                   link : [], 
                   institution : [], 
                   grade : [], 
                   date : []
                }
            }

            grouped[item.language].link.push(item.link)
            grouped[item.language].institution.push(item.institution)
            grouped[item.language].grade.push(item.grade)
            grouped[item.language].date.push(item.date)
        });

        const response = Object.values(grouped)
        
        return response;
    }
    findOne = async (id) => {
        const response = await language.findAll({
            where: {
                id : id
            }
        })

        return response
    }
    create = async (req, transaction) => {
        const data = await language.create(req.body, {transaction})

        return req.body
    }
    update = async  (id, req, transaction) => {
        const numUpdated = await language.update(req.body, {
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
        const deleteData = await language.destroy({
            where: {
                id: id
            },
            transaction: transaction
        })
        const response = (deleteData == 0 ? { msg: 'Data Not Found' } : { msg: 'Data Deleted' })
        return response;
    }
}