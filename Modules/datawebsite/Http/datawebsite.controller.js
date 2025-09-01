const datawebsiteService = require('./datawebsite.service.js');
const {validationResult} = require('express-validator');

module.exports = class datawebsiteController{
    constructor() {
        this.datawebsiteService = new datawebsiteService()
    }
    find = async(req, res) => {
        try {
            const response = await this.datawebsiteService.find(req)
            return res.status(200).json(response)
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:error});
        }
    }

    findOne = async(req, res) => {
        try {
            const response = await this.datawebsiteService.findOne(req.params.id)
            return res.status(200).json(response)
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:error});
        }
    }

    findTags = async(req, res) => {
        try {
            const response = await this.datawebsiteService.findTags(req)
            return res.status(200).json(response)
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:error});
        }
    }
}