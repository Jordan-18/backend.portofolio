const {company, position} = require('../Model/company.model.js')
const eduactionService = require('../../education/Http/education.service.js')

module.exports = class experienceService{
    constructor() {
        this.eduactionService = new eduactionService()
    }
    find = async (req) => {
        const data = await company.findAll({
            include: [position],
            order: [['created_at', 'DESC']],
        })

        const response = data.map((item) => ({
            company: item.company,
            type: item.company_type  || '',
            link: item.company_link || '',
            position: item.positions.map((positionItem) => ({
              [positionItem.position]: `${positionItem.position_begin.substring(0, 7)} - ${positionItem.position_end.substring(0, 7)}`,
            })),
          }));
        
        return response;
    }
    findOne = async (id) => {
        const data = await company.findAll({
            include: [position],
            where: {
                id : id
            }
        })
        const response = data.map((item) => ({
            company: item.company,
            type: item.company_type  || '',
            link: item.company_link || '', // Use empty string if company_link is null
            position: item.positions.map((positionItem) => ({
              [positionItem.position]: `${positionItem.position_begin} - ${positionItem.position_end}`,
            })),
        }));

        return response
    }
    create = async (req, transaction) => {
        const data = await company.create({
            company: req.body.company,
            company_type: req.body.type,
            company_link: req.body.link
        }, {transaction})
        await Promise.all(
            req.body.position.map((item) =>
            position.create({
                induk_id: data.id,
                position: item.position,
                position_begin: item.start,
                position_end: item.end,
              }, {transaction})
            )
        );

        return req.body
    }
    update = async  (id, req, transaction) => {
        const numUpdated = await company.update({
            company: req.body.company,
            company_type: req.body.type,
            company_link: req.body.link
        }, {
            where: {id: id},
            transaction: transaction
        });

        await position.destroy({
            where: {
                induk_id: id
            },
            transaction: transaction
        });

        await Promise.all(
            req.body.position.map((item) =>
            position.create({
                induk_id: id,
                position: item.position,
                position_begin: item.start,
                position_end: item.end,
              }, {transaction})
            )
        );

        if (numUpdated == 0) {
            return { msg: 'Data Not Found' };
        }

        const response = await this.findOne(id)
    
        return response;
    }
    delete = async (id, transaction) => {
        const deleteData = await company.destroy({
            where: {
                id: id
            },
            transaction: transaction
        })
        const response = (deleteData == 0 ? { msg: 'Data Not Found' } : { msg: 'Data Deleted' })
        return response;
    }
    timeline = async () => {
        let experience = await company.findAll({
            include: [position],
            order: [['created_at', 'DESC']],
        })

        let education = await this.eduactionService.find()

        Promise.all(
            experience = experience.map((item) => ({
                year: item.positions[0].position_end.substring(0, 4),
                color: item.company_type == 'software-developer' ? '#3498db' : '#808080', 
                title: item.company,
                type: item.company_type,
                positions: item.positions.map((p) => ({
                    name: p.position,
                    period: `${p.position_begin} - ${p.position_end}`
                }))
            })),

            education = education.map((item) => ({
                year: item.date.substring(7, 11),
                color: '#FFA500',
                title: item.school,
                type: 'education',
                positions: [{
                    name: item.prodi,
                    period: item.date
                }],
                degree: item.degree,
                grade: item.grade
            }))
        )

        let response = experience.concat(education)

        response = response.sort((a, b) => {
            return b.year - a.year
        })

        return response
    }
}