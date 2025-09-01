const express = require("express");
const educationController = require('../Http/education.controller.js')
const {validate} = require('./education.validation.js')

const router = express.Router();
const education = new educationController()

router.get('/education', education.find);
router.get('/education/:id', education.findOne);
router.post('/education',validate, education.create);
router.put('/education/:id',validate, education.update);
router.delete('/education/:id', education.delete);

module.exports = router