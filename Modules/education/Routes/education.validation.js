const {check} = require('express-validator');

const validate = [
    check('school','is Required').notEmpty(),
    check('prodi','is Required').notEmpty(),
    check('date','is Required').notEmpty(),
    check('grade','is Required').notEmpty(),
    check('degree','is Required').notEmpty(),
]

module.exports = {validate}