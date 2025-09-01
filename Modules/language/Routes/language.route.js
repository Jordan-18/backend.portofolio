const express = require("express");
const languageController = require('../Http/language.controller.js')
const {validate} = require('./language.validation.js')

const router = express.Router();
const language = new languageController()

router.get('/language', language.find);
router.get('/language/:id', language.findOne);
router.post('/language',validate, language.create);
router.put('/language/:id',validate, language.update);
router.delete('/language/:id', language.delete);

module.exports = router