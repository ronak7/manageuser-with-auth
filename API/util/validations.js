const { check } = require('express-validator')

module.exports = {
    userBody: [
        check('firstname', 'Please enter First name').not().isEmpty(),
        check('lasttname', 'Please enter Last name').not().isEmpty(),
        check('password', 'Please enter Password').not().isEmpty(),
        check('email', '1Please enter valid Email').isEmail().normalizeEmail()
    ],
    
    loginBody: [
        check('email', 'Please enter valid Email').isEmail().normalizeEmail(),
        check('password', 'Please enter Password').not().isEmpty(),
    ]
}