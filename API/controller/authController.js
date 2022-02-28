const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/User')

const login = async (req, res) => {
    try {
        await check('email', 'Please enter Eamil').not().isEmpty().run(req);
        await check('email', 'Please enter valid Eamil').isEmail().run(req);
        await check('password', 'Please enter Password').not().isEmpty().run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ status: false, msg: result.array()[0].msg });
        }
        let userData = await User.findOne({email: req.body.email});
        console.log(userData);
        if (userData) {
            let isUserMatch = await bcrypt.compare(req.body.password, userData.password)
            if (isUserMatch) {

                let genToken = await generateAuthToken(userData);


                res.status(200).json({
                    status: true,
                    msg: 'Get login users data',
                    data: {
                        token: genToken,
                        firstname: userData.firstname, 
                        lastname: userData.lastname, 
                        email: userData.emai,
                        id: userData._id
                    }
                })
            } else {
                res.status(200).json({
                    statu: false,
                    msg: 'Password not match.',
                    data: null
                })
            }
        } else {
            res.status(200).json({
                statu: false,
                msg: 'User not forund.',
                data: null
            })
        }
    } catch (error) {
        res.status(200).json({
            statu: true,
            msg: 'Something is wrong',
            msg1: error.message
        })
    }
    
}

const signup = async (req, res) => {
    try {
        await check('firstname', 'Please enter First name').not().isEmpty().run(req);
        await check('lastname', 'Please enter last name').not().isEmpty().run(req);
        await check('email', 'Please enter Eamil').not().isEmpty().run(req);
        await check('email', 'Please enter valid Eamil').isEmail().run(req);
        await check('password', 'Please enter Password').not().isEmpty().run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ status: false, msg: result.array()[0].msg });
        }
        let ckuserData = await User.find({email: req.body.email});
        if (ckuserData.length > 0) {
            res.status(200).json({
                statu: false,
                msg: 'Duplicate Email.',
                data: null
            })
        } else {
            let reqData = req.body;
            let userData = new User(reqData);
            userData.password = reqData.password;
            userData.image = '';
            let result = await userData.save();

            let genToken = await generateAuthToken(userData);

            res.status(200).json({
                status: true,
                msg: 'Users added.',
                data: {
                    token: genToken,
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    email: userData.email,
                    id: userData._id
                }
            })
        }
    } catch (error) {
        res.status(200).json({
            statu: true,
            msg: 'Something is wrong',
            msg1: error.message
        })
    }
    
}

const generateAuthToken = async (userData) => {
    return await jwt.sign({ _id:userData._id, firstname: userData.firstname, lastname: userData.lastname, email: userData.email }, process.env.SECRETKEY);
}

const passToken = async (userData) => {
    let genToken = await generateAuthToken(userData);

    res.status(200).json({
        status: true,
        msg: 'Users added.',
        data: {
            token: genToken,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            id: userData._id
        }
    })
}

module.exports = {
   login,
   signup
}