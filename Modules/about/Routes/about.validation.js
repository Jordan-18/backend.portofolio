const {check} = require('express-validator');

const validate = [
    check('about','is Required').notEmpty(),
    check('email','is Required').notEmpty(),
]

module.exports = {validate}