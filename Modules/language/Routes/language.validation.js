const {check} = require('express-validator');

const validate = [
    check('language','is Required').notEmpty(),
    check('link','is Required').notEmpty(),
    check('institution','is Required').notEmpty(),
    check('grade','is Required').notEmpty(),
    check('date','is Required').notEmpty(),
]

module.exports = {validate}