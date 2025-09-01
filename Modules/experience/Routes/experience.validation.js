const {check} = require('express-validator');

const validate = [
    check('company','is Required').notEmpty(),
    check('position','is Required').notEmpty(),
]

module.exports = {validate}