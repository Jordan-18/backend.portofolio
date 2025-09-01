const express = require("express");
const aboutController = require('../Http/about.controller.js')
const {validate} = require('./about.validation.js')

const router = express.Router();
const about = new aboutController()

router.get('/about', about.find);
router.get('/about/:id', about.findOne);
router.post('/about',validate, about.create);
router.put('/about/:id',validate, about.update);
router.delete('/about/:id', about.delete);

module.exports = router