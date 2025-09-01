const express = require("express");
const experienceController = require('../Http/experience.controller.js')
const {validate} = require('./experience.validation.js')

const router = express.Router();
const experience = new experienceController()

router.get('/experience', experience.find);
router.get('/experience/:id', experience.findOne);
router.post('/experience',validate, experience.create);
router.put('/experience/:id',validate, experience.update);
router.delete('/experience/:id', experience.delete);
router.get('/experience.timeline', experience.timeline);

module.exports = router