const express = require("express");
const datawebsiteController = require('../Http/datawebsite.controller.js')

const router = express.Router();
const datawebsite = new datawebsiteController()

router.get('/find.tags', datawebsite.findTags);

router.get('/', datawebsite.find);
router.get('/:id', datawebsite.findOne);


module.exports = router